import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [3, 'Product name must be at least 3 characters long'],
    maxlength: [100, 'Product name must be less than 100 characters long'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Product price must be a positive number'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'There must be at least one tag',
    },
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'inactive'],
    default: 'draft',
  },
}, { timestamps: true });


const Product = mongoose.model('Product', ProductSchema);

export { Product };