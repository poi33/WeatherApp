/* Script to call the weather api data */
/* Api used: https://openweathermap.org/current */

$(function () {
    let APIKEY = "f2bc5fd358ea3bd542e898f165275606"
    let reqString = "http://api.openweathermap.org/data/2.5/"
        + "weather/?id=2643743"
        + "&units=metric"
        + "&APPID=" + APIKEY

    let promise = $.getJSON(reqString)
    .done(function() {

    })
    .fail(function() {

    })
    .al


});