import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        await createdUser.save();

        res.status(201).json({
            message: "User registered successfully",
            createdUser
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: error.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email});
        const isValid = await bcrypt.compare(password, user.password)
        if (!user || !isValid) {
            return res.status(401).json({ message: "Invalid email address or password." });
        }
        res.status(200).json({
            message: "User logged in successfully",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
            },
          });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: error.message });
    }
};

