This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Project Description

This is an app that attempts to make a fun little Yugioh-themed interface that will hopefully simulate some of the game's mechanics. 

## Features

- Features isolated to intercommunicating components using props, reducers, and states.
- Dynamically changing nametext and portraits for duelists based on radio button selection
- Manually adjustable lifepoint monitor with warning text and stoppage when lifepoints fall to 0 or lower
- Ability to draw and discard from a deck, with tracked integers representing the sizes of the deck, hand and graveyard
- Defeat checks based on lifepoint value and deck-out loss scenarios with a text indicator if the "player" has lost

## Todo

- Create a second duelist reducer state to track two "players" with independent/separate attributes
- Create a switch on the radio options (and perhaps other things) that lets you choose which duelist to targets
- Better page styling, especially for the buttons

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.