/** @jsx React.DOM */
var React = require('react')
  , Router = require('react-router')
  , Layout = require('../pages/Layout')
  , Home = require('../pages/Home')
  , CntPage = require('../pages/CntPage')
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , NotFoundRoute = Router.NotFoundRoute
  , pages = {
      'en': {
          about: {title: 'About',
            content: ''
+'<p>One evening on my way to see my gluten-free girlfriend, I stopped to pick up some food. When I arrived with my purchase she was happy to see me but frowned at what I had chosen.</p>'
+'<p>"What\'s this?" she asked.<br/>"You should double-check because I\'m not 100% sure if it has gluten," I told her.</p>'
+'<p>She then opened her computer and showed me the master Excel she\'d been compiling for years of nearly every ingredient in the world, categorized by whether it is or isn\'t gluten-free. She was a data nerd by profession and a nutritionist by passion.</p>'
+'<p>Wanting to save myself from future humilities and even help others who have Celiacs in their lives, we decided to put it online. This is the result.</p>'
+'<p>HasGluten quickly tells you if a food or ingredient contains gluten or is safe for people with gluten sensitivities to eat. It also shows you a picture from Wikipedia of what it looks like if you\'re not sure you\'ve found the right thing.</p>'
+'<p>We\'ve worked hard to improve our list with the latest scientific research and standards, including cross-checking it against data provided by the <a href="http://www.gluten.net" target="_blank">Gluten Intolerance Group</a> of North America. We are also working on maintaining the list in 5 different languages.</p>'
+'<p>We hope you\'ll find it useful, too!</p>'
          },
          support: {title: 'Support',
            content: ''
+'<p>Looking for something you can\'t find? Please submit your requests to <a href="mailto:research@hasgluten.com">research@hasgluten.com</a> and we\'ll investigate and consider* adding it to the HasGluten catalogue.</p>'
+'<p>If you have any issue with the site or just want to say hi, tweet us <a href="https://twitter.com/intent/tweet?screen_name=hasgluten" target="_blank">@hasgluten</a> or drop us a line at <a href="mailto:hello@hasgluten.com">hello@hasgluten.com</a>.</p>'
+'<p>Thanks for helping us make a better product for everyone!</p>'
+'<p><br/>* We\'ve worked hard to improve our list with the latest scientific research and standards, including cross-checking it against data provided by the <a href="http://www.gluten.net" target="_blank">Gluten Intolerance Group</a> of North America. We are also working on maintaining the list in 5 different languages.</p>'
          }
//           twitter: {title: 'Twitter', 
//             content: ''
// +'<p>We\'re tweetting about gluten-free awesomeness, follow us <a href="https://twitter.com/hasgluten" target="_blank">@hasgluten</a>.</p>'
//           },
//           privacy: {title: 'Privacy', title_full: 'Privacy Policy',
//             content: ''
// +'<p>This site does not share personal information with third parties nor do we store any information about your visit to this site other than to analyze and optimize your content and reading experience through the use of cookies.</p>'
// +'<p>In short, we use Google Analytics to track visits and Google AdSense to display ads.</p>'
// +'<p>You can turn off the use of cookies at anytime by changing your specific browser settings.</p>'
// +'<p>We are not responsible for republished content from this site on other blogs or websites without our permission.</p>'
// +'<p>This privacy policy is subject to change without notice and was last updated on November 30, 2014. If you have any questions feel free to contact us directly at <a href="mailto:hello@hasgluten.com">hello@hasgluten.com</a>.</p>'
//           }
      },
      'it': {
          about: {title: 'Chi siamo',
            content: ''
+'<p>Una sera, mentre andavo dalla mia "gluten-free girlfriend" (molto più trendy di "ragazza celiaca"), mi sono fermato per un po\' di spesa. Al mio arrivo, pur felice di vedermi, mi ha guardato un po\' storto.</p>'
+'<p>"Cos\'è questo?" mi ha chiesto.<br/>"Puoi verificare? Non sono sicurissimo che sia senza glutine", le ho risposto.</p>'
+'<p>A quel punto ha acceso il computer e mi ha mostrato il Master Excel, una lista con praticamente ogni ingrediente nel mondo che ha compilato negli anni, da buona "data nerd" di professione e nutrizionista per passione.</p>'
+'<p>Un po\' per evitare a me future umiliazioni, un po\' per la possibilità di aiutare altri che hanno celiaci nella loro vita, abbiamo deciso di mettere questa lista online. E questo è il risultato.</p>'
+'<p>HasGluten ti dice immediatamente se un cibo o ingrediente contiene o no glutine, e quindi se è sicuro da mangiare per persone con sensibilità o intolleranza al glutine. Ti mostra anche una foto del cibo da Wikipedia, per confermare che la cosa che stai cercando sia quella giusta.</p>'
+'<p>Abbiamo lavorato sodo alla nostra lista per aggiornala rispetto agli ultimi standard e risultati di ricerca, incluso verificarla con i dati forniti dal <a href="http://www.gluten.net" target="_blank">Gluten Intolerance Group</a> of North America (l\'equivalente americano dell\'<a href="http://www.celiachia.it" target="_blank">Associazione Italiana Celiachia</a>). Stiamo anche lavorando per tradurre e mantenere la lista in 5 lingue, incluso l\'italiano.</p>'
+'<p>Ci auguriamo che sia utile anche a te!</p>'
          },
          support: {title: 'Supporto', title_full: 'Supporto Tecnico',
            content: ''
+'<p>C\'è qualcosa che non trovi? Mandaci una richiesta a <a href="mailto:research@hasgluten.com">research@hasgluten.com</a>, saremo felici di valutarla e considerarne* l\'aggiunta alla lista di HasGluten.</p>'
+'<p>Per qualsiasi problema col sito o anche solo per un ciao, twittaci ad <a href="https://twitter.com/intent/tweet?screen_name=hasgluten" target="_blank">@hasgluten</a> o scrivici a <a href="mailto:hello@hasgluten.com">hello@hasgluten.com</a>.</p>'
+'<p>Grazie per aiutarci a creare un prodotto migliore per tutti!</p>'
+'<p><br/>* Abbiamo lavorato sodo alla nostra lista per aggiornala rispetto agli ultimi standard e risultati di ricerca, incluso verificarla con i dati forniti dal <a href="http://www.gluten.net" target="_blank">Gluten Intolerance Group</a> of North America (l\'equivalente americano dell\'<a href="http://www.celiachia.it" target="_blank">Associazione Italiana Celiachia</a>). Stiamo anche lavorando per tradurre e mantenere la lista in 5 lingue, incluso l\'italiano.</p>'
          }
          // twitter: {title: 'Twitter', 
          //   content: ''
          // }
          // privacy: {title: 'Privacy', 
          //   content: ''
          // }
      },
      'es': {
          about: {title: 'Acerca de',
            content: ''
          },
          support: {title: 'Soporte',
            content: ''
          }
          // twitter: {title: 'Twitter', 
          //   content: ''
          // }
          // privacy: {title: 'Privacidad', 
          //   content: ''
          // }
      },
      'fr': {
          about: {title: 'À propos',
            content: ''
+ '<p>Une soir, en route vers ma copine "sans gluten" (ça sonne mieux que "copine coeliaque"), je me suis arreté pour quelques courses. À mon arrivée, même si heureuse de me voir, elle m\'a regardé un peut mal.</p>'
+ '<p>"Qu\'est-ce que c\'est ça?" elle m\'a demandé.<br/>"Tu peux verifier? Je ne suis pas sûr qu\'il soit sans gluten", je l\'ai répondu.</p>'
+ '<p>À ce point elle a allumé son ordinateur en m\'a montré le Excel Master, une liste avec pratiquement chaque ingrédient dans le monde qu\'elle a rempli au fur et à mésure des années, étant experte de données pour profession et nutritioniste pour passion.</p>'
+ '<p>Un peu pour m\'eviter des humiliations futures, un peu pour aider d\'autres qui ont des coeliaques dans leurs vies, on a decidé de rendre cette liste disponible en ligne. Et voilà le résultat.</p>'
+ '<p>HasGluten te dit immédiatement si un plat ou un ingrédient contient du gluten ou pas, et donc s\'il est sûr à manger pour les personnes avec sensibilité ou intollerance au gluten. Il te montre aussi une photo du plat prise de Wikipedia, pour confirmer que l\'ingrédient que tu es en train de chercher est bien correct.</p>'
+ '<p>On a travaillé dur à notre liste pour qu\'elle soit bien à jour par rapport aux derniers standards et resultats de recherche, y compris la valider avec les données fournies par le <a href="http://www.gluten.net" target="_blank">Gluten Intolerance Group</a> of North America (l\'équivalent américain du <a href="http://www.afdiag.fr" target="_blank">AFDIAG</a>: Association Française des Intolérants au Gluten). On travaille aussi pour traduire et maintenir la liste en 5 langues, y compris le français.</p>'
+ '<p>On espère qu\'elle te soit aussi utile!</p>'
          },
          support: {title: 'Support',
            content: ''
+ '<p>Y a-t-il quelque chose que tu ne trouves pas? Envoie-nous une requête à <a href="mailto:research@hasgluten.com">research@hasgluten.com</a>, nous serons heureux de l\'évaluer et d\'en considéerer* l\'ajoute à la liste de HasGluten.</p>'
+ '<p>Pour tout problème avec le site ou juste pour nous dire bonjour, twitte-nous à <a href="https://twitter.com/intent/tweet?screen_name=hasgluten" target="_blank">@hasgluten</a> ou écris nous à <a href="mailto:hello@hasgluten.com">hello@hasgluten.com</a>.</p>'
+ '<p>Merci de nous aider à faire un produit meilleur pour tout le monde!</p>'
+ '<p><br/>* On a travaillé dur à notre liste pour qu\'elle soit bien à jour par rapport aux derniers standards et resultats de recherche, y compris la valider avec les données fournies par le <a href="http://www.gluten.net" target="_blank">Gluten Intolerance Group</a> of North America (l\'équivalent américain du <a href="http://www.afdiag.fr" target="_blank">AFDIAG</a>: Association Française des Intolérants au Gluten). On travaille aussi pour traduire et maintenir la liste en 5 langues, y compris le français.</p>'
          }
          // twitter: {title: 'Twitter', 
          //   content: ''
          // }
          // privacy: {title: 'Confidentialité', 
          //   content: ''
          // }
      },
      'de': {
          about: {title: 'Über uns',
            content: ''
          },
          support: {title: 'Support',
            content: ''
          }
          // twitter: {title: 'Twitter', 
          //   content: ''
          // }
          // privacy: {title: 'Datenschutz', 
          //   content: ''
          // }
      }
  }
  ;

var LayoutWithProps = React.createClass({
  render () {
    return <Layout pages={pages} lang={this.props.lang} dataGsxId="1ZPeVLRsr2D5-SUR-zjHYj7NmnxVv5lt7c2A1T3RsAhg" />
  }
});

var routes = module.exports = (
    <Route name="root" handler={LayoutWithProps} path="/">
      <DefaultRoute handler={Home} />
      <Route name="lang" handler={Home} path=":lang/" />
      <Route name="page" handler={CntPage} path=":name.html" />
      <Route name="langpage" handler={CntPage} path=":lang/:name.html" />
      <NotFoundRoute handler={Home}/>
    </Route>
);
