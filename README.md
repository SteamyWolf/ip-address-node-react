# How to start with this project
To run, download the project from GitHub and use `npm start` in an open terminal to start the project and view the code on a live dev server. Or, you can visit https://ip-address-collection.netlify.app/ to test out the app right now and save some of your favorite IP's.

The server is live on heroku and does not require any configuration on your end. The server is currently live and can be tested all through this application by performing one of the actions below:

# CRUD:
Create Read Update Delete

## CREATE
GET #1: `https://ip-address-app-wyatt.herokuapp.com/:ip` grabs another: 
GET #2: `http://ip-api.com/json/${req.params.ip}`
POST #1: `https://ip-address-app-wyatt.herokuapp.com/saveLocation`
The ability to Create a new Favorite IP address is seen on the home page where you are prompted to enter an IP Address. Once you have done so, you should see a card that contains various facts about the IP address you enteres such as the address, city, region, and provider all provided from an API that locates IP Addresses. Below, in the card, you will see a button to save the IP to a list of favorites. This CREATE's a new document on MongoDB that contains your IP address.

## READ
GET #3: `https://ip-address-app-wyatt.herokuapp.com/favorites`
When you navigate to the favorites section, you will see a list of all of your favorited IP Addresses. Upon navigation, a GET request is sent to the server that then communicates to the data base to retrieve the documents requested. In this case, all of the documents are fetched from the favorites collection on MongoDB.

## UPDATE
PUT #1: `https://ip-address-app-wyatt.herokuapp.com/put`
This proved to be a bit tricky but it is working as it should. The ability to update a specific saved IP address to whatever data you want. Inputs will appear allowing you to save/change data in any of the fields. The inputs are prepopulated with the data that was originally in the card. Canceling the edit will return all the previous data as if the card had never been edited. Only upon clicking the save changes button will the new data actually be sent to the server and saved in the database. This is all done through a PUT request sitting on the server.
GET #3:
The last GET occurs when the saved data is returned to the user. Another GET is required to update all of the front-end data to be displayed. The original state of the project needs to be updated accordingly allowing the user to see the visual changes on their end. 

## DELETE
DELETE #1: `https://ip-address-app-wyatt.herokuapp.com/delete/:id`
If you want to change how many IP Addresses you have saved or no longer want a specific IP Address to be saved, then you have the option to delete it by clicking on the Delete button on each IP Address card. This sends a DELETE request to the server which then pulls the specific IP Address from the database to then handle the deletion on the server.

