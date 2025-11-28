
import { Construct } from 'constructs';

import * as path from "path";


// AWS CDK Imports
import * as cdk from 'aws-cdk-lib/core';

import * as s3 from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { LoadBalancerV2Origin, S3StaticWebsiteOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import * as rds from 'aws-cdk-lib/aws-rds'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { aws_elasticache as elasticache } from 'aws-cdk-lib'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecr from 'aws-cdk-lib/aws-ecr'

/*
    * TODO:
    * - Create S3 Bucket with Data
* - Create RDS Postgres Database
*   - Validate that Postgres DB Migrates Automatically
* - Create Elasticache Redis 
* - Create ECS hosted backend
*   - Make sure connection to Postgres is Secure
*   - Update environment too account for new URLs
    * - Connect cloudfront with Origins pointing too frontend and backend
*/

export class AwsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here


        // Creates Bucket
        const s3Bucket = new s3.Bucket(this, 's3-bucket', {
            bucketName: 'chapp-frontend',
            accessControl: s3.BucketAccessControl.PRIVATE
        });

        // Setup Binding Angular Build too S3 Bucket
        new BucketDeployment(this, 'BucketDeployment', {
            destinationBucket: s3Bucket,
            sources: [Source.asset(path.resolve(__dirname, '../frontend/dist/Chapp/browser'))]
        });

        const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
        s3Bucket.grantRead(originAccessIdentity);


        // Create VPC to contain backend inside with an endpoint

        const backend_vpc = new ec2.Vpc(this, 'Vpc', {
            ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/24')
        });

        const backend_endpoint = new elbv2.ApplicationLoadBalancer(this, 'NLB', {
            vpc: backend_vpc,
            internetFacing: true
        });

        const vpc_security_group = new ec2.SecurityGroup(this, 'backend-security-group', {
            vpc: backend_vpc,
            allowAllOutbound: true
        });

        vpc_security_group.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));

        // Create RDS

        const postgres_db = new rds.DatabaseInstance(this, 'chapp-db', {
            engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_17 }),
            vpc: backend_vpc,
            securityGroups: [vpc_security_group]
        });

        // Create Elasticache

        const cache_security_group = new ec2.SecurityGroup(this, 'cache-security-group', {
            vpc: backend_vpc
        });

        cache_security_group.addIngressRule(
            ec2.Peer.securityGroupId(vpc_security_group.securityGroupId),
            ec2.Port.tcp(6379),
            'Communication with Elasticache'
        )

        const valkey_db = new elasticache.CfnCacheCluster(this, 'chapp-cache', {
            cacheNodeType: 't2.micro',
            engine: 'valkey',
            numCacheNodes: 1,
            vpcSecurityGroupIds: [cache_security_group.securityGroupId]
        });

        // Create ECS Container

        const ecs_cluster = new ecs.Cluster(this, 'backend-cluster', {vpc: backend_vpc});
        
        ecs_cluster.addCapacity('Container', {
            instanceType: new ec2.InstanceType('t2.micro'),
            desiredCapacity: 1
        });

        const container_repo = ecr.Repository.fromRepositoryName(this, 'backend-repo', process.env.AWS_BACKEND_DOCKER_REGISTRY!);

        const task_definition = new ecs.Ec2TaskDefinition(this, 'Task Def');

        const container = task_definition.addContainer('backend-container', {
            image: ecs.ContainerImage.fromEcrRepository(container_repo),
        });

        container.addPortMappings({containerPort: 3000})

        const backend_ecs = new ecs.Ec2Service(this, 'Service', {
            cluster: ecs_cluster,
            taskDefinition: task_definition,
        });

        const ecs_security_group = new ec2.SecurityGroup(this, 'ecs-sg', {
            vpc: backend_vpc,
            allowAllOutbound: true
        });

        ecs_security_group.addIngressRule(vpc_security_group, ec2.Port.tcp(3000))

        backend_ecs.connections.addSecurityGroup(ecs_security_group)

        // Cloudfront Proxy (sorta)
        new Distribution(this, 'Distribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new S3StaticWebsiteOrigin(s3Bucket)
            },
            additionalBehaviors: {
                '/api/*' : {
                    origin: new LoadBalancerV2Origin(backend_endpoint)
                }
            }
        });


    }
}


