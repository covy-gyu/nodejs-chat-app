const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const registerLoad = async(req, res)=>{

    try {
            
        res.render('register')

    } catch (error) {
        console.log(error.message)
    }
}

const register = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: 'images/' + req.file.filename,
            password: passwordHash,
        })

        await user.save();

        res.render('register', { message : 'Your Registration has beened Successfully!' });

    } catch (error) {
        console.error(error); // 에러 콘솔 출력
        res.render('register', { error: 'An error occurred during registration. Please try again.' });
    }
}


module.exports = {
    registerLoad,
    register
}