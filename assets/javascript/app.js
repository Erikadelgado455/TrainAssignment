$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyDqrx8obfUvmQ9TLcd4Tn7C2CFlJX-rIR0",
        authDomain: "train-scheduler-95439.firebaseapp.com",
        databaseURL: "https://train-scheduler-95439.firebaseio.com",
        projectId: "train-scheduler-95439",
        storageBucket: "train-scheduler-95439.appspot.com",
        messagingSenderId: "779973586607"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    $("#submit").on("click", function () {
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var startTime = $("#start-time").val().trim();
        var freq = $("#frequency").val().trim();
        var newTrain = {
            name: trainName,
            destination: destination,
            start: startTime,
            freq: freq
        };
    })
});