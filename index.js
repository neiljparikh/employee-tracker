//DEPENDENCIES
const inquirer = require('inquirer')
const mysql = require('mysql2/promise');

let db;



console.log(db)
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



    const { selectedDepartment } = await inquirer.prompt([
        {
          type: "list",
          message: "What is the department of the employee?",
          name: "selectedDepartment",
          choices: departmentChoices,
        },
      ])

      // use selected department name to relate back to department_id
      const selectedDeptId = allDepartments.filter((dept) => (dept.name === selectedDepartment[0]).id)
      // select id, name from role where department_id=?, selectedDeptId
      const departmentRoles = await db.query('SELECT id, title FROM role WHERE department_id = ?', selectedDeptId);
      const roleChoices = departmentRoles.map((role) => ({ name: role.title, value: role.id }));
      // query for roles that have the selected department_id

      const { selectedRoleId } = await inquirer.prompt([
        {
          type: "list",
          message: "What is the role of the employee?",
          name: "selectedRoleId",
          choices: roleChoices
        },
      ]);
      
      const query = await db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [
        firstName,
        lastName,
        selectedRoleId,
    ]);

        if (query) {
        console.log("Employee added successfully!");
        mainMenu();
        }
    }


async function addRole() {
    
    const { title, salary, departmentId } = await inquirer.prompt([
        {
          type: "input",
          message: "What is the title of the role?",
          name: "title",
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: "salary",
          },
        {
            type: "list",
            message: "What is the department of the role?",
            name: "departmentId",
            choices: departmentChoices
        },
      ])
  
      const allDepartments  = await db.query('SELECT * FROM department')
      const departmentChoices = allDepartments.map((department) => ({ name: department.title, value: department.id }));
      
      const query = await db.query('INSERT INTO employee (title, salary, department_id) VALUES (?, ?, ?)', [
        title,
        salary,
        departmentId,
    ]);

        if (query[0].length > 0) {
        console.log("Employee added successfully!");
        mainMenu();
        }
}

async function viewAllDepartments() {
    
   
      const query  = await db.query('SELECT department.id, department.name AS department_name FROM department')
  
      if (query.length > 0) {
       const sanitizedQuery = query[0].map((department) => department.department_name)
        console.table(sanitizedQuery)
        console.log("Departments retrieved successfully!");
        mainMenu();
   
        }
}

async function viewAllEmployees() {
    
   
    const query  = await db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager_id, CONCAT(employee.first_name,' ',employee.last_name) AS employee_manager
    FROM employee 
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee.last_name ON employee.manager_id = employee.id`)
    console.table(query)
    
    
    if (query) {
      console.log("Employees retrieved successfully!");
      mainMenu();
      }
}

function handleUserChoice(command) {
    if (command === "Add Department") {
        addDepartment();
    } else if (command === "Add Employee") {
        addEmployee();
    } else if (command === "View All Employees") {
        viewAllEmployees();
    } else if (command === "View All Roles") {
        viewAllRoles();
    } else if (command === "View All Departments") {
        viewAllDepartments();
    } else if (command === "Add Role") {
        addRole();
    } else if (command === "Update Employee Role") {
        updateEmployeeRole();
    } else {
      console.log("Application Quit");
    }
}

//USER INTERACTIONS
async function mainMenu() {
    db = await mysql.createConnection({host:'localhost', user: 'root', password: '', database: 'employees'});
   
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
        'View All Departments', 
        'Add Department', 
        'Quit'
        ]
    }   
])

.then(({command}) => {
    handleUserChoice(command)
})
}

//INIT
start();

function start() {
    mainMenu()
}
