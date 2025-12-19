import { Before } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';

Before(function(this: TestWorld) {
  this.reset();
});
