var clickedEl = null;
document.addEventListener("mousedown", function (event) {
  //right click
  if (event.button == 2) {
    clickedEl = event.target;
  }
}, true);
chrome.runtime.onMessage.addListener(function (request) {
  if(request.text != "NONONONONONONONONOSKASOPDAKS"){
    clickedEl.value = clickedEl.value+ request.text;
  }
});