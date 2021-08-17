const express = require('express')
const ejs = require('ejs')
const app = new express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const expressSession = require('express-session');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(4000, () => {
    console.log('App listening on port 4000')
})
app.set('view engine', 'ejs');

const newPostController = require('./controllers/newPost')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleware = require("./middleware/validateMiddleware");
const samplepostController = require("./controllers/samplepost")
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const authMiddleware = require('./middleware/authMiddleware')
const logoutController = require('./controllers/logout')
const redirectIfAuthenticatedMiddleware =
    require('./middleware/redirectIfAuthenticatedMiddleware')
app.use('/posts/store', validateMiddleware)

app.use(expressSession({
    secret: 'Yellow Spider'
}))

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})


app.get('/posts/new', authMiddleware, newPostController)
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/samplepost', samplepostController)
app.get('/about', aboutController)
app.get('/contact', contactController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'))