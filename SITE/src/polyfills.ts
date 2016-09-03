import 'core-js/es6';
import 'reflect-metadata';
import 'zone.js/dist/zone';

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity;
  /* tslint:disable-next-line:no-require-imports */
  require('zone.js/dist/long-stack-trace-zone');
}
