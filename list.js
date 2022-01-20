const fs = require('fs');

let data = fs.readFileSync('city.list.json');
let cities = JSON.parse(data);
console.log(cities.length);