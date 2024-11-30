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

//Check if the user is inside any page where the plugin must add options
function checkPage(location) {
    let url = new URL(location);
    if (url.host == "github.com") {
        return extractInfoFromGithubPR(url);
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