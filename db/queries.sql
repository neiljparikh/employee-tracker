/* View all Employees */

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS Manager
FROM employee 
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;


-- Add Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Neil","Parikh", 1, 2);
SELECT * FROM employee;


/* View Departments */
SELECT department.id, department.name AS departmentName FROM department;

-- Add Department
INSERT INTO department (name)
VALUES ("R&D");
SELECT * FROM department;

-- View Roles
SELECT role.id, role.title, department.name AS departmentName, role.salary
FROM role
JOIN department ON role.department_id = department.id
ORDER BY role.id;