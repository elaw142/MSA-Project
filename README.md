# TEMP READ ME :)

# How to build image for azure

## Backend

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
