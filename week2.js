//Excercise --1
const greeter = (myArray, counter) => {
    const greetText = 'Hello';

    for (const name of myArray) {
        console.log(`${greetText} ${name}`);
    }
};

greeter(['Randy Savage', 'Ric Flair', 'Hulk Hogan'], 3);

//Excercise -- 2
function capitalize (str) {
    const [first, ...rest] = str;
    return first.toUpperCase() + rest.join('');
};
console.log(capitalize('foobar'));
console.log(capitalize('nodejs'))

//Excercise -- 3

function capitalize (str) {
    const [first, ...rest] = str;
    return first.toUpperCase() + rest.join('');
};

const colors = ['red', 'green', 'blue']
const capitalizedColors = colors.map(color => capitalize(color));

console.log(capitalizedColors);

//Excercise -- 4

var values = [1, 60, 34, 30, 20, 5]
var filterLessThan20 = values.filter(function(num){
    return num < 20
})

console.log(filterLessThan20)

//Excercise -- 5
var array = [1, 2, 3, 4]

var calculateSum = array.reduce(function(acc, curr){
    return acc + curr;
 }, 0);

var calculateProduct = array.reduce(function(acc, curr) {
    return acc * curr;
 }, 1);

console.log(calculateSum);
console.log(calculateProduct);


//Excercise -- 6

class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }
  details() {
    return `Model: ${this.model} ${this.year}`;
  }
}

class Sedan extends Car {
  constructor(model, year, balance) {
    super(model, year); 
    this.balance = balance;
  }
  info() {
    return `${this.model}, has a balance of $${this.balance.toFixed(2)}`;
  }
}
const car2 = new Car('Pontiac Firebird', 1976);
console.log(car2.details());
const sedan = new Sedan('Volvo SD', 2018, 30000);
console.log(sedan.info());