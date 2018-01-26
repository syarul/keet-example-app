import Keet from 'keet'
import renderProcessing from 'components/renderProcessing'

class Component extends Keet {
  constructor() {
    super()
  }

  submit(){
    let inputs = document.querySelectorAll('input')
    let formData = ''

    inputs.forEach((i => formData += i.name + '=' + i.value.trim() + '&'))

    formData = formData.slice(0, -1)

    fetch('/api/login', {
      method: 'post',
      mode: 'same-origin',
      credentials: 'same-origin',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: formData
    }).then(res => res.json())
    .then(json => renderProcessing(json, 'login'))
  }

}

const app = new Component

const obj = {
  loginForm: {
    tag: 'form',
    id: 'loginForm',
    'onsubmit': 'event.preventDefault()',
    template: `
      <label><b>Username(test)</b></label>
        <input type="text" placeholder="Enter Username" name="username" required>
      <label><b>Password(1234)</b></label>
        <input type="password" autocomplete="false" placeholder="Enter Password" name="password" required>
      <button k-click="submit()">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>`
  }
}

export default () => {
  app.mount(obj).link('content')
}