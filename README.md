# Admin games
Admin game project with express and template engine using ejs. For the database, this project using postgres sql.

To run this file please do this step:
  - npm init -y
  - npm i express ejs express-session sequelize sequelize-cli connect-flash
  - npm i --save -g nodemon

Before run the project, change file config.json (in config folder). Please change username and password to yours, after that write this statement in terminal:
  - sequelize db:create
  - sequelize db:migrate

 Then write nodemon server.js and access via browser with http://localhost:4000 
