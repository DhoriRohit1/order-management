import { useFormik } from 'formik';
import * as Yup from 'yup';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

const ProductForm = ({ isEditMode = false, initialProductData = {} }) => {
  const formik = useFormik({
    initialValues: {
      name: initialProductData.name || '',
      price: initialProductData.price || '',
      stock: initialProductData.stock || '',
      image: initialProductData.image || null, // Add image field
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      price: Yup.number().required('Price is required').positive('Price must be a positive number'),
      stock: Yup.number().required('Stock is required').min(1, 'Stock must be at least 1'),
      image: Yup.mixed().required('Image is required'), // Add validation for image
    }),
    onSubmit: async (values) => {
      const products = getFromLocalStorage('products') || [];

      // Convert image file to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;

        // Create a new product object
        const newProduct = {
          id: isEditMode ? initialProductData.id : Date.now(), // Keep the same id if editing
          name: values.name,
          price: values.price,
          stock: values.stock,
          image: base64Image, // Use Base64 string
        };

        if (isEditMode) {
          // If editing, update the product
          const updatedProducts = products.map((product) =>
            product.id === initialProductData.id ? newProduct : product
          );
          saveToLocalStorage('products', updatedProducts);
        } else {
          // Add new product
          products.push(newProduct);
          saveToLocalStorage('products', products);
        }

        alert(isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
        formik.resetForm(); // Reset the form after submission
      };

      // Read the image file as a Data URL (Base64)
      reader.readAsDataURL(values.image);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditMode ? 'Edit Product' : 'Add Product'}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700">Product Name</label>
        <input
          type="text"
          {...formik.getFieldProps('name')}
          className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
            formik.touched.name && formik.errors.name ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          {...formik.getFieldProps('price')}
          className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
            formik.touched.price && formik.errors.price ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.price && formik.errors.price && (
          <div className="text-red-500 text-sm">{formik.errors.price}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Stock</label>
        <input
          type="number"
          {...formik.getFieldProps('stock')}
          className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
            formik.touched.stock && formik.errors.stock ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.stock && formik.errors.stock && (
          <div className="text-red-500 text-sm">{formik.errors.stock}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            formik.setFieldValue('image', event.currentTarget.files[0]);
          }}
          className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
            formik.touched.image && formik.errors.image ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.image && formik.errors.image && (
          <div className="text-red-500 text-sm">{formik.errors.image}</div>
        )}
        {formik.values.image && (
          <img
            src={URL.createObjectURL(formik.values.image)}
            alt="Product Preview"
            className="mt-2 w-full h-auto rounded-md"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        {isEditMode ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
