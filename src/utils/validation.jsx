import * as Yup from 'yup';

// Login Validation Schema
export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

// Registration Validation Schema
export const registerValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  role: Yup.string().oneOf(['customer', 'admin'], 'Invalid role').required('Required'),
});

// Product Form Validation Schema
export const productValidationSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  stock: Yup.number().required('Stock is required').min(1, 'Stock must be at least 1'),
});
