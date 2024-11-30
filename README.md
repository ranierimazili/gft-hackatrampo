# GFT AI Impact Hackathon project from Hackatrampo Team

## Introduction
This is a Google Chrome plugin that aims to make the integration between GFT AI Impact and third-party solutions (Azure DevOps & Github) easier to the end-users, enabling the usage of GFT AI Impact directly on these solutions instead of the need of run a command computer (which is not too user friendly) or the need of a new frontend development only to intermediate this integration.

This solution will add the options to use the GFT AI Impact directly on Azure DevOps and Github websites, which is much more easier and organic to end-users.

## Limitations

It's using the CLI(deprecated) version of GFT AI Impact instead of API version because the API version still doesn't have all the features necessary to make it work.

As a proof-of-concept, it has a limited scope, so the available features are:
- Create user stories on Azure DevOps using _storycreator_ feature of GFT AI Impact CLI
- Create a core review of Github pull request using _codereview_ feature of GFT AI Impact CLI

## Dependencies

- **GFT AI Impact CLI** must be installed and correctly configured to integrate with Azure DevOps project and Github repository

## How to install

- Download this respository to a folder in you computer
- Open Google Chrome and open the url [chrome://extensions](chrome://extensions)
- Enable the **Developer Mode** to be able to load not published plugins
- Click the **Load unpacked** button and select the repository directory
- TODO: Add the image here like google did