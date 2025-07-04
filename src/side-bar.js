import "./styles/side-bar.css";
import { displayProject, Todo, displayTask } from "./main.js"; // Assuming displayProject is defined in main.js

export const todosNames = [];
//localStorage.clear();

const test = loadLocalStorageProjects();
const projectNames = loadLocalStorageProjects();
const projects = ['+ Add a new project','🗑️ Delete  project', ...projectNames];

export function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';

    const section1 = document.createElement('div');
    const section2 = document.createElement('div');
    const section3 = document.createElement('div');

    section1.className = 'section1';
    section2.className = 'section2';
    section3.className = 'section3';

    // Navigation links
    const navList = document.createElement('ul');
    const links = ['Home', 'About'];
    links.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        navList.appendChild(li);
    });
    section1.appendChild(navList);

    // My Projects button
    const myProjects = document.createElement('button');
    myProjects.textContent = 'My Projects';
    section2.appendChild(myProjects);

    // Project list (hidden initially)
    const projectList = document.createElement('ul');
    projectList.className = 'project-list';

    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project;
        if (li.textContent === '+ Add a new project') {
            li.classList.add('add-project'); // Add class for targeting


        }
        else if (li.textContent === '🗑️ Delete  project') {
            li.classList.add('delete-project'); // Add class for targeting
            li.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-project')) {
                    const popup = document.getElementById('template-popup-delete');
                    popup.classList.remove('hidden');
        
                }
            });
        }
        else {
            li.addEventListener('click', () => {
                displayProject(li.textContent,todosNames);
            });
        }
        projectList.appendChild(li);
        // Add project name to the array
    });
    projectList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-project')) {
            const popup = document.getElementById('template-popup-project');
            popup.classList.remove('hidden');

        }
    });


    section2.appendChild(projectList); // Add below button

    // Toggle list visibility on click
    myProjects.addEventListener('click', () => {
        projectList.style.display =
            projectList.style.display === 'none' ? 'block' : 'none';
    });

    // My Todos button
    const myTodos = document.createElement('button');
    myTodos.textContent = 'My Todos';

    myTodos.addEventListener('click', (e) => {
        displayTask(todosNames)
    }
    );

    section3.appendChild(myTodos);

    const todotList = document.createElement('ul');
    todotList.className = 'todo-list';
    const todos = ['+ Add a new todo'];
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo;
        li.classList.add('add-todo'); // Add class for targeting
        todotList.appendChild(li);
    });
    todotList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-todo')) {
            const popup = document.getElementById('template-popup');
            popup.classList.remove('hidden');
        }
    });

    section3.appendChild(todotList); // Add below button

    myTodos.addEventListener('click', () => {
        todotList.style.display =
            todotList.style.display === 'none' ? 'block' : 'none';
    });


    // Append all sections to sidebar
    sidebar.appendChild(section1);
    sidebar.appendChild(section2);
    sidebar.appendChild(section3);

    return sidebar;
}

export function deleteProjectTemplatePopup() {
    const popup = document.createElement('div');
    popup.id = 'template-popup-delete';
    popup.className = 'popup hidden'; // ensure it's styled properly

    popup.innerHTML = `<div class="overlay" id="overlay"></div>
      <div class="template-container">
        <h2>Select the project to be deleted</h2>
        <form id="delete-form">
          <label for="project">Project:</label>
          <select id="project" name="project" required></select><br><br>


          <button type="submit" id="sub-todo">Delete</button>
          <button type="button" id="close-template">Close</button>
        </form>
      </div>
    `;

    document.body.appendChild(popup);

    const form = popup.querySelector('#delete-form');
    const projectSelect = form.project;

    function populateProjectDropdown() {
        projectSelect.innerHTML = '';
        projectNames.forEach(project => {
            const option = document.createElement('option');
            option.value = project;
            option.textContent = project;
            projectSelect.appendChild(option);
        });
    }

    populateProjectDropdown();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const deletedProject = form.project.value;
        projectList.appendChild(li);


        form.project.value = existingTodo.getProject();
    
    
        projectNames.push(projectName);
        saveLocalStorageProjects();


    });
 

}

