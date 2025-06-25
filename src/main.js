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

export function displayProject(info,todos) {
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
        
        column.appendChild(header);
       
        board.appendChild(column);
        function todoInProject(){
            
        }
        // Example: Load todos for this project and status
        const filteredTodos = todos.filter(todo => todo.getProject() === info && todo.getStatus().toLowerCase() === status.toLowerCase());
        filteredTodos.forEach(todo => {
            const task = document.createElement('div');
            task.className = 'task-card';

            task.innerHTML = `
                <h3>${todo.getTitle()}</h3>
                <p><strong>Description:</strong> ${todo.getDescription()}</p>
                <p><strong>Due Date:</strong> ${todo.getDueDate()}</p>
                <p><strong>Priority:</strong> ${todo.getPriority()}</p>
                <p><strong>Note:</strong> ${todo.getNotes()}</p>
                <p><strong>Note:</strong> ${todo.getNotes()}</p>
                <p><strong>Status:</strong>
                    <select class="status-select">
                        <option value="Backlog" ${todo.getStatus() === "Backlog" ? "selected" : ""}>Backlog</option>
                        <option value="In Progress" ${todo.getStatus() === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option value="Completed" ${todo.getStatus() === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                </p>
                <button class="edit-task">Edit</button>
                <button class="delete-task">Delete</button>
            `;

            task.querySelector('.status-select').addEventListener('change', (e) => {
                todo.setStatus(e.target.value);
                displayProject(info, todos); // Refresh the project display
            });
            task.querySelector('.edit-task').addEventListener('click', () => {
                const popup = createPopupTemplateTodo(true, todo);
                popup.show();
            });
            task.querySelector('.delete-task').addEventListener('click', () => {
                console.log('Delete task clicked:', todo.getTitle());
                const popup = document.createElement('div');
                popup.id = 'delete-confirm-popup';
                popup.className = 'popup';
                popup.classList.remove('hidden');
            
                popup.innerHTML = `
                    <div class="overlay"></div>
                    <div class="template-container">
                        <h2>Are you sure you want to delete this task?</h2>
                        <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
                            <button id="confirm-delete-task" style="background-color: #3882F6; color: white;">Yes</button>
                            <button id="cancel-delete-task">No</button>
                        </div>
                    </div>
                `;
            
                document.body.appendChild(popup);
    
    
                document.getElementById('confirm-delete-task').addEventListener('click', () => {
                    deleteTask(todos, todo);
                    popup.remove(); // Remove the popup after confirmation
                    
                });
            
                document.getElementById('cancel-delete-task').addEventListener('click', () => {
                    popup.remove(); // Remove the popup after confirmation
                });
            });

            column.appendChild(task);

        });
      

        
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
            <p><strong>Due Date:</strong> ${todo.getDueDate()}</p>
            <p><strong>Priority:</strong> ${todo.getPriority()}</p>
            <p><strong>Note:</strong> ${todo.getNotes()}</p>
                <p><strong>Status:</strong>
                    <select class="status-select">
                        <option value="Backlog" ${todo.getStatus() === "Backlog" ? "selected" : ""}>Backlog</option>
                        <option value="In Progress" ${todo.getStatus() === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option value="Completed" ${todo.getStatus() === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                </p>
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        `;

        card.querySelector('.status-select').addEventListener('change', (e) => {
            todo.setStatus(e.target.value);
            
 
        });

        card.querySelector('.edit-task').addEventListener('click', () => {
            const popup = createPopupTemplateTodo(true, todo);
            popup.show();
        });
        card.querySelector('.delete-task').addEventListener('click', () => {
            console.log('Delete task clicked:', todo.getTitle());
            const popup = document.createElement('div');
            popup.id = 'delete-confirm-popup';
            popup.className = 'popup';
            popup.classList.remove('hidden');
        
            popup.innerHTML = `
                <div class="overlay"></div>
                <div class="template-container">
                    <h2>Are you sure you want to delete this task?</h2>
                    <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
                        <button id="confirm-delete" style="background-color: #3882F6; color: white;">Yes</button>
                        <button id="cancel-delete">No</button>
                    </div>
                </div>
            `;
        
            document.body.appendChild(popup);


            document.getElementById('confirm-delete').addEventListener('click', () => {
                deleteTask(todos, todo);
                popup.remove(); // Remove the popup after confirmation
                
            });
        
            document.getElementById('cancel-delete').addEventListener('click', () => {
                popup.remove(); // Remove the popup after confirmation
            });
          
        });

        mainContent.appendChild(card);
    });
}


export function deleteTask(todos, todoToDelete) {
    const index = todos.findIndex(todo => todo.getId() === todoToDelete.getId());
    if (index !== -1) {
        todos.splice(index, 1);
        displayTask(todos); // Refresh the displayed tasks
    }
}
