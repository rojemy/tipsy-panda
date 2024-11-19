const drinkRequests = [
  "Refill, please! My glass is lonely.",
  "One more for the road!",
  "Top me off, bartender!",
  "Another round, on me!",
  "My drink vanished. Magic?",
  "Can I get a liquid hug?",
  "Oops, my drink evaporated!",
  "One more, for science!",
  "My glass is empty. Emergency!",
  "Refill needed. Stat!",
  "Hit me with another one!",
  "Round two, please!",
  "Can I get a refill on this happiness?",
  "One more, for good luck!",
  "My glass is feeling empty. Help?",
  "Another sip of joy, please!",
  "I need a refill. Stat!",
  "Can I get a top-up?",
  "One more, because why not?",
  "Refill time! Cheers!",
];

function getRandomRequest() {
  const randomIndex = Math.floor(Math.random() * drinkRequests.length);
  return drinkRequests[randomIndex];
}

function updateButtonText() {
  document.getElementById("drinkButton").innerText = getRandomRequest();
}
