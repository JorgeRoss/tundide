import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import '!style-loader!css-loader!sass-loader!../assets/app.scss';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

/* development:start */
enableProdMode();
/* development:end */


platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);