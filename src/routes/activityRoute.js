const { Country, Actividad } = require('../db.js')
const Stripe = require('stripe')
const { SECRET_APIKEY } = process.env

const stripe = new Stripe(SECRET_APIKEY)

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

const checkout = async (req, res) => {
    try {
        const obj = req.body
        console.log(obj)
        const payment = await stripe.paymentIntents.create({
            amount: obj.amount,
            currency: "USD",
            description: obj.description,
            payment_method: obj.id,
            confirm: true
        })
    
        console.log(payment)
    
        res.send("Succesfull payment")
    } catch (error) {
        res.send({message: error.raw.message})
    }
}

module.exports = {
    postActivity,
    getActivities,
    checkout
}