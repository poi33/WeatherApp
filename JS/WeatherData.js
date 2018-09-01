/* Script to call the weather api data */
/* Api used: https://openweathermap.org/current */

$.support.cors = true;

var imgSrc = {
    "clear sky": "./Images/Sunny.jpg",
    "few clouds" : "./Images/SunCloud.jpg",
    "scattered clouds" : "./Images/SunCloud.jpg",
    "broken clouds" : "./Images/DarkCloud.jpg",
    "shower rain" : "./Images/RainLight.jpg",
    "rain" : "./Images/SunnyCloudRain.jpg",
    "thunderstorm" : ".Images/Storm.jpg",
    "snow" : "./Images/Snow.jpg"
};

var dontUpdate = false;

/* Run on page load */
$(function () {
    SetWeatherData();

    var minUpdate;
    minUpdate = setInterval(function () {
        if (dontUpdate === true) {
            clearInterval(minUpdate);
            return;
        }
        SetWeatherData();
    }, 1000 * 30);
});

/* Search weathercontent blockid. Creates a new one if it cant find it */
function UpdateBlock(data, index) {
    var container = $("#WeatherContent");
    var block;
    if (container.children("#Block" + index).length > 0) {
        block = container.find("#Block" + index);
    } else {
        block = $("#Templates").children(".WeatherBlock").clone(true, true);
        block.attr("id", "Block" + index);
        container.append(block);
    }
    //Not a fan of hooking onto a description.
    var image = imgSrc[data.weather[0].description];

    block.find(".City h2").html(data.name);
    block.find(".City .WeatherIcon").attr({
        "src": image,
        "alt": data.weather[0].description
    });
    block.find(".City .Temperature").html(data.main.temp + " &deg;C");
    block.find(".City .Wind").html(data.wind.speed+" m/s");
}

/* Gets the current weather with an api call
 * and sends the data to an update */
function SetWeatherData() {
    var londonId = 2643743;
    var osloId = 6453366;
    var minskId = 625144;

    var apiKey = "f2bc5fd358ea3bd542e898f165275606";
    var reqString = "https://api.openweathermap.org/data/2.5/"
        + "group?id=" + londonId + "," + osloId + "," + minskId
        + "&units=metric"
        + "&APPID=" + apiKey;

    $.getJSON(reqString)
        .done(function (data) {
            var size = data.cnt;

            var allCities = data.list;
            for (var i = 0; i < size; i++) {
                cityData = allCities[i];
                UpdateBlock(cityData, i);
            }

            updateFetchTime();
            var loading = $(".Main .Headline .Loading");
            if (loading.hasClass("Hidden") == false) {
                loading.toggleClass("Hidden");
            }
        })
        .fail(function (data, textStatus, error) {
            var message = "GetJson failed. Status" + textStatus + " Error " + error;
            console.log(message);
            dontUpdate = true;
            $(".Headline").addClass("Error").html("Error: Api request failed");
        })
}

function updateFetchTime() {
    var time = moment();
    $("#FetchTime").html(
        time.format("HH:mm:ss") + " on " + 
        time.format("DD.MM.YY")
    );
}