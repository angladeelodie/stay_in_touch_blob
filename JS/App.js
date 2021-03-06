const { ipcRenderer } = require("electron");

import { spline } from "https://cdn.skypack.dev/@georgedoescode/spline@1.0.1";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@2.4.0";

const $ = require("jquery");
// our <path> element
const path = document.querySelector("path");
// used to set our custom property values
const root = document.documentElement;
var noiseStep = 0.007;
const center = {
  x: 100,
  y: 100,
};
// var point;
// var rad = 30;
var radiuses = new Array(5).fill(30);
var smoothRadius = [...radiuses]; // spread operator
// used to equally space each point around the circle
var angleStep = (Math.PI * 2) / radiuses.length;

const DATA = {
  happiness: [
    "ð",
    "ðĪŠ",
    "ðĪ",
    "ðĨģ",
    "ðĪĐ",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "smile",
    "Smile",
    "dance",
    "Dance",
    "sing",
    "Sing",
    "glad",
    "Glad",
    "cheerful",
    "Cheerful",
    "joyful",
    "Joyful",
    "pleased",
    "Pleased",
    "content",
    "Content",
    "sunny",
    "Sunny",
    "upbeat",
    "Upbeat",
    "joy",
    "Joy",
    "happy",
    "Happy",
    "happiness",
    "Happiness",
    "euphoric",
    "Euphoric",
    "excited",
    "Excited",
    "festive",
    "Festive",
    "party",
    "Party",
    "good",
    "Good",
  ],
  fear: [
    "ðĨ",
    "ð§",
    "ðĶ",
    "ðĩ",
    "ðĪ",
    "ðģ",
    "ðĻ",
    "ðĨķ",
    "fear",
    "Fear",
    "scared",
    "Scared",
    "afraid",
    "Afraid",
    "panic",
    "Panic",
    "doubt",
    "Doubt",
    "scare",
    "Scare",
    "fright",
    "Fright",
    "phobia",
    "Phobia",
    "shy",
    "Shy",
    "shiver",
    "Shiver",
    "scary",
    "Scary",
    "frightening",
    "Frightening",
    "terror",
    "Terror",
    "anxiety",
    "Anxiety",
    "anxious",
    "Creep",
    "creep",
    "Terrified",
    "terrified",
    "Intimidated",
    "intimidated",
  ],
  anger: [
    "ðĄ",
    "ðĪŽ",
    "ð ",
    "ðĪŊ",
    "ðĨĩ",
    "ðĪ",
    "ð",
    "hate",
    "Hate",
    "rage",
    "Rage",
    "angry",
    "Angry",
    "kill",
    "Kill",
    "fury",
    "Fury",
    "provocation",
    "Provocation",
    "bitter",
    "Bitter",
    "roar",
    "Roar",
    "furious",
    "Furious",
    "provoke",
    "Provoke",
    "flame",
    "Flame",
    "madness",
    "Madness",
    "shit",
    "Shit",
    "irriating",
    "Irritating",
    "annoying",
    "Annoying",
    "anger",
    "Anger",
    "furor",
    "Furor",
    "hell",
    "Hell",
    "mad",
    "Mad",
    "pissed",
    "Pissed",
    "tantrum",
    "Tantrum",
    "violent",
    "Violent",
    "blood",
    "Blood",
    "clench",
    "Clench",
  ],
  love: [
    "ð",
    "ð",
    "ðĨ°",
    "ð",
    "ðĐââĪïļâðĻ",
    "ðĐââĪïļâðĐ",
    "ðĻââĪïļâðĻ",
    "ðĐââĪïļâðâðĻ",
    "ðĐââĪïļâðâðĐ",
    "ðĻââĪïļâðâðĻ",
    "ðŧ",
    "âĪïļ",
    "ð§Ą",
    "ð",
    "ð",
    "ð",
    "ð",
    "âĢïļ",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ðĪ",
    "ðĪ",
    "ðĪ",
    "ð",
    "ðđ",
    "ðĨ",
    "ð·",
    "kiss",
    "Kiss",
    "love",
    "Love",
    "smack",
    "Smack",
    "flowers",
    "Flowers",
    "romance",
    "Romance",
    "rose",
    "Rose",
    "wedding",
    "Wedding",
    "cute",
    "Cute",
    "hug",
    "Hug",
    "appreciate",
    "Appreciate",
    "lust",
    "Lust",
    "crush",
    "Crush",
    "sweet",
    "Sweet",
    "lover",
    "Lover",
    "romantic",
    "Romantic",
    "dear",
    "Dear",
    "match",
    "Match",
    "fling",
    "Fling",
    "passion",
    "Passion",
    "passionate",
    "Passionate",
    "loved",
    "Loved",
    "in love",
    "In love",
  ],
  sadness: [
    "ð­",
    "ðĒ",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ðĢ",
    "âđïļ",
    "ð",
    "ðĨš",
    "ðĨī",
    "ðĪ",
    "ðĪ§",
    "ð",
    "tears",
    "Tears",
    "cry",
    "Cry",
    "unhappy",
    "Unhappy",
    "melancholy",
    "Melancholy",
    "sad",
    "Sad",
    "sadness",
    "Sadness",
    "depressed",
    "Depressed",
    "tragic",
    "Tragic",
    "pain",
    "Pain",
    "miss",
    "Miss",
    "heartbroken",
    "Heartbroken",
    "tearful",
    "Tearful",
    "remorse",
    "Remorse",
    "crying",
    "Crying",
    "breakdonw",
    "Breakdown",
    "depression",
    "Depression",
    "grief",
    "Grief",
    "mourn",
    "Mourn",
    "regret",
    "Regret",
    "heartache",
    "Heartache",
    "darkness",
    "Darkness",
    "distress",
    "Distress",
    "scar",
    "Scar",
    "hurt",
    "Hurt",
    "moody",
    "Moddy",
    "remorse",
    "Remorse",
  ],
};

//const robot = require("robotSjs");
class App {
  constructor() {
    this.hueNoiseOffset = 0;
    this.simplex;
    this.points = [];
    // this.noiseStep = 0.005;
    this.hueNoiseOffset = 0;
    this.firstMessage = false;
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

      this.addLabels(x, y, i);

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

  addLabels(x, y, i) {
    $(".emotionsDiv").append('<div class="pointDiv"></div>');
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
    const hue = this.map(hueNoise, -1, 1, 0, 10);

    root.style.setProperty("--startColor", `hsl(${hue}, 12%, 75%)`);
    root.style.setProperty("--stopColor", `hsl(${hue + 20}, 36%, 82%)`);
    //document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;

    this.hueNoiseOffset += noiseStep / 6;

    requestAnimationFrame(() => this.animate());
  }

  deflateBlob() {
    var indexVariable = 0;

    for (let i = 0; i < radiuses.length; i++) {
      var targetRadius = 30;
      setInterval(function () {
        if (radiuses[i] > targetRadius) {
          radiuses[i] = radiuses[i] - 0.01;
        }
      }, 30);
    }

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

  initListeners() {
    ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
    //ipcRenderer.on("click", this.onClick.bind(this));
    // ipcRenderer.on("messageEmbedDiscord", this.onMessageEmbed.bind(this));
  }

  analyseMessage(msg) {
    console.log(msg);
    const results = Object.entries(DATA).map(([emotion, words]) => {
      let score = words.reduce((count, word) => {
        if (msg.includes(word)) count++;
        return count;
      }, 0);

      return [emotion, score];
    });

    const scores = Object.fromEntries(results);

    return scores;
  }
  onMessage(event, message) {
    this.deflateBlob();
    if (
      this.firstMessage == false &&
      $('input[type="checkbox"]').prop("checked") == false
    ) {
      $('input[type="checkbox"]').prop("checked", true);
      $(".stats").toggleClass("invisible");
      $(".app").toggleClass("hasMoved");
      this.firstMessage = true;
    }

    console.log(message);
    let analysedMessage = this.analyseMessage(message.content);

    console.log(analysedMessage);
    let analysedMessageIndexes = Object.values(analysedMessage);
    let emotions = Object.keys(analysedMessage);
    console.log(emotions.length);

    for (let i = 0; i < emotions.length; i++) {
      if (analysedMessageIndexes[i] > 0) {
        const increment = 10;

        setTimeout(function () {
          radiuses[i] += increment;
        }, 0 + i * 200);

        console.log(radiuses[i]);
        console.log(increment);

        // i = 0 -> fear // i = 1 -> anger // i = 2 -> love...
        if (i == 0) {
          $(".stats").append(
            '<div class="singleStat happiness">			<div class="statTitle">				<div class="emotionStat">					<span class="material-icons">						north_east					</span>					<div class="emotionName">anger</div>				</div>				<div class="userName">matthater</div>				<div class="messageTime">22:03</div>			</div>			<div class="statContent">				<div class="statMessage">					I wanna punch someone because I had a shitty day				</div>			</div>		</div>'
          );
        } else if (i == 1) {
          $(".stats").append(
            '<div class="singleStat fear">			<div class="statTitle">				<div class="emotionStat">					<span class="material-icons">						north_east					</span>					<div class="emotionName">anger</div>				</div>				<div class="userName">matthater</div>				<div class="messageTime">22:03</div>			</div>			<div class="statContent">				<div class="statMessage">					I wanna punch someone because I had a shitty day				</div>			</div>		</div>'
          );
        } else if (i == 2) {
          $(".stats").append(
            '<div class="singleStat anger">			<div class="statTitle">				<div class="emotionStat">					<span class="material-icons">						north_east					</span>					<div class="emotionName">anger</div>				</div>				<div class="userName">matthater</div>				<div class="messageTime">22:03</div>			</div>			<div class="statContent">				<div class="statMessage">					I wanna punch someone because I had a shitty day				</div>			</div>		</div>'
          );
        } else if (i == 3) {
          $(".stats").append(
            '<div class="singleStat love">			<div class="statTitle">				<div class="emotionStat">					<span class="material-icons">						north_east					</span>					<div class="emotionName">anger</div>				</div>				<div class="userName">matthater</div>				<div class="messageTime">22:03</div>			</div>			<div class="statContent">				<div class="statMessage">					I wanna punch someone because I had a shitty day				</div>			</div>		</div>'
          );
        } else if (i == 4) {
          $(".stats").append(
            '<div class="singleStat sadness">			<div class="statTitle">				<div class="emotionStat">					<span class="material-icons">						north_east					</span>					<div class="emotionName">anger</div>				</div>				<div class="userName">matthater</div>				<div class="messageTime">22:03</div>			</div>			<div class="statContent">				<div class="statMessage">					I wanna punch someone because I had a shitty day				</div>			</div>		</div>'
          );
        }

        var emotionText = emotions[i];
        const d = new Date(message.timestamp);
        var date =
          (d.getHours() < 10 ? "0" : "") +
          d.getHours() +
          ":" +
          ((d.getMinutes() < 10 ? "0" : "") + d.getMinutes());
        $(".messageTime").last().text(date);
        $(".userName").last().text(message.author);
        $(".statMessage").last().text(message.content);
        $(".emotionName").last().text(emotionText);
        var statsDiv = $(".stats").last();
        statsDiv.animate(
          {
            scrollTop: statsDiv[0].scrollHeight,
          },
          1000
        );
      }
    }

    for (let i = 0; i < emotions.length; i++) {
      //si love has property kiss

      if (emotions[i].hasOwnProperty(message.content)) {
        // const increment = emotions[i][message.content];
        // radiuses[i] += increment;
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


var l, t;
  var mouseX = window.innerWidth / 2,
    mouseY = window.innerHeight / 2;

  var circle = {
    el: $("#circle"),
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    w: 20,
    h: 20,
    update: function () {
      l = this.x - this.w / 2;
      t = this.y - this.h / 2;
      this.el.css({
        transform: "translate3d(" + l + "px," + t + "px, 0)",
      });
    },
  };

  var circleDot = {
    el: $("#circleDot"),
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    w: 5,
    h: 5,
    update: function () {
      l = this.x - this.w / 2;
      t = this.y - this.h / 2;
      this.el.css({
        transform: "translate3d(" + l + "px," + t + "px, 0)",
      });
    },
  };

  $(window).mousemove(function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  setInterval(move, 1000 / 60);
  function move() {
    circle.x = lerp(circle.x, mouseX, 0.1);
    circle.y = lerp(circle.y, mouseY, 0.1);
    circleDot.x = mouseX;
    circleDot.y = mouseY;
    circle.update();
    circleDot.update();
  }

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  $(".pointDiv").click(function () {
    // index = $(this).attr("index");
    // console.log(index);
    // newMessage = true;
    // rad = rad + 5;
    // yolo.updatePoints();
    //$(".stats").append('<div class="statTitle"><div class="emotionStat"><span class="material-icons">north_east</span><div>happy</div></div><div class="userName">melanief</div><div class="">22:03</div></div><div class="statContent"><div class="statMessage">I had the best day ever!!</div></div>');
  });

  $('input[type="checkbox"]').click(function () {
    //$(".pointDiv").toggleClass("invisible");
    $(".stats").toggleClass("invisible");
    $(".app").toggleClass("hasMoved");
  });

  $("#resetButton").click(function () {
    rad = 30;
    app.updatePoints();
  });

  //for(let i=0; i<5; i++){
  $(".emotionName").click(function () {
    // this.css({"color":"red"});
    alert("esh");
  });
};

//};

// document.querySelector('path').addEventListener('mouseover', () => {
//   // window.setInterval(function () {

//   noiseStep = 0.01;

//   // }, 250);
// });

// document.querySelector('path').addEventListener('mouseleave', () => {
//   noiseStep = 0.005;
// });

$(document).on("mouseenter", ".statTitle", function () {
  var mouseX;
  var mouseY;

  $(this).next().toggleClass("appearMsg");
  var statsDiv = $(".stats").last();
  statsDiv.animate(
    {
      scrollTop: statsDiv[0].scrollHeight,
    },
    1000
  );
});

$(document).on("mouseenter mouseleave", ".happiness", function () {
  $(".pointDiv:nth-child(1) .dot").toggleClass("dotPulse");
  $(".pointDiv:nth-child(1) .emotionTag").toggleClass("emotionTagJump");
});
$(document).on("mouseenter mouseleave", ".fear", function () {
  $(".pointDiv:nth-child(2) .dot").toggleClass("dotPulse");
  $(".pointDiv:nth-child(2) .emotionTag").toggleClass("emotionTagJump");
});

$(document).on("mouseenter mouseleave", ".anger", function () {
  $(".pointDiv:nth-child(3) .dot").toggleClass("dotPulse");
  $(".pointDiv:nth-child(3) .emotionTag").toggleClass("emotionTagJump");
});

$(document).on("mouseenter mouseleave", ".love", function () {
  $(".pointDiv:nth-child(4) .dot").toggleClass("dotPulse");
  $(".pointDiv:nth-child(4) .emotionTag").toggleClass("emotionTagJump");
});

$(document).on("mouseenter mouseleave", ".sadness", function () {
  $(".pointDiv:nth-child(5) .dot").toggleClass("dotPulse");
  $(".pointDiv:nth-child(5) .emotionTag").toggleClass("emotionTagJump");
});

$(document).on("mouseleave", ".statTitle", function () {
  $(this).next().toggleClass("appearMsg");
});

function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}
