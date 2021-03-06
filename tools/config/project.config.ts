import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'Air Quality Radar';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
//       {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
//       { src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs' },
      { src: 'chart.js/dist/Chart.min.js', inject: 'libs' },
      { src: 'bootstrap-slider/dist/bootstrap-slider.min.js', inject: 'libs'},

      { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true }, // inject into css section
      { src: 'bootstrap/dist/css/bootstrap-theme.min.css', inject: true }, // inject into css section
      { src: 'bootstrap/dist/css/bootstrap-theme.min.css.map', inject: true }, // inject into css section
      { src: 'bootstrap-slider/dist/css/bootstrap-slider.min.css', inject: true},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages (e.g. ng2-translate)
    let additionalPackages: ExtendPackages[] = [
      // required for dev build
      {
        name: 'ng2-bootstrap',
        path: 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
      },

      // required for prod build
      {
        name: 'ng2-bootstrap/*',
        path: 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
      },

      //ng2-chart for prod build
      {
        name: 'ng2-charts/*',
        path: 'node_modules/ng2-charts/bundles/ng2-charts.umd.js'
      },

      //chart
      {
        name: 'Chart.js',
        path: 'node_modules/chart.js/dist/Chart.min.js'
      },

      // mandatory dependency for ng2-bootstrap datepicker
      {
        name: 'moment',
        path: 'node_modules/moment',
        packageMeta:{
          main: 'moment.js',
          defaultExtension: 'js'
        }
      },

      {
        name: 'angular2-google-maps/*',
        path: 'node_modules/angular2-google-maps/core/core.umd.js'
      }
    ];

    this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
