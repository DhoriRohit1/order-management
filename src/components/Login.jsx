import React from 'react';
import { useUser } from './UserContext'; // Adjust the path as needed
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: (values) => {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
        const role = values.email === 'admin@example.com' ? 'admin' : 'customer';
        const userData = { ...values, role }; // Simulated user data
        login(userData);

        // Redirect based on user role
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/customer-dashboard');
        }
      } else {
        alert('Invalid credentials. Please register first.');
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...formik.getFieldProps('email')}
              className={`mt-1 block w-full p-2 border ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...formik.getFieldProps('password')}
              className={`mt-1 block w-full p-2 border ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Button */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={() => navigate('/register')}
            className="mt-2 text-indigo-600 hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
