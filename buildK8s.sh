eval $(minikube docker-env)

minikube addons enable ingress
kubectl create configmap env-file --from-env-file=.env

sudo docker build -t chapp-frontend:latest ./frontend
sudo docker build -t chapp-backend:latest ./src

kubectl apply -f ./k8sChapp.yml
