import Keet from 'keet'

import renderProcessing from './renderProcessing'

const cat = (...args) => [...args].join('')

class Component extends Keet {
  constructor() {
    super()
  }

  _submit(){
    let inputs = this.vdom().querySelectorAll('input')
    let formData = ''

    inputs.forEach((i => formData += i.name + '=' + i.value.trim() + '&'))

    formData = formData.slice(0, -1)

    console.trace(formData)

    fetch('/login', {
      method: 'post',
      mode: 'same-origin',
      credentials: 'same-origin',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: formData
    }).then(res => res.json())
    .then(json => renderProcessing(json))
  }
  run(){
    window.history.pushState({}, 'loginPage', 'login-page')
    fetch('/login-page', {
      credentials: 'same-origin'
    })
  }

}

const app = new Component

const obj = {
  template: '{{loginForm}}',
  loginForm: {
    tag: 'form',
    id: 'loginForm',
    'onsubmit': 'event.preventDefault()',
    template: cat(
      '<label><b>Username(test)</b></label>',
      '<input type="text" placeholder="Enter Username" name="username" required>',
      '<label><b>Password(1234)</b></label>',
      '<input type="password" autocomplete="false" placeholder="Enter Password" name="password" required>',
      '<button k-click="submit()">Login</button>',
      '<label>',
        '<input type="checkbox" checked="checked" name="remember"> Remember me',
      '</label>'
    )
  },
  submit: app._submit.bind(app)
}

export default () => {
  app.mount(obj).flush('content').link('content')
  app.run()
}