// Sélecteurs DOM
const todoInput = document.querySelector(".todo-input"); // Champ de saisie pour ajouter une tâche
const todoButton = document.querySelector(".todo-button"); // Bouton pour ajouter une tâche
const todoList = document.querySelector(".todo-list"); // Liste des tâches
const filterOption = document.querySelector(".filter-todo"); // Menu de filtrage des tâches

// Écouteurs d'événements
document.addEventListener("DOMContentLoaded", getTodos); // Charger les tâches sauvegardées au démarrage
todoButton.addEventListener("click", addTodo); // Ajouter une tâche au clic sur le bouton
todoList.addEventListener("click", deleteCheck); // Supprimer ou compléter une tâche au clic sur les boutons correspondants
filterOption.addEventListener("input", filterTodo); // Filtrer les tâches lorsque l'option de filtrage change

/**
 * Fonction pour ajouter une nouvelle tâche à la liste.
 * @param {Event} event - L'événement de clic sur le bouton d'ajout
 */
function addTodo(event) {
    event.preventDefault(); // Empêcher le rechargement de la page lors de l'envoi du formulaire

    // Création d'un nouvel élément pour la tâche
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Création de l'élément <li> pour la tâche
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Ajouter la tâche au localStorage
    saveLocalTodos(todoInput.value);

    // Création du bouton pour marquer la tâche comme complétée
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Création du bouton pour supprimer la tâche
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Ajouter la tâche à la liste des tâches
    todoList.appendChild(todoDiv);
    todoInput.value = ""; // Réinitialiser le champ de saisie
}

/**
 * Fonction pour supprimer ou compléter une tâche.
 * @param {Event} e - L'événement de clic sur les boutons de tâche
 */
function deleteCheck(e) {
    const item = e.target;

    // Suppression d'une tâche
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo); // Supprimer la tâche du localStorage
        todo.addEventListener("transitionend", function () {
            todo.remove(); // Supprimer la tâche du DOM après l'animation
        });
    }

    // Marquage d'une tâche comme complétée
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

/**
 * Fonction pour filtrer les tâches en fonction de l'option sélectionnée.
 * @param {Event} e - L'événement de changement d'option de filtrage
 */
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

/**
 * Fonction pour sauvegarder une tâche dans le localStorage.
 * @param {string} todo - La tâche à sauvegarder
 */
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Fonction pour récupérer les tâches sauvegardées au démarrage.
 */
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        // Création d'un élément pour chaque tâche sauvegardée
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Création de l'élément <li> pour la tâche
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Création du bouton pour marquer la tâche comme complétée
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Création du bouton pour supprimer la tâche
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Ajouter la tâche à la liste des tâches
        todoList.appendChild(todoDiv);
    });
}

/**
 * Fonction pour supprimer une tâche du localStorage.
 * @param {HTMLElement} todo - L'élément de la tâche à supprimer
 */
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
