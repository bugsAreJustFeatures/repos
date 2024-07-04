// function Book(title, author, pages, read) {
//     this.title = title,
//     this.author = author,
//     this.pages = pages,
//     this.read = read,
//     this.info = function() {
//         return(this.title + this.author + this.pages + this.read)
//     };
// }
      
// const theHobbit = new Book("The Hobbit ", "By J.R.R Tolkien, ", "295 pages, ", " not read yet");
        
// console.log(theHobbit.info());

// function Player(name, marker) {
//     this.name = name;
//     this.marker = marker;
//     this.sayName = function() {
//       console.log(this.name)
//     };
//   }
  
//   const player1 = new Player('steve', 'X');
//   const player2 = new Player('also steve', 'O');
//   player1.sayName(); // logs 'steve'
//   player2.sayName(); // logs 'also steve'

//   console.log(Object.getPrototypeOf(player1) === Player.prototype);
//   console.log(Object.getPrototypeOf(player2) === Player.prototype);

//   Player.prototype.sayHello = function() {
//     console.log("Hello, I'm a player!");
//  };
 
//  player1.sayHello();
//  player2.sayHello(); 

//  let animal = {
//   eats: true
// };

// let rabbit = {
//   jumps: true
// };

// // Setting prototype of rabbit to animal
// rabbit.__proto__ = animal;

// // console.log(rabbit.eats); // true, inherited from animal
// // console.log(rabbit.jumps); // true, own property of rabbit

// -----another task------- //

// let head = {
//   glasses: 1
// };

// let table = {
//   pen: 3,
//   __proto__: head
// };

// let bed = {
//   sheet: 1,
//   pillow: 2,
//   __proto__: table
// };

// let pockets = {
//   money: 2000,
//   __proto__: bed
// };

// ------once again, another task--------//

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach = (food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
  
};

// This one found the food
speedy.eat("apple");
console.log( speedy.stomach ); // apple

// This one also has it, why? fix please.
console.log( lazy.stomach ); // apple