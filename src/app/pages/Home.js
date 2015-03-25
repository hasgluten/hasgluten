/** @jsx React.DOM */

var React = require('react')
  , mui = require('material-ui')
  , Main = require('../components/Main')
  ;

var Index = module.exports = React.createClass({
  render: function() {
    var ads = ''
+ '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
+ '<!-- top -->'
+ '<ins class="adsbygoogle"'
+ '     style="display:inline-block;width:300px;height:250px"'
+ '     data-ad-client="ca-pub-7476952585357263"'
+ '     data-ad-slot="8233099637"></ins>'
+ '<script>'
+ '(adsbygoogle = window.adsbygoogle || []).push({});'
+ '</script>'
      ;
    var messagesAll = {
      'en': [
        'HasGluten is the most current and comprehensive list of gluten-free foods available. '
        + 'It will quickly and easily tell you all the foods containing gluten as well as '
        + 'specific ingredients that Celiacs or others on a gluten-free diet must adhere to.',
        'Just type any items you’d like into the search box, and HasGluten alerts you of the '
        + 'foods containing gluten or tells you whether they are gluten-free.',
        'Behind the scenes we work hard to maintain this list of gluten-free foods that incorporates '
        + 'the latest research and recommendations--controversial grains such as oats and rice, '
        + 'gluten-free flour, and product fillers are just the start.',
        'This list can help whether you\'re Celiac, gluten intolerant, or have people in your life '
        + 'sticking with a gluten-free diet.',
        'Whether you want to find the best gluten-free flour to replace your old favorite '
        + 'gluten-free recipes or need to grab some post-workout gluten-free snacks, '
        + 'just pull up HasGluten from your phone.',
        'Although our list of gluten-free foods is cross-checked against the data provided by the '
        + 'Gluten Intolerance Group of North America, we strongly advise you to always read labels '
        + 'or ask the cook to know exactly what is gluten-free, especially if you have Celiac disease.',
        'Made with ♥ and no gluten.'
      ],
      'it': [
        'Fatto con ♥ e senza glutine.'
      ],
      'es': [
        'Hecho con ♥ y sin gluten.'
      ],
      'fr': [
        'Fait avec ♥ et sans gluten.'
      ],
      'de': [
        'Mit ♥ gemacht und ohne Gluten.'
      ]
    };
    var lang = this.props.locales[0],
        messages = messagesAll[lang] || messagesAll['en'];
    var description = [];
    if (messages.length == 1)
      description.push(<p key={0} className="p-short">{messages[0]}</p>);
    else
      for (var i = 0; i < messages.length; i++)
        description.push(<p key={i}>{messages[i]}</p>);
    return (
      <div className="get-started-page mui-app-content-canvas">
        <div className="col3-section">
          <div className="col">{"\u00a0"}</div>
          <div className="col">
              <Main products={this.props.products} locales={this.props.locales} />
          </div>
          <div className="col col-ads" dangerouslySetInnerHTML={{__html: ads}} />
        </div>
        <div className="full-width-section">
            <div className="main-description">
              {description}
            </div>
        </div>
      </div>
    );
  }
});
