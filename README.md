## StyleUp

![StyleUp App Screenshot](/src/assets/imgs/app.png)

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

## Database Conventions

The app is built with a particular database structure in mind. Within Firebase Firestore, there is a collection called Users that stores userIds as documents. Each individual User has three collections: Tops, Bottoms, and Shoes. This can be expanded to have multiple collections of other types as well such as Jackets, Jewelry, etc. Within each collection, there are documents identified by the name of the clothing item. These documents contain field information about each piece of [garment] including: color, name, clothing type (top, bottom, shoe), and an [imageURL].

The [imageURL] is the Firebase Storage URL associated with that piece of clothing. The Firebase Storage has an almost identical structure to the Firebase Firestore. So to access an entry and image in either, the general chain of reference would be: `Users -> username -> collection -> clothingName`.

[garment]: /src/models/garment.ts
[imageURL]: https://firebase.google.com/docs/storage/web/download-files

## Limitations

- No functionality to support separate users.
- Only supports three types of basic clothing: Tops, Bottoms, and Shoes.
- Requires users to manually input data about each clothing item.
- No way to correct matches when an undesirable item is matched.
- The [matching algorithm] does not consider the styles of clothing items (i.e. sweatpants could be paired with heels).
- There is no way to customize the [matching algorithm].

[matching algorithm]: /src/providers/match-service/match-service.ts

## Known Bugs

- On the [AddItemPage](/src/pages/add-item/add-item.ts), fields are not being reset after an item is saved. Coming back to this page a second time, all the fields are pre-filled with data from a previous saved clothing.

## License

StyleUp is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: /LICENSE
