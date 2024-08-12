import "../css/style.css";

const taskContainer = document.getElementById("taskContainer");
const newTaskBtn = document.getElementById("newTaskBtn");
const dialog = document.getElementById("taskDialog");
const confirmBtn = document.getElementById("dialogConfirmBtn");
const cancelBtn = document.getElementById("dialogCancelBtn");
const taskNameInput = document.getElementById("dialogTaskName");
const taskPriorityInput = document.getElementById("dialogTaskPriority");

let userName;
let userPriority;

newTaskBtn.addEventListener("click", () => {
    dialog.style.display = "block";
    dialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault()
    dialog.close();
    createTask();
    dialog.style.display = "none";
    console.log("confirmBtnEvent  " + userName)
    console.log("confirmBtnEvent  " + userPriority)
})

cancelBtn.addEventListener("click", () => {
    dialog.style.display = "none";
    dialog.close()
})

function createTask() {

    userName = String(taskNameInput.value);
    userPriority = String(taskPriorityInput.value);

    //-----container for tasks-----//
    let task = document.createElement("div");
    task.classList.add("task");
    taskContainer.appendChild(task);

    let taskName = document.createElement("div");
    taskName.classList.add("taskName");
    taskName.innerHTML = userName;
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
    taskPriority.style.backgroundColor = "white";

    taskPriority.appendChild(taskPriorityImg);

    console.log("DOMevent  " + userName)
    console.log("DOMevent " + userPriority)

    if (userPriority === "default") {
        taskPriority.style.backgroundColor == "blue"
    } else if (userPriority === "Low") {
        taskPriority.style.backgroundColor = "lime"
    } else if (userPriority === "Medium") {
        taskPriority.style.backgroundColor = "orange"
    } else if (userPriority === "High") {
        taskPriority.style.backgroundColor = "red"
    }

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

      //-----event for priority of tasks-----//

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







