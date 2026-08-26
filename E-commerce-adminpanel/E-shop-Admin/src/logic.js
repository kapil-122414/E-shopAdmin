// //find highestsalary in object
// const employees = {
//   emp1: {
//     name: "Rahul",
//     salary: 25000,
//   },
//   emp2: {
//     name: "Kapil",
//     salary: 45000,
//   },
//   emp3: {
//     name: "Amit",
//     salary: 35000,
//   },
// };
// let highestSalary = 0;
// let highestEmployee;
// for (let key in employees) {
//   if (employees[key].salary > highestSalary) {
//     highestSalary = employees[key].salary;
//     highestEmployee = employees[key].name;
//   }
// }

import { useActionState } from "react";

// console.log(highestSalary);
// console.log(highestEmployee);

// nested object + array ka logical question:
// const students = {
//   student1: {
//     name: "Rahul",
//     marks: [70, 80, 90],
//   },

//   student2: {
//     name: "Kapil",
//     marks: [85, 95, 88],
//   },

//   student3: {
//     name: "Amit",
//     marks: [60, 75, 70],
//   },
// };
// // console.log(students.student1.marks[0]);

// let highestnumber = 0;
// let studentname;
// for (let key in students) {
//   let sum = 0;
//   for (let i = 0; i < students[key].marks.length; i++) {
//     sum += students[key].marks[i];
//   }
//   if (sum > highestnumber) {
//     highestnumber = sum;
//     studentname = students[key].name;
//   }
//   console.log("all sum", sum);
// }
// console.log(studentname);

// const employees = {
//   emp1: {
//     name: "Rahul",
//     department: "IT",
//     skills: ["JavaScript", "React"],
//     salary: 30000,
//   },

//   emp2: {
//     name: "Kapil",
//     department: "IT",
//     skills: ["JavaScript", "Node.js", "MongoDB"],
//     salary: 45000,
//   },

//   emp3: {
//     name: "Amit",
//     department: "HR",
//     skills: ["Excel", "Communication"],
//     salary: 35000,
//   },
// };
// let highestSalary = 0;
// let username;
// let skill;
// for (let key in employees) {
//   if (employees[key].department === "IT") {
//     if (employees[key].salary > highestSalary) {
//       highestSalary = employees[key].salary;
//       username = employees[key].name;
//       skill = employees[key].skills;
//     }
//   }
// }
// console.log(username);
// console.log(skill);

//

// const users = {
//   user1: {
//     name: "Rahul",
//     age: 25,
//     skills: ["HTML", "CSS"],
//     salary: 25000,
//   },

//   user2: {
//     name: "Kapil",
//     age: 22,
//     skills: ["JavaScript", "Node.js", "MongoDB"],
//     salary: 45000,
//   },

//   user3: {
//     name: "Amit",
//     age: 28,
//     skills: ["JavaScript", "React"],
//     salary: 35000,
//   },

//   user4: {
//     name: "Rohit",
//     age: 24,
//     skills: ["Node.js", "MongoDB", "Express.js"],
//     salary: 40000,
//   },
// };

// for (let key in users) {
//   let a = users[key].skills.includes("JavaScript");
//   let b = users[key].skills.includes("Node.js");
//   let react = users[key].skills.includes("React");

//   if (a) {
//     if (b || react) {
//       if (users[key].salary > 30000) {
//         console.log(users[key].name);
//         console.log(users[key].salary);
//       }
//     }
//   }
// }

//

// const students = [
//   { name: "Rahul", marks: 78 },
//   { name: "Aman", marks: 45 },
//   { name: "Priya", marks: 92 },
//   { name: "Neha", marks: 61 },
//   { name: "Ravi", marks: 35 },
// ];
// let larger = 0;
// let username = 0;
// for (let i = 0; i < students.length; i++) {
//   if (students[i].marks > larger) {
//     larger = students[i].marks;
//     username = students[i].name;
//   }
// }
// console.log(larger);
// console.log(username);

// const cart = [
//   { name: "Shirt", price: 800, quantity: 2 },
//   { name: "Shoes", price: 1500, quantity: 1 },
//   { name: "Watch", price: 1200, quantity: 3 },
//   { name: "Cap", price: 400, quantity: 2 },
// ];
// let total = 0;
// for (let i = 0; i < cart.length; i++) {
//   total += cart[i].price * cart[i].quantity;
// }
// console.log(total);

const students = {
  s1: {
    name: "Rahul",
    marks: [70, 80, 90],
    subjects: ["Math", "English", "Science"],
  },

  s2: {
    name: "Kapil",
    marks: [90, 95, 88],
    subjects: ["Math", "English", "Science"],
  },

  s3: {
    name: "Amit",
    marks: [60, 75, 70],
    subjects: ["Math", "English", "Science"],
  },
};

let avg;

for (let key in students) {
  let total = 0;
  for (let i = 0; i < students[key].marks.length; i++) {
    total += students[key].marks[i];
    avg = total / students[key].marks.length;
    if (avg > 80) {
      console.log(avg);
      console.log(students[key].name);
      break;
    }
  }
}
