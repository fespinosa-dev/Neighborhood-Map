
# Neighborhood Map

Neighborhood Map  is a single page application build with react featuring a map of a neighborhood. You can highlight locations in the map by selecting one of the locations from a predefined list. Clicking a location on the list displays unique information about the location, and animates its associated map marker. You can use a filter as well to filter the locations.

## Installation
```
You must have npm installed to build and run the app.

git clone https://github.com/fjevictoriano/Neighborhood-Map.git

Go to the folder where you cloned the repository.

npm i && install -g serve (The installation may take some minutes).

Then npm start 

You should be able to see the app running on your default browser: http://localhost:3000/

```

## Production mode

```
If you like to run the app in production mode you should run the following commands:

npm run build && serve -s build

And then visit localhost:3000

```

## Location Details Functionality

The app uses a third party API to fetch location details called [foursquare](https://foursquare.com/).
I used a free developer account which has limited qauota calls so in case the qauota is exceeded you should wait
or you can create your account and replace `Client ID` `Client Secret` values with yours whitin VenuesAPI.js file 
like below : 

```javascript
const requestParams = {
    client_id: YOUR_CLIENT_ID,
    client_secret: YOUR_CLIENT_SECRET,
}
```

## Quick Overview

Filtering

![alt text](https://image.ibb.co/eW8xco/Screen_Shot_2018_06_06_at_9_45_00_PM.png)


Selecting a location from the list.

![alt text](https://image.ibb.co/fsyxco/Screen_Shot_2018_06_06_at_9_42_28_PM.png)


Page view on mobile

![alt text](https://image.ibb.co/i6Qcco/Screen_Shot_2018_06_06_at_9_43_45_PM.png)

