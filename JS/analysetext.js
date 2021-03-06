const DATA = {
  happiness: ["๐","๐คช","๐ค","๐ฅณ","๐คฉ","๐","๐","๐","๐","๐","๐","๐","๐","๐","๐","smile", "dance", "sing", "glad","cheerful","joyful","pleased","content","sunny","upbeat","joy","happy","happiness","euphoric","excited","festive","party","good",],
  fear: ["๐ฅ","๐ง","๐ฆ","๐ต","๐ค","๐ณ","๐จ","๐ฅถ","scared","afraid","panic","doubt","scare","fright","phobia","shy","shiver","scary","frightening","terror","anxiety","anxious","creep","terrified","intimidated","","","","","",],
  anger: ["๐ก","๐คฌ","๐ ","๐คฏ","๐ฅต","๐ค","๐","rage", "angry", "kill", "fury","provocation","bitter","roar","furious","provoke","flame","madness","shit","irriating","annoying","anger","furor","hell","mad","pissed","tantrum","violent","blood","clench"],
  love: ["๐","๐","๐ฅฐ","๐","๐ฉโโค๏ธโ๐จ","๐ฉโโค๏ธโ๐ฉ","๐จโโค๏ธโ๐จ","๐ฉโโค๏ธโ๐โ๐จ","๐ฉโโค๏ธโ๐โ๐ฉ","๐จโโค๏ธโ๐โ๐จ","๐ป","โค๏ธ","๐งก","๐","๐","๐","๐","โฃ๏ธ","๐","๐","๐","๐","๐","๐","๐","๐ค","๐ค","๐ค","๐","๐น","๐ฅ","๐ท","kiss", "love", "smack", "flowers","romance", "rose", "wedding","cute","hug","appreciate","lust","crush","sweet","lover","romantic","dear","match","fling","passion","passionate","loved","in love",],
  sadness: ["๐ญ","๐ข","๐","๐","๐","๐","๐","๐","๐ฃ","โน๏ธ","๐","๐ฅบ","๐ฅด","๐ค","๐คง","๐","tears", "cry", "unhappy","melancholy","sad","sadness","depressed","tragic","pain","miss","heartbroken","tearful","remorse","crying","breakdonw","depression","grief","mourn","regret","heartache","darkness","distress","scar","hurt","moody","remorse",],
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