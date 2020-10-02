const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Questions = require("./lib/Questions");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { resolve } = require("path");
const employees = [];
// function that holds Questions method to inquire employee type.
const getRole = () => {
    return new Questions().inqRole();
}
// function that holds Questions method to inquire info about the respective employee type.
const getAnswers = ({ role } = answers) => {
    return new Promise((resolve, reject) => {
        new Questions().inqQuestions(role).then(answers => {
            let obj = {
                role: role,
                answers: answers
            }
            resolve(obj);
        }).catch(err => reject(err));
    })
};
// function to add employee to employees array.
const addEmployee = ({ role, answers } = results) => {
    return new Promise((resolve) => {
        answers = Object.values(answers);
        switch (role) {
            case "manager":
                employees.push(new Manager(...answers));
                break;
            case "engineer":
                employees.push(new Engineer(...answers));
                break;
            default:
                employees.push(new Intern(...answers));
                break;
        }
        resolve();
    });
};
//function to inquire if more employees should be added.
const addMore = () => {
    return new Questions().inqAddMore();
}
//function to write html file.
const outputHtml = (data) => {
    fs.writeFile(outputPath, data, (err) => {
        if (err) throw err;
        return console.log('The file has been saved!');
    });
}
//function to start running CLI prompts.
const runPrompt = () => {
    getRole()
    .then(getAnswers)
    .then(addEmployee)
    .then(addMore)
    .then(({ more } = answers) => {
        if (more) {
            runPrompt();
        }
        else {
            const html = render(employees);
            return outputHtml(html);
        }
    })
}
// initialize CLI.
runPrompt();
