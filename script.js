var hourArray = [8,9,10,11,12,13,14,15,16,17]; // array for iterating through hours
var hoursObject = { // object to store saved items
    8:"",
    9:"",
    10:"",
    11:"",
    12:"",
    13:"",
    14:"",
    15:"",
    16:"",
    17:"",
};

function initStorage(){ // load hoursObject with existing values, if they exist

    if(JSON.parse(localStorage.getItem("schedule"))){
        hoursObject = JSON.parse(localStorage.getItem("schedule"));
    }
};
initStorage(); // get latest stored values

var date = moment(); //get date attr

var dateString = moment(date).toLocaleString(); // get a readable string

var container = $(".container");

var formattedDate = dateString.slice(0,16); // get the date string up til the time
var currentHour = dateString.slice(16,18); // get the hour element of the date string


$("#currentDay").html(formattedDate); // put the current date at the top of the screen


hourArray.forEach(function(i){

    var tb = $("<div>").attr("class", "timeblock row"); //make a div for each hour of the workday

    //format time label for consistency
    if (i < 10){
        i = "0" + i
    };

    // dynamically generate list items
    var hour = $("<div>").attr({class: "hour col-sm-2"}).text(i + ":00");
    var btn = $("<button>").attr({class: "saveBtn button col-sm-2", type:"submit"});
    btn.text("Save");
    var descr = $("<textarea>").attr({class: "textarea col-sm-8", placeholder: "What you doin?", type:"input"});

    descr.text(hoursObject[parseInt(i)]); // update list with saved items
    tb.attr("data-name", i);    // assign data-name attribute for future reference as a key

    // assign color attributes based on current time
    if(i< currentHour){
        descr.attr("class", "past " +descr.attr("class"));
    } else if(i.toString() === currentHour){
        descr.attr("class", "present " + descr.attr("class"));
    } else {
        descr.attr("class", "future " + descr.attr("class"));
    };

    //add elements to the markup
    tb.append(hour, descr, btn);    
    container.append(tb);
});

$('.saveBtn').on("click", function(){

    event.preventDefault(); // dont refresh the page on click

    // save the new text to local storage
    var key = parseInt($(this).parent().attr("data-name")); // get the key of the save button used
    hoursObject[key] = $(this).parent().children(".textarea").val();   // update the value of the associated key
    localStorage.setItem("schedule", JSON.stringify(hoursObject));  // save the new object to local storage

});