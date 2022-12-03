const nonImportantIcon ="fa-solid fa-plane-up";
const ImportantIcon ="fa-solid fa-plane";
var isImportant = false;
var isVisible = true;




function toggleImportant(){
    
    if(isImportant) {
        // to non important icons
        $("#planeIcon").removeClass(ImportantIcon);
        $("#planeIcon").addClass(nonImportantIcon);
        isImportant = false;

    }
    else{
        // to important
        $("#planeIcon").removeClass(nonImportantIcon);
        $("#planeIcon").addClass(ImportantIcon);
        isImportant = true;
    }
}

function toggleDetails() {

    if(isVisible) {
        $("#secForm").hide();
        isVisible = false;
    }
    else{
        $("#secForm").show();
        isVisible = true;
    }
}

function saveTask(){
    console.log("Saving task!");
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let dueDate = $("#txtDueDate").val();
    let category = $("#txtCategory").val();
    let priority = $("#txtPriority").val
    let cost = $("#txtCost").val();

    //create a new instance of Task (object)
    let task = new Task(isImportant, title, description, dueDate, category, priority, cost);
    console.log(task);
    

    //console log the instance (object)
    // create a post request to:
    // https://fsdiapi.azurewebsites.net/api/tasks/

$.ajax({
    type: "POST",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (data) {
        displayTask(task);
        console.log("Server says", data);
    },
    error: function (err) {
        console.log("saving failed", err);
        alert("error, task not saved");
        },
    });
}


function displayTask(task){
    let syntax = `<div class="task">
        <div class="description">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>

        <label>${task.dueDate}</label>
        <label>${task.category}</label>
        <label>${task.cost}</label>
            
    </div>`; // html code

    $("#pendingTask").append(syntax);
}

function testRequest() {
    $.ajax({
        type: "GET",
        url:"https://fsdiapi.azurewebsites.net",
        success: function(data) {
            console.log("Server says", data);
        },
        error: function(error) {
            console.log("Request error", error);
        }
    });
}

function fetchTasks(){
    $.ajax({
        type: "Get",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(data) {
            let all = JSON.parse(data); // will parse the json string into js obj / array 
            console.log(all);  // all = all the tasks saved on the server

            for(let i=0; i<all.length; i++) {
                let task = all[i];
                if (task.name === "Jose Luis"){
                displayTask(task);
            }
        }
    },
    error: function(error) {
        console.log("request error", error);
        },
    });
}

function init() {
    console.log("Task Manager");

fetchTasks();

    $("#planeIcon").click(toggleImportant);
    $("#btnSave").click(saveTask);
    $("#btndetails").click(toggleDetails);
}

window.onload = init;

// test change 








/**
 * console log a message when the user clicks on the icon
 * 
 * add an id to the icon
 * catch the click event on the icon, (on init fn)
 * when the icon is clicked, call a fn name toggleImportant
 * in toggleImportantconsole log any message
 * 
 * get -  retrieve
 * post - create new
 * put and patch - modify
 * delete - remove
 */