export function createPopupTemplateTodo(edit = false, existingTodo = null) {

    const popup = document.createElement('div');
    popup.id = 'template-popup';
    popup.className = 'popup hidden'; // ensure it's styled properly

    popup.innerHTML = `
      <div class="overlay" id="overlay"></div>
      <div class="template-container">
        <h2>${edit ? 'Edit Task' : 'Add New Task'}</h2>
        <form id="details-form">
          <label for="project">Project:</label>
          <select id="project" name="project" required></select><br><br>

          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required><br><br>

          <label for="description">Description:</label>
          <input type="text" id="description" name="description" required><br><br>

          <label for="dueDate">Due Date:</label>
          <input type="date" id="dueDate" name="dueDate" ><br><br>

          <label for="priority">Priority:</label>
          <select id="priority" name="priority" required>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select><br><br>

          <label for="status">Status:</label>
          <select id="status" name="status" required>
            <option value="Backlog">Backlog</option>
            <option value="In progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select><br><br>

          <label for="note">Note:</label><br><br>
          <textarea id="note" name="note" rows="4" cols="30" placeholder="Write your note here..."></textarea><br><br>

          <button type="submit" id="sub-todo">${edit ? 'Edit' : 'Add Task'}</button>
          <button type="button" id="close-template">Close</button>
        </form>
      </div>
    `;

    document.body.appendChild(popup);

    const form = popup.querySelector('#details-form');
    const projectSelect = form.project;

    function populateProjectDropdown() {
        projectSelect.innerHTML = '';
        projectNames.forEach(project => {
            const option = document.createElement('option');
            option.value = project;
            option.textContent = project;
            projectSelect.appendChild(option);
        });
    }

    populateProjectDropdown();

    // Pre-fill values if editing
    if (edit && existingTodo) {
        form.title.value = existingTodo.getTitle();
        form.description.value = existingTodo.getDescription();
        form.dueDate.value = existingTodo.getDueDate();
        form.priority.value = existingTodo.getPriority();
        form.note.value = existingTodo.getNotes();
        form.status.value = existingTodo.getStatus();
        form.project.value = existingTodo.getProject();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = form.title.value;
        const description = form.description.value;
        const dueDate = form.dueDate.value;
        const priority = form.priority.value;
        const note = form.note.value;
        const status = form.status.value;
        const project = form.project.value;

        if (edit && existingTodo) {
            existingTodo.setTitle(title);
            existingTodo.setDescription(description);
            existingTodo.setDueDate(dueDate);
            existingTodo.setPriority(priority);
            existingTodo.setNotes(note);
            existingTodo.setStatus(status);
            existingTodo.setProject(project);
        } else {
            const newTodo = Todo(title, description, dueDate, priority, note, status, project,todosNames.length + 1);
            todosNames.push(newTodo);
        }

        popup.classList.add('hidden');
        form.reset();
        displayTask(todosNames);
    };

    form.addEventListener('submit', handleSubmit);

    popup.querySelector('#close-template').addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    popup.querySelector('#overlay').addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    return {
        show: () => popup.classList.remove('hidden'),
        hide: () => popup.classList.add('hidden')
    };

}




export function createPopupTemplateProject() {
    const popup = document.createElement('div');
    popup.id = 'template-popup-project';
    popup.className = 'hidden';

    popup.innerHTML = `
      <div class="overlay" id="overlay"></div>
      <div class="template-container">
        <h2>Please write the project name</h2>
        <form id="details-form">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required><br><br>
          <button type="submit" id="sub-project">Add</button>
          <button type="button" id="close-template-project">Close</button>
        </form>
      </div>
    `;

    document.body.appendChild(popup);

    const form = popup.querySelector('#details-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newProject = document.getElementById('name');
        const projectList = document.querySelector('.project-list');
        const projectDropdown = document.querySelector('#project');

        if (newProject && newProject.value.trim() !== '') {
            const projectName = newProject.value.trim();

            const li = document.createElement('li');
            li.textContent = projectName;
            li.addEventListener('click', () => {
                displayProject(li.textContent,todosNames);
            });
            projectList.appendChild(li);




            projectNames.push(projectName);
            saveLocalStorageProjects();

            // Add to dropdown if already created
            if (projectDropdown) {
                const option = document.createElement('option');
                option.value = projectName;
                option.textContent = projectName;
                projectDropdown.appendChild(option);
            }

            newProject.value = '';
            popup.classList.add('hidden');
        }
    });

    popup.querySelector('#close-template-project').addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    popup.querySelector('#overlay').addEventListener('click', () => {
        popup.classList.add('hidden');
    });
}

export function saveLocalStorageProjects() {
    localStorage.setItem('projects', JSON.stringify(projectNames));
}

export function loadLocalStorageProjects() {
    
    const stored = localStorage.getItem('projects');
    if (!stored) return ['Default', 'Work', 'Personal', 'Education']; // If nothing was stored yet
    return JSON.parse(stored); // Converts JSON string back to array
    
}