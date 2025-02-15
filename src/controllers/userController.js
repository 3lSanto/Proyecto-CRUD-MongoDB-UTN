import { User } from '../models/user.js';

export const getUsers = async ( req, res ) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Users not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Users found',
      data: users,
    });
  } catch (error) {
    console.log('Error in getUser ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
}

export const profile = async ( req, res ) => {
  try {
    const userFound = await User.findById(req.user._id);
    if (!userFound) {
      return res.status(400).json({
        status: 400,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'User found',
      data: {
        _id: userFound.id,
        name: userFound.name,
        email: userFound.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
}

export const getUser = async ( req, res ) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: 400,
      message: 'ID is required',
    });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'User found',
      data: user,
    });
  
} catch (error) {
  console.error('Error in getUser ->', error);
  return res.status(500).json({
    status: 500,
    message: 'Server error',
  });
}
}

export const updateUser = async ( req, res ) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
    }, { new: true });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'User updated',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error in updateUser ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
}
export const deleteUser = async ( req, res ) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'User deleted',
    });
  } catch (error) {
    console.error('Error in deleteUser ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
};