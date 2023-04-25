const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { 
    getCountries,
    getCountriesByName,
    getCountryById,
    postActivity,
    byActivities
} = require('../../src/routes/controllers');

const router = Router();



router.get('/countries', async function(req, res) {
    const { name } = req.query;
   
    try {
        let countries = await getCountries();
        if (name) {
            const byNameCountries = await getCountriesByName(name);
            byNameCountries.length ?
                res.status(200).json(byNameCountries) :
                res.sendStatus(404);
        } else {
            const allCountries = await getCountries();
            allCountries ?
                res.status(200).json(allCountries) :
                res.sendStatus(404);
        }
    } catch (err) {
        console.log({error:err});
        res.sendStatus(500);
    }
});

router.get('/countries/:id', async function(req, res) {
    const { id } = req.params;
    console.log(id)
    try {
        const countryByID = await getCountryById(id.toUpperCase());
        console.log(countryByID)
        countryByID ?
        res.status(200).json(countryByID) :
        res.sendStatus(404);
    } catch (err) {
        console.log({error:err});
        res.sendStatus(500);
    }
});


router.post('/activity', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        const newActivity = await postActivity(name, difficulty, duration, season, countries);
        res.status(200).json(newActivity);
    } catch (err) {
        console.log({error:err});
        res.sendStatus(500);
    }
});

router.get('/activities', async (req, res) => {
    try {
        const getActivities = await byActivities();
        res.status(200).json(getActivities);
    } catch (err) {
        console.log({error:err});
        res.sendStatus(500);
    }
});

module.exports = router;