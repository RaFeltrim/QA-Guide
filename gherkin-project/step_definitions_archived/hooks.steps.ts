import { Before } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';

Before(function(this: TestWorld) {
  // reset minimal world state
  this.inputCnpj = undefined;
  this.lastResult = undefined;
  this.createResult = undefined;
  this.createError = undefined;
  this.queryResult = undefined;
  this.externalMode = undefined;
  this.externalResponse = undefined;
  this.externalError = undefined;
  this.logEvent = undefined;
  this.lastLog = undefined;
});
import { Before } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';

Before(function(this: TestWorld) {
  this.reset();
});
