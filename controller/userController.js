const { createFactory, getAllFactory, getByIdFactory, deleteByIdFactory } = require('../utility/crudFactory.js');
const userModel = require('../model/userModel.js');

const createUserHandler = createFactory(userModel);
const getAllUsers = getAllFactory(userModel);
const getUserById = getByIdFactory(userModel);
const deleteUserById = deleteByIdFactory(userModel);

module.exports = {
    createUserHandler,
    getAllUsers,
    getUserById,
    deleteUserById
};