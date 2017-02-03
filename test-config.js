// Load our SystemJS configuration.
System.config({
  baseURL: '/base/'
});

System.config({
  defaultJSExtensions: true,
  map: {
    'moment': 'node_modules/moment/moment.js',
    'ng2-bootstrap/*': 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
  }
});

