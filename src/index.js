import "./styles/index.css";
import "./styles/main.css";
import { createSidebar, createPopupTemplateTodo,createPopupTemplateProject } from "./side-bar.js";
import { createHeader, createMainContent } from "./main.js";

const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

const sidebar = createSidebar();
createPopupTemplateTodo();
createPopupTemplateProject();

const main = document.createElement('div');
main.className = 'main';

container.appendChild(sidebar);
container.appendChild(main);

createHeader(main);
createMainContent(main);
