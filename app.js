const fs = require("fs");
const http = require("http");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

class App {
  constructor() {
    this.db = {
      manager: null,
      engineers: [],
      interns: [],
    };
  }

  async getEmployeeInfo() {
    console.log(`\nPlease enter employee information:\n`);

    let employeeInfo = await inquirer.prompt([
      {
        type: "input",
        message: "ID: ",
        name: "id",
      },
      {
        type: "input",
        message: "Name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Email: ",
        name: "email",
      },
      {
        type: "input",
        message: "Title: ",
        name: "title",
      },
    ]);

    switch (employeeInfo.title.toLowerCase()) {
      case "manager":
        employeeInfo = await this.getOfficeNumber(employeeInfo);
        break;
      case "engineer":
        employeeInfo = await this.getGithubHandle(employeeInfo);
        break;
      case "intern":
        employeeInfo = await this.getSchoolInfo(employeeInfo);
        break;
      default:
        return display404(employeeInfo);
    }

    return employeeInfo;
  }

  async getOfficeNumber(employeeInfo) {
    const managerInfo = await inquirer.prompt([
      {
        type: "input",
        message: "Office Number: ",
        name: "officeNumber",
      },
    ]);

    employeeInfo.officeNumber = await managerInfo.officeNumber;

    return employeeInfo;
  }

  async getGithubHandle(employeeInfo) {
    let engineerInfo = await inquirer.prompt([
      {
        type: "input",
        message: "GitHub handle: ",
        name: "github",
      },
    ]);

    employeeInfo.github = await engineerInfo.github;

    return employeeInfo;
  }

  async getSchoolInfo(employeeInfo) {
    let internInfo = await inquirer.prompt([
      {
        type: "input",
        message: "School: ",
        name: "school",
      },
    ]);

    employeeInfo.school = internInfo.school;

    return employeeInfo;
  }

  createEmployee(employeeInfo) {
    let employee;
    const { id, name, email } = employeeInfo;
    switch (employeeInfo.title.toLowerCase()) {
      case "manager":
        const manager = new Manager(name, id, email, employeeInfo.officeNumber);
        employee = manager;
        break;
      case "engineer":
        const engineer = new Engineer(name, id, email, employeeInfo.github);
        employee = engineer;
        break;
      case "intern":
        const intern = new Intern(name, id, email, employeeInfo.school);
        employee = intern;
        break;
      default:
        return display404(id, name, email);
    }

    return employee;
  }

  saveEmployee(employee) {
    switch (employee.getRole().toLowerCase()) {
      case "manager":
        this.manager = employee;
        break;
      case "engineer":
        this.engineers.push(employee);
        break;
      case "intern":
        this.interns.push(employee);
        break;
      default:
        return display404(employee);
    }
  }
}
  
    if (this.manager) {
      managerProfile = new ManagerProfile(this.manager);
      managerProfile = managerProfile.createProfile();
    }

    if (this.engineers) {
      for (const engineer of this.engineers) {
        let engineerProfile = new EngineerProfile(engineer);
        engineerProfile = engineerProfile.createProfile();

        engineers += engineerProfile;
      }
    }
  
    do {
      const employee = this.createEmployee(await).getEmployeeInfo();

      this.saveEmployeeToDb(employee);

      input = await.inquirer.prompt([
        {
          type: "input",
          message: "Type 'yes' if you wish to exit",
          name: "exit",
        },
      ]);
    } while (!input.exit);
  

