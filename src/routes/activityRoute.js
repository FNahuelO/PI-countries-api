const { Country, Actividad } = require('../db.js')


const postActivity = async(req, res) => {
    const { name, dificultad, duracion, temporada} = req.body[0]
   try{
    const newActivity = await Actividad.create({
        name, dificultad, duracion, temporada
    })
    req.body[1].forEach(async id => {
        const pushCountries = await Country.findOne({
            where: {
                id: id
            }
        })
        newActivity.addCountry(pushCountries)
    })
    res.json(newActivity)
   } catch(e){
    console.log(e)
   }
}

const getActivities = async (req, res) => {
    try{
        const activities = await Actividad.findAll()
        res.json(activities)
    } catch(e){
        console.log(e)
    }
}

module.exports = {
    postActivity,
    getActivities
}