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

export function Todo(title, description, dueDate, priority,notes) {
    // getters for the properties
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    // Setters for the properties
    const setNotes = (newNotes) => { notes = newNotes; };
    const setTitle = (newTitle) => { title = newTitle; };
    const setDescription = (newDescription) => { description = newDescription; };
    const setDueDate = (newDueDate) => { dueDate = newDueDate; };
    const setPriority = (newPriority) => { priority = newPriority; };
    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        getNotes,
        setNotes,
        setTitle,
        setDescription,
        setDueDate,
        setPriority
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

export function displayInfo(info) {


}

   