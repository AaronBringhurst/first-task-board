// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));

function readTasksFromStorage(){
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
        return JSON.parse(tasks);
    } else {
        localStorage.setItem('tasks', JSON.stringify([]));
        return [];
    }
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = new Date().getTime();
    const randomElement = Math.floor(Math.random() *100000);
    return `t=${timestamp}rng=${randomElement}`;
}


// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('card project-card draggable my-3').attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id);
    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');  
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }
    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);
    return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();

    const todoList = $('#todo-cards');
    todoList.empty();
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of tasks) {
        const taskCard = createTaskCard(task);
    if(task.status === 'to-do') {
        $('#todo-cards').append(taskCard);
    } else if(task.status === 'in-progress') {
        $('#in-progress-cards').append(taskCard);
    } else if(task.status === 'done') {
        $('#done-cards').append(taskCard);
    }

    }
    $('.draggable').draggable({
        opacity: 0.69,
        zIndex: 1000,
        helper: function (e) {
        const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
        return original.clone().css({
            width: original.outerWidth(),
        });
        },
    });
}

    
// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskName = $('#taskName').val();
    const taskDate = $('#taskDueDate').val();
    const taskDescription =$('#taskDescription').val();

    const newTask = {
        id: generateTaskId(),
        name: taskName,
        dueDate: taskDate,
        description: taskDescription,
        status: 'to-do',
    };
    const tasks = readTasksFromStorage();
    tasks.push(newTask);
    saveTasksToStorage(tasks);

    renderTaskList();

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(){
    const taskId = $(this).attr('data-task-id');
    let tasks = readTasksFromStorage();

    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToStorage(tasks);
    renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;

    for (let task of tasks) {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }
    saveTasksToStorage(tasks);
    renderTaskList();


}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function (){
    renderTaskList();
    $('#taskForm').on('submit', handleAddTask);
    $('body').on('click', '.delete', handleDeleteTask);

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop
    });

});
