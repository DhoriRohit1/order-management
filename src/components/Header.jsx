import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 

const Header = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    return (
        <header className="bg-gradient-to-r from-pink-800 to-indigo-700 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">Shopping App</div>
                <div className="flex items-center md:hidden">
                    
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                {/* Links for Desktop and Mobile */}
                <div className={`flex flex-col md:flex-row md:items-center ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <Link to="/home" className="mr-4 relative group">
                        <span className="">Home</span>
                        <span className="absolute left-0 -bottom-1 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>

                    {user ? (
                        <>
                            <Link to="/product-catalog" className="mr-4 relative group">
                                <span className="">Product Catalog</span>
                                <span className="absolute left-0 -bottom-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{height:"3px"}}></span>
                            </Link>
                            <Link to="/shopping-cart" className="mr-4 relative group">
                                <span className="">Shopping Cart</span>
                                <span className="absolute left-0 -bottom-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{height:"3px"}}></span>
                            </Link>
                            <Link to="/order-history" className="mr-4 relative group">
                                <span className="">Order History</span>
                                <span className="absolute left-0 -bottom-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{height:"3px"}}></span>
                            </Link>
                            <Link to="/customer-dashboard" className="mr-4 relative group">
                                <span className="">Customer Dashboard</span>
                                <span className="absolute left-0 -bottom-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{height:"3px"}}></span>
                            </Link>
                            <Link to="/product-form" className="mr-4 relative group">
                                <span className="">Add Product</span>
                                <span className="absolute left-0 -bottom-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{height:"3px"}}></span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-sky-400 px-4 py-2 rounded hover:bg-sky-700 transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="mr-4 relative group">
                                <span className="">Login</span>
                                <span className="absolute left-0 -bottom-1 w-full  bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{height:"3px"}}></span>
                            </Link>
                            <Link to="/register" className="mr-4 relative group">
                                <span className="">Register</span>
                                <span className="absolute left-0 -bottom-1 w-full  bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{height:"3px"}}></span>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
