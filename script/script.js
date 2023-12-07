const todoArray = getSavedTodos() || []; 

document.addEventListener('keydown',(event)=>{
    if (event.key === 'Enter'){
        addTodo();
        displayTasks();
        saveTodos();
    }
})

document.querySelector('.js-add-to-do-button').addEventListener('click',()=>{
    addTodo();
    displayTasks(); 
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
            status:'incomplete'
        });
        
    }
    inputElement.value=''; 
    saveTodos();
}

function displayTasks(){
    const taskList = document.querySelector('.js-task-list');
    taskList.innerHTML = ''

    
    todoArray.forEach((task,index)=>{

    const taskDiv = document.createElement('div');
    taskDiv.className = 'individual-task'; 

    const checkbox = document.createElement('i');
    checkbox.className = (task.status === 'completed')?'fas fa-check-square checkbox-icon ' :'far fa-square checkbox-icon';
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

    if (task.status === 'completed'){
        taskDescription.classList.add('strikethrough');
    }


    const taskDelete = document.createElement('i');
    taskDelete.className = 'fa-solid fa-xmark close-icon'
    taskDelete.addEventListener('click',()=>deleteTask(index));

    taskDiv.appendChild(taskDescription);
    taskList.appendChild(taskDiv); 
    taskDiv.appendChild(taskDelete);
    saveTodos();
})
}

function deleteTask(index){
    todoArray.splice(index,1);

    displayTasks();
    saveTodos();
}

function toggleStatus(index) {
    todoArray[index].status = (todoArray[index].status === 'completed') ? 'incomplete' : 'completed';
    displayTasks();
    saveTodos();
}


function saveTodos(){
    localStorage.setItem('todos',JSON.stringify(todoArray));
}


function getSavedTodos(){
    const savedTodos = localStorage.getItem('todos');
    return JSON.parse(savedTodos);

}


const today = new Date();
const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
const month = today.toLocaleDateString('en-US', { month: 'long' });
const dayOfMonth = today.getDate();

const daySuffix = getDaySuffix(dayOfMonth);
document.getElementById('currentDate').innerHTML = `${dayOfWeek}, ${dayOfMonth}${daySuffix}`;
document.querySelector('.p-december').textContent = month;

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
