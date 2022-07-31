import connection from './config/connection.js';
import inquirer from 'inquirer';

connection.connect(function(err) {
    if (err) throw err;
    prompts();
});

const prompts = () => {
    inquirer.prompt([
        {
            name: "choices",
            type: "list",
            message: "select from below.",
            choices: [
                "View all Employees",
                "View by Department",
                "View all Roles",
                "Add Department",
                "Add Employee",
                "Add Role",
                "Update Employee"
            ]
        }
    ])
    .then((choice) => {
        const{choices} = choice;

        if (choices === "View all Employees") {
            viewEmployee();
        }
        if (choices === "View by Department") {
            viewDepartments();
        }
        if (choices === "View all Roles") {
            viewRoles();
        }
        if (choices === "Add Department") {
            addDepartment();
        }
        if (choices === "Add Employee") {
            addEmployee();
        }
        if (choices === "Add Role") {
            addRoles();
        }
        if (choices === "Update Employee") {
            updateEmployee();
        }

    });

};

const viewEmployee = () => {

    var queryR =
        `SELECT  e.id AS ID,
        e.first_name AS First,
        e.last_name AS Last,
        e.role_id AS Role,
        r.salary AS Salary,
        m.last_name AS Manager,
        d.id AS Department
        
        FROM employee e
        LEFT JOIN employee m
        ON e.manager_id = m.id
        
        LEFT JOIN role r
        ON e.role_id = r.id
        
        LEFT JOIN department d
        ON department_id = d.id`
        
    connection.query(queryR, function(err, res){
        if (err) throw err;

        console.table(res);
        prompts();
    }
    );
};

const viewDepartments = () => {

    var queryR =
        `SELECT * FROM department d`

        
    connection.query(queryR, function(err, res){
        if (err) throw err;

    
        console.table(res);
        prompts();

    });
}

const viewRoles = () => {

    var queryR =
        `SELECT * FROM role r`

        
    connection.query(queryR, function(err, res){
        if (err) throw err;

    
        console.table(res);
        prompts();

    });
}

const addEmployee = () => {

    var queryR =
        `SELECT r.id, r.title, r.salary
        FROM role r `
        
    connection.query(queryR, function(err, res){
        if (err) throw err;

        const roleChoice = res.map(({ id, title, salary}) => ({
            value: id, title, salary,
            name: `${title} ${salary}`
        }))

        console.table(res);
        promptInput(roleChoice);
    });
};

function promptInput(roleChoice){

inquirer.prompt([
    {
        type: "input",
        name: "first_name",
        message: "what is your employee's first name?"
    },

    {
        type: "input",
        name: "last_name",
        message: "what is your employee's last name?"
    },
    {
        type: "list",
        name: "roleId",
        message: "what is your employee's role?",
        choices: roleChoice
    }
])
.then(function(answer) {

    var queryR = `INSERT INTO employee SET ?`

    connection.query(queryR, {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.roleId,
        manager_id: answer.manager_id
    },
    function(err, res){
        if(err, res) {
            if (err) throw err;

            console.table(res);
            prompts();
        }
    })
})
}

const addRoles = () => {

    var queryR =
    `SELECT *
    FROM department`
        
    connection.query(queryR, function(err, res){
        if (err) throw err;

        const addRoles = res.map(({ id, department_name}) => ({
            value: id, department_name,
            name: `${id} ${department_name}`
        }))

        console.table(res);
        promptRole(addRoles);
    });
};

function promptRole(addRoles) {
    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "Role name?"
        },
    
        {
            type: "input",
            name: "roleSalary",
            message: "Role's salary?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Department?",
            choices: addRoles
        },
    ])
    .then(function(answer) {
        var queryR = `INSERT INTO role SET ?`

        connection.query(queryR, {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.department_id
        },
        function(err, res) {
            if(err) throw err;

            console.table(res);
            prompts();
        })
    })
}

const updateEmployee = () => {
    var queryR = `SELECT *
    FROM employee e`

    connection.query(queryR, function(err, res){
        if(err) throw err;
        const updates = res.map(({id, first_name, last_name}) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }))
        console.table(res);

        employeeRole(updates);
    })
}

function employeeRole(updates) {
    var queryR = `SELECT * FROM role r`

    connection.query(queryR, function(err, res) {
        var updatingRole = res.map(({id, title, salary}) => ({
            value: id,
            name: `${title} ${salary}`
        }))

        console.table(res);
        employeePrompts(updates, updatingRole);
    })
}

function employeePrompts(updates, updatingRole) {
    inquirer.prompt([
        {
            type: "list",
            name: "employeeId",
            message: "What role did you want to update for your employee?",
            choices: updates
        },
        {
            type: "list",
            name: "roleId",
            message: "Which role did you want to update?",
            choices: updatingRole
        }
    ])
    .then(function(answer) {
        var queryR = `UPDATE employee SET role_id = '?' WHERE id = '?' `

        connection.query(queryR, [
            answer.roleId,
            answer.employeeId
        ],
        function(err, res){
            if(err) throw err;

            console.table(res);
            prompts();
        })
    })
};