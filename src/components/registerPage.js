import Keet from 'keet'
import renderProcessing from './renderProcessing'
import dragger from '../client-utils/dragger'

let log = console.log.bind(console)
// log(dragger)

class Component extends Keet {
  constructor() {
    super()
  }
  submit(){
    let inputs = document.querySelectorAll('input')
    let formData = ''

    inputs.forEach((i => formData += i.name + '=' + i.value.trim() + '&'))

    formData = formData.slice(0, -1)

    fetch('/api/register', {
      method: 'post',
      mode: 'same-origin',
      credentials: 'same-origin',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: formData
    }).then(res => res.json())
    .then(json => renderProcessing(json, 'register'))
  }
  dragEvent(){
    dragger(document.getElementById('drag'))
  }
}

const obj = {
  registerForm: {
    tag: 'div',
    id: 'registerForm',
    template: `
      <label><b>Nationality</b></label>
        <select name="country">
          <option value="my" selected="selected">Malaysia</option>
          <option value="us">USA</option>
          <option value="cn">China</option>
          <option value="ind">India</option>
        </select>
      <label><b>Email</b></label>
        <input type="email" autocomplete="false" placeholder="" name="email" required>
      <label><b>Verify</b></label>
        <div id="slider">
          <button id="drag">
           >>
         </button>
        </div>
      <label><b>Email confirmation code</b></label>
        <input type="emailconfirm" autocomplete="false" placeholder="" name="emailconfirm" required>
      <label><b>Password</b></label>
        <input type="password" autocomplete="false" placeholder="" name="password" required>
      <label><b>Confirm Password</b></label>
        <input type="password" autocomplete="false" placeholder="" name="confirmpassword" required>
      <label>
        <input type="checkbox" checked="checked" name="termagree"> I agree to the <a href="#">Term of Use</a>
      </label>
      <button k-click="submit()">Register</button>`
  }
}

const app = new Component

export default () => {
  app.mount(obj).link('content')
  app.dragEvent()
}