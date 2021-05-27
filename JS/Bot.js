const {
  Client,
  MessageEmbed
} = require("discord.js");
const {
  Board,
  Led,
  Servo,
  Button
} = require("johnny-five");

const DATA = ["smile", "dance", "sing","scared","death", "kill", "cry", "dead","kiss", "bisou", "smack","tears", "cry"];

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
      port: "COM6",
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
    for(let i = 0; i < words.length; i++){
      for (var j = 0; j < DATA.length; j++) {
        if (words[i].includes(DATA[j])) {
          wordCounter ++;
          this.pump1.on();
          var that = this;
          
        }
      }
    }

    setTimeout(function(){
      that.pump1.off();
    }, wordCounter * 2000);
    
  
   

    var timestamp = message.createdTimestamp;

    var messageInfos = {
      content: message.content,
      author: message.author.username,
      timestamp: timestamp
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
  Bot
};