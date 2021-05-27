const DATA = {
  kiss: ["kiss", "bisou", "smack"],
  kill: ["death", "kill", "cry", "dead"],
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