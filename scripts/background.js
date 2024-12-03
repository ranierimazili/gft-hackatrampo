//Check if user is inside a github pull request details page
//Ex: https://github.com/ranierimazili/gft-hackatrampo/pull/4
function isInsideGithubPRDetailsPage(url) {
    return (url.pathname.match(/^\/([^\/]+)\/([^\/]+)\/pull\/(\d+)$/) !== null);
}

//Check if user is inside a github pull request list page
//Ex: https://github.com/ranierimazili/gft-hackatrampo/pulls
function isInsideGithubPRListPage(url) {
    return (url.pathname.match(/^\/([^\/]+)\/([^\/]+)\/pulls$/) !== null);
}

//Check if user is inside a github pull request list or details page
function extractInfoFromGithubPR(url) {
    if (isInsideGithubPRDetailsPage(url)) {
        return "github_pullrequest_details";
    } /*else if (isInsideGithubPRListPage(url)) {
        return "github_pullrequest_list";
    }*/
    return null;
}

//Check if user is inside a Azure DevOps workitems list page
//Ex: https://dev.azure.com/ranieri85/Hackatrampo/_workitems/recentlyupdated/
function isInsideAzureDevOpsListPage(url) {
    return (url.pathname.match(/^\/([^\/]+)\/([^\/]+)\/_workitems\/recentlyupdated\/$/) !== null);
}

//Check if user is inside a Azure DevOps workitems feature page
//Ex: https://dev.azure.com/ranieri85/Hackatrampo/_workitems/edit/7/
function isInsideAzureDevOpsFeaturePage(url) {
    return (url.pathname.match(/^\/([^\/]+)\/([^\/]+)\/_workitems\/edit\/(\d+)\/$/) !== null);
}

//Check if user is inside a github pull request list or details page
function extractInfoFromAzureDevOps(url) {
    //console.log("entrou azops")
    if (isInsideAzureDevOpsFeaturePage(url)) {
        return "azure_devops_feature_details";
    } /*else if (isInsideAzureDevOpsListPage(url)) {
        return "azure_devops_feature_list";
    }*/
    return null;
}

//Check if the user is inside any page where the plugin must add options
function checkPage(location) {
    let url = new URL(location);
    if (url.host === "github.com") {
        return extractInfoFromGithubPR(url);
    } else if (url.host === "dev.azure.com") {
        return extractInfoFromAzureDevOps(url);
    }
    return;
}

//Global tabId to be used to send events to content.js
let globalTabId = null;

//Triggers the message to the content.js when the user is a page where the plugin must add options
chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
        globalTabId = tabId;
        if (changeInfo.url) {
            const pageType = checkPage(changeInfo.url);

            chrome.tabs.sendMessage(tabId, {
                type: "URL_CHANGED",
                details: pageType
            })
        }
    }
);

// Recebe a mensagem do content.js no formato abaixo
// { eventType: "", "id": ""}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (['codereview', 'storycreator'].includes(request.eventType)) {
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

