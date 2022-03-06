import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModal from "../models/user.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModal.findOne({email});

        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isPasswordCorrect = await bcrypt.compate(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({message: 'Incorrect password'});
        }

        const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: "30m" });
        return res.status(200).json({result: user, token});
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const user = await UserModal.findOne({email});

        if(user) {
            return res.status(400).json({message: 'User already exists'});
        }

        if(password !== confirmPassword) {
            return res.status(400).send('Password do not match');
        }

        const hashedPwd = await bcrypt.hash(password, 12);
        const result = await UserModal.create({firstName: firstName, lastName: lastName, email: email, password: hashedPwd});
        const token = jwt.sign({result: email, id: result._id}, 'secret', { expiresIn: '30m' });
        return res.status(200).json({result: result, token});
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal server error');
    }
}
