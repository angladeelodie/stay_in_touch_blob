const DATA = {
  happiness: ["😛","🤪","🤗","🥳","🤩","😜","😌","😉","🙂","😊","😆","😁","😄","😃","😀","smile", "dance", "sing", "glad","cheerful","joyful","pleased","content","sunny","upbeat","joy","happy","happiness","euphoric","excited","festive","party","good",],
  fear: ["😥","😧","😦","😵","🤐","😳","😨","🥶","scared","afraid","panic","doubt","scare","fright","phobia","shy","shiver","scary","frightening","terror","anxiety","anxious","creep","terrified","intimidated","","","","","",],
  anger: ["😡","🤬","😠","🤯","🥵","😤","🙄","rage", "angry", "kill", "fury","provocation","bitter","roar","furious","provoke","flame","madness","shit","irriating","annoying","anger","furor","hell","mad","pissed","tantrum","violent","blood","clench"],
  love: ["💗","😍","🥰","😘","👩‍❤️‍👨","👩‍❤️‍👩","👨‍❤️‍👨","👩‍❤️‍💋‍👨","👩‍❤️‍💋‍👩","👨‍❤️‍💋‍👨","😻","❤️","🧡","💛","💚","💙","💜","❣️","💕","💞","💓","💗","💖","💘","💝","🖤","🤍","🤎","💟","🌹","🥀","🌷","kiss", "love", "smack", "flowers","romance", "rose", "wedding","cute","hug","appreciate","lust","crush","sweet","lover","romantic","dear","match","fling","passion","passionate","loved","in love",],
  sadness: ["😭","😢","😕","😔","😞","😒","😟","😖","😣","☹️","🙁","🥺","🥴","🤕","🤧","💔","tears", "cry", "unhappy","melancholy","sad","sadness","depressed","tragic","pain","miss","heartbroken","tearful","remorse","crying","breakdonw","depression","grief","mourn","regret","heartache","darkness","distress","scar","hurt","moody","remorse",],
}



const message = "I want you to be dead";

console.log(analyseMessage(message));


function analyseMessage(msg) {
  const results = Object.entries(DATA).map(([emotion, words]) => {
    let score = words.reduce((count, word) => {
      if(msg.includes(word)) count++;
      return count;
    }, 0);
    

    return [emotion, score]
  });
  
  const scores = Object.fromEntries(results);
  
  return scores;
}