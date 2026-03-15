"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_1 = require("./customer");
var customer = new customer_1.Customer("John", "Smith", 30);
console.log(customer.greeter());
customer.GetAge();
