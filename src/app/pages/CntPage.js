/** @jsx React.DOM */

var React = require('react')
  , Router = require('react-router')
  ;

var CtnPage = module.exports = React.createClass({
  
  mixins: [Router.State],

  render: function() {
    var name = this.getParams().name
      , page = this.props.pages[name]
      , title = ''
      , content = ''
      ;
    if (page) {
      title = page.title_full || page.title;
      content = page.content;
    }
    return (
      <div className="mui-app-content-canvas">
        <div className="full-width-section">
          <h2 className="mui-font-style-headline">{title}</h2>
          <div className="content" dangerouslySetInnerHTML={{__html: content}} />
        </div>
      </div>
    );
  }
});
