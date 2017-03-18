$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyA-HsMdNbr7rKQoqhX7qOe6CJErBMXzOuY",
        authDomain: "train-schedule-a4adf.firebaseapp.com",
        databaseURL: "https://train-schedule-a4adf.firebaseio.com",
        storageBucket: "train-schedule-a4adf.appspot.com",
        messagingSenderId: "512023627894"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    //button for adding trains
    $('#submitButton').on('click', function(event) {
        event.preventDefault();

        //gets user input
        var trainName = $('#trainNameInput').val().trim();
        var destination = $('#destinationInput').val().trim();
        var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
        var frequency = $('#frequencyInput').val().trim();

        //creates frebase holder for train times

        //push data to the database
        database.ref().push({
            name: trainName,
            tdestination: destination,
            tFirst: firstTime,
            tfreq: frequency,
        });



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
        return false;
    });

    //when a new item is added (child) do this function
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().tdestination;
        var firstTime = childSnapshot.val().tFirst;
        var frequency = childSnapshot.val().tfreq;
        // console.log(trainName);
        // console.log(destination);
        // console.log(firstTime);
        // console.log(frequency);

        //convert first time (push back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        //current time
        var currentTime = moment();
        // console.log(currenTime);

        //difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log(diffTime);

        //minute until train
        var tMinutesTillTrain = frequency - tRemainder;
        // console.log(tMinutesTillTrain);

        //time apart (remainder)
        var tRemainder = diffTime % frequency;
        // console.log(tRemainder);

        //next train
        var nextTrain = moment().add(tMinutesTillTrain,"minutes");
        var nextTrainConverted = moment(nextTrain).format("hh:mm a");

        //add each trains data into the table
        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" +
            destination + "</td><td>" + "Every " + frequency + " minutes" +
            "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain +
            "</td></tr>");

    });
});
