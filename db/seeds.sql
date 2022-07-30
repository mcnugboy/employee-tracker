USE employeeDB;

INSERT INTO department(department_name)
VALUES ('Sales'), ('Engineering'), ('Financial'), ('Legal');

INSERT INTO role(title, salary, department_id)
VALUES ("Sales Lead", 80000, 1), ("Lead Engineer", 200000, 2), ("Software Engineer", 110000, 3), ("Lead Financial Advisor", 140000, 4), ("Lead Legal Consultant", 200000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL), ("Michael", "Scott", 2, NULL), ("Leonardo", "Escamilla", 3, 1),  ("Zachary", "Brown", 4, 2), ("Bill", "Miller", 5, Null), ("Gina", "Harvard", 6, 5), ("Neo", "Abdul", 7, 1), ("Lily", "Lease", 8, 2);