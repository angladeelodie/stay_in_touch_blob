const { ipcRenderer } = require("electron");

import { spline } from "https://cdn.skypack.dev/@georgedoescode/spline@1.0.1";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@2.4.0";

const $ = require("jquery");

// our <path> element
const path = document.querySelector("path");
// used to set our custom property values
const root = document.documentElement;
var noiseStep = 0.007;
const center = {x: 100,y: 100};
// var point;
// var rad = 30;
var radiuses = new Array(5).fill(30);
var smoothRadius = [...radiuses]; // spread operator
// used to equally space each point around the circle
var angleStep = (Math.PI * 2) / radiuses.length;
//const robot = require("robotSjs");
class App {
  constructor() {
    this.hueNoiseOffset = 0;
    this.simplex;
    this.points = [];
    // this.noiseStep = 0.005;
    this.hueNoiseOffset = 0;

    this.initBlob();
    this.initListeners();
    this.initLoop();
  }

  initBlob() {
    this.simplex = new SimplexNoise();
    this.points = this.createPoints();
  }

  createPoints() {

    for (let i = 0; i < radiuses.length; i++) {

      const rad = radiuses[i];
      const theta = i * angleStep;
      const radOffset = 30;
      var x = center.x + Math.cos(theta) * (rad + radOffset);
      var y = center.y + Math.sin(theta) * (rad + radOffset);

      $(".emotionsDiv").append('<div class="pointDiv invisible"></div>');
      $(".pointDiv")
        .last()
        .css({
          top: (y * window.innerHeight) / 200,
          left:
            (x * window.innerHeight) / 200 +
            (window.innerWidth - window.innerHeight) / 2,
          position: "absolute",
        });
      $(".pointDiv").last().append('<div class="emotionTag">EMOTION</div>');
      $(".pointDiv").last().attr("index", i);
      $(".pointDiv").last().append('<div class="dot"></div>');

      x = center.x + Math.cos(theta) * rad;
      y = center.y + Math.sin(theta) * rad;
      // store the point
      this.points.push({
        x,
        y,
        /* we need to keep a reference to the point's original {x, y} coordinates 
        for when we modulate the values later */
        originX: x,
        originY: y,

        targOriginX: x,
        targOriginY: y,

        // more on this in a moment!
        noiseOffsetX: Math.random() * 1,
        noiseOffsetY: Math.random() * 1,
      });
    }

    var emotions = ["happiness", "fear", "anger", "love", "sadness"];

    for (var i = 0; i < $(".pointDiv").length; i++) {
      $(".emotionTag").eq(i).html(emotions[i]);
      //do something with element
    }

    return this.points;
  }

  updatePoints() {

    this.points.forEach((point, i) => {

      smoothRadius[i] = lerp(smoothRadius[i], radiuses[i], 0.1);

      const radius = smoothRadius[i];
      const theta = i * angleStep;

      var x = center.x + Math.cos(theta) * radius;
      var y = center.y + Math.sin(theta) * radius;

      point.originX = x;
      point.originY = y;
    });
  }

  initLoop() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {

    path.setAttribute("d", spline(this.points, 1, true));

    this.updatePoints();

    this.points.forEach((point) => {
      const noiseStep = 0.01;

      const nX = this.noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = this.noise(point.noiseOffsetY, point.noiseOffsetY);
      const x = this.map(nX, -1, 1, point.originX - 2, point.originX + 2);
      const y = this.map(nY, -1, 1, point.originY - 2, point.originY + 2);

      point.x = x;
      point.y = y;

      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;
    });

    const hueNoise = this.noise(this.hueNoiseOffset, this.hueNoiseOffset);
    const hue = this.map(hueNoise, -1, 1, 0, 360);

    root.style.setProperty("--startColor", `hsl(${hue}, 0%, 50%)`);
    root.style.setProperty("--stopColor", `hsl(${hue + 60}, 0%, 70%)`);
    //document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;

    this.hueNoiseOffset += noiseStep / 6;

    requestAnimationFrame(() => this.animate());
  }

