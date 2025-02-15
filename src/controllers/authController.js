import { User } from '../models/user.js';
import { encryptPassword, comparePassword } from '../utils/encryptor.js';
import { signToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const newUser = new User({ name, email, password, role });

    newUser.password = await encryptPassword(password);

    const user = await newUser.save();
    // const token = await signToken({ _id: user._id });

    // res.cookie('token', token);
    return res.status(201).json({
      status: 201,
      menssage: 'User created',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error in register ->', error);
    return res.status(500).json({
      status: 500,
      menssage: 'Internal server error',
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json({
        status: 400,
        menssage: 'User not found',
      });
    }

    const match = await comparePassword(password, userFound.password);

    if (!match) {
      return res.status(400).json({
        status: 400,
        menssage: 'Invalid password',
      });
    }

    const token = await signToken({ _id: userFound._id, role: userFound.role });

    res.cookie('token', token);

    return res.status(200).json({
      status: 200,
      menssage: 'User logged in',
      data: {
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
      },
    });
  } catch (error) {
    console.error('Error in login ->', error);
    return res.status(500).json({
      status: 500,
      menssage: 'Internal server error',
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  return res.status(200).json({
    status: 200,
    menssage: 'User logged out',
  });
};
