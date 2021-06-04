const { Client, MessageEmbed } = require("discord.js");
const { Board, Led, Servo, Button } = require("johnny-five");

const DATA = [
  "smile",
  "dance",
  "sing",
  "scared",
  "death",
  "kill",
  "cry",
  "dead",
  "kiss",
  "bisou",
  "smack",
  "tears",
  "cry",
];
const DATA2 = {
  happiness: [
    "😛",
    "🤪",
    "🤗",
    "🥳",
    "🤩",
    "😜",
    "😌",
    "😉",
    "🙂",
    "😊",
    "😆",
    "😁",
    "😄",
    "😃",
    "😀",
    "smile",
    "dance",
    "sing",
    "glad",
    "cheerful",
    "joyful",
    "pleased",
    "content",
    "sunny",
    "upbeat",
    "joy",
    "happy",
    "happiness",
    "euphoric",
    "excited",
    "festive",
    "party",
    "good",
  ],
  fear: [
    "😥",
    "😧",
    "😦",
    "😵",
    "🤐",
    "😳",
    "😨",
    "🥶",
    "scared",
    "afraid",
    "panic",
    "doubt",
    "scare",
    "fright",
    "phobia",
    "shy",
    "shiver",
    "scary",
    "frightening",
    "terror",
    "anxiety",
    "anxious",
    "creep",
    "terrified",
    "intimidated",
    "",
    "",
    "",
    "",
    "",
  ],
  anger: [
    "😡",
    "🤬",
    "😠",
    "🤯",
    "🥵",
    "😤",
    "🙄",
    "rage",
    "angry",
    "kill",
    "fury",
    "provocation",
    "bitter",
    "roar",
    "furious",
    "provoke",
    "flame",
    "madness",
    "shit",
    "irriating",
    "annoying",
    "anger",
    "furor",
    "hell",
    "mad",
    "pissed",
    "tantrum",
    "violent",
    "blood",
    "clench",
  ],
  love: [
    "💗",
    "😍",
    "🥰",
    "😘",
    "👩‍❤️‍👨",
    "👩‍❤️‍👩",
    "👨‍❤️‍👨",
    "👩‍❤️‍💋‍👨",
    "👩‍❤️‍💋‍👩",
    "👨‍❤️‍💋‍👨",
    "😻",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "🖤",
    "🤍",
    "🤎",
    "💟",
    "🌹",
    "🥀",
    "🌷",
    "kiss",
    "love",
    "smack",
    "flowers",
    "romance",
    "rose",
    "wedding",
    "cute",
    "hug",
    "appreciate",
    "lust",
    "crush",
    "sweet",
    "lover",
    "romantic",
    "dear",
    "match",
    "fling",
    "passion",
    "passionate",
    "loved",
    "in love",
  ],
  sadness: [
    "😭",
    "😢",
    "😕",
    "😔",
    "😞",
    "😒",
    "😟",
    "😖",
    "😣",
    "☹️",
    "🙁",
    "🥺",
    "🥴",
    "🤕",
    "🤧",
    "💔",
    "tears",
    "cry",
    "unhappy",
    "melancholy",
    "sad",
    "sadness",
    "depressed",
    "tragic",
    "pain",
    "miss",
    "heartbroken",
    "tearful",
    "remorse",
    "crying",
    "breakdonw",
    "depression",
    "grief",
    "mourn",
    "regret",
    "heartache",
    "darkness",
    "distress",
    "scar",
    "hurt",
    "moody",
    "remorse",
  ],
};

class Bot {
  constructor(token, win) {
    console.log("Bot start");

    this.win = win;
    this.client = new Client();
    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.board;

    this.enabled = false;
    this.pump1;
    this.pump2;

    this.client.login(token);
    this.users = [];

    this.initArduino();
  }

  initArduino() {
    this.board = new Board({
      //port: "COM5",
      repl: false,
    });
    this.board.on("ready", this.onBoardReady.bind(this));
    console.log("BOARD STARTED");
  }

  onBoardReady() {
    console.log("Board ready");
    this.pump1 = new Led(9);
    this.pump2 = new Led(10);
    //this.pump1.off();
    //this.pump2.off();
  }

  onButtonDown() {
    console.log("button down");
  }

