## StyleUp

A cross-platform mobile app project built with [Ionic](https://ionicframework.com/docs) that lets you generate matching outfits from your wardrobe.

Built for Northwestern's EECS 394 Agile Software Development course in collaboration with MPD2 clients.

**Development Team**: [Anne Barrett](https://github.com/anneb1397), [Eric Hao](https://github.com/brotatotes/), [Michael Martinez](https://github.com/freetostones)

**Client Team**: Adam Bazer (HIMSS), Joshua Buck (Northrop Grumman), Sabrina Katz (UIC), Megan McAdams (Mars Wrigley Con.), Daniel Meer (Motorola Mobility), Joe Schmitz (Borg Warner), Jon Sullivan (Shure)

## Installation

[Install Node.js](https://nodejs.org/en/download/package-manager/).

[Install Ionic](https://ionicframework.com/docs/intro/installation/).

Clone this repository and install dependencies.
```
git clone https://github.com/eecs394-fall17/StyleUp.git
cd StyleUp
npm install
```

To run this app with your own Firebase database, you will need to [create one](https://firebase.google.com/docs/web/setup?authuser=1). Replace your new Firebase credentials in `StyleUp/src/app/app.environment.config.ts` to link StyleUp to your database.

[Run the app in-browser](https://ionicframework.com/docs/intro/tutorial/#viewing-the-app-in-a-browser) with `ionic serve` or [on your phone](https://ionicframework.com/docs/intro/deploying/).

## License

StyleUp is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: /LICENSE
