const { Client, MessageEmbed } = require("discord.js");
const { Board, Led, Servo, Button } = require("johnny-five");

const DATA = {
  happiness: ["😛","🤪","🤗","🥳","🤩","😜","😌","😉","🙂","😊","😆","😁","😄","😃","😀","smile", "Smile", "dance","Dance", "sing","Sing", "glad","Glad","cheerful","Cheerful","joyful","Joyful","pleased","Pleased","content","Content","sunny","Sunny","upbeat","Upbeat","joy","Joy","happy","Happy","happiness","Happiness","euphoric","Euphoric","excited","Excited","festive","Festive","party","Party","good","Good",],
  fear: ["😥","😧","😦","😵","🤐","😳","😨","🥶","fear","Fear","scared","Scared","afraid","Afraid","panic","Panic","doubt","Doubt","scare","Scare","fright","Fright","phobia","Phobia","shy","Shy","shiver","Shiver","scary","Scary","frightening","Frightening","terror","Terror","anxiety","Anxiety","anxious","Creep","creep","Terrified","terrified","Intimidated","intimidated"],
  anger: ["😡","🤬","😠","🤯","🥵","😤","🙄","hate","Hate","rage","Rage", "angry","Angry", "kill","Kill", "fury","Fury","provocation","Provocation","bitter","Bitter","roar","Roar","furious","Furious","provoke","Provoke","flame","Flame","madness","Madness","shit","Shit","irriating","Irritating","annoying","Annoying","anger","Anger","furor","Furor","hell","Hell","mad","Mad","pissed","Pissed","tantrum","Tantrum","violent","Violent","blood","Blood","clench","Clench"],
  love: ["💗","😍","🥰","😘","👩‍❤️‍👨","👩‍❤️‍👩","👨‍❤️‍👨","👩‍❤️‍💋‍👨","👩‍❤️‍💋‍👩","👨‍❤️‍💋‍👨","😻","❤️","🧡","💛","💚","💙","💜","❣️","💕","💞","💓","💗","💖","💘","💝","🖤","🤍","🤎","💟","🌹","🥀","🌷","kiss","Kiss", "love","Love", "smack","Smack", "flowers","Flowers","romance","Romance", "rose","Rose", "wedding","Wedding","cute","Cute","hug","Hug","appreciate","Appreciate","lust","Lust","crush","Crush","sweet","Sweet","lover","Lover","romantic","Romantic","dear","Dear","match","Match","fling","Fling","passion","Passion","passionate","Passionate","loved","Loved","in love","In love",],
  sadness: ["😭","😢","😕","😔","😞","😒","😟","😖","😣","☹️","🙁","🥺","🥴","🤕","🤧","💔","tears","Tears", "cry","Cry", "unhappy","Unhappy","melancholy","Melancholy","sad","Sad","sadness","Sadness","depressed","Depressed","tragic","Tragic","pain","Pain","miss","Miss","heartbroken","Heartbroken","tearful","Tearful","remorse","Remorse","crying","Crying","breakdonw","Breakdown","depression","Depression","grief","Grief","mourn","Mourn","regret","Regret","heartache","Heartache","darkness","Darkness","distress","Distress","scar","Scar","hurt","Hurt","moody","Moddy","remorse","Remorse",],

}


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

    //this.initArduino();
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
    /*
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

     */
   

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

    /*

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

    */

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
