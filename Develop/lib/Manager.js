const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager extends Employee {
    constructor(name,id,email,officeNumber) {
        super(name,id,email,officeNumber);
        this.officeNumber = officeNumber;
        this.role = "Manager";
    }

    getRole() {
        return this.role;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;