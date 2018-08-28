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
            freq: freq,
        };
        database.ref().push(newTrain);
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.freq);
        $("#train-name").val("");
        $("#destination").val("");
        $("#start-time").val("");
        $("#frequency").val("");

    })
    database.ref().on("child_added", function (childSnapshot) {
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var startTime = childSnapshot.val().start;
        var freq = childSnapshot.val().freq;
        var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
        console.log(startTimeConverted);
        var currentTime = moment();
        console.log("Current time: " + moment(currentTime).format("hh:mm"));
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
        console.log("Difference in time: " + diffTime);
        var tRemainder = diffTime % freq;
        console.log("Time apart: " + tRemainder);
        var minutesAway = freq - tRemainder;
        console.log("Minutes away: " + minutesAway);
        var nextTrain = moment().add(minutesAway, "minutes");
        console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(freq),
            $("<td>").text(moment(nextTrain).format("hh:mm")),
            $("<td>").text(minutesAway),
        )
        $("#train-table > tbody").append(newRow);
    })
});