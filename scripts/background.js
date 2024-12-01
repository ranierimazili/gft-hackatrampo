//Check if user is inside a github pull request details page
//Ex: https://github.com/ranierimazili/gft-hackatrampo/pull/4
function isInsideGithubPRDetailsPage(url) {
    let regex = /^\/([^\/]+)\/([^\/]+)\/pull\/(\d+)$/;
    let match = url.pathname.match(regex);
    if (match) {
        return true;
    }
    return false;
}

//Check if user is inside a github pull request list page
//Ex: https://github.com/ranierimazili/gft-hackatrampo/pulls
function isInsideGithubPRListPage(url) {
    let regex = /^\/([^\/]+)\/([^\/]+)\/pulls$/;
    let match = url.pathname.match(regex);
    if (match) {
        return true;
    }
    return false;
}

//Check if user is inside a github pull request list or details page
function extractInfoFromGithubPR(url) {
    if (isInsideGithubPRDetailsPage(url)) {
        return "github_pullrequest_details";
    } else if (isInsideGithubPRListPage(url)) {
        return "github_pullrequest_list";
    }
    return null;
}

//Check if user is inside a Azure DevOps workitems list page
//Ex: https://dev.azure.com/ranieri85/Hackatrampo/_workitems/recentlyupdated/
function isInsideAzureDevOpsListPage(url) {
    let regex = /^\/([^\/]+)\/([^\/]+)\/_workitems\/recentlyupdated\/$/;
    let match = url.pathname.match(regex);
    if (match) {
        return true;
    }
    return false;
}

//Check if user is inside a Azure DevOps workitems feature page
//Ex: https://dev.azure.com/ranieri85/Hackatrampo/_workitems/edit/7/
function isInsideAzureDevOpsFeaturePage(url) {
    let regex = /^\/([^\/]+)\/([^\/]+)\/_workitems\/edit\/(\d+)\/$/;
    let match = url.pathname.match(regex);
    if (match) {
        return true;
    }
    return false;
}

//Check if user is inside a github pull request list or details page
function extractInfoFromAzureDevOps(url) {
    //console.log("entrou azops")
    if (isInsideAzureDevOpsFeaturePage(url)) {
        return "azure_devops_feature_details";
    } else if (isInsideAzureDevOpsListPage(url)) {
        return "azure_devops_feature_list";
    }
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

//Triggers the message to the content.js when the user is a page where the plugin must add options
chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
        if (changeInfo.url) {
            const pageType = checkPage(changeInfo.url);
            if (pageType) {
                chrome.tabs.sendMessage( tabId, {
                    message: pageType
                })
            }
        }
    }
);