$(document).ready(function() {
    // -----FUNCTIONS----- //
  
    // Test promise-based async function available in es8 for JSON specific api call
    // More info at https://javascript.info/async-await and at
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    async function getJSON(url, settings) {
      return await (await fetch(url, settings)).json();
    }
  
    // Use temperature to pull random drink ingredient based on temperature //
    function getDrinkIngredient(temp) {
      var coldIngredients = ['cinnamon', 'cider', 'coffee', 'vanilla', 'chocolate', 'espresso', 'egg'];
      var mildIngredients = ['grape', 'lime', 'lemon', 'orange', 'vermouth', 'grenadine', 'ginger'];
      var hotIngredients = ['mango', 'pineapple', 'strawberries', 'banana', 'cream', 'water', 'ice', 'cherry'];
  
      if (temp <= 40) {
        return coldIngredients[
          Math.floor(Math.random() * coldIngredients.length)
        ];
      }
  
      if (temp <= 60) {
        return mildIngredients[
          Math.floor(Math.random() * mildIngredients.length)
        ];
      }
  
      return hotIngredients[Math.floor(Math.random() * hotIngredients.length)];
    }
  
    // convert kelvin to fahrenheit
    function kelToFah(c) {
      var f = Math.round((c - 273.15) * 1.8 + 32);
      return f;
    }
  
    // Display city, temp //
    function updateLocationDetails(city, temp) {
      // var cityName = document.querySelector("#city-name");
      var cityName = $('#city-name');
      // var currentTemp = document.querySelector("#current-temp");
      var currentTemp = $('#current-temp');
  
      // cityName.textContent = city;
      cityName.text(city);
      // currentTemp.textContent = temp;
      currentTemp.text(temp);
    }
  
    // Build Drink Display Cards //
    function makeDrinkCards(results) {
      var drinkCardsHTML = '';
  
      // Array.forEach(callback) method loops through each element in an array and executes the callback on it
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
      // Arrow method syntax ( (prop) => {}) operates in this context like a regular method call (function(prop) {})
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      results.drinks.forEach(drink => {
        var drinkName = drink.strDrink;
        var drinkImage = drink.strDrinkThumb;
        var ingredientsURL = `https://www.thecocktaildb.com/drink.php?c=${drink.idDrink}`;
        //the $ below is not jQuery, it is template literals, which allow making strings out of variables and expressions
        drinkCardsHTML += `
      <div class="drink-card">
      <h3 class="drink-card__header">${drinkName}<h3>
      <div class="drink-card__body">
      <img 
      src="${drinkImage}"
      alt="drink"
      class="drink-card__image"
      />
      <div>
      <a class="drink-card__link" href="${ingredientsURL}" target="_blank">Drink Me <i class="fa fa-external-link"></i></a>
      
      </div>
      </div>
      </div>`;
      });
      // document.querySelector(".drinks").innerHTML = drinkCardsHTML;
      $('.drinks').html(drinkCardsHTML);
    }
  
    function getUserWeather() {
      // Another use of arrow function syntax: const methodName = (prop) => { // code here}
      navigator.geolocation.getCurrentPosition(position => {
        // Object destructuring latitude and longitude from position.coords object to pull the latitutde and longitude
        // from position.coords object and assign them to the variables latitude and longitude.
        // More info at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        var { latitude, longitude } = position.coords;
  
        var queryString = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9d43fd3ba9edb19355aa0760b84ba2f2`;
  
        getJSON(queryString).then(response => {
          var city = response.name;
          var k = response.main.temp;
          var f = kelToFah(k);
          getNumberFact(f);
  
          updateLocationDetails(city, f);
  
          var ingredient = getDrinkIngredient(f);
          var drinkURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  
          getJSON(drinkURL).then(response => {
            makeDrinkCards(response);
          });
        });
      });
    }
  
    // Gets a number (or date) fact from numbersapi.com, based on temp or date
    // On page load, get number fact for today's date--takes no parameters, date pulled automatically
    // Otherwise, if numberString, gets number fact based on numberString.
    // Function won't work in mixed content mode--numbersapi is only http. Nothing shows up with https site, e.g. github site, unless you explicitly
    // allow mixed-content mode. See https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
    function getNumberFact(numberString) {
      // Check if parameter for number fact provide, i.e. a specific number...otherwise...
      if (!numberString) {
        // Get the month from the native js date object—-months start at 0 so add 1
        var month = new Date().getMonth() + 1;
        // Get date from native js date object
        var day = new Date().getDate();
        var numbersApiURL = `http://numbersapi.com/${month}/${day}`;
      } else {
        var numbersApiURL = `http://numbersapi.com/${numberString}`;
      }
  
      // Use jQuery ajax() method; could use getJSON() but would need to modify to return response.text()
      // because numbersapi.com doesn't return json data.
      $.ajax({
        url: numbersApiURL,
        method: 'Get'
      }).then(function(response) {
        $('#numberDiv').remove();
        var numberDiv = $("<div id='numberDiv'>").text(response);
        numberDiv.addClass('message');
  
        $('#drinks-heading').after(numberDiv);
      });
    }
  
    // Process form submssion //
    function handleCityForm(event) {
      var city = event.target.city.value.trim().toLowerCase();
      event.preventDefault();
  
      // For form checking, if no data entered or if empty string, replace with dissmissable alert
      // Also, as an improvement, consider doing this for cases where city name entered doesn't exist
      // or doens't result in information back from openweather api
      if (!city) {
        // document.querySelector('#city').setAttribute('placeholder', 'You must enter a city!');
        // changes placeholder attr to inform user of what to do if no data is initially entered when submit button is clicked
        $('#city').attr('placeholder', 'You must enter a city');
        return;
      }
  
      // Openweather API is used and completes search using the current "value"  of city
      var weatherQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d43fd3ba9edb19355aa0760b84ba2f2`;
  
      // Converts the temperature from response Object (from API) from Kelvin to Farenheit and returns Farenheit value
      getJSON(weatherQuery).then(response => {
        var k = response.main.temp;
        var f = kelToFah(k);
        updateLocationDetails(city, f);
  
        getNumberFact(f); //Uses the Farenheit temp as trigger for Number fact API Search
  
        var ingredient = getDrinkIngredient(f);
        var drinkURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  
        getJSON(drinkURL).then(response => {
          makeDrinkCards(response);
        });
      });
  
      event.target.reset();
    }
  
    // Function for User clicking for Geolocation option
  
    function handleLocationButton(event) {
      if (event.target.matches('#location-button')) {
        getUserWeather();
      }
    }
  
    // ----- Start Up and Event Listeners ----- //
    // document.addEventListener("submit", handleCityForm, false);
    $(document).on('submit', handleCityForm);
  
    // document.addEventListener("click", handleLocationButton, false);
    $(document).on('click', handleLocationButton);
  
    // Pulls date fact to be displayed on page load
    getNumberFact();
  });
 
  