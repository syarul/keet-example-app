import homePage from 'components/homePage'
import loginPage from 'components/loginPage'
import logoutPage from 'components/logoutpage'
import protectedPage from 'components/protectedPage'

const authorize = () => {
  return new Promise((resolve, reject) => {
    fetch('/api/protected', {
      method: 'post',
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(res => res.json())
    .then(json => resolve(json.hasLogin))
  })
}

const showLog = () => authorize().then(auth => !auth ? loginPage() : logoutPage())

const routes = {
  '/': {
    page: 'home',
    render: homePage.bind(null, 'Welcome to our spectacular web page with nothing special here.')
  },
  '/protected-page': {
    page: 'page',
    render: function(){
      authorize().then(auth => {
        protectedPage.call(null, auth)
      })
    }
  },
  '/login-page': {
    page: 'login',
    render: showLog
  },
  '/logout-page': {
    page: 'logout',
    render: showLog
  }
}

const switchCase = (sources, defaultSource) => selector => {
  if(sources[selector]){
    window.history.pushState({}, sources[selector].page, selector)
    sources[selector].render()
  } else {
    window.history.pushState({}, 'not-found', '/noroute')
    homePage.call(null, '404 not found')
  }
}

export default res => {
  switchCase(routes, 'noroute').call(null, res ? res : window.location.pathname)
}