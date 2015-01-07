assert = require('assert');

// so that <Links/> don't complain
var React = require('react');
React.renderComponent(require('../config/routes'), document.createElement('div'));

