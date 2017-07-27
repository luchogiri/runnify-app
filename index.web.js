// @flow

require('es6-promise').polyfill();
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import Application from './lib/app.web';

render(
  <Application />,
  document.getElementById('react-root')
);
