# TEMP READ ME :)

# How to deploy backend for azure

run deploy.ps1\
through azure extension, deploy webapp to msabackend001

# How to build image for azure
make sure docker is open and logged in

## Backend (use other method)

cd backend\
docker build -t msabackendcontainer.azurecr.io/backend:latest -f ./Dockerfile .\
az login\
az acr login --name msabackendcontainer\
docker push msabackendcontainer.azurecr.io/backend:latest

## Frontend

cd frontend\
docker build -t msafrontendcontainer.azurecr.io/frontend:latest -f ./Dockerfile .\
az login\
az acr login --name msafrontendcontainer\
docker push msafrontendcontainer.azurecr.io/frontend:latest


# How to run normally

## Backend

cd backend\
dotnet run

## Frontend

cd frontend\
npm install\
npm run start