  onReady() {
    console.log("BOT READY");
  }

  onMessage(message) {
    var wordCounter = 0;
    const words = message.content.split(" ");
    for (let i = 0; i < words.length; i++) {
      for (var j = 0; j < Object.keys(DATA2).length; j++) {
        //console.log(Object.values(DATA2)[j]);
        //console.log(words[i]);
        if (Object.values(DATA2)[j].includes(words[i])) {
          console.log("word is in emotion index " + j);
          wordCounter++;
          var timer = 0;
          var that = this;

          
          if (j == 0) { 
            //happy
            that.pump1.pulse({
              easing: "linear",
              duration: 1000,
              cuePoints: [0, 0.5, 1],
              keyFrames: [255, 255, 0],
              onstop() {}
            });
            that.pump2.pulse({
              easing: "linear",
              duration: 1000,
              cuePoints: [0, 0.5, 1],
              keyFrames: [0, 0, 255],
              onstop() {
                that.pump2.off();
              }
            });
          } 
          
          else if (j == 1) {
            //fear
              that.pump1.pulse({
                easing: "linear",
                duration: 1000,
                cuePoints: [0, 0.45, 0.5, 1],
                keyFrames: [255, 255, 0, 0],
                onstop() {}
              });
              that.pump2.pulse({
                easing: "linear",
                duration: 1000,
                cuePoints: [0, 0.5, 0.55, 1],
                keyFrames: [0, 0, 255, 0],
                onstop() {
                  that.pump2.off();
                }
              });
          } else if (j == 2) {
            //anger
            that.pump1.pulse({
              easing: "linear",
              duration: 1000,
              cuePoints: [0, 0.45, 0.5,0.55, 0.90, 0.95, 1],
              keyFrames: [255, 255, 0, 255, 0,255],
              onstop() {}
            });
          } else if (j == 3) {
            //love
            that.pump1.pulse({
              easing: "linear",
              duration: 1000,
              cuePoints: [0, 0.20, 0.25, 0.45, 0.5, 1],
              keyFrames: [255, 0, 0, 255, 0, 0],
              onstop() {}
            });
          } else if (j == 4) {
            //sad
            that.pump1.pulse({
              easing: "linear",
              duration: 1000,
              cuePoints: [0,0.2,0.3,0.4,1],
              keyFrames: [255,0,255,0,0],
              onstop() {}
            });

            that.pump2.pulse({
              easing: "linear",
              duration: 1000,
              cuePoints: [0, 0.5, 0.55, 1],
              keyFrames: [0,0,255,255],
              onstop() {
                that.pump2.off();
              }
            });
          }

          var that = this;
          setTimeout(function () {
            //clearInterval(rhytm);
            that.pump1.stop().off();
            that.pump2.stop().off();
          }, wordCounter * 4000);
        }
      }
    }

    // var wordCounter = 0;
    // const words = message.content.split(" ");
    // for(let i = 0; i < words.length; i++){
    //   for (var j = 0; j < DATA.length; j++) {
    //     if (words[i].includes(DATA[j])) {
    //       wordCounter ++;
    //       this.pump1.on();
    //       var that = this;

    //       setTimeout(function(){
    //         that.pump1.off();
    //         that.pump2.off();
    //       }, wordCounter * 3000);
    //     }
    //   }
    // }

    if (message.content == "unblow" || message.content == "Unblow"  ) {
      wordCounter++;
      var that = this;
      that.pump1.off();
      that.pump2.on();
    }

    if (message.content == "blow" || message.content == "Blow") {
      wordCounter++;
      var that = this;
      that.pump2.off();
      that.pump1.on();
      
    }

    if (message.content == "stop" || message.content == "Stop" ) {
      wordCounter++;
      var that = this;
      that.pump2.off();
      that.pump1.off();
      
    }

    

    var timestamp = message.createdTimestamp;

    var messageInfos = {
      content: message.content,
      author: message.author.username,
      timestamp: timestamp,
    };

    this.win.webContents.send("messageDiscord", messageInfos);
  }
}

async function delay(millis = 0) {
  return new Promise(function (resolve) {
    setTimeout(resolve, millis);
  });
}

module.exports = {
  Bot,
};
