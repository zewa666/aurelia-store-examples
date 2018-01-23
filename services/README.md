# Aurelia with higher order components and a single state store

This project shows an example of how you can structure your application to use an React/Redux architecture, yet not having to sacrifice
flexiblity and power of Aurelia's two-way binding.
Besides that the store implementation is based on RxJS instead of Redux. It uses a classic service class as backbone.
The reason for this is to allow a smoother introduction of new concepts in an existing app.

## Setup
* Checkout the repository
* `npm install -g aurelia-cli` to install the Aurelia CLI globally
* install the examples dependencies inside the projects root with `npm install`
* Make sure to install the [Redux DevTools Browser extension](http://extension.remotedev.io/) (e.g for [Chrome here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd))
* run `au run --watch` to get started
* open your browser with the address `http://localhost:9000`
* you should notice the active Redux DevTools extension in your browser

## Recommended way to review the example
The sources, both code and templates, are fully documented to provide a good understanding how one feature and concepts builds upon the
other. In order to get the most out of your first contact I'd recommend the following process:

1. Start with the `main.ts`, Aurelia's main entry point.
2. Go on with `app.ts` and `app.html`.
3. After that start with the higher order components ViewModel `developer-overview.ts` and View `developer-overview.html`.

> Do not get distracted by any references from the store, models or service classes yet

4. Switch to the smart component `add-developer-form.ts` and `add-developer-form.html`.
5. Continue with the dumb component `list-developers.ts` and `list-developers.html`
6. Now its time to switch to the service and store implementation. Start with the `developer-models.ts` first.
7. Continue to the classic service `developer-service.ts`.

> Note that this service could be used as it is in a classic MVVM / Two-Way-Binding approach.

8. Finish your journey with the `developer-store.ts`.

## Feedback
1. How do we enable support for middlewares, like Redux does?

A middleware is comparable to Express.js like middlewares, as such that it adds different functionallity before the actual request response cycle is complete. In Redux this means we're adding features which overload the action dispatcher. In combination with RxJS BehaviorSubjects, that means we'd need to override the `next` method to apply additional middlewares before processing our own function.
This is best done by subclassing the original BehaviorSubject and creating our own `MiddlewareBehaviorSubject` as depicted in the branch [middleware-behavior-subject](https://github.com/zewa666/aurelia-hoc-store/tree/middleware-behavior-subject). You can find the extended Subject [over here](https://github.com/zewa666/aurelia-hoc-store/blob/middleware-behavior-subject/src/developer/data/middleware-behavior-subject.ts)

2. How to unit test the store and state depending components?

Testing is always an important question when evaluating a new approach. By using RxJS as the base for this example, coupled with Aurelia's Component Tester, we're having a fully versatile solution to cover each test scenario.
Inside the folder `test/unit` you can find the files [developer-store.spec.ts](https://github.com/zewa666/aurelia-hoc-store/blob/master/test/unit/developer-store.spec.ts) - for the store based unit tests - and [list-developer.spec.ts](https://github.com/zewa666/aurelia-hoc-store/blob/master/test/unit/list-developer.spec.ts) depicting how to test a dumb component, which accepts data via attribute inputs. The later is a TestBed approach, showing a integration test, covering the DOM.
The unit tests contain inline comments for all interesting details
