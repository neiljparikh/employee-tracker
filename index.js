const inquirer = require('inquirer')
const mysql = require('mysql2/promise');
const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employees'});


// Array of questions for user input
function mainMenu() {
    inquirer.prompt([ 
    {
        type: 'list',
        name: 'command',
        message: "What would you like to do?",
        choices: [
        'View All Employees',
        'Add Employee', 
        'Update Employee Role', 
        'View All Roles', 
        'Add Role', 
        'View All Department', 
        'Add Department', 
        'Quit'
        ]
    }   
])

.then(({command}) => {
    handleUserChoice(command)
})
}

//HELPER FUNCTIONS
async function addDepartment() {
  
    let {name} = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "name",
      },
    ])

   let query = await db.query('INSERT INTO department (name) VALUES (?)', name)
    
    if (query) {
    mainMenu();
    }
}

async function addEmployee() {
  
    const { firstName, lastName } = await inquirer.prompt([
      {
        type: "input",
        message: "What is the first name of the employee?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee?",
        name: "lastName",
      }
    ])

    const allDepartments  = await db.query('SELECT * FROM department')
    const departmentChoices = allDepartments.map((dept) => dept.name)



    const { department } = await inquirer.prompt([
        {
          type: "list",
          message: "What is the department of the employee?",
          name: "department",
          choices: departmentChoices,
        },
      ])

      // use selected department name to relate back to department_id
      const selectedDeptId = allDepartments.filter((dept) => (dept.name === department[0].id))
      
      // select id, name from role where department_id=?, selectedDeptId

      // query for roles that have the selected department_id

      const { role } = await inquirer.prompt([
        {
          type: "input",
          message: "What is the role of the employee?",
          name: "name",
        },
      ])

   const [ rowsAffected ] = await db.query('INSERT INTO department (name) VALUES (?)', [])
   // insert employee into employee table
      if (rowsAffected === 0) {
        console.log('Failed to insert employee!')
      }

    mainMenu();
}

function handleUserChoice(command) {
    if (command === "Add Department") {
      addDepartment();
    } else if (command === "Add Employee") {
      viewAllDepartments();
    } else if (command === "View All Employees") {
      viewAllEmployees();
    } else if (command === "View All Roles") {
      viewAllRoles();
    } else if (command === "View All Departments") {
      addEmployee();
    } else if (command === "Add Role") {
      addRole();
    } else if (command === "Update Employee Role") {
      updateEmployeeRole();
    } else {
      console.log("Application Quit");
    }
}



//INIT
start();

function start() {
    mainMenu()
}