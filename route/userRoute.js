const userRoute = require('express').Router()
const { homeController, createController, updateController, notFound, createUser, readUser, readSingle , updateUser , deleteUser} = require('../controller/userController')

//to  handle front end view
userRoute.get(`/`, homeController)
userRoute.get(`/create`, createController)
userRoute.get(`/update`, updateController)


///API routes///

// read all
userRoute.get(`/api/users`, readUser)

// read single
userRoute.get(`/api/users/:id`, readSingle)

// create user
userRoute.post(`/api/newuser`, createUser)

// update user
userRoute.post(`/api/update/:id`, updateUser)

// delete user
userRoute.delete(`api/delete/:id` , deleteUser)

//path not founf (default route)
userRoute.all(`/*`, notFound)

module.exports = userRoute