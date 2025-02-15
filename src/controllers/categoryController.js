import { Category } from '../models/category.js';

export const getCategories = async ( req, res ) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({
        status: 404,
        message: 'Categories not found',
      });
    }

  return res.status(200).json({
    status: 200,
    message: 'Categories found',
    data: categories,
  });

  } catch (error) {
    console.error('Error in getCategories ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
    
  }
  
}

export const createCategory = async ( req, res ) => {
  const { name, slug } = req.body;

  try {
    const category = new Category({
      name,
      slug,
    });
    const categorySave = await category.save();

    return res.status(201).json({
      status: 201,
      message: 'Category created',
      data: {
        _id: categorySave._id,
        name: categorySave.name,
        slug: categorySave.slug,
      },
    });

  } catch (error) {
    console.error('Error in createCategory ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
    
  }
}

export const getCategory = async ( req, res ) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Category found',
      data: category,
    });
  } catch (error) {
    console.error('Error in getCategory ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
}

export const updateCategory = async ( req, res ) => {
  const { id } = req.params;
  const { name, slug } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(id, {
      name,
      slug,
    }, { new: true });
    if (!category) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Category updated',
      data: category,
    });
  } catch (error) {
    console.error('Error in updateCategory ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
}

export const deleteCategory = async ( req, res ) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Category deleted',
    });
  } catch (error) {
    console.error('Error in deleteCategory ->', error);
    return res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
}