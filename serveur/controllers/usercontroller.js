const User = require("../models/user");
const bcrypt = require('bcryptjs');


exports.createuser = async(req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            gender: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            validpassword: req.body.validpassword
        })

        await user.save();
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}

exports.obtenerUser = async(req, res) => {

    try {

        const users = await User.find();
        res.json(users)

    } catch (error) {
        console.log(error);
        res.status(500).send(' error');
    }

}

exports.updateUser = async(req, res) => {

    try {
        const { firstname, lastname, phone, gender, email, password, validpassword } = req.body;
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ msg: 'No exist user' })
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.phone = phone;
        user.gender = gender;
        user.email = email;
        user.password = password;
        user.validpassword = validpassword;
        user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true })
        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}


exports.getuser = async(req, res) => {

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ msg: 'No exist user' })
        }

        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}

exports.deleteuser = async(req, res) => {

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ msg: 'no exist users' })
        }

        await User.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'users is deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}