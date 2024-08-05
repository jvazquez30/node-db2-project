
const db = require('../../data/db-config')


const getAll = () => {
  // DO YOUR MAGIC
  const result = db('cars')
  return result
}

const getById = (id) => {
  // DO YOUR MAGIC
  const result = db('cars').where('id', id).first()
  return result
}

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db('cars').insert(car)
  return getById(id)
}

module.exports = {
  getAll, getById, create
}
