$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyA-HsMdNbr7rKQoqhX7qOe6CJErBMXzOuY",
        authDomain: "train-schedule-a4adf.firebaseapp.com",
        databaseURL: "https://train-schedule-a4adf.firebaseio.com",
        storageBucket: "train-schedule-a4adf.appspot.com",
        messagingSenderId: "512023627894"
    };
    firebase.initializeApp(config);

    var name = '';
    var destination = '';
    var firstTime = '';
    var frequency = '';

    var database = firebase.database();
    //button for adding trains
    $('#submitButton').on('click', function(event) {
        event.preventDefault();

        //gets user input
        var trainName = $('#trainNameInput').val();
        var destination = $('#destinationInput').val();
        var firstTime = $("#timeInput").val();
        var frequency = $('#frequencyInput').val();

        //push data to the database

        var newTrain = {
            name: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
        };

        database.ref().push(newTrain);

        // console.log(newTrains.name);
        // console.log(newTrains.tdestination);
        // console.log(newTrains.tFirst);
        // console.log(newTrains.tfreq);

        //empty all of the text boxes
        $('#trainNameInput').val("");
        $('#destinationInput').val("");
        $('#timeInput').val("");
        $('#frequencyInput').val("");

        //dont let user submit empty form
        // Prevents moving to new page
        return false;
    });

    // New train function childsnap, prevchildkey
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().firstTime;
        var tFrequency = childSnapshot.val().frequency;



        // console.log(trainName);
        // console.log(destination);
        // console.log(firstTime);
        // console.log(tFrequency);



        // shit not working below....
        var currentTime = moment();



        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        //difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log(diffTime);

        //minutes until train
        var tMinutesTillTrain = tFrequency - tRemainder;

        // console.log(tMinutesTillTrain);

        //time apart (remainder)

        var tRemainder = diffTime % tFrequency;
        // console.log(tRemainder);

        //next train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextTrainConverted = moment(nextTrain).format("hh:mm a");

        //add each trains data into the table
        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" +
            destination + "</td><td>" + "Every " + tFrequency + " minutes" +
            "</td><td>" + nextTrainConverted + "</td><td>" + firstTime +
            "</td></tr>");

    });
});
