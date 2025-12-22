import { Before } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';

Before(function(this: TestWorld) {
  this.inputCnpj = undefined;
  this.lastResult = undefined;
  this.createResult = undefined;
  this.createError = undefined;
  this.queryResult = undefined;
  this.externalMode = undefined;
  this.externalResponse = undefined;
  this.externalError = undefined;
  (this as any).logEvent = undefined;
  (this as any).lastLog = undefined;
});
