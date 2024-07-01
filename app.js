document.addEventListener('DOMContentLoaded', loadProjects); 

function addProject() { // Função para "lançar" um novo Projeto
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!projectName) {
        alert("Por favor, insira o nome do projeto.");
        return;
    }

    const project = {
        name: projectName,
        description: projectDescription,
        startDate: startDate,
        endDate: endDate
    };

    console.log("Adding project:", project);

    saveProject(project);
    displayProject(project);

    document.getElementById('projectName').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
}

function saveProject(project) { // Função que salva o Projeto lançado
    let projects = JSON.parse(localStorage.getItem('projects')) || []; // localStorage está em todas as funções, pois ele permite o salvamento local dos Projetos já lançados
    projects.push(project);
    console.log("Saving projects:", projects);
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjects() { // Função que carrega o Projeto já lançado
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    console.log("Loading projects:", projects);
    projects.forEach(displayProject);
}

function displayProject(project) { // Mostrador de projetos já lançados
    const projectList = document.getElementById('projectList');
    const projectItem = document.createElement('li');
    projectItem.classList.add('project-item');
    projectItem.textContent = project.name;

    const projectDetails = document.createElement('div');
    projectDetails.classList.add('project-details');
    projectDetails.innerHTML = `
        <strong>Descrição:</strong> ${project.description}<br>
        <strong>Data de Início:</strong> ${project.startDate}<br>
        <strong>Data de Término:</strong> ${project.endDate}
    `;
    projectDetails.style.display = 'none';

    projectItem.appendChild(projectDetails);

    projectItem.onclick = function () {
        projectDetails.style.display = projectDetails.style.display === 'none' ? 'block' : 'none';
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.onclick = function () {
        deleteProject(project);
        projectList.removeChild(projectItem);
    };

    projectItem.appendChild(deleteButton);
    projectList.appendChild(projectItem);
}

function deleteProject(projectToDelete) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects = projects.filter(project => project.name !== projectToDelete.name || project.startDate !== projectToDelete.startDate);
    console.log("Deleting project:", projectToDelete);
    localStorage.setItem('projects', JSON.stringify(projects));
}
