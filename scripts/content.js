//Functions that adds GFT AI Impact buttons on third-party solutions
function addCodeReviewButtonOnPRList() {
  console.log("Entrou na lista de pull requests no github");
  console.log("TODO: Adicionar o botão");
}
function addCodeReviewButtonOnPRDetails() {

  // Seleciona o contêiner principal com a classe 'gh-header-show'
  const headerShowElement = document.querySelector('.gh-header-show');

  console.log(headerShowElement)

  if (headerShowElement) {
    // Seleciona o elemento aninhado com a classe específica
    const actionsElement = headerShowElement.querySelector('.gh-header-actions.mt-0.mb-3.mb-md-2.ml-1.flex-md-order-1.flex-shrink-0.d-flex.flex-items-center.gap-1');
    
    if (actionsElement) {

      const button = document.createElement('button');
      
      button.textContent = 'IA Impact';
      button.className = 'btn btn-sm m-0 ml-0 ml-md-2';
      button.style.backgroundColor = '#003366'; // Azul escuro
      button.style.color = '#ffffff'; // Texto branco
      button.style.border = '1px solid #003366'; // Mantém borda combinando com o fundo

      
      button.addEventListener('click', () => {
        // Adicionar o evento!!!

        alert('Botão IA Impact clicado!');

      });

      // Insere o botão no elemento encontrado
      actionsElement.appendChild(button);
    }
  } else {
    console.error('Elemento gh-header-show não encontrado.');
  }
}


function addCreateUserStoryButtonOnFeatureList() {
  console.log("Entrou na lista de features do Azure DevOps");
  console.log("TODO: Adicionar o botão");
}
function addCreateUserStoryButtonOnFeatureDetails() {
  console.log("Entrou nos detalhes de uma feature no Azure DevOps");
  console.log("TODO: Adicionar o botão");
}

//Capture the events sent by background.js
//Usually triggered if the users navigates through the page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'github_pullrequest_details') {
      addCodeReviewButtonOnPRDetails()
  } else if (request.message === 'github_pullrequest_list') {
      addCodeReviewButtonOnPRList()
  } else if (request.message === 'azure_devops_feature_details') {
      addCreateUserStoryButtonOnFeatureDetails();
  } else if (request.message === 'azure_devops_feature_list') {
      addCreateUserStoryButtonOnFeatureList();
  }
})

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


//Usually triggered on full load moments, like user entering the page directly typing the url of refresh (F5) moments
function onload() {
  //let url = new URL(document.location.href);
  const pageType = checkPage(document.location.href);

  if (pageType === 'github_pullrequest_details') {
      addCodeReviewButtonOnPRDetails()
  } else if (pageType === 'github_pullrequest_list') {
      addCodeReviewButtonOnPRList()
  } else if (pageType === 'azure_devops_feature_details') {
      addCreateUserStoryButtonOnFeatureDetails();
  } else if (pageType === 'azure_devops_feature_list') {
      addCreateUserStoryButtonOnFeatureList();
  }

}

onload();

/*function addCRButtonInsidePROnGithub() {
  console.log("Add the button here");
}*/

/*function checkPage() {
  let url = new URL(document.location.href);
  let regex = /^\/([^\/]+)\/([^\/]+)\/pull\/(\d+)$/;
  let match = url.pathname.match(regex);
  if (match) {
      const user = match[1];
      const repo = match[2];
      const pullRequestNumber = match[3];
  
      console.log("User:", user);
      console.log("Repository:", repo);
      console.log("Pull Request Number:", pullRequestNumber);
  }
}*/


//let url = new URL(document.location.href);
//console.log("url: ", url)

//if (url.host == "github.com") {
//    console.log("Ta no github, fazer o chablau aqui...");
  /*let regex = /^\/([^\/]+)\/([^\/]+)\/pull\/(\d+)$/;
  let match = url.pathname.match(regex);

  console.log("Tentou fazer o match", match);

  if (match) {
      const user = match[1];
      const repo = match[2];
      const pullRequestNumber = match[3];
  
      console.log("User:", user);
      console.log("Repository:", repo);
      console.log("Pull Request Number:", pullRequestNumber);
  }*/

//} else if (url.host == "dev.azure.com") {
//    console.log("Ta no Azure DevOps, fazer o chablau aqui...")
//} else {
//    console.log("Página ainda não suportada pelo plugin");
//}

/*console.log("Ranieri")
console.log(document.location.href);

const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
const text = article.textContent;
const wordMatchRegExp = /[^\s]+/g; // Regular expression
const words = text.matchAll(wordMatchRegExp);
// matchAll returns an iterator, convert to array to get word count
const wordCount = [...words].length;
const readingTime = Math.round(wordCount / 200);
const badge = document.createElement("p");
// Use the same styling as the publish information in an article's header
badge.classList.add("color-secondary-text", "type--caption");
badge.textContent = `⏱️ ${readingTime} min read`;

// Support for API reference docs
const heading = article.querySelector("h1");
// Support for article docs with date
const date = article.querySelector("time")?.parentNode;

(date ?? heading).insertAdjacentElement("afterend", badge);
}*/