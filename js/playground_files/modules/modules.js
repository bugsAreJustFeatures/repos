// const Formatter = (function() {
//     const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  
//     const makeUppercase = (text) => {
//       log("Making uppercase");
//       return text.toUpperCase();
//     };  
  
//     return {
//       makeUppercase,
//     }
//   })();

//   console.log(Formatter.makeUppercase("harry"))

const personFactory(name) {
  name = this.name
  talk()
    return `Hi i am ${name}`
}

console.log(personFactory("harry"));