import "../css/style.css";


const taskContainer = document.getElementById("taskContainer");
const newTaskBtn = document.getElementById("newTaskBtn");

newTaskBtn.addEventListener("click", createTask);

function createTask() {
    //-----container for tasks-----//
    let task = document.createElement("div");
    task.classList.add("task");
    taskContainer.appendChild(task);

    let taskName = document.createElement("div");
    taskName.classList.add("taskName");
    taskName.innerHTML = "This is a task";
    task.appendChild(taskName);

    let taskIcons = document.createElement("div");
    taskIcons.classList.add("taskIcons");
    task.appendChild(taskIcons);

    //-----task icons-----//

    //-----priority-----//
    let taskPriority = document.createElement("div");
    taskPriority.classList.add("taskPriority")
    taskIcons.appendChild(taskPriority)

    let taskPriorityImg = document.createElement("img");
    taskPriorityImg.classList.add("taskPriorityImg");
    taskPriorityImg.src = "http://127.0.0.1:5500/src/img/alert-circle-outline.png";
    taskPriorityImg.alt = "Task_Priority_Icon"
    taskPriority.appendChild(taskPriorityImg);

     //-----edit-----//
     let taskEdit = document.createElement("div");
     taskEdit.classList.add("taskEdit")
     taskIcons.appendChild(taskEdit)
 
     let taskEditImg = document.createElement("img");
     taskEditImg.classList.add("taskEditImg");
     taskEditImg.src = "http://127.0.0.1:5500/src/img/pencil-circle-outline.png";
     taskEditImg.alt = "Task_Edit_Icon"
     taskEdit.appendChild(taskEditImg);

      //-----delete-----//
      let taskDelete = document.createElement("div");
      taskDelete.classList.add("taskDelete")
      taskIcons.appendChild(taskDelete)
  
      let taskDeleteImg = document.createElement("img");
      taskDeleteImg.classList.add("taskEditImg");
      taskDeleteImg.src = "http://127.0.0.1:5500/src/img/delete-circle-outline.png";
      taskDeleteImg.alt = "Task_Delete_Icon"
      taskDelete.appendChild(taskDeleteImg);

      //-----event for creating tasks-----//
      

      taskPriority.style.backgroundColor = "white";

      taskPriority.addEventListener("click", function() {
        if (this.style.backgroundColor == "white") {
            this.style.backgroundColor = "lime";
        } else if (this.style.backgroundColor == "lime") {
            this.style.backgroundColor = "orange";
        } else if (this.style.backgroundColor == "orange") { 
            this.style.backgroundColor = "red";
        } else if (this.style.backgroundColor == "red") {
            this.style.backgroundColor = "white";
        }
    });
}


// -----this is code for making hovering preview of next priority colour, this is for the next 2 blocks of code, which include the mouseover and mouseout events.-----// 


// priorityBtn.addEventListener("mouseover", function() {
//     if (this.style.backgroundColor == "white") {
//         this.style.backgroundColor = "lime";
//     } else if (this.style.backgroundColor == "lime") {
//         this.style.backgroundColor = "orange";
//     } else if (this.style.backgroundColor == "orange") { 
//         this.style.backgroundColor = "red";
//     } else if (this.style.backgroundColor == "red") {
//         this.style.backgroundColor = "white";
//     }


// })

// priorityBtn.addEventListener("mouseout", function() {
//     if (this.style.backgroundColor == "white") {
//         this.style.backgroundColor = "red"
//     } else if (this.style.backgroundColor == "lime") {
//         this.style.backgroundColor = "white"
//     } else if (this.style.backgroundColor == "orange") {
//         this.style.backgroundColor = "lime"
//     } else if (this.style.backgroundColor == "red") {
//         this.style.backgroundColor = "orange" 
//     }
// })






