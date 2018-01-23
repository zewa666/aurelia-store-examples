import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { Developer } from "../../src/developer/data/developer-models";
import "../../src/developer/list-developers";

describe('ListDevelopers Component', () => {
  let component;
  // we don't actually want to load real data but instead provide a stub
  // which we want to make sure has been called
  let viewModel = {
    developers: [
      <Developer>{name: "TestDeveloper", skills: ["JavaScript"]},
      <Developer>{name: "ProDeveloper", skills: ["JavaScript", "TypeScript"]},
      <Developer>{name: "JuniorDeveloper", skills: ["HTML", "CSS"]},
    ],
    loadAllDevs: jasmine.createSpy("loadAllDevs"),
    loadProDevs: jasmine.createSpy("loadProDevs"),
    loadJuniorDevs: jasmine.createSpy("loadJuniorDevs")
  };

  beforeEach(() => {
    // we create the component following the tutorial at
    // http://aurelia.io/hub.html#/doc/article/aurelia/testing/latest/testing-components/1
    component = StageComponent
      .withResources('developer/list-developers')
      .inView(`
        <list-developers developers.bind="developers"
                         load-all-devs.bind="loadAllDevs"
                         load-pro-devs.bind="loadProDevs"
                         load-junior-devs.bind="loadJuniorDevs">
      
        </list-developers>
      `)
      .boundTo(viewModel);
  });

  it('should render all developers', done => {
    component.create(bootstrap).then(() => {
      const listItems = document.querySelectorAll('ul li');
      expect(Array.from(listItems).length).toBe(3);
      done();
    }).catch(e => { console.log(e.toString()) });
  });

  it('should query junior developers', done => {
    component.create(bootstrap).then(() => {
      // notice the selector double escaped dot to get hold of the proper button
      const juniorButton: HTMLButtonElement = document.querySelector("button[click\\.delegate='loadJuniorDevs()']") as HTMLButtonElement;
      
      // simulate a users click which should trigger the bound function
      juniorButton.click();

      // and finally assert that it got called
      expect(viewModel.loadJuniorDevs).toHaveBeenCalled();
      done();
    }).catch(e => { console.log(e.toString()) });
  });

  afterEach(() => {
    component.dispose();
  });
});
