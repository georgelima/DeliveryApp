import {
  it,
  fit,
  inject,
  describe,
  ddescribe,
  beforeEachProviders,
} from '@angular/core/testing';

// Load the implementations that should be tested
import {Home} from './index';

// Use the assert helper to get a reference to the component, element and fixture
import {Assert} from './../../../assert';

describe('Home', () => {
  // Provide our implementations or mocks to the dependency injector
  let providers = [];
  
  // Set up the helper 
  let assert = new Assert<Home>(Home, providers);      

  assert.it('should log ngOnInit', (component, element, fixture) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith('Hello Home');
  });
});
