/* Script to call the weather api data */
/* Api used: https://openweathermap.org/current */

var imgSrc = {
    "clear sky": "./Images/Sunny.jpg"
    //TODO THE REST!
}

var dontUpdate = false;

/* Run on page load */
$(function () {
    SetWeatherData()

    var minUpdate
    minUpdate = setInterval(function() {
        if (dontUpdate === true) {
            clearInterval(minUpdate);
            return 
        }
        console.log("Update");
        SetWeatherData()
    }, 1000*30) 
})

/* Search weathercontent blockid. Creates a new one if it cant find it */
function UpdateBlock(data, index) {
    let container = $("#WeatherContent")
    let block
    if (container.children("#Block" + index).length > 0) {
        block = container.find("#Block" + index)
    } else {
        block = $("#Templates").children(".WeatherBlock").clone(true, true)
        block.attr("id", "Block"+index);
        container.append(block)
    }
    //Not a fan of hooking onto a description.
    let image = imgSrc[data.weather[0].description]

    block.find(".City h2").html(data.name)
    block.find(".Icon img").attr("src", image);
    block.find(".Temperature").html(data.main.temp + "&deg;")
    block.find(".Icon figcaption").html(data.weather[0].description)

    
}

/* Gets the current weather with an api call
 * and sends the data to an update */
function SetWeatherData() {
    let londonId = 2643743
    let osloId = 6453366
    let minskId = 625144

    let apiKey = "f2bc5fd358ea3bd542e898f165275606"
    let reqString = "https://api.openweathermap.org/data/2.5/"
        + "group?id=" + londonId + "," + osloId + "," + minskId
        + "&units=metric"
        + "&APPID=" + apiKey

    $.getJSON(reqString)
        .done(function (data) {
            var size = data.cnt;

            let allCities = data.list
            for (var i = 0; i < size; i++) {
                cityData = allCities[i]
                UpdateBlock(cityData, i)
            }

            updateFetchTime();
            let loading = $(".Main .Headline .Loading")
            if (loading.hasClass("Hidden") == false) {
                loading.toggleClass("Hidden");
            }
        })
        .fail(function (data, textStatus, error) {
            let message = "GetJson failed. Status" + textStatus + " Error " + error
            console.log(message)
            $(".Headline").addClass("error").html("Error: Api request failed")
        })
}

function updateFetchTime() {
    let time = moment();
    $("#FetchTime").html(time.format("HH:mm:ss DD.MM.YY"))
}