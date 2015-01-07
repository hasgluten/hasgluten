/** @jsx React.DOM */

var React = require('react')
  , Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , LocalStorageMixin = require('react-localstorage')
  , mui = require('material-ui')
  , Menu = mui.Menu
  , MenuItem = mui.MenuItem
  , Icon = mui.Icon
  ;

var LayoutNav = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState: function() {
    return {
      selectedIndex: null
    };
  },

  toggle: function() {
    this.refs.nav.toggle();
  },

  _getSelectedIndex: function() {
    var currentItem, menuItems = this.props.menuItems;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.payload && this.isActive(currentItem.payload)) return i;
    };
  },

  _onNavChange: function(e, key, payload) {
    this.transitionTo(payload.payload);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  },

  _onHeaderClick: function() {
    this.transitionTo('root');
    this.refs.nav.close();
  },

  render: function() {
    var header = <div className="logo" onClick={this._onHeaderClick}>HasGluten</div>;

    return (
      <mui.LeftNav 
        ref="nav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={this.props.menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onNavChange} />
    );
  }
});


// var HelpDialog = React.createClass({

//   show: function() {
//     this.refs.help.show();
//   },

//   render: function() {

//     return (
//       <mui.Dialog ref="help" title="Help">
//         <p>HasGluten tells you if an ingredient -surprise, surprise!- has gluten in it, or it's gluten-free.</p>
//         <p>Just start typing an ingredient, the list below immediately filters the results.</p>
//         <p>Ingredients only as of now, food and dishes are coming soon!</p>
//       </mui.Dialog>
//     );
//   }
// });


var Layout = module.exports = React.createClass({

    displayName: 'hg',

    //TODO manage race condition between categories and products
    // mixins: [LocalStorageMixin],
    mixins: [Router.Navigation, Router.State],

    getInitialState: function() {
        return {
            products_time: 0,
            products: [],
            categories: {},
            // lang: 'en'
        };
    },

    componentDidMount: function() {
        var now = new Date().getTime();
        if (now - this.state.products_time > 12*3600*1000) {
            this.getCategories();
            this.getProducts();
        }
    },

    getCategories: function(lang) {
        var categories = {}
        $.getJSON(this._getGsxUrl(2), function(json) {
            json.feed.entry.forEach(function(el) {
                categories[el.gsx$category.$t] = {
                    it: el.gsx$it.$t,
                    es: el.gsx$es.$t,
                    fr: el.gsx$fr.$t,
                    de: el.gsx$de.$t
                };
            });
        }.bind(this));
        if (this.isMounted()) {
            this.setState({categories: categories});
        }
    },

    products_json: null,
    getProducts: function(lang) {
        if (this.products_json)
            this._getProducts_internal(this.products_json, lang);
        else
          $.getJSON(this._getGsxUrl(), function(json) {
              this.products_json = json;
              this._getProducts_internal(json, lang);
          }.bind(this));
    },

    _getProducts_internal: function(json, lang) {
        if (typeof lang === 'undefined') lang = this.props.lang;
        var now = new Date().getTime();
        var products = []
          , field = 'gsx$' + ((lang == 'en') ? 'name' : lang)
          , categories = this.state.categories
          ;
        json.feed.entry.forEach(function(el) {
            // console.log( el.gsx$category.$t + " > " + el.gsx$name.$t + " > " + el.gsx$gf.$t );
            var name = el[field].$t,
                category_en = el.gsx$category.$t,
                category = category_en in categories ? categories[category_en][lang] : null;
            if (name)
            products.push({
                key: el.gsx$name.$t,
                category: category || category_en, 
                name: name,
                gf: el.gsx$gf.$t == 'y'
            });
        });
        if (this.isMounted()) {
            this.setState({products_time: now, products: products});
        }
    },

  _getGsxUrl: function(sheet) {
      var id = this.props.dataGsxId;
      sheet = (typeof sheet === 'undefined') ? '1' : sheet;
      return 'https://spreadsheets.google.com/feeds/list/'+id+'/'+sheet+'/public/values?alt=json-in-script&callback=?';
  },

  _getPages: function() {
    var pages = this.props.pages,
        lang = this.props.lang;
    return pages[lang] || pages['en'];
  },
  
  _getMenuItems: function() {
    var pages = this._getPages(),
        lang = this.props.lang,
        langDir = lang=='en' ? '' : '/'+lang,
        menuItems = [
          { payload: langDir + '/', text: 'HasGluten' }
        ];
    for (var index in pages) {
        menuItems.push({
          payload: langDir + '/' + index + '.html',
          text: pages[index].title
        });
    }
    return menuItems;
  },

  _onMenuIconClick: function() {
    this.refs.nav.toggle();
  },

  // _onHelpIconClick: function() {
  //   this.refs.help.show();
  //       <mui.IconButton className="help" icon="action-help" onClick={this._onHelpIconClick} />
  //       <HelpDialog ref="help" />    
  // },

  _getLangItems: function() {
    var path = this.getPath().replace(/\/[a-z]{2}\//i, '/');
    return [
      { key: 'en', text: 'English', payload: path },
      { key: 'it', text: 'Italiano', payload: '/it'+path },
      { key: 'es', text: 'Español', payload: '/es'+path },
      { key: 'de', text: 'Deutsch', payload: '/de'+path },
      { key: 'fr', text: 'Français', payload: '/fr'+path },
    ];
  },

  _getLangIcon: function() {
    var icons = {
      it: 'maps-local-pizza',
      en: 'action-language'
    }
    return icons[this.props.lang] || icons['en'];
  },

  _onDropDownMenuChange: function(e, key, menuItem) {
    var lang = menuItem.key,
        payload = menuItem.payload;
    this.getProducts(lang);
    this.transitionTo(payload);
  },

  _onLogoClick: function() {
    // this.transitionTo('root');
    this.refs.nav.toggle();
  },

  render: function() {
    var title = (
        <a href="#" onClick={this._onLogoClick}>
          <img src="/img/logo.png" alt="HasGluten" title="HasGluten" className="logo-img i48" />
          HasGluten
        </a>
    );
    return (
      <mui.AppCanvas predefinedLayout={1}>
        <LayoutNav ref="nav" menuItems={this._getMenuItems()} />
        <mui.AppBar onMenuIconButtonTouchTap={this._onMenuIconClick} title={title} zDepth={1}>
          <mui.DropDownIcon icon={this._getLangIcon()} menuItems={this._getLangItems()} onChange={this._onDropDownMenuChange} />
        </mui.AppBar>
        <RouteHandler products={this.state.products} pages={this._getPages()} locales={[this.props.lang]} />
      </mui.AppCanvas>
    );
  }  
});

// https://docs.google.com/spreadsheets/d/1MVmAYPHKCTN0Rjt0ud1EQRNEgwN5sMw9EiHeUOWQ2qc/pubhtml
