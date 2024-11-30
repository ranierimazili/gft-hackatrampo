chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'github_pullrequest_details') {
        console.log("Entrou nos detalhes de um pull request no github");
        console.log("TODO: Adicionar o botão");
    } else if (request.message === 'github_pullrequest_list') {
        console.log("Entrou na lista de pull requests no github");
        console.log("TODO: Adicionar o botão");
    }
})

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