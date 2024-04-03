// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const projectDisplayEl = $('#project-display');
const taskFormEl = $('#taskForm');
const taskNameInputEl = $('#taskName');
const taskTypeInputEl = $('#taskDescription');
const taskDateInputEl = $('#taskDueDate');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = new Date().getTime();
    const randomElement = Math.floor(Math.random() *100000);
    return `t=${timestamp}rng=${randomElement}`;
}


// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('card project-card draggable my-3').attr('data-project-id', project.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(project.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardType = $('<p>').addClass('card-text').text(project.type);
  const cardDueDate = $('<p>').addClass('card-text').text(project.dueDate);
  const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete').attr('data-project-id', project.id);
  cardDeleteBtn.on('click', handleDeleteProject);
  if (project.dueDate && project.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(project.dueDate, 'DD/MM/YYYY');
    if (now.isSame(taskDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');  
      } else if (now.isAfter(taskDueDate)) {
        taskCard.addClass('bg-danger text-white');
        cardDeleteBtn.addClass('border-light');
      }
    }
    cardBody.append(cardType, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);
    return taskCard;
}
// Todo: create a function to render the task list and make cards draggable

function readTasksFromStorage() {
    let taskz = localStorage.getItem('taskz');
    if (taskz) {
      return JSON.parse(taskz);
    } else {
      localStorage.setItem('taskz', JSON.stringify([]));
      return [];
    }
  }
    function saveProjectsToStorage(taskz) {
      localStorage.setItem('taskz', JSON.stringify(taskz));
    }

$('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
        helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });

function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
console.log(generateTaskId());