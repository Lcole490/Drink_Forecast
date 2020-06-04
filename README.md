# Drink_Forecast



Description
Basic
Our app takes a user's location input. This information is used to pull weather data from OpenWeather.org. Temperature information for the location is then used behind the scenes to determine likely available drink ingredients. The drink ingredients are then used to pull selected/suggested drinks from the CocktailDB. A list/table below the input is then populated with the location name, temperature, and suggested drinks and images of them.

Beyond the Basic
Store responses to localStorage (or firebase), allow keeping/deleting
Add a button so that people can pull chuck norris facts
Use browser geolocation to let user pull location based on current location (lat and lon) with one button click
Have drink image link out to a google search "how do i make x"
Sketch


APIs & Other Technologies
OpenWeather for weather details
TheCocktailDB for drinks and links to drinks recipes
GeoLocation API to get location information for user
Wing CSS Framework as an alternative css framework
NumbersAPI for number and date facts
Unsplash's Random Image API for background image
Screenshots






Tasks
Develop project proposal
Make and revise sketch
Figure out how weather api works
Figure out how drink api works
Figure out how GeoLocation API works
Figure out how to collaboratively use github
Make the design responsive
Figure out how to use Wing framework
Pseudocode key parts of application
Divide coding tasks/responsibilities among ourselves
Build the front end
Map temperature to ingredients categories
Pseudo Code

<!-- P R O J E C T _ O N E _ P S E U D O C O D E  -->
<!-- Step One: Setting Up Variables  -->
<!-- Set Arrays for different ingredients based on weather -->
<!-- I.E: cold_weather_ingred, hot_weather_ingred -->
<!-- Set variables for Latitude, Longitude, Weather (Convert from Kelvin to Farenheit), etc-->
<!-- Step Two: Setting Up Functions -->
<!-- Ajax Calls for Each API used returning responses (named for each expected type of response) -->
<!-- Function to convert Kelvin to Farenheit -->
<!-- Geolocation Function to get Latitude and Longitude -->
<!-- Listening/ Click Events for 
            1.User Typed Location 

            2. Button that gets Geolocation-->

<!-- Step Three: JQuery -->
<!-- Dynamic Loading of HTML -->
<!-- This will be for "automatic" loading of 
        

        1. Drink Options
        2. Weather Forecast
        3. List of Selected Drinks
        4. Other information To Be Determined -->
