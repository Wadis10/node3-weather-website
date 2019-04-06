const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weather');

//Define paths for Express config
const app = express();
const publicDirectoryPath = path.join(__dirname, '../src/public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "John Smith"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Donald Trump'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Text',
        helptext: 'how to guide below',
        name: 'John Smith'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a valid address'
        })
    }

    geocode.geocodeAddress(req.query.address, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
            return res.send({ errorMessage })
        } else {
            console.log(results.address);
        }
        forecast.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
                return res.send({error})
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
            };
            
            
        
    res.send({
        location: results.address,
        temperature: weatherResults.temperature,
        apparent_Temperature: weatherResults.apparentTemperature,
        Forecast: weatherResults.forecast

    })
});
});
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('problem', {
        title: '404 error',
        name: 'Mike Pence',
        helptext: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('problem', {
        title: '404 error',
        name: 'Kevin Rudd',
        helptext: 'Page not found'
    })
})
//needs to come last


app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});