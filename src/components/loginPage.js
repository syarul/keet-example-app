import Keet from 'keet'

const cat = (...args) => [...args].join('')

class Component extends Keet {
  constructor() {
    super()
  }

  _validateMyForm(){
    let inputs = this.vdom().querySelectorAll('input')

    let formData = ''

    inputs.forEach((i, idx) => {
      if(idx < 2) formData += i.name + '=' + i.value.trim() + '&'
    })

    formData = formData.slice(0, -1)

    log(formData)

    // str({
    //   method: 'post',
    //   contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    //   body: formData,
    // }).pipe(new fetchStream).pipe(this.processLoginData())
  }

}

const obj = {
  template: '{{loginForm}}',
  loginForm: {
    tag: 'form',
    id: 'loginForm',
    'onsubmit': 'event.preventDefault();validateMyForm()',
    template: cat(
      '<label><b>Username</b></label>',
      '<input type="text" placeholder="Enter Username" name="uname" required>',
      '<label><b>Password</b></label>',
      '<input type="password" autocomplete="false" placeholder="Enter Password" name="psw" required>',
      '<button type="submit">Login</button>',
      '<label>',
        '<input type="checkbox" checked="checked"> Remember me',
      '</label>'
    )
  }
}

const app = new Component

window.validateMyForm = app._validateMyForm.bind(app)

// obj.validateMyForm = app._validateMyForm.bind(app)

export default run => app.mount(obj).flush('content').link('content')