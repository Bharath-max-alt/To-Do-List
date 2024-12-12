// Function to show the second page (username input page) after button click
function showUsernamePage() {
    document.getElementById('welcomePage').style.display = 'none';
    document.getElementById('inputPage').style.display = 'block';
    document.querySelector('.add-btn').style.display = 'none'; // Hide + button
}

// Function to save the username
function saveUsername() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username); // Save username in local storage
    }
}



// Function to handle the submit button click and redirect to To-Do List page
function submitUsername() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username); // Save username in local storage
        document.getElementById('inputPage').style.display = 'none'; // Hide the input page
        document.getElementById('todoPage').style.display = 'block'; // Show the To-Do List page
        document.getElementById('welcomeTitle').textContent = `Welcome ${username}`; // Update welcome title
        document.querySelector('.add-btn').style.display = 'block'; // Show + button
    } else {
        alert('Please enter a valid username.');
    }
}

// Function for search operation (just an example)
function searchItem() {
    const searchQuery = document.getElementById('searchBox').value.toLowerCase();
    const todoItems = document.querySelectorAll('.todo-item');

    if (searchQuery) {
        let found = false;
        todoItems.forEach(item => {
            const itemText = item.querySelector('.item-container span').textContent.toLowerCase();
            if (itemText.includes(searchQuery)) {
                item.style.display = 'flex'; // Show the matching item
                found = true;
            } else {
                item.style.display = 'none'; // Hide non-matching items
            }
        });

        if (!found) {
            alert('No matching tasks found.');
        }
    } else {
        alert('Please enter a search term.');
        // Show all items if search query is empty
        todoItems.forEach(item => item.style.display = 'flex');
    }
}


// Select elements for adding a new list item
const addBtn = document.querySelector('.add-btn');
const addListContainer = document.querySelector('.add-list-container');
const addInput = document.querySelector('#addInput');

// Initially hide the + button
document.addEventListener('DOMContentLoaded', () => {
    addBtn.style.display = 'none'; // Hide the + button initially
});

// Toggle the add-list input and button when the + button is clicked
addBtn.addEventListener('click', () => {
    if (addListContainer.style.display === 'none' || !addListContainer.style.display) {
        addListContainer.style.display = 'block';
        addInput.focus(); // Focus on the input box
    } else {
        addListContainer.style.display = 'none';
    }
});


// Toggle the add list input box
function toggleInput() {
    const inputBox = document.querySelector('.add-list-container');
    inputBox.style.display = inputBox.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.add-btn');
    const todoList = document.getElementById('todoList');

    // Hide the + button initially
    addBtn.style.display = 'none';
    todoList.style.display = 'none'; // Hide the todo list container initially

    // Retrieve and display saved username and to-do list items
    const savedUsername = localStorage.getItem('username');
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    if (savedUsername) {
        document.getElementById('welcomePage').style.display = 'none';
        document.getElementById('inputPage').style.display = 'none';
        document.getElementById('todoPage').style.display = 'block';
        document.getElementById('welcomeTitle').textContent = `Welcome ${savedUsername}`;
        addBtn.style.display = 'block'; // Show the + button
        if (savedTodos.length > 0) {
            todoList.style.display = 'block';
            savedTodos.forEach(item => createTodoItem(item.text, item.completed));
        }
    }
});



// Function to create a todo item and add it to the list
function createTodoItem(text, completed = false) {
    const todoList = document.getElementById('todoList');

    // Create list item container
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    // Item text with checkbox inside
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-checkbox');
    checkbox.checked = completed; // Set checkbox status
    checkbox.addEventListener('change', () => {
        todoItem.classList.toggle('strikethrough');
        saveTodos(); // Save updated todos
    });

    const itemText = document.createElement('span');
    itemText.textContent = text;

    // Apply strikethrough if completed
    if (completed) {
        todoItem.classList.add('strikethrough');
    }

    // Append checkbox and text inside item container
    itemContainer.appendChild(checkbox);
    itemContainer.appendChild(itemText);

    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    // Edit button with icon
    const editBtn = document.createElement('button');
    editBtn.classList.add('icon-btn', 'edit-btn');
    editBtn.innerHTML = `<img src="https://img.icons8.com/ios-glyphs/30/pencil.png" alt="Edit">`;
    editBtn.addEventListener('click', () => {
        const newText = prompt('Edit your task:', itemText.textContent);
        if (newText) {
            itemText.textContent = newText;
            saveTodos(); // Save updated todos
        }
    });

    // Delete button with icon
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('icon-btn', 'delete-btn');
    deleteBtn.innerHTML = `<img src="https://img.icons8.com/ios-glyphs/30/trash.png" alt="Delete">`;
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this item?')) {
            todoItem.remove();
            saveTodos(); // Save updated todos
            if (todoList.children.length === 0) {
                todoList.style.display = 'none'; // Hide list if empty
            }
        }
    });

    // Append buttons to the buttons container
    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(deleteBtn);

    // Append everything to the todo item
    todoItem.appendChild(itemContainer);
    todoItem.appendChild(buttonsContainer);

    // Append the todo item to the list
    todoList.appendChild(todoItem);

  
    // Prepend the todo item to the list (display before the input box)
    todoList.insertBefore(todoItem, todoList.firstChild);

    // Scroll the newly added item into view
    todoItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Show the todo list container
    todoList.style.display = 'block';
}

