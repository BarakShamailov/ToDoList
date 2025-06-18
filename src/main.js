import "./styles/main.css";
import {createPopupTemplateTodo} from "./side-bar.js";



export function createHeader(main) {
    const header = document.createElement('header');
    header.className = 'header';

    const title = document.createElement('h1');
    title.textContent = 'Task Me';

    header.appendChild(title);
    main.appendChild(header);
}

export function createMainContent(main) {
    const content = document.createElement('div');
    content.className = 'content';
    main.appendChild(content);
}

export function Todo(title, description, dueDate, priority, notes, status, project, id) {
    // getters for the properties
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    const getStatus = () => status;
    const getProject = () => project;
    const getId = () => id;

    // Setters for the properties
    const setNotes = (newNotes) => { notes = newNotes; };
    const setTitle = (newTitle) => { title = newTitle; };
    const setDescription = (newDescription) => { description = newDescription; };
    const setDueDate = (newDueDate) => { dueDate = newDueDate; };
    const setPriority = (newPriority) => { priority = newPriority; };
    const setStatus = (newStatus) => { status = newStatus; };
    const setProject = (newProject) => { project = newProject; };
    const setId = (newId) => { id = newId; };
    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        getNotes,
        setNotes,
        getStatus,
        getProject,
        getId,
        setId,
        setTitle,
        setProject,
        setDescription,
        setDueDate,
        setPriority,
        setStatus
    };
};

export function Project(name, todos = []) {
    // getters for the properties
    const getName = () => name;
    const getTodos = () => todos;
    // Setters for the properties
    const setName = (newName) => { name = newName; };
    const addTodo = (todo) => { todos.push(todo); };
    const removeTodo = (todo) => { todos = todos.filter(t => t !== todo); };
    return {
        getName,
        getTodos,
        setName,
        addTodo,
        removeTodo
    };
}

export function displayProject(info) {
    const mainContent = document.querySelector('.content');
    mainContent.innerHTML = ''; // Clear previous content

    const board = document.createElement('div');
    board.className = 'project-board';
    const projectHeader = document.createElement('div');
    projectHeader.className = 'project-header';
    const projectName = document.createElement('h2');
    projectName.textContent = info; // Set the project name
    projectHeader.appendChild(projectName);
    mainContent.appendChild(projectHeader);


    const statuses = ['Backlog', 'In Progress', 'Completed'];

    statuses.forEach(status => {
        const column = document.createElement('div');
        column.className = 'column';
        column.dataset.status = status.toLowerCase().replace(' ', '-');

        const header = document.createElement('h3');
        header.textContent = status;

        const list = document.createElement('ul');
        list.className = `todo-list ${status.toLowerCase().replace(' ', '-')}-list`;

        // Example: Load todos for this project and status
        /*const todos = getTodosForProjectAndStatus(projectName, status);
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title; // or format as needed
            list.appendChild(li);
        });*/

        column.appendChild(header);
        column.appendChild(list);
        board.appendChild(column);
    });

    mainContent.appendChild(board);

}

export function displayTask(todos) {
    const mainContent = document.querySelector('.content');
    mainContent.innerHTML = ''; // Clear previous content

    if (todos.length === 0) return;

    todos.forEach(todo => {
        const card = document.createElement('div');
        card.className = 'task-card';

        card.innerHTML = `
            <h3>${todo.getTitle()}</h3>
            <p><strong>Project:</strong> ${todo.getProject()}</p>
            <p><strong>Description:</strong> ${todo.getDescription()}</p>
            <p><strong>Due:</strong> ${todo.getDueDate()}</p>
            <p><strong>Priority:</strong> ${todo.getPriority()}</p>
            <p><strong>Note:</strong> ${todo.getNotes()}</p>
            <p><strong>Status:</strong> ${todo.getStatus()}</p>
            <button class="edit-task">Edit</button>
        `;

        card.querySelector('.edit-task').addEventListener('click', () => {
            const popup = createPopupTemplateTodo(true, todo);
            popup.show();
        });

        mainContent.appendChild(card);
    });
}

