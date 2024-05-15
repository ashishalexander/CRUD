import User from '../model/user model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        next(error); // Ensure the error is passed to the error handling middleware
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const validUser = await User.findOne({ email });
        console.log(validUser);

        if (!validUser) return next(errorHandler(401, "Invalid credentials"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;

        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest); // Send only the relevant user data
    } catch (error) {
        console.error(error);
        next(error); // Ensure the error is passed to the error handling middleware
    }
};