// Save all to-do items to local storage
function saveTodos() {
    const todoItems = Array.from(document.querySelectorAll('.todo-item')).map(item => {
        return {
            text: item.querySelector('.item-container span').textContent,
            completed: item.querySelector('.todo-checkbox').checked
        };
    });
    localStorage.setItem('todos', JSON.stringify(todoItems));
}

// Save username and display the to-do list page
function submitUsername() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username); // Save username
        document.getElementById('inputPage').style.display = 'none'; // Hide input page
        document.getElementById('todoPage').style.display = 'block'; // Show to-do list page
        document.getElementById('welcomeTitle').textContent = `Welcome ${username}`;
        document.querySelector('.add-btn').style.display = 'block'; // Show + button
    } else {
        alert('Please enter a valid username.');
    }
}

// Add item to the list and save it
function addItem() {
    const input = document.getElementById('addInput');
    const newItemText = input.value;

    if (newItemText) {
        createTodoItem(newItemText); // Create a new to-do item
        saveTodos(); // Save updated todos
        input.value = ''; // Clear input field
    } else {
        alert('Please enter a task to add.');
    }
}

// Menu button toggle
// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select the menu button and menu options container
   const menuButton = document.getElementById('menuButton');
const menuOptions = document.getElementById('menuOptions');

// Use both click and touchstart for compatibility
menuButton.addEventListener('click', toggleMenu);
menuButton.addEventListener('touchstart', toggleMenu);

function toggleMenu(event) {
    event.preventDefault(); // Prevent unexpected behaviors
    menuOptions.style.display = menuOptions.style.display === 'block' ? 'none' : 'block';
}

    
    menuButton.addEventListener('pointerdown', () => {
        menuOptions.style.display = menuOptions.style.display === 'none' ? 'block' : 'none';
    });
    

    // Handle "Change Username" button
    const changeUsernameBtn = document.getElementById('changeUsername');
    if (changeUsernameBtn) {
        changeUsernameBtn.addEventListener('click', () => {
            localStorage.removeItem('username'); // Clear saved username
            localStorage.removeItem('todos'); // Clear saved todos
            location.reload(); // Reload the page to reset the app
        });
    }

    document.getElementById('createNewTodo').addEventListener('click', () => {
        if (confirm('Are you sure you want to create a new to-do list? This will delete all current tasks.')) {
            localStorage.removeItem('todos'); // Clear todos from local storage
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = ''; // Clear the DOM list
            todoList.style.display = 'none'; // Hide the list container
            alert('New to-do list created!');
        }
    });
    

    // Handle "Sort by Name" button
    const sortByNameBtn = document.getElementById('sortByName');
    if (sortByNameBtn) {
        sortByNameBtn.addEventListener('click', () => {
            const todoItems = Array.from(document.querySelectorAll('.todo-item'));
            todoItems.sort((a, b) =>
                a.querySelector('span').textContent.localeCompare(b.querySelector('span').textContent)
            );
            renderSortedItems(todoItems); // Render sorted items
        });
    }

    // Handle "Sort by Length" button
    const sortByLengthBtn = document.getElementById('sortByLength');
    if (sortByLengthBtn) {
        sortByLengthBtn.addEventListener('click', () => {
            const todoItems = Array.from(document.querySelectorAll('.todo-item'));
            todoItems.sort((a, b) => {
                return a.querySelector('span').textContent.length - b.querySelector('span').textContent.length;
            });
            renderSortedItems(todoItems); // Render sorted items
        });
    }

    // Handle "Change Theme" button
    const changeThemeBtn = document.getElementById('changeTheme');
    if (changeThemeBtn) {
        changeThemeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }
});

// Helper function to render sorted items
function renderSortedItems(sortedItems) {
    const todoList = document.getElementById('todoList');
    if (todoList) {
        todoList.innerHTML = ''; // Clear the current list
        sortedItems.forEach(item => todoList.appendChild(item)); // Append sorted items
    }
}


// Ensure + button is stable and the type box closes on scroll
document.addEventListener('DOMContentLoaded', () => {
    const addListContainer = document.querySelector('.add-list-container');
    const todoListContainer = document.getElementById('todoList');

    // Close the type box on scroll
    todoListContainer.addEventListener('scroll', () => {
        if (addListContainer.style.display === 'block') {
            addListContainer.style.display = 'none';
        }
    });
});

