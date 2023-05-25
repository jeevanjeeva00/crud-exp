const path = require('path')
const User = require('../model/userModel')

// to handle view
const homeController = (req,res) => {
    res.sendFile(path.resolve('./view/index.html'))
}

const createController = (req,res) => {
    res.sendFile(path.resolve('./view/create.html'))
}

const updateController = (req,res) => {
    res.sendFile(path.resolve('./view/update.html'))
}

const notFound = (req,res) => {
    res.sendFile(path.resolve('./view/404.html'))
}

//read all data

const readUser = async (req,res) => {
    try {

        const users = await User.find({})

        res.json({length : users.length,users})
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

//read single data

const readSingle = async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findById({ _id: id })
            
            if(!user)
                return res.status(404).json({ msg: `requested user id not found`})

        res.status(200).json({ user })

        
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}


//create   user
const createUser = async (req,res) => {
    try {

       const extEmail = await User.findOne({ email: req.body.email })
                if(extEmail)
                    return res.status(400).json({ msg: `${req.body.email} already registered.`})

       const extUserName = await User.findOne({ username: req.body.username })
                if(extUserName)
                    return res.status(400).json({ msg: `Username : ${req.body.username}, already registered.`})

        const newUser = await User.create(req.body)
        res.status(200).json({ data: newUser, msg: "New User Added Successfully" })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}


// update data

const updateUser = async (req,res) => {
    try{
        const id = req.params.id
        const extUser = await User.findById({_id: id})
            if(!extUser)
            return res.status(404).json({msg:`requested id = ${id} , not found`})

           const updateUser= await User.findByIdAndUpdate({_id:id} , req.body)
            res.status(200).json({updateUser , msg:"User update Successfully,"})

    }catch (err) {
        return res.status(500).json({ msg:err.message})
    }
}



// delete data
const deleteUser = async (req,res)=>{
    try{
        const id = req.params.id
        

        const extUser = await User.findById({_id:id})
        if(!extUser)
            return res.status(404).json({msg: `requested id =${id} , not found`})

        await User.findByIdAndUpdate({_id:id})
        return res.status(200).json({msg: `Hi ${extUser.name} , Your data has been removed .`})
    }catch (err){
        return res.status(500).json({msg:err.message})
    }
}


module.exports = { deleteUser,homeController, createController, updateController, notFound , createUser, updateUser , readUser , readSingle}
