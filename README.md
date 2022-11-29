# Bugs Manager Online

### React App Client
##### Configuration `ENVIROMENT` in `react_app`
Change or create `.env` file in /client directory with example config
```sh
REACT_APP_BUGS_MANAGER_API=https://<IP>:<PORT>
```
##### Locally
1. Open `CMD` console
2. `cd BugsManagerClient`
3. `yarn build` for build static files
4. `serve -s build`

### Dotnet Core API
##### Configuration
Checkout appsettings.json for ConnectionString for database

##### Locally
1. Open `CMD` console
2. `cd cd BugsManagerApi`
3. `dotnet ef database update` run migrations for database
4. `dotnet build`
5. `dotnet run`

##### Routes
Checkout Swagger Configuration https:<IP>:<PORT>/swagger


