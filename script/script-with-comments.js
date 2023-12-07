const todoArray = getSavedTodos() || []; // Load todos from localStorage on page load

document.addEventListener('keydown',(event)=>{
    // console.log('keydown:',event.key);
    if (event.key === 'Enter'){
        addTodo();
        displayTasks();
        saveTodos();
    }
})

document.querySelector('.js-add-to-do-button').addEventListener('click',()=>{
    addTodo();
    displayTasks(); //after adding a task,update the displayed tasks list
    saveTodos();

})

displayTasks();

function addTodo(){
    const inputElement = document.querySelector('.js-text-input');
    const emptyTask = document.querySelector('.js-empty-task-message');
    console.log(inputElement);
    const task = inputElement.value;
    console.log("task:",task);

    if (task === ''){
        emptyTask.textContent = 'Enter a task!';

    }else{
        emptyTask.textContent = ''
        todoArray.push({  
            task: task,
            status:'incomplete' //set the default status to incomplete
        });
        
    }
    inputElement.value=''; //clear the input after the task has been added
    saveTodos();
}

function displayTasks(){
    const taskList = document.querySelector('.js-task-list');
    taskList.innerHTML = ''

    //iterate over each task in the todoArray 
    todoArray.forEach((task,index)=>{

    const taskDiv = document.createElement('div');
    taskDiv.className = 'individual-task'; // Set the class for styling purposes

    const checkbox = document.createElement('i');
    checkbox.className = (task.status === 'completed')?'fas fa-check-square checkbox-icon ' :'far fa-square checkbox-icon';
    // Add color for completed checkboxes
    if (task.status === 'completed') {
        checkbox.style.color = '#666464';
    }
    console.log('i:',index)
    checkbox.addEventListener('click',()=>toggleStatus(index));
    taskDiv.appendChild(checkbox);
    console.log(taskDiv.appendChild(checkbox))

    
    const taskDescription = document.createElement('div');
    taskDescription.className = 'text';
    taskDescription.textContent = task.task 
    // Check the status of the task and add appropriate styles
    if (task.status === 'completed'){
        taskDescription.classList.add('strikethrough'); //adds the class strikethrough to the element
    }


    const taskDelete = document.createElement('i');
    taskDelete.className = 'fa-solid fa-xmark close-icon'
    taskDelete.addEventListener('click',()=>deleteTask(index));

    taskDiv.appendChild(taskDescription);
    taskList.appendChild(taskDiv); //adds the checkbox to the div
    taskDiv.appendChild(taskDelete);
    saveTodos();
})
}

function deleteTask(index){
    todoArray.splice(index,1);//index and the number of tasks to delete
    // console.log('Array after deleting',todoArray)
    displayTasks();
    saveTodos();
}

function toggleStatus(index) {
    // Toggle the status between 'completed' and 'incomplete'
    todoArray[index].status = (todoArray[index].status === 'completed') ? 'incomplete' : 'completed';
    displayTasks(); // After toggling status, update the displayed tasks
    saveTodos();
}


function saveTodos(){
    //saving in local storage
    localStorage.setItem('todos',JSON.stringify(todoArray));
}


function getSavedTodos(){
    //retrieving from local storage
    const savedTodos = localStorage.getItem('todos');
    return JSON.parse(savedTodos);

}

// Get the current date
const today = new Date();

// Get day, date, and month
const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
const dayOfMonth = today.getDate();

// Get the suffix for the day
const daySuffix = getDaySuffix(dayOfMonth);

// Update the HTML content with the current date
document.getElementById('currentDate').innerHTML = `${dayOfWeek}, ${dayOfMonth}${daySuffix}`;

// Function to get the suffix for the day
function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return "th";
    }
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}


// const today = new Date();
// const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
// const month = today.toLocaleDateString('en-US', { month: 'long' });
// const dayOfMonth = today.getDate();
// const year = today.getFullYear();

// const daySuffix = getDaySuffix(dayOfMonth);
// document.getElementById('currentDate').innerHTML = `${dayOfWeek}, ${month} ${dayOfMonth}${daySuffix}, ${year}`;
// document.querySelector('.p-december').textContent = month;

// function getDaySuffix(day) {
//     if (day >= 11 && day <= 13) {
//         return "th";
//     }
//     switch (day % 10) {
//         case 1:
//             return "st";
//         case 2:
//             return "nd";
//         case 3:
//             return "rd";
//         default:
//             return "th";
//     }
// }
