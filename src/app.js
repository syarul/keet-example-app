import Keet from '../keet/keet'
import routes from './components/routes'

class App extends Keet {
  constructor() {
    super()
  }
}

const app = new App 

app.mount({
	banner: {
		tag: 'h3',
		id: 'banner',
		template: 'Test Routing App'
	},
	routes: {
		tag: 'div',
		id: 'routes'
	},
	content: {
		tag: 'div',
		id: 'content',
	}
}).link('app').cluster(routes)