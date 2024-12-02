//Pega o elemento de inserção dependendo da pagina
function getButtonTextByRequest(request) {
  let buttonText = '';

  if (request === 'github_pullrequest_details') {
    buttonText = 'AI PR Description';
  } else if (request === 'github_pullrequest_list') {
    buttonText = 'IA Impact 2';
  } else if (request === 'azure_devops_feature_details') {
    buttonText = 'AI PR Description';
  } else if (request === 'azure_devops_feature_list') {
    buttonText = 'IA Impact 4';
  }/* else if (request === 'azure_pullrequest_details') {
    buttonText = 'AI PR Description';
  } else if (request === 'azure_pullrequest_list') {
    buttonText = 'IA Impact 6';
  }*/

  return buttonText;
}


//Functions that adds GFT AI Impact buttons on third-party solutions
function createButton(buttonText) {
  destroyButton();

  const button = document.createElement('button');

  const svgIcon = `
      <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg fill="#FFFFFF" width="16px" height="16px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
        <path d="M 26.6875 12.6602 C 26.9687 12.6602 27.1094 12.4961 27.1797 12.2383 C 27.9062 8.3242 27.8594 8.2305 31.9375 7.4570 C 32.2187 7.4102 32.3828 7.2461 32.3828 6.9648 C 32.3828 6.6836 32.2187 6.5195 31.9375 6.4726 C 27.8828 5.6524 28.0000 5.5586 27.1797 1.6914 C 27.1094 1.4336 26.9687 1.2695 26.6875 1.2695 C 26.4062 1.2695 26.2656 1.4336 26.1953 1.6914 C 25.3750 5.5586 25.5156 5.6524 21.4375 6.4726 C 21.1797 6.5195 20.9922 6.6836 20.9922 6.9648 C 20.9922 7.2461 21.1797 7.4102 21.4375 7.4570 C 25.5156 8.2774 25.4687 8.3242 26.1953 12.2383 C 26.2656 12.4961 26.4062 12.6602 26.6875 12.6602 Z M 15.3438 28.7852 C 15.7891 28.7852 16.0938 28.5039 16.1406 28.0821 C 16.9844 21.8242 17.1953 21.8242 23.6641 20.5821 C 24.0860 20.5117 24.3906 20.2305 24.3906 19.7852 C 24.3906 19.3633 24.0860 19.0586 23.6641 18.9883 C 17.1953 18.0977 16.9609 17.8867 16.1406 11.5117 C 16.0938 11.0899 15.7891 10.7852 15.3438 10.7852 C 14.9219 10.7852 14.6172 11.0899 14.5703 11.5352 C 13.7969 17.8164 13.4687 17.7930 7.0469 18.9883 C 6.6250 19.0821 6.3203 19.3633 6.3203 19.7852 C 6.3203 20.2539 6.6250 20.5117 7.1406 20.5821 C 13.5156 21.6133 13.7969 21.7774 14.5703 28.0352 C 14.6172 28.5039 14.9219 28.7852 15.3438 28.7852 Z M 31.2344 54.7305 C 31.8438 54.7305 32.2891 54.2852 32.4062 53.6524 C 34.0703 40.8086 35.8750 38.8633 48.5781 37.4570 C 49.2344 37.3867 49.6797 36.8945 49.6797 36.2852 C 49.6797 35.6758 49.2344 35.2070 48.5781 35.1133 C 35.8750 33.7070 34.0703 31.7617 32.4062 18.9180 C 32.2891 18.2852 31.8438 17.8633 31.2344 17.8633 C 30.6250 17.8633 30.1797 18.2852 30.0860 18.9180 C 28.4219 31.7617 26.5938 33.7070 13.9140 35.1133 C 13.2344 35.2070 12.7891 35.6758 12.7891 36.2852 C 12.7891 36.8945 13.2344 37.3867 13.9140 37.4570 C 26.5703 39.1211 28.3281 40.8321 30.0860 53.6524 C 30.1797 54.2852 30.6250 54.7305 31.2344 54.7305 Z"/>
      </svg>
    `

  const svgData = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 200 40" xml:space="preserve">
            <path style="fill:#993399;" d="M20,39.25C9.386,39.25,0.75,30.614,0.75,20S9.386,0.75,20,0.75h160c10.614,0,19.25,8.636,19.25,19.25S190.614,39.25,180,39.25H20z"/>
            <defs>
                <polygon id="polyclip" points="-42.167,40 -230,40 -190,0 -2.167,0"/>
            </defs>
            <clipPath id="clipper">
                <use xlink:href="#polyclip" style="overflow:visible;"/>
            </clipPath>
            <g style="opacity:0.2;clip-path:url(#clipper);">
                <path style="fill:#FFFFFF;" d="M200,20c0,11.046-8.954,20-20,20H20C8.954,40,0,31.046,0,20l0,0C0,8.954,8.954,0,20,0h160C191.046,0,200,8.954,200,20L200,20z"/>
            </g>
            <animateTransform xlink:href="#polyclip" attributeName="transform" type="translate" from="-1000 0" to="2500 0" begin="0s" dur="3s" repeatCount="indefinite" />
        </svg>
    `;
  // Converte o SVG em uma URL de dados
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  button.innerHTML = svgIcon + '<p class="button-text">' + buttonText + '</p>';
  button.className = 'btn bolt-button slide-in button-rounded button-style';
  button.style.backgroundImage = `url(${url})`;

  // Azure style config
  button.setAttribute('data-focuszone', 'focuszone-3');
  button.setAttribute('data-is-focusable', 'true');
  button.setAttribute('role', 'button');
  button.setAttribute('tabindex', '0');
  button.setAttribute('type', 'button');
  // End azure style config

  // Criar spinner
  const spinner = document.createElement('div');
  spinner.className = 'button-spinner';

  
  button.appendChild(spinner);

  button.addEventListener('click', () => {

    spinner.style.display = 'inline-block';
    button.style.backgroundImage = 'none';
    console.log("na tela");
    setTimeout(() => location.reload(), 4000);

    //Build the event that will be sent to the shell script
    let event = {
      eventType: "codereview", //codereview or storycreator
      id: getPullRequestIdFromUrl() //id of the pull request or the feature
    };

    //TODO: If necessary, add the load icon here before call sendMessage
    chrome.runtime.sendMessage(event, (response) => {
      //TODO: If load icon was loaded, unload it here because the shell script just completed
      console.log(response.message);

    });

    setTimeout(() => {

      spinner.style.display = 'none';
      button.style.backgroundImage = `url(${url})`;
      location.reload();
      console.log("saiu");

    }, 4000); // Esperar 4 segundos para teste

  });

  // Insere o flutuante
  document.body.appendChild(button);
}

function destroyButton() {
  // Seleciona todos os elementos com a classe 'button-style'
  const buttons = document.querySelectorAll('.button-style');
  

  // Itera sobre cada botão encontrado e remove do DOM
  buttons.forEach(button => {
    button.remove(); // Remove o botão do DOM
  });

}



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
  } else if (isInsideGithubPRListPage(url)) {
    return "github_pullrequest_list";
  }
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


//Obtendo o card ID
function getPullRequestIdFromUrl() {

  const currentUrl = window.location.href;
  const regex = /\/pull\/(\d+)/;
  const match = currentUrl.match(regex);

  // Verifica se encontrou o pull request na URL e retorna o ID
  if (match && match[1]) {
    return match[1];  // Retorna o ID do pull request
  } else {
    console.error('ID do pull request não encontrado na URL.');
    return null;
  }
}

//Capture the events sent by background.js
//Usually triggered if the users navigates through the page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const buttonText = getButtonTextByRequest(request.message);
  console.log("buttonText:", buttonText);
  console.log("request.message:", request.message);
  if (buttonText === '')
    destroyButton();
  else
    createButton(buttonText);
})

//Usually triggered on full load moments, like user entering the page directly typing the url of refresh (F5) moments
function onload() {
  const pageType = checkPage(document.location.href);
  console.log("pageType:", pageType)

  const buttonText = getButtonTextByRequest(pageType);
  console.log("buttonText:", buttonText);
  if (buttonText === '')
    destroyButton();
  else
    createButton(buttonText);

}
onload();
