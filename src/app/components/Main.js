/** @jsx React.DOM */

var React = require('react'),
    mui = require('material-ui');

var ProductCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan="2" className="mui-font-style-caption">{this.props.category}</th></tr>);
    }
});

var ProductRow = React.createClass({
    handleClick: function(value) {
        this.props.onUserClick(
            value
        );
    },
    render: function() {
        var name = this.props.product.gf ?
            this.props.product.name :
            <span className="color-hg">
                {this.props.product.name}
            </span>;
        var gf = this.props.product.gf ?
            <span className="color-gf">
                GF
            </span>
            :
            <span className="color-hg">
                HG
            </span>;
        return (
            <tr onClick={this.handleClick.bind(this, name)} style={{cursor: 'pointer'}}>
                <td className="table-legend">{gf}</td>
                <td>{name}</td>
            </tr>
        );
    }
});

var EmptyRow = React.createClass({
    render: function() {
        var messagesAll = {
            'en': ["Oops! Sorry, we don't have that one yet.", 'Want to help? Write us at'], 
            'it': ["Oops! Spiacenti, non ce l'abbiamo ancora.", 'Vuoi aiutarci? Scrivici a'],
            'es': ["", ''],
            'fr': ["Oops! Desolés, on l'a pas encore.", 'Tu veux nous aider? Ecris à'],
            'de': ["Ups! Leider haben wir das noch nicht!", 'Willst du uns helfen? Schreib uns an']
        };
        var lang = this.props.locales[0],
            message = messagesAll[lang] || messagesAll['en'];
        return (
            <tr>
                <td colSpan="2" className="table-empty"><em>{message[0]}</em><br/>{message[1]} <a href="mailto:hello@hasgluten.com">hello@hasgluten.com</a></td>
            </tr>
        );
    }
});

var EmbedWikipedia = React.createClass({
    //TODO separate component
    
    componentDidUpdate: function() {
        embedly('card', '.embedly-card');
    },

    render: function() {
        var messagesAll = {
            'en': 'No additional info', 
            'it': 'No altre info',
            'es': 'No hay más info',
            'fr': "Pas d'autre info",
            'de': 'Keine weiteren Infos'
            // 'en': 'no info', 
            // 'it': 'no info',
            // 'es': 'no hay info',
            // 'fr': "pas d'info",
            // 'de': 'keine Info'
        };
        var name = this.props.src.replace(' ', '_').toLowerCase(),
            key = this.props.srcKey.replace(' ', '_').toLowerCase(),
            lang = this.props.locales[0],
            none = messagesAll[lang] || messagesAll['en'],
            url = 'http://' + lang + '.wikipedia.org/wiki/' + name;
        return (
            <div data-src={name} data-key={key} data-lang={lang} data-none={none}>
                <a className="embedly-card" href={url}></a>
            </div>
        );
    }
});

var ProductTable = React.createClass({
    render: function() {
        // console.log(this.props);
        var rows = [], lock = false;
        var lastCategory = null, lastName = null, lastKey = null;
        var filter = this.props.filterText.toLowerCase().trim();
        var embed = null;
        this.props.products.forEach(function(product) {
            if (rows.length > 20 || lock) return;
            if (product.name.toLowerCase() == filter) {
                lock = true;
                rows = [];
                lastCategory = null;
            }
            if (product.name.toLowerCase().indexOf(filter) === -1) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} onUserClick={this.props.onUserClick} />);
            lastCategory = product.category;
            lastName = product.name;
            lastKey = product.key;
        }.bind(this));
        if (rows.length==2) {
            embed = 
                <EmbedWikipedia src={lastName} srcKey={lastKey} locales={this.props.locales} />;
        }
        if (rows.length==0 && this.props.products.length > 0) {
            rows.push(<EmptyRow locales={this.props.locales} filterText={this.props.filterText} />);
            if (typeof ga !== 'undefined') ga('send', 'event', 'main', 'not-found', this.props.filterText);
        }
        return (
            <div>
            <table>
                <tbody>{rows}</tbody>
            </table>
            <div>
                {embed}
            </div>
            </div>
        );
    }
});

var SearchBar = React.createClass({

//    mixins: [React.addons.LinkedStateMixin],

    formatMessage: function(msg) {
        var messagesAll = {
            'en': {
                placeholder: 'Type an ingredient',
                legend: ['Gluten-free', 'Has gluten (or may have)'],
                description: 'Ingredients only for now, dishes coming soon.'
            },
            'it': {
                placeholder: 'Inserisci un ingrediente',
                legend: ['Gluten-free (senza glutine)', 'Has gluten (può avere glutine)'],
                description: 'Solo ingredienti per ora, piatti a breve.'
            },
            'es': {
                placeholder: 'Escribe un ingrediente',
                legend: ['Gluten-free (sin gluten)', 'Has gluten (puede contener gluten)'],
                description: ''
            },
            'fr': {
                placeholder: 'Saisis un ingrédient',
                legend: ['Gluten-free (sans gluten)', 'Has gluten (peut avoir du gluten)'],
                description: 'Ingrédients pour le moment, plats à bientôt.'
            },
            'de': {
                placeholder: 'Gib eine Zutat ein',
                legend: ['Glutenfrei (glutenfrei)', 'enthält Gluten (oder könnte es enthalten)'],
                description: ''
            }
        };
        var locale = this.props.locales[0]
          , messages = this.props.messages || messagesAll[locale] || messagesAll['en']
          ;
        return messages[msg] || messagesAll['en'][msg];
    },
    handleChange: function(e) {
        this.props.onUserInput(
            // this.refs.filterTextInput.getDOMNode().value
            e.target.value
        );
    },
    onFormSubmit: function(e) {
        e.preventDefault();
        return false;
    },
    onLegendClick: function(e) {
        this.refs.filterTextInput.focus();
    },
    render: function() {
        //var value = this.props.filterText;
        return (
            <form onSubmit={this.onFormSubmit}>
                <mui.Paper zDepth={1} className="legend" onClick={this.onLegendClick}>
                    <p className="legend-gf"><span className="legend-id">GF</span>{this.formatMessage('legend')[0]}</p>
                    <p className="legend-hg"><span className="legend-id">HG</span>{this.formatMessage('legend')[1]}</p>
                </mui.Paper>
                <mui.Input
                    ref="filterTextInput"
                    name="search"
                    type="text"
                    placeholder={this.formatMessage('placeholder')}
                    description={this.formatMessage('description')}
                    defaultValue={this.props.filterText}
                    onChange={this.handleChange} />
            </form>
        );
    }
});

var FilterableProductTable = module.exports = React.createClass({
    getInitialState: function() {
        return {
            filterText: ''
        };
    },
    
    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
        if (typeof ga !== 'undefined') ga('send', 'event', 'main', 'search', filterText);
    },
    
    render: function() {
        return (
            <mui.Paper className="main" zDepth={0}>
                <SearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                    locales={this.props.locales}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    onUserClick={this.handleUserInput}
                    locales={this.props.locales}
                />
            </mui.Paper>
        );
    }
});

// function startApp(){
//     React.render(<RemoteFilterableProductTable src="https://spreadsheets.google.com/feeds/list/1ZPeVLRsr2D5-SUR-zjHYj7NmnxVv5lt7c2A1T3RsAhg/od6/public/values?alt=json-in-script" />, document.body);  
// }

// window.onload = function(){
//     var url = document.URL;
//     var isSmart = (url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
//     if( 0 && isSmart ){
//         document.addEventListener('deviceready', startApp, false);
//     }
//     else{
//         startApp();
//     }
// }
