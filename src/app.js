import express from 'express'
import session from 'express-session'
import handlebars from 'express-handlebars'
import sessionRouter from './routes/session.router.js'
import mongoose from 'mongoose'
import initializePassport from './passport.config.js'
import passport from 'passport'

const app = express()
const MONGO_URL = 'mongodb://localhost:27017'
const MONGO_DBNAME = 'github39755'

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'victoriasecret',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/session', sessionRouter)
app.get('/', (req, res) => res.send('HOME'))

mongoose.set('strictQuery')
try {
    await mongoose.connect(MONGO_URL, { dbName: MONGO_DBNAME })
    app.listen(8080, () => console.log('Server Up'))
} catch(err) {}
