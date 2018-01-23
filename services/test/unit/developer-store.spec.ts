import { Developer, DeveloperCategory } from '../../src/developer/data/developer-models';

import { DeveloperStore } from "../../src/developer/data/developer-store";
import { DeveloperService } from "../../src/developer/data/developer-service";

describe("Developer Store", () => {
  let store: DeveloperStore;

  beforeEach(() => {
    // since the store does automatically load all developers and that
    // happens within a setTimeout, we make use of jasmines fake clock
    // to fast forward in time.
    jasmine.clock().install();
    store = new DeveloperStore( new DeveloperService() );
  });

  afterEach(() => {
    // don't forget to uninstall the fake timer :)
    jasmine.clock().uninstall();
  })

  it("should provide an initial state", () => {
    // initially, without any time passed, only the default value will be provided
    // and subscriptions notified
    store.state.subscribe((res) => {
      expect(res).toEqual(store.initialState);
    });
  });

  it("should load all developers afterwards", (done) => {
    // after the initial load, we should wait 200ms for the next sequence to pass
    jasmine.clock().tick(200);
    
    // and we're only interested in the 2nd subscription notification, thus we can
    // safely skip the first one
    store.state.skip(1).subscribe( (res) => {
      expect(res.developers).toBeDefined();
      expect(res.developers.length).toBeGreaterThan(0);
      done();
    });
  });

  it("should update state with new developer", (done) => {
    // again skip the first iteration of default loads
    jasmine.clock().tick(200);

    const expectedDeveloper = {
      cateogry: "junior",
      name: "Tester",
      skills: ["JavaScript"]
    };

    // next we're going to simulate a new added developer.
    // Remember that you need to subscribe since the observable is lazy
    store.addDeveloper(
      <DeveloperCategory>expectedDeveloper.cateogry,
      expectedDeveloper.name,
      expectedDeveloper.skills
    ).subscribe()

    // after that we wait for the operation to complete
    jasmine.clock().tick(2000);

    // and skip now the first two iterations to only assert our final result
    store.state.skip(2).subscribe((res) => {
      expect(res.developers.filter(d => d.name === expectedDeveloper.name)[0]).toEqual({
        name: expectedDeveloper.name,
        skills: expectedDeveloper.skills
      });

      done();
    });
  });

  it("should show only developers for the given cateogry", () => {
    jasmine.clock().tick(200);

    store.loadProDevs();
    jasmine.clock().tick(200);

    // we can make use of RxJS pluck operator to only pick the properties we're interested in
    store.state.skip(2).pluck("activeCategory").subscribe((res) => {
      expect(res).toBe("pro");
    });
  });
});
