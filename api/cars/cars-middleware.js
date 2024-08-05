const db = require('../../data/db-config')
const Car = require('./cars-model')
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const car = await Car.getById(req.params.id)
  if (!car) {
    next({
      status: 404, message: `car with id ${req.params.id} is not found`
    })
  } else {
    req.account = car
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const errorMessage = { status: 400 }
  const { vin, model, make, mileage } = req.body
  if (vin === undefined ) {
    errorMessage.message = `vin is missing`
    next(errorMessage)
  } else if (model === undefined) {
    errorMessage.message = 'model is missing'
    next(errorMessage)
  } else if (make === undefined) {
    errorMessage.message = 'make is missing'
    next(errorMessage)
  } else if (mileage === undefined) {
    errorMessage.message = 'mileage is missing'
    next(errorMessage)
  }
  if (errorMessage.message) {
    next(errorMessage)
  } else {
    next()
  }
  
}

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  const vinNum = req.body.vin
  if (vinValidator.validate(vinNum)) {
    next()
  } else {
    next({
      status: 400,
      message: `vin ${vinNum} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const vinNum = req.body.vin
  const vinExist = await db('cars').where('vin', vinNum).first()

  if (vinExist) {
    next({
      status: 400,
      message: `vin ${vinNum} already exists`
    })
  } else {
    next()
  }

  
}

module.exports = {
  checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid
}
