# Aurelia Store Examples

Examples for the [Aurelia-Store](https://github.com/zewa666/aurelia-store) plugin.

## Usage
* Clone this repo
* Navigate to a samples subfolder in your command line
* Run `npm install`
* Run `au run --watch`
* Open your browser and navigate to `http://localhost:9000`

> If `au run` does not work, make sure to install aurelia-cli globally via `npm install -g aurelia-cli`

## Markdown
A simple markdown with history support

* TypeScript with WebPack using the Aurelia CLI
* Aurelia-Store using a StateHistory<State>

## Contacts app
A copy of the [official Aurelia Contacts App](https://github.com/aurelia/app-contacts), this time using the Aurelia-Store Plugin though.

* JavaScript with RequreJS and Aurelia CLI
* Simple Aurelia-Store demonstration
* Multiple actions
* Router / State sync

## Todo
A todo app showing the basics of the Store plugin from the perspective of a Vuex developer

* JavaScript with WebPack using the Aurelia CLI
* Vuex based structuring approach (mutations, actions)
* Uses Aurelia-UX

> Originally from [https://github.com/Vheissu/aurelia-store-todo](https://github.com/Vheissu/aurelia-store-todo)

## Vis
Minimal example of integrating [vis.js](http://visjs.org/index.html) with an Aurelia Store powered app and visualizing searched GitHub users.

* JavaScript with WebPack using the Aurelia CLI
* Higher Order Actions (passing in external services like HTTP)
* Async Actions
* Waiting for actions to complete

## Electron
A minimal electron demo, firing desktop notifications.

> There seems to be an issue with Win10 Fall Creators update which does not allow Notifications, thus a tray balloon is used on win platform.

* JavaScript with WebPack using the Aurelia CLI
* Adapted tasks to run Electron app right after starting the webpack devserver
* Registering a middleware, to propagate state changes via ipcRenderer to the main process
* Preinstalled Redux DevTools Extension. Integrated with the embedded Chrome Devtools (open Redux tab).

## Immer
Tired of Object.assign? Take a look at this demo to see how to use [Immer](https://github.com/mweststrate/immer) with Aurelia-Store.

* TypeScript with RequireJS using the Aurelia CLI
* Usage of Immer to avoid having to manually create immutable clones.

## Services
Showcase of how to use a classic existing Service with the Aurelia-Store approach

* TypeScript with RequireJS
* Old-school services used in actions

## Call to action
Any feedback or ideas are welcome so hop over to the issues section and share your words.
If you have an own Aurelia Store based example app, you'd like to share, we'd be happy to see a PR.
