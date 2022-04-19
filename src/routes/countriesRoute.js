const { Country, Actividad } = require('../db.js')
const { Op } = require('sequelize')
const axios = require('axios')

const getCountries = async(req, res) => {
    try {
        let all = await Country.findAll()
        if (all.length === 0) {
            const response = await axios.get('https://restcountries.com/v3/all')
            for (let i = 0; i < response.data.length; i++) {
                let pais = response.data[i];
                Country?.create({
                    name: pais.translations.spa.common || pais.name.common,
                    id: pais.cioc || pais.cca3,
                    flag: pais.flags[0],
                    continente: pais.region,
                    capital: pais.capital ? pais.capital[0] : 'not capital',
                    subregion: pais.subregion,
                    area: Math.floor(pais.area),
                    population: pais.population
                })
            }
        }


        if (!req.query.name) {
            Country.findAll({
                include: [{ model: Actividad  }]
            })
                .then(data => res.status(200).json(data))
        } else {
            const { name } = req.query
                //nombre = name.replace(name[0], (n) => n.toUpperCase())
            Country.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${name.slice(0,3)}%`
                        }
                    }, 
                    include: { 
                        model: Actividad 
                    }
                })
                .then(response => response.length !== 0 ? res.status(200).json(response) : res.status(404).json({ error: 'No se encontró el país indicado' }))
        }
    } catch (e) {
        console.log(e)
    }
}

const getCountry = async(req, res) => {
    try {
        const { id } = req.params
        Country.findByPk(id, 
            { include: { model: Actividad } })
            .then(data => res.json(data))
    } catch (e) {
        res.status(404).send(e)
    }
}

const orderCountries = async(req, res) => {
    try{
        let { order } = req.params
        Country.findAll({
            order: [['name',order]],
            include: {model: Actividad}
        })
        .then(data => res.json(data))
    } catch (e){}
}

const orderPopulation = async(req, res) => {
    try{
        const { order } = req.params;
        Country.findAll({
            order: [['population',order]],
            include: {model: Actividad}
        })
        .then(data => res.json(data))
    } catch (e){}
}

const filterContinent = async(req, res) => {
    try {
        let { continente } = req.params;
        continente = continente.replace(continente[0], (n) => n.toUpperCase())
        Country.findAll({
            where: {
                continente : continente
            }
        })
        .then(data => data ? res.json(data) : res.sendStatus(404))
    } catch (error) {
        
    }
}


module.exports = {
    getCountries,
    getCountry,
    orderCountries,
    orderPopulation,
    filterContinent,
}
