const { Router } = require('express');
const { getCountries, getCountry, orderCountries, orderPopulation, filterContinent, activity } = require('./countriesRoute.js');
const { postActivity, getActivities, checkout } = require('./activityRoute.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.get('/countries?name', getCountri)

router.get('/countries', getCountries)

router.get('/countries/:id', getCountry)

router.get('/alpha/:order', orderCountries)

router.get('/population/:order', orderPopulation)

router.get('/filter/:continente', filterContinent)

router.get('/activity', getActivities)

router.post('/activity', postActivity)

router.post('/checkout', checkout)


module.exports = router;
