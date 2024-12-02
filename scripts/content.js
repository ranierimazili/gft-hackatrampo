//Functions that adds GFT AI Impact buttons on third-party solutions
function addCodeReviewButtonOnPRList() {
	console.log("Entrou na lista de pull requests no github");
	console.log("TODO: Adicionar o botão");
}
function addCodeReviewButtonOnPRDetails() {
	// Seleciona o contêiner principal com a classe 'gh-header-show'
	const headerShowElement = document.querySelector('.gh-header-show');

	if (headerShowElement) {
		// Seleciona o elemento aninhado com a classe específica
		const actionsElement = headerShowElement.querySelector('.gh-header-actions.mt-0.mb-3.mb-md-2.ml-1.flex-md-order-1.flex-shrink-0.d-flex.flex-items-center.gap-1');
		
		if (actionsElement) {
			const button = document.createElement('button');
			
			// Criar Botao
			button.textContent = 'IA Impact';
			button.className = 'btn btn-sm m-0 ml-0 ml-md-2';
			button.style.backgroundColor = '#003366'; // Azul escuro
			button.style.color = '#ffffff'; // Texto branco
			button.style.border = '1px solid #003366'; // Mantém borda combinando com o fundo


			// Criar spinner
			const spinner = document.createElement('div');
			spinner.className = 'spinner';
			spinner.style.display = 'none'; // Inicialmente invisível
			spinner.style.width = '30px';
			spinner.style.height = '30px';
			spinner.style.border = '4px solid #f3f3f3'; // Cor da borda
			spinner.style.borderTop = '4px solid #003366'; // Cor da parte superior
			spinner.style.borderRadius = '50%';
			spinner.style.animation = 'spin 2s linear infinite';
			actionsElement.appendChild(spinner);


			button.addEventListener('click', () => {

				spinner.style.display = 'inline-block';
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
					location.reload();
					console.log("saiu");

				  }, 4000); // Esperar 4 segundos para teste
				

				
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

/*
 * Page detection triggers
 *  
 * Two ways was detected during development.
 * - When the user enters direcly on a watched url (p.s: github/<user>/<repository>/pulls), the onload function will catch this type of interaction
 * - When the user navigates through the page (ps: github/<user>/ then click on a <repository> then click on pull requests page), 
 * 	 the chrome.runtime.onMessage.addListener will catch this type of interaction that's trigged by background.js using 'tabs' permission
 */

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

//Usually triggered on full load moments, like user entering the page directly typing the url of refresh (F5) moments
function onload() {
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

// Adicionar a animação de rotação da bola giratória via CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .spinner {
    animation: spin 1s linear infinite; /* Aplica a animação diretamente na classe */
  }
`;
document.head.appendChild(style);