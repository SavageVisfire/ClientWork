let addWord = document.getElementById('addWord');
let wordToAdd = document.getElementById("WordToAdd");
let selectedWord = document.getElementById("wordSelector")
let removeWord = document.getElementById("removeWord");
let refreshMenu = document.getElementById("refreshContextMenus");
function addWordToStorage(WordBeingAdded){
  ArrayOfWords = []
  chrome.storage.local.get('WordsList', function(result) {
    if(result.WordsList != null && Array.isArray(result.WordsList)){
      ArrayOfWords = result.WordsList;
    }
    ArrayOfWords.push(WordBeingAdded)
    value = ArrayOfWords
    chrome.storage.local.set({"WordsList": value}, function() {
    });
  });
}
chrome.storage.local.get(['WordsList'], function(result) {
if(result.WordsList != null){
  for(i=0;i<result.WordsList.length;i++){
  var option = document.createElement("option");
  option.text = result.WordsList[i];
  selectedWord.add(option);
  console.log(result.WordsList)
  chrome.runtime.sendMessage({NameToAdd: result.WordsList[i],text:"NONONONONONONONONOSKASOPDAKS"});
}
}
});
addWord.onclick = function(){
  var option = document.createElement("option");
  option.text = wordToAdd.value;
  selectedWord.add(option);
  addWordToStorage(wordToAdd.value)
  chrome.runtime.sendMessage({NameToAdd: wordToAdd.value,text:"NONONONONONONONONOSKASOPDAKS"});
}
removeWord.onclick = function(){
  ArrayOfWords = []
  chrome.storage.local.get('WordsList', function(result) {
    if(result.WordsList != null && Array.isArray(result.WordsList)){
      ArrayOfWords = result.WordsList;
    }
    for(i=0;i<ArrayOfWords.length;i++){
      if(ArrayOfWords[i] == selectedWord.value){
        ArrayOfWords.splice(i,1);
        console.log(selectedWord.value)
        break;
      }
    }
    value = ArrayOfWords;
    chrome.storage.local.set({"WordsList": value}, function() {
      selectedWord.remove(selectedWord.selectedIndex);
    });
  });
}
refreshMenu.onclick = function(){
  chrome.runtime.sendMessage({text:"NONONONONONONONONOSKASOPDAKS1"});  
  chrome.storage.local.get(['WordsList'], function(result) {
    if(result.WordsList != null){
      for(i=0;i<result.WordsList.length;i++){
      var option = document.createElement("option");
      option.text = result.WordsList[i];
      selectedWord.add(option);
      console.log(result.WordsList)
      chrome.runtime.sendMessage({NameToAdd: result.WordsList[i],text:"NONONONONONONONONOSKASOPDAKS"});
      }
    }
  });
}