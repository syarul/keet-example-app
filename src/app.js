import Keet from 'keet'
import routes from 'components/routes'
import 'styles/base.styl'
import router from './router'

class App extends Keet {
  constructor() {
    super()
  }
  componentDidMount(){
  	window.onpopstate = evt => {
  		router()
  	}
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