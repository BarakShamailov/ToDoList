import "./styles/main.css";


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

export function Todo(title, description, dueDate, priority,notes, status) {
    // getters for the properties
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    const getStatus = () => status; // Default status is 'backlog'

    // Setters for the properties
    const setNotes = (newNotes) => { notes = newNotes; };
    const setTitle = (newTitle) => { title = newTitle; };
    const setDescription = (newDescription) => { description = newDescription; };
    const setDueDate = (newDueDate) => { dueDate = newDueDate; };
    const setPriority = (newPriority) => { priority = newPriority; };
    const setStatus = (newStatus) => { status = newStatus; };
    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        getNotes,
        setNotes,
        getStatus,
        setTitle,
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

export function displayTask (todo) {
    const mainContent = document.querySelector('.content');
    mainContent.innerHTML = ''; // Clear previous content

    const status = todo.getStatus(); // Make sure `getStatus()` exists in your `Todo` factory
    

    const card = document.createElement('div');
    card.className = 'task-card';

    // Task content
    card.innerHTML = `
        <h3>${todo.getTitle()}</h3>
        <p><strong>Description:</strong> ${todo.getDescription()}</p>
        <p><strong>Due:</strong> ${todo.getDueDate()}</p>
        <p><strong>Priority:</strong> ${todo.getPriority()}</p>
        <p><strong>Note:</strong> ${todo.getNotes()}</p>
        <button class="edit-task">Edit</button>
    `;

    // Add edit logic
    card.querySelector('.edit-task').addEventListener('click', () => {
        const newTitle = prompt('Edit title:', todo.getTitle());
        const newDescription = prompt('Edit description:', todo.getDescription());
        const newDueDate = prompt('Edit due date:', todo.getDueDate());
        const newPriority = prompt('Edit priority (low/medium/high):', todo.getPriority());
        const newNote = prompt('Edit note:', todo.getNotes());

        if (newTitle) todo.setTitle(newTitle);
        if (newDescription) todo.setDescription(newDescription);
        if (newDueDate) todo.setDueDate(newDueDate);
        if (newPriority) todo.setPriority(newPriority);
        if (newNote) todo.setNotes(newNote);

        // Refresh UI
        card.innerHTML = `
            <h4>${todo.getTitle()}</h4>
            <p><strong>Description:</strong> ${todo.getDescription()}</p>
            <p><strong>Due:</strong> ${todo.getDueDate()}</p>
            <p><strong>Priority:</strong> ${todo.getPriority()}</p>
            <p><strong>Note:</strong> ${todo.getNotes()}</p>
            <button class="edit-task">Edit</button>
        `;

        // Reattach edit event listener
        card.querySelector('.edit-task').addEventListener('click', arguments.callee);
    });

    mainContent.appendChild(card);
}


