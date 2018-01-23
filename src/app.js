import Keet from 'keet'
import routes from './components/routes'

class App extends Keet {
  constructor() {
    super()
    this.greeting = 'Welcome to our spectacular web page with nothing special here.'
    this.App = 'App'
  }
  change(res){
  	this.greeting = res
  }
}

const app = new App 

app.mount({
	banner: {
		tag: 'h3',
		id: 'banner',
		template: 'Login {{App}}'
	},
	routes: {
		tag: 'div',
		id: 'routes'
	},
	content: {
		tag: 'div',
		id: 'content',
		template: '{{greeting}}'
	}
}).link('app')//.cluster(routes)

setTimeout(() => {
	app.change('test')
	app.App = 'awdadw'
	log(app)
}, 2000)

export default app