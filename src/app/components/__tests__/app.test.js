var React = require('react');
var App = require('../app');

describe('app', function() {
  it('renders links', function(done) {
    var app = React.renderComponent(App(), document.createElement('div'));
    assert(app.getDOMNode().querySelectorAll('a').length === 3, 'There are three links');
    done();
  });
});

