eval $(minikube docker-env)

minikube addons enable ingress
kubectl create configmap env-file --from-env-file=.env

kubectl apply -f ./metrics-server-components.yaml

sudo docker build -t chapp-frontend:latest ./frontend
sudo docker build -t chapp-backend:latest ./src

minikube image load chapp-frontend:latest
minikube image load chapp-backend:latest

kubectl apply -f ./k8sFiles/k8sChapp.yml

