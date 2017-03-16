# Restaurant-table-reservation-system
RESTful service end points for a restaurant table reservation system

Usage:

1. Create a new user and set desired password for your mysql sercice OR login to an existing user account in mysql.
2. Go to utils/connection.js and change the user and password parameters with your username and password.
3. Create a database called "restaurants". Command - create database restaurants
4. Download the mysql dump from https://drive.google.com/file/d/0B8JsTzgeRnIUcTZKRWNHMDJoTTQ/view?usp=sharing
5. Source the mysql dump into your database. Command - "mysql -u <user_name> -p restaurants < /downloaded_path/restaurants.sql".
6. Run npm install. All required npm modules will be installed. 
7. Run the server using the command - node restaurants.js.
8. Open doc folder and open index.html file in a browser. Use the guidelines for the API and start testing using POSTMAN or any other API Testing tool of your choice.
