const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const { allowedNodeEnvironmentFlags } = require('process')

const app = express()
const publicDirectoryPath = path.join (__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// set up handlebars engine and views location (templates)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

// server setup
// app.com
// app.com/help
// app.com/about
// app.com/weather


// routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Randy Myers'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Randy Myers'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'For help, contact DialAPrayer at 1-800-HelpMe! and ask for JC.',
        name: "Randy Myers"

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
           error: 'You must provide an Address'
       }) 
    }

    geocode (req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
              error: error
            })
        }
 

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send ({
                   error: error
                })
            }

            return res.send ({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send ({
        products:[]
    })
})

// 404 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404 Error',
        message: 'Help article not found.',
        name: "Randy Myers"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        message: 'The page you are looking for is not found.',
        name: "Randy Myers"
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