  initListeners() {
    ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
    //ipcRenderer.on("click", this.onClick.bind(this));
    // ipcRenderer.on("messageEmbedDiscord", this.onMessageEmbed.bind(this));
  }

  onMessage(event, message) {
    const fearJson = "./JS/Dictionnary/fear.json";
    const fear = require(fearJson);

    const angerJson = "./JS/Dictionnary/anger.json";
    const anger = require(angerJson);

    const loveJson = "./JS/Dictionnary/love.json";
    const love = require(loveJson);

    const sadJson = "./JS/Dictionnary/sad.json";
    const sad = require(sadJson);

    const happyJson = "./JS/Dictionnary/happy.json";
    const happy = require(happyJson);

    const emotions = [happy, fear, anger, love, sad];
    console.log(emotions);

    console.log(message);

    for (let i = 0; i < emotions.length; i++) {
      var words = message.content.split(" ");
      // console.log(words);

      if (emotions[i].hasOwnProperty(message.content)) {
        const increment = emotions[i][message.content];
        radiuses[i] += increment;

        const emotionIndex = i;
        // i = 0 -> fear // i = 1 -> anger // i = 2 -> love...
        $(".stats").append(
          '<div class="singleStat">			<div class="statTitle">				<div class="emotionStat">					<span class="material-icons">						north_east					</span>					<div class="emotionName">anger</div>				</div>				<div class="userName">matthater</div>				<div class="messageTime">22:03</div>			</div>			<div class="statContent">				<div class="statMessage">					I wanna punch someone because I had a shitty day				</div>			</div>		</div>'
        );
        var emotionText;
        if (emotionIndex == 1) {
          emotionText = "fear";
        }
        if (emotionIndex == 2) {
          emotionText = "anger";
        }
        if (emotionIndex == 3) {
          emotionText = "love";
        }
        if (emotionIndex == 4) {
          emotionText = "sad";
        }
        if (emotionIndex == 0) {
          emotionText = "happy";
        }
        console.log(emotionText + " " + emotionIndex);

        const d = new Date(message.timestamp);
        var singleStat = $(".singleStat").last();
        var date = d.getHours() + ":" + d.getMinutes();
        $(".messageTime").last().text(date);

        $(".userName").last().text(message.author);
        $(".statMessage").last().text(message.content);
        $(".emotionName").last().text(emotionText);

        var statsDiv = $(".stats").last();
        statsDiv.animate({ scrollTop: statsDiv[0].scrollHeight }, 1000);
      }
    }
  }

  map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  }
  noise(x, y) {
    // return a value at {x point in time} {y point in time}
    return this.simplex.noise2D(x, y);
  }
}

window.onload = () => {
  var app = new App();

  $(".pointDiv").click(function () {
    // index = $(this).attr("index");
    // console.log(index);
    // newMessage = true;
    // rad = rad + 5;
    // yolo.updatePoints();
    //$(".stats").append('<div class="statTitle"><div class="emotionStat"><span class="material-icons">north_east</span><div>happy</div></div><div class="userName">melanief</div><div class="">22:03</div></div><div class="statContent"><div class="statMessage">I had the best day ever!!</div></div>');
  });

  $('input[type="checkbox"]').click(function () {
    $(".pointDiv").toggleClass("invisible");
    $(".stats").toggleClass("invisible");
  });

  $("#resetButton").click(function () {
    rad = 30;
    app.updatePoints();
  });
};

// document.querySelector('path').addEventListener('mouseover', () => {
//   // window.setInterval(function () {

//   noiseStep = 0.01;

//   // }, 250);
// });

// document.querySelector('path').addEventListener('mouseleave', () => {
//   noiseStep = 0.005;
// });

$(document).on("mouseenter", ".statTitle", function () {
  $(this).next().toggleClass("appearMsg");
  var statsDiv = $(".stats").last();
  statsDiv.animate({ scrollTop: statsDiv[0].scrollHeight }, 1000);
});

$(document).on("mouseleave", ".statTitle", function () {
  $(this).next().toggleClass("appearMsg");
});


function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}