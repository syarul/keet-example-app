const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const log = console.log.bind(console)

app.use(cookieParser('boom'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(logger('tiny'))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/view'))
app.use(express.static(path.join(__dirname, '/dist')))

let cookieStore = new Map()

app.get('*', function(req, res) {
    res.render('layout', {
    	uri: req.url
    })
})

app.post('/protected', (req, res) => res.send({ hasLogin: cookieStore.get(req.signedCookies.foo)}))

const util = require('util')

app.post('/login', (req, res) => {

	let reply = req.body.username == 'test' && req.body.password == '1234' ? true : false

	let data = Math.random().toString(32)

	if(reply) {
		cookieStore.set(data, true)
		res.cookie('foo', data, { signed: true })
	} else {
		cookieStore.set(data, false)
	}

	res.send(reply)
})

app.post('/logout', (req, res) => {
	let data = cookieStore.get(req.signedCookies.foo)
	if(data)
		cookieStore.delete(req.signedCookies.foo)
	log(cookieStore)
	res.send(true)
})

app.listen(8080, () => log('server listening at 8080'))