"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/proxy.js");
require("zone.js/dist/sync-test");
require("zone.js/dist/jasmine-patch");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
__karma__.loaded = function () { console.log('algo'); };
testing_1.getTestBed().initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
var context = require.context('./', true, /\.spec\.js$/);
context.keys().map(context);
__karma__.start();
//# sourceMappingURL=test.js.map