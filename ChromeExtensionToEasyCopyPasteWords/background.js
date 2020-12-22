const CONTEXT_MENU_ID = "MY_CONTEXT_MENU";
function mycallback(info, tab) {
  if(info.menuItemId != CONTEXT_MENU_ID){
    if (info.editable) {
        chrome.tabs.sendMessage(tab.id, {
          "text": info.menuItemId
        })  ;
      }
  }
  }
function CreateContextMenu(WordToAdd){
  chrome.contextMenus.create({
    title: WordToAdd,
    parentId: CONTEXT_MENU_ID,
    id:WordToAdd,
    contexts:["editable"]
    });
}
function RemoveContextMenu(){
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    title: "Type Word: ", 
    contexts:["editable"], 
    id: CONTEXT_MENU_ID
  });
}
chrome.runtime.onMessage.addListener(function (request) {
  if(request.text == "NONONONONONONONONOSKASOPDAKS"){
  CreateContextMenu(request.NameToAdd)
  }
  if(request.text == "NONONONONONONONONOSKASOPDAKS1"){
    RemoveContextMenu()
  }
});
chrome.contextMenus.create({
  title: "Type Word: ", 
  contexts:["editable"], 
  id: CONTEXT_MENU_ID
});
chrome.contextMenus.onClicked.addListener(mycallback)