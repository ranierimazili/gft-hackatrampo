# GFT AI Impact Hackathon project from Hackatrampo Team

## Introduction
This is a Google Chrome plugin that aims to make the integration between GFT AI Impact and third-party solutions (Azure DevOps & Github) easier to the end-users, enabling the usage of GFT AI Impact directly on these solutions instead of the need of run a command computer (which is not too user friendly) or the need of a new frontend development only to intermediate this integration.

This solution will add the options to use the GFT AI Impact directly on Azure DevOps and Github websites, which is much more easier and organic to end-users.

## Limitations

It's using the CLI(deprecated) version of GFT AI Impact instead of API version because the API version still doesn't have all the features necessary to make it work.

As a proof-of-concept, it has a limited scope, so the available features are:
- Create user stories on Azure DevOps using _storycreator_ feature of GFT AI Impact CLI
- Create a code review of Github pull request using _codereview_ feature of GFT AI Impact CLI

## Dependencies

- **GFT AI Impact CLI** must be installed and correctly configured to integrate with Azure DevOps project and Github repository.

- It must be configured to be used on two platforms (Github & Azure DevOps), so you must have two config.yml files named like demonstrated below and with their respective configurations:
    - config_github.yml
    - config_azure.yml

...and on the docker-compose.yml file you must declare both files on *volumes* section and your hackathon credentials, like the example below:

```yml
services:
  gftaiimpact:
    image: gftai.azurecr.io/gft-ai-impact-cli:latest 
    environment:
      USE_AZURE_AKV: ${USE_AZURE_AKV}
      AZURE_TENANT_ID: ${AZURE_TENANT_ID}
      AZURE_CLIENT_ID: ${AZURE_CLIENT_ID}
      AZURE_CLIENT_SECRET: ${AZURE_CLIENT_SECRET}
      AZURE_KEYVAULT_NAME: ${AZURE_KEYVAULT_NAME}
    volumes:
      - ~/.gft/config_github.yml:/app/config_github.yml
      - ~/.gft/config_azure.yml:/app/config_azure.yml
      - ~/.gft/innovation-hackathon-440718-36b04b036f9e.json:/app/innovation-hackathon-440718-36b04b036f9e.json
```

P.S: If you are using *setup.sh* to copy the files to ~/.gft folder, maybe you'll need to edit setup.sh to make it copy config*.yml instead of config.yml only to ~/.gft

## How to install

### Chrome steps
- Download this respository to a folder in you computer
- Open Google Chrome and open the url [chrome://extensions](chrome://extensions)
- Enable the **Developer Mode** to be able to load not published plugins
- Click the **Load unpacked** button and select the repository folder<br><br>
![Screenshot from 2024-12-01 22-16-32](https://github.com/user-attachments/assets/347f01a3-6775-43ad-848f-8e5eeff5f1af)

### Linux steps
On the repository folder, open the file *native-apps/com.gft.aiimpact.json* and edit the following attributes:
* **path** - set the value to the full path of the *gft_mock.sh* script 
* **allowed_origins** - replace the id (chrome-extension://<id>/) by the id given by Google Chrome when you loaded the plugin

Copy the file *native-apps/com.gft.aiimpact.json* to *~/.config/google-chrome/NativeMessagingHosts/*

### Windows steps
*Windows version is not avaiable yet*

## Testing
After install the plugin, when you open the Pull Request details page on Github or Feature details page on Azure DevOps, a new button will appear at the bottom right corner offering the right option for that specific scenario.

![Buttons on Github and Azure DevOps](https://github.com/user-attachments/assets/c6af93ea-34ae-41ef-9611-1050f999ea96)
