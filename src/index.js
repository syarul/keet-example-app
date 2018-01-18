import Keet from 'keet'
import routes from './components/routes'

window.log = console.log.bind(console)

class App extends Keet {
  constructor() {
    super()
  }
}

const app = new App 

app.mount({
	template: '{{banner}}{{routes}}{{content}}',
	banner: {
		tag: 'h3',
		id: 'banner',
		template: 'keet.js sample app'
	},
	routes: {
		tag: 'div',
		id: 'routes'
	},
	content: {
		tag: 'div',
		id: 'content',
		template: 'Welcome to our spectacular web page with nothing special here.'
	}
}).flush('app').link('app').cluster(routes)