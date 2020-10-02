const inquirer = require("inquirer");

class Questions {
    constructor() {
        this.manager =  [
            {
                type: "input",
                name: "name",
                message: "What is the manager's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the employee id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is their email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the office number?"
            }
        ];
        this.intern = [
            {
                type: "input",
                name: "name",
                message: "What is the intern's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is their employee id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is their email?"
            },
            {
                type: "input",
                name: "school",
                message: "What is the name of their school?"
            }
        ];
        this.engineer = [
            {
                type: "input",
                name: "name",
                message: "What is the engineer's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is their employee id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is their email?"
            },
            {
                type: "input",
                name: "github",
                message: "What is their GitHub username?"
            }
        ];
    }

    inqRole() {
        const questions = {
            type: "list",
            name: "role",
            message: "What is the role of the employee?",
            choices: ["Manager", "Engineer", "Intern"],
            filter: function (val) {
              return val.toLowerCase();
            }
        }
        return inquirer.prompt(questions);
    }

    inqQuestions(role) {
        let questions = this[role];
        return inquirer.prompt(questions);
    }

    inqAddMore() {
        const questions = {
            type: "confirm",
            name: "more",
            message: "Continue adding employees?"
        }
        return inquirer.prompt(questions);
    }
}

module.exports = Questions;
