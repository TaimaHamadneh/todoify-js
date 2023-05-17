// Define the Task object using prototypes
function Task(description, dueDate, priority) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
}

// Define the array to store the tasks
const taskList = [];

// Require the readline module to read input from the user
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('***************************');
    console.log('Welcome to JS to-do list app');
    console.log('***************************');
    console.log('Select an action:');
    console.log('1) Add a new task');
    console.log('2) List all tasks');
    console.log('3) List completed tasks');
    console.log('4) Mark a task as completed');
    console.log('5) Delete a task');
    console.log('6) Sort tasks by due date');
    console.log('7) Sort tasks by priority');
    console.log('8) Clear all tasks');
    console.log('9) Exit');
    console.log('***************************');
}

function handleChoice(choice) {
    switch (choice) {
        case '1':
            // Ask the user for task details
            rl.question('Enter task description: ', function (description) {
                rl.question('Enter due date (YYYY-MM-DD): ', function (dueDate) {
                    rl.question('Enter priority (1-5): ', function (priority) {
                        // Create a new Task object and add it to the taskList array
                        const task = new Task(description, dueDate, priority);
                        taskList.push(task);
                        console.log('Task added!');
                        showMenu();
                    });
                });
            });
            break;
        case '2':
            // List all tasks
            console.log('All tasks:');
            taskList.forEach(function (task) {
                console.log('* ' + task.description + ' due: ' + task.dueDate + ', priority: ' + task.priority + ', completed: ' + task.completed );
            });
            showMenu();
            break;
        case '3':
            // List completed tasks
            console.log('Completed tasks:');
            const completedTasks = taskList.filter(function (task) {
                return task.completed === true;
            });
            completedTasks.forEach(function (task) {
                console.log('* ' + task.description + ' due: ' + task.dueDate + ', priority: ' + task.priority );
            });
            showMenu();
            break;
        case '4':
            // Mark a task as completed
            rl.question('Enter the task index to mark as completed (start from 1): ', function (index) {
                // Find the task in the array and update its status
                if (index >= 0 && index < taskList.length) {
                    taskList[index-1].completed = true;
                    console.log('Task marked as completed!');
                } else {
                    console.log('Invalid task index.');
                }
                showMenu();
            });
            break;
        case '5':
            // Delete a task
            rl.question('Enter the task index to delete: ', function (index) {
                // Remove the task from the array using splice()
                if (index >= 0 && index < taskList.length) {
                    taskList.splice(index, 1);
                    console.log('Task deleted!');
                } else {
                    console.log('Invalid task index.');
                }
                showMenu();
            });
            break;
        case '6':
            // Sort tasks by due date
            taskList.sort(function (a, b) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
            console.log('Tasks sorted by due date:');
            taskList.forEach(function (task) {
                console.log('*' + task.description + ' due: ' + task.dueDate + ', priority: ' + task.priority + ', completed: ' + task.completed);
            });
            showMenu();
            break;
        case '7':
            // Sort tasks by priority
            taskList.sort(function (a, b) {
                return a.priority - b.priority;
            });
            console.log('Tasks sorted by priority:');
            taskList.forEach(function (task) {
                console.log('*' + task.description + ' due: ' + task.dueDate + ', priority: ' + task.priority + ', completed: ' + task.completed );
            });
            showMenu();
            break;
        case '8':
            // Clear all tasks
            taskList.length = 0;
            console.log('All tasks cleared!');
            showMenu();
            break;
        case '9':
            // Exit the program
            console.log('Exiting the program...');
            rl.close();
            break;
        default:
            console.log('Invalid choice.');
            showMenu();
            break;
    }
}

// Print the welcome message and list of actions
showMenu();

// Wait for user input
rl.on('line', function (choice) {
    handleChoice(choice);
});
