import { Product } from '../models/product.js'

export const getProducts = async ( req, res ) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Products not found',
      });
    }

  return res.status(200).json({
    status: 200,
    message: 'Products found',
    data: products,
  });
  } catch (error) {
    console.error('Error in getProducts ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
    
  }
}

export const getProduct = async ( req, res ) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: 400,
      message: 'ID is required',
    });
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found',
      });
    }

  return res.status(200).json({
    status: 200,
    message: 'Product found',
    data: product,
  });

} catch (error) {
  console.error('Error in getProduct ->', error);
  return res.status(500).json({
    status: 500,
    message: 'Server error',
  });
}
}

export const createProduct = async ( req, res ) => {
  const { name, price, tags, status} = req.body;

  try {
    const product = new Product({
      name,
      price,
      tags,
      status,
    });
    const productSave = await product.save();

    return res.status(201).json({
      status: 201,
      message: 'Product created',
      data: {
        _id: productSave._id,
        name: productSave.name,
        price: productSave.price,
        tags: productSave.tags,
        status: productSave.status,
      },
    });

  } catch (error) {
    console.error('Error in createProduct ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
}

export const updateProduct = async ( req, res ) => {
  const { id } = req.params;
  const { name,
    price,
    tags,
    status, } = req.body;

  try {
    const productUpdated = await Product.findByIdAndUpdate(id, {
      name,
      price,
      tags,
      status,
    }, { new: true });
    if (!productUpdated) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Product updated',
      data: productUpdated,
    });
  
} catch (error) {
  console.error('Error in updateProduct ->', error);
  return res.status(500).json({
    status: 500,
    message: 'Server error',
  });
}
}

export const deleteProduct = async ( req, res ) => {
  const { id } = req.params;

  try {
    const productDeleted = await Product.findByIdAndDelete(id);
    if (!productDeleted) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Product deleted',
      data: productDeleted,
    });
  
} catch (error) {
  console.error('Error in deleteProduct ->', error);
  return res.status(500).json({
    status: 500,
    message: 'Server error',
  });
}
}