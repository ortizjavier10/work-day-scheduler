

//gobal variables

var m = moment();

// show current date on banner
//function showDate () {
var addDate = document.getElementById('currentDay');
    addDate.innerHTML = m.format("dddd, MMMM Do");
//}


// color coded depending on time of day
function checkTime () {
    var currentTime = m.format("H");
        //console.log(currentTime);
    //var toDoTime = parseInt($(this).data("time"));
    
    $(".toDo").each(function() {
        var toDoTime = $(this).data("time");
        //console.log(toDoTime);

        if(currentTime > toDoTime) {
            $(this).removeClass("present");
            $(this).removeClass("future");
            $(this).addClass("past");;
        }

        else if(currentTime == toDoTime) {
            $(this).removeClass("past");
            $(this).removeClass("future");
            $(this).addClass("present");
        }

        else {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });
};


// when a time block is clicked you can enter an event
$("#timeblocks").on("click", ".toDo", function(){

    // console.log("<p> was clicked");
    var text = $(this)
        .text()
        .trim();

    var textInput = $("<textarea>")
        .addClass("form-input")
        .val(text);
    
    $(this).children(".task").replaceWith(textInput);
    textInput.trigger("focus");
});


// when the save button is clicked the task is saved and the text for the time block is saved into local storage
// var list = JSON.parse(localStorage.getItem('todolist')) || [];

// function renderTodos(list) {
//     $('.task').empty();

//     for (var i = 0; list.length; i++) {

//     }
// }

$("#timeblocks").on("click", ".save-btn", function() {
    var value = $(this)
    .siblings(".toDo")
    .find(".text-area")
    .val();

    var taskP = $("<p>")
     .addClass(".task")
     .text(value);

    $(this).siblings(".form-input").replaceWith(taskP);
    saveToDo($(this).siblings(".toDo"));
});



function saveToDo(toDo) {
     var key = "time -" + $(toDo).data("time");
     var value = $(toDo).find(".task").text();


     localStorage.setItem(key, value);
//     localStorage.setItem(key, text); 
}

function getSavedToDo() {
    $(".form-input").each(function() {
        var key = "time-" + $(this).data("time");
        $(this).find(".task").text(localStorage.getItem(key, value));
    });
    
    
}


// when the page is refreshed the data stays


//refresh iterval every 1 second
setInterval(checkTime, (1000 * 1));

