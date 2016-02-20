window.addEventListener('load', start);

var body;
var timeDiv;
var dateDiv;

var date;

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var black = [42, 44, 50];
var blue = [0, 128, 255];
var green = [90, 222, 68];
var orange = [255, 93, 43];

var sixHours = 6 * 60 * 60;
var night = 0;
var morning = night + sixHours;
var noon = morning + sixHours;
var evening = noon + sixHours;

function start() {
  body = document.getElementById("body");
  timeDiv = document.getElementById("time");
  dateDiv = document.getElementById("date");

  update();

  setInterval(update, 1000);
}

// var i = 0;

function update() {
  // date = new Date("October 13, 2014 " + (i++ % 24) + ":00:00");
  date = new Date();

  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();

  secondsSinceMidnight = hours * 60 * 60 + minutes * 60 + seconds;

  color = getColor(secondsSinceMidnight);
  body.style.background = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";

  timeDiv.innerHTML = javascriptSucks(hours) + ":" + javascriptSucks(minutes) + ":" + javascriptSucks(seconds);
  dateDiv.innerHTML = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

function getColor(time) {
  ratio = (time % sixHours)/sixHours;

  if(time < morning) {
    return mixColors(black, blue, ratio);
  }else if(time < noon) {
    return mixColors(blue, green, ratio);
  }else if(time < evening) {
    return mixColors(green, orange, ratio);
  }else{
    return mixColors(orange, black, ratio);
  }
}

function javascriptSucks(x) {
  if(x < 10){
    return "0"+x;
  }else{
    return x;
  }
}

// ratio is a value between 0 and 1
// 0 means color1, 1 means color2
function mixColors(color1, color2, ratio){
  if(ratio < 0) {ratio = 0};
  if(ratio > 1) {ratio = 1};

  r1 = 1.0 - ratio;
  r2 = ratio;

  r = (color1[0] * r1 + color2[0] * r2);
  g = (color1[1] * r1 + color2[1] * r2);
  b = (color1[2] * r1 + color2[2] * r2);

  return [Math.round(r), Math.round(g), Math.round(b)];
}
