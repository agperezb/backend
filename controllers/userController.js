require('dotenv').config({ path: 'variables.env'});
const User = require('../models/user');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = new User({email, password});
        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.API_KEY)
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            res.status(401).json({ msg: 'No existe el usuario' });
        }
        if(user.password !== password){
            res.status(401).json({ msg: 'Datos incorrectos' });
        }
        const token = jwt.sign({_id: user._id}, process.env.API_KEY);
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
