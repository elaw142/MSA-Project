Set-Location -Path "backend"

dotnet build
dotnet publish -c Release -o ./publish

Copy-Item -Path "RecipeSharingDb.db" -Destination "./publish/RecipeSharingDb.db"
$env:ASPNETCORE_URLS = "http://+:80"