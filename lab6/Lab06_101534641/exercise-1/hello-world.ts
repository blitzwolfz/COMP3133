let sayHello = (firstName: string, lastName: string): string => {
    return `Hello ${firstName} ${lastName}! Welcome to TypeScript.`;
};

let firstName: string = "Samin";
let lastName: string = "Qureshi";

console.log(sayHello(firstName, lastName));
