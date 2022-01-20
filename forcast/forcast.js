const fs = require('fs');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month < 10)
        month = '0' + month;
    if (day < 10)
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatTime(date) {
    var d = new Date(date),
        hours = '' + d.getHours(),
        minuts = '' + d.getMinutes(),
        seconds = d.getSeconds();

    if (hours < 10)
        hours = '0' + hours;
    if (minuts < 10)
        minuts = '0' + minuts;
    if (seconds < 10)
        seconds = '0' + seconds;

    return [hours, minuts, seconds].join(':');
}

let data = fs.readFileSync('forcast1.json');
let forcast = JSON.parse(data);
//console.log(forcast.list.length);

var today = new Date();

var date = new Date()
var day1 = date.setDate(date.getDate() + 1);
var day2 = date.setDate(date.getDate() + 1);
var day3 = date.setDate(date.getDate() + 1);
var day4 = date.setDate(date.getDate() + 1);
var day5 = date.setDate(date.getDate() + 1);

const Today = forcast.list.filter(day => formatDate(day.dt_txt) == formatDate(today))
const Day1 = forcast.list.filter(day => formatDate(day.dt_txt) == formatDate(day1))
const Day2 = forcast.list.filter(day => formatDate(day.dt_txt) == formatDate(day2))
const Day3 = forcast.list.filter(day => formatDate(day.dt_txt) == formatDate(day3))
const Day4 = forcast.list.filter(day => formatDate(day.dt_txt) == formatDate(day4))
const Day5 = forcast.list.filter(day => formatDate(day.dt_txt) == formatDate(day5))

/*
console.log(formatDate(today))
console.log(formatDate(day1))
console.log(formatDate(day2))
console.log(formatDate(day3))
console.log(formatDate(day4))
console.log(formatDate(day5))*/

//Today.forEach(d => console.log(formatTime(d.dt_txt) + "   Temp min :  " + parseInt(d.main.temp_min) + "   Temp max :  " + parseInt(d.main.temp_max)))

//console.log(formatTime(today))
//console.log(formatDate(today))


const writeStream = fs.createWriteStream("./forcast.txt", "UTF-8");

writeStream.write(today + "\n");
writeStream.write("Name : " + forcast.city.name + "           Id : " + forcast.city.id + "\n");

writeStream.write("\n\t" + formatDate(today) + "\n")
Today.forEach(d => writeStream.write(formatTime(d.dt_txt) + "   Temp min :  " + parseInt(d.main.temp_min) + "   Temp max :  " + parseInt(d.main.temp_max) + "\n"))

writeStream.write("\n\t" + formatDate(day1) + "\n")
Day1.forEach(d => writeStream.write(formatTime(d.dt_txt) + "   Temp min :  " + parseInt(d.main.temp_min) + "   Temp max :  " + parseInt(d.main.temp_max) + "\n"))

writeStream.write("\n\t" + formatDate(day2) + "\n")
Day2.forEach(d => writeStream.write(formatTime(d.dt_txt) + "   Temp min :  " + parseInt(d.main.temp_min) + "   Temp max :  " + parseInt(d.main.temp_max) + "\n"))

writeStream.write("\n\t" + formatDate(day3) + "\n")
Day3.forEach(d => writeStream.write(formatTime(d.dt_txt) + "   Temp min :  " + parseInt(d.main.temp_min) + "   Temp max :  " + parseInt(d.main.temp_max) + "\n"))

writeStream.write("\n\t" + formatDate(day4) + "\n")
Day4.forEach(d => writeStream.write(formatTime(d.dt_txt) + "   Temp min :  " + parseInt(d.main.temp_min) + "   Temp max :  " + parseInt(d.main.temp_max) + "\n"))

writeStream.write("\n\t" + formatDate(day5) + "\n")
Day5.forEach(d => writeStream.write(formatTime(d.dt_txt) + "   Temp min :  " + parseInt(d.main.temp_min) + "   Temp max :  " + parseInt(d.main.temp_max) + "\n"))

