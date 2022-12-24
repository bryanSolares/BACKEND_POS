const userModel = require('../models/user.model')

const createUser = async (user) => {
  return userModel.create(user)
}

const getUser = async (id) => {
  return userModel.findByPk(id, { attributes: { exclude: ['password', 'deleted'] } }, { deleted: false })
}

/**
 *
 * @param {number} offset
 * @param {number} limit
 * @returns All Users include number of pages
 */
const getAllUsers = async (page = 1, limit = 10) => {
  const offset = parseInt((page - 1) * limit)
  const { rows, count } = await userModel.findAndCountAll({
    where: { status: true, deleted: false },
    raw: true,
    limit,
    offset,
    attributes: { exclude: ['password', 'deleted'] },
    order: [['cod_user', 'ASC']]
  })
  const totalPages = Math.ceil(count / limit)

  return { pages: totalPages, users: rows }
}

const updateUser = async (id, user) => {
  return userModel.update(user, { where: { cod_user: id } })
}
const deleteUser = async (id) => {
  return userModel.update({ deleted: true }, { where: { cod_user: id } })
}
const updateImage = async (id, url) => {
  return userModel.update({ image: url }, { where: { cod_user: id } })
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateImage
}
