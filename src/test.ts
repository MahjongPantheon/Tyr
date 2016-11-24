import './polyfills.ts';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () { };

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
let context = require.context('./', true, /\.spec\.ts/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();

// Custom matcher to test array items without ordering
export function toHaveSameItems(util, customEqualityTesters) {
  return {
    negativeCompare: function (actual: any[], expected: any[]) {
      let typeOk = (actual.length !== undefined && expected.length !== undefined);
      if (!typeOk) {
        return {
          pass: false,
          message: `Expected ${actual} and ${expected} to be valid array-like objects or arrays.`
        };
      }

      let matches = actual.length === expected.length
        && expected.length === expected.reduce((acc, item) => {
          if (actual.indexOf(item) !== -1) {
            return acc + 1;
          }
          return acc;
        }, 0);

      return {
        pass: !matches,
        message: `Expected ${actual} not to have same items as ${expected}`
      };
    },
    compare: function (actual: any[], expected: any[]) {
      let typeOk = (actual.length !== undefined && expected.length !== undefined);
      if (!typeOk) {
        return {
          pass: false,
          message: `Expected ${actual} and ${expected} to be valid array-like objects or arrays.`
        };
      }

      let ok = actual.length === expected.length
        && expected.length === expected.reduce((acc, item) => {
          if (actual.indexOf(item) !== -1) {
            return acc + 1;
          }
          return acc;
        }, 0);

      return {
        pass: ok,
        message: `Expected ${actual} to have same items as ${expected}`
      };
    }
  };
}
