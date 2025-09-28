sudo docker build -t chapp-frontend:latest ./frontend
sudo docker build -t chapp-backend:latest ./src

kubectl apply -f ./k8sChapp.yml
