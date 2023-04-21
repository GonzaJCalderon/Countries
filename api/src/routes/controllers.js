const axios = require('axios');
const { Activity, Country } = require('../db.js')
const { Op } = require('sequelize');

const getCountries = async () => {
  let dbCountries = await Country.findAll({
    include: [Activity]
  })

  try {
    if (dbCountries.length === 0) {
      const { data } = await axios.get('https://restcountries.com/v3/all');

      const countries = data.map((country) => {
        return {
          id: country.cca3,
          name: country.name.common,
          flags: country.flags[1],
          continents: country.continents[0],
          capital: country.capital ? country.capital[0] : 'Undefined capital city',
          subregion: country.subregion ? country.subregion : 'Undefinded Subregion',
          area: country.area,
          population: country.population
        };
      })

      countries.forEach(async (country) => {
        await Country.findOrCreate({
          where: { id: country.id },
          defaults: {
            id: country.id,
            name: country.name,
            flags: country.flags,
            continents: country.continents,
            capital: country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
          }
        })
      });
      dbCountries = await Country.findAll({
        include: [Activity]
      })
    }
    return dbCountries
  } catch (error) {
    console.log(error)
  }
}

const getCountriesByName = async (name) => {
  try {
    const byNameCountries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: [Activity]
    })
    return byNameCountries
  } catch (error) {
    console.log(error)
  }
}

const getCountryById = async (id) => {
  try {
    return await Country.findByPk(id, {
      include: [Activity]
    })
  } catch (error) {
    console.log(error)
  }
}

const byActivities = async () => {
  try {
    const byActivities = await Activity.findAll({});
    return byActivities
  } catch (error) {
    console.log(error)
  }
};

const postActivity = async (name, difficulty, duration, season, countries) => {
  try {
    console.log('linea 91', name, difficulty, duration, season, countries)
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season
    });

    const selectCountries = await Country.findAll({
      where: {
        name: countries
      }
    });
    console.log('linea 104', selectCountries)
    if (newActivity) {
      await newActivity.addCountry(selectCountries[0])
    }
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
    getCountries,
    getCountriesByName,
    getCountryById,
    byActivities,
    postActivity };

