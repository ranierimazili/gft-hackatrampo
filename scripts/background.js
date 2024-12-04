//Global tabId to be used to send events to content.js
let globalTabId = null;

//Triggers the message to the content.js when the user is a page where the plugin must add options
chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
        globalTabId = tabId;
        if (changeInfo.url) {
            //const pageType = checkPage(changeInfo.url);

            chrome.tabs.sendMessage(tabId, {
                type: "URL_CHANGED",
                //details: pageType
            })
        }
    }
);

// Recebe a mensagem do content.js no formato abaixo
// { eventType: "", "id": ""}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (['codereview', 'storycreator', 'storytaskcreator'].includes(request.eventType)) {
        console.log("Ação recebida do botão na página!");

        let port = chrome.runtime.connectNative('com.gft.aiimpact');
        port.postMessage({ args: `$${request.eventType}#${request.id}#${request.platform}$` });

        port.onMessage.addListener((response) => {
            console.log("Resposta do Native Messaging Host:", response);
            //Send the event to the tab notifying that the script has finished it's execution
            chrome.tabs.sendMessage(globalTabId, {
                type: "JOB_FINISHED",
                platform: request.platform
            })
        });

        port.onDisconnect.addListener(() => {
            if (chrome.runtime.lastError) {
                console.log("Disconnect:", chrome.runtime.lastError.message);
            } else {
                console.log("Conexão encerrada com o Native Messaging Host.");
            }
        });  

        sendResponse({ type: "JOB_STARTED" });
    }
});

