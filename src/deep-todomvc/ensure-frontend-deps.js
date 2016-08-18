/**
 * Created by CCristi on 6/25/16.
 */

'use strict';

module.exports = function(cb) {
  const angularRootName = 'angular';

  let fs = require('fs');
  let path = require('path');
  let process = require('child_process');
  let frontendPath = this.microservice.autoload.frontend;
  let rootMicroservice = this.microservice;

  if (rootMicroservice === angularRootName) {
    if (!fs.existsSync(path.join(frontendPath, 'js', 'vendor'))) {
      return process.exec('jspm install', {
        'cwd': path.join(frontendPath, 'js')
      }, error => {
        if (error) {
          console.error('Error while installing frontend dependencies', error);
        }

        console.log(`Frontend dependencies have been intalled for ${this.microservice.identifier}`);
        return cb();
      });
    } else {
      console.log(`Skipping installing frontend dependencies for ${this.microservice.identifier}`);
      return cb();
    }
  }

  process.exec('npm install --production', {
    'cwd': path.join(frontendPath, 'js')
  }, error => {
    if (error) {
      console.error('Error while installing frontend dependencies', error);
    }

    console.log(`Frontend dependencies have been intalled for ${this.microservice.identifier}`);
    return cb();
  });
};
