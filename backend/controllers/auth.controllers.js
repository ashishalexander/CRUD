import User from "../model/user model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    console.log("User created successfully");
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    next(error); 
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
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 3600000); 
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest); 
  } catch (error) {
    console.error(error);
    next(error); 
  }
};

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };