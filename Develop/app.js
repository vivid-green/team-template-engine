const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Questions = require("./lib/Questions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { resolve } = require("path");
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const getRole = () => {
    return new Questions().inqRole();
}
const getAnswers = ({role} = answers) => {
    return new Promise((resolve,reject) => {
        new Questions().inqQuestions(role).then(answers => {
            let obj = {
                role: role,
                answers: answers
            }
            resolve(obj);
        }).catch(err => reject(err));
    })
};

const addEmployee = ({role, answers} = results) => {
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

const addMore = () => {
    return new Questions().inqAddMore();
}

const outputHtml = (data) => {
    fs.writeFile(outputPath, data, (err) => {
        if (err) throw err;
        return console.log('The file has been saved!');
    });
}

const runPrompt = () => {
    // return new Promise((resolve) => {
        getRole()
        .then(getAnswers)
        .then(addEmployee)
        .then(addMore)
        .then(({more} = answers) => {
            // more ? runPrompt() : resolve(console.log(render(employees)));
            if(more) {
                runPrompt();
            }
            else {
                const html = render(employees);
                return outputHtml(html);
            }
        })
    // })
}

runPrompt()


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
