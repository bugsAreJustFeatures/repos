import "../css/style.css";

const taskContainer = document.getElementById("taskContainer");
const newTaskBtn = document.getElementById("newTaskBtn");
const dialog = document.getElementById("taskDialog");
const editDialog = document.getElementById("editDialog")
const confirmBtn = document.getElementById("dialogConfirmBtn");
const editConfirmBtn = document.getElementById("editConfirmBtn");
const cancelBtn = document.getElementById("dialogCancelBtn");
const editCancelBtn = document.getElementById("editCancelBtn")
const taskNameInput = document.getElementById("dialogTaskName");  
const editNameInput = document.getElementById("editTaskName");
const taskPriorityInput = document.getElementById("dialogTaskPriority");
const mainContent = document.getElementById("mainContent");
const rightSideOverlay = document.getElementById("rightSideOverlay");
const dialogForm = document.getElementById("dialogFormOne");
const dialogTaskDate = document.getElementById("dialogTaskDate");

let userName;
let userPriority;
let taskNameElement;

newTaskBtn.addEventListener("click", () => {
    dialog.showModal();
    taskNameInput.value = "";
});

dialogForm.addEventListener("submit", function(event) {
    event.preventDefault()
    dialog.close()
    createTask();
})

editConfirmBtn.addEventListener("click", (event) => {
    event.preventDefault()
    editDialog.close()
    
    if (taskNameElement) {
        let inputText = editNameInput.value;

        if (inputText.length > 28) {
            taskNameElement.innerHTML = inputText.substring(0, 28) + "...";
        } else {
            taskNameElement.innerHTML = inputText
        }
    }
})

cancelBtn.addEventListener("click", () => {
    dialog.close()
})

editCancelBtn.addEventListener("click", () => {
    editDialog.close()
})

createTask()
function createTask() {

    userName = String(taskNameInput.value);
    userPriority = String(taskPriorityInput.value);

    //-----container for tasks-----//
    let task = document.createElement("div");
    task.classList.add("task");
    taskContainer.appendChild(task);

    task.addEventListener("click", function() {
        rightSideOverlay.remove()
        mainContent.style.backgroundColor = "white";
        
        // -----left-side-----//
        let leftHalf = document.createElement("div");
        leftHalf.id = "leftHalf";
        mainContent.appendChild(leftHalf)

        let notesHeader = document.createElement("h3")
        notesHeader.id = "notesHeader";
        notesHeader.innerHTML = "My Notes"
        leftHalf.appendChild(notesHeader)

        let noteContainer = document.createElement("div");
        let note = document.createElement("textarea");
        note.id = "note"
        note.placeholder = "Add Notes Here"
        noteContainer.appendChild(note)
        leftHalf.appendChild(noteContainer)

        //-----right-side-----//
        let rightHalf = document.createElement("div");
        rightHalf.id = "rightHalf";
        rightHalf.appendChild(dateContainer);
        mainContent.appendChild(rightHalf);

        let checklist = document.createElement("div");
        checklist.id = "checklist";
        rightHalf.appendChild(checklist)

        let checklistHeader = document.createElement("h3");
        checklistHeader.id = "checklistHeader"
        checklistHeader.innerHTML = "Checklist"
        checklist.appendChild(checklistHeader);
        
        let checklistAdder = document.createElement("div");
        checklistAdder.id = "checklistAdder";
        checklistHeader.appendChild(checklistAdder);

        let checklistContainer = document.createElement("ul")
        checklistContainer.id = "checklistContainer";
        checklist.appendChild(checklistContainer);

        let checklistInput = document.createElement("input");
        checklistInput.id = "checklistInput";
        checklistInput.placeholder = "Add Task Here"
        checklistHeader.appendChild(checklistInput);

        let checklistBtn = document.createElement("button");
        checklistBtn.id = "checklistBtn";
        checklistBtn.classList.add("btn");
        checklistBtn.innerHTML = "Add";
        checklistBtn.addEventListener("click", checklistAdd)
        checklistAdder.appendChild(checklistBtn);

        function checklistAdd() {
            
            let item = document.getElementById("checklistInput");
            let itemText = item.value.trim();

            if (itemText !== "") {
                let list = document.createElement("li");
                list.id = "list";

                let checkbox = document.createElement("input");
                checkbox.id = "checkbox";
                checkbox.type = "checkbox";

                let label = document.createElement("label");
                label.id = "myLabel";
                label.innerHTML = itemText;

                list.appendChild(checkbox)
                list.appendChild(label)

                document.getElementById("checklistContainer").appendChild(list);

                item.value = "";
            }
        }
    })

    let dateContainer = document.createElement("div");
    dateContainer.id = "dateContainer";
    
    let date = document.createElement("p");
    date.id = "date"
    date.innerHTML = dialogTaskDate.value;
    dateContainer.appendChild(date)

    let taskName = document.createElement("div");
    taskName.classList.add("taskName");
    taskName.innerHTML = userName;
    if (userName.length > 28) {
        taskName.innerHTML = (userName.substring(0, 28) + "...")
    } 
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

    // conditional for the priority colour when making task //
    if (userPriority === "default") {
        taskPriority.style.backgroundColor == "white"
    } else if (userPriority === "Low") {
        taskPriority.style.backgroundColor = "lime"
    } else if (userPriority === "Medium") {
        taskPriority.style.backgroundColor = "orange"
    } else if (userPriority === "High") {
        taskPriority.style.backgroundColor = "red"
    }

     //-----edit-----//
     let taskEdit = document.createElement("div");
     taskEdit.classList.add("taskEdit");
     taskIcons.appendChild(taskEdit);

     taskEdit.addEventListener("click", function() {
        editDialog.showModal()
        editNameInput.value = "";
        taskNameElement = this.closest(".task").querySelector(".taskName");
    })    
 
     let taskEditImg = document.createElement("img");
     taskEditImg.classList.add("taskEditImg");
     taskEditImg.src = "http://127.0.0.1:5500/src/img/pencil-circle-outline.png";
     taskEditImg.alt = "Task_Edit_Icon"
     taskEdit.appendChild(taskEditImg);


      //-----delete-----//
      let taskDelete = document.createElement("div");
      taskDelete.classList.add("taskDelete")
      taskIcons.appendChild(taskDelete)

      taskDelete.addEventListener("click", function() {
        taskContainer.removeChild(task)
      })
  
      let taskDeleteImg = document.createElement("img");
      taskDeleteImg.classList.add("taskEditImg");
      taskDeleteImg.src = "http://127.0.0.1:5500/src/img/delete-circle-outline.png";
      taskDeleteImg.alt = "Task_Delete_Icon"
      taskDelete.appendChild(taskDeleteImg);

      //-----event for icons-----//

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

};