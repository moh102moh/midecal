import React, { useContext, useState } from 'react'
import { AuthContext } from './context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const { login } = useContext(AuthContext)
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        
        try {
            const res = await fetch('https://medicalclinicmanagementsystem.onrender.com/user/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                setError(data.message || "Login failed. Please try again.");
                return;
            }
            
            if (data.token) {
                login(data.token);
                navigate('/');
            }
        } catch (err) {
            setError("Unable to connect to server. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='min-h-screen relative overflow-hidden bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            {/* خلفية متدرجة مع تأثيرات */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 z-0'></div>
            
            {/* تأثيرات الخلفية الجمالية */}
            <div className='absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
            <div className='absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
            <div className='absolute -bottom-8 left-20 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
            
            {/* نقاط زخرفية */}
            <div className='absolute top-10 left-10 w-6 h-6 bg-blue-400 rounded-full opacity-10'></div>
            <div className='absolute bottom-10 right-10 w-10 h-10 bg-blue-300 rounded-full opacity-10'></div>
            <div className='absolute top-1/2 left-1/4 w-4 h-4 bg-blue-500 rounded-full opacity-20'></div>
            
            {/* محتوى النموذج */}
            <div className='relative z-10 max-w-md w-full mx-auto space-y-8'>
                <div className='text-center'>
                    <div className='inline-block relative'>
                        <h2 className='mt-6 text-4xl font-bold text-gray-900 relative z-10'>
                            Welcome <span className='text-blue-600'>Back</span>
                        </h2>
                        <div className='absolute -bottom-1 left-1/4 w-1/2 h-2 bg-blue-100 rounded-full z-0'></div>
                    </div>
                    <div className='w-24 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-4 mb-2 rounded-full'></div>
                    <p className='mt-2 text-lg text-gray-600'>
                        Enter your credentials to access your account
                    </p>
                </div>

                <div className='bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300'>
                    {/* Decorative top border */}
                    <div className='h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500'></div>
                    
                    <div className='p-8'>
                        <form className='space-y-6' onSubmit={handleSubmit}>
                            {error && (
                                <div className='bg-red-50 border-l-4 border-red-500 p-4 rounded-lg backdrop-blur-sm'>
                                    <div className='flex'>
                                        <div className='flex-shrink-0'>
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className='ml-3'>
                                            <p className='text-sm text-red-700 font-medium'>{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className='space-y-5'>
                                <div>
                                    <label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Email Address
                                    </label>
                                    <div className='relative group pr-8'>
                                        <div className='absolute -inset-1 bg-gradient-to-r from-blue-50 to-white rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300'></div>
                                        <input
                                            id='email'
                                            name='email'
                                            type='email'
                                            autoComplete='email'
                                            required
                                            value={form.email}
                                            onChange={handleChange}
                                            className='relative block w-full px-4 py-3 border border-gray-300/70 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white/50 backdrop-blur-sm'
                                            placeholder='Enter your email'
                                        />
                                        <div className='absolute right-3 top-3 text-blue-400'>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='password' className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Password
                                    </label>
                                    <div className='relative group pr-8'>
                                        <div className='absolute -inset-1 bg-gradient-to-r from-blue-50 to-white rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300'></div>
                                        <input
                                            id='password'
                                            name='password'
                                            type='password'
                                            autoComplete='current-password'
                                            required
                                            value={form.password}
                                            onChange={handleChange}
                                            className='relative block w-full px-4 py-3 border border-gray-300/70 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white/50 backdrop-blur-sm'
                                            placeholder='Enter your password'
                                        />
                                        <div className='absolute right-3 top-3 text-blue-400'>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center group cursor-pointer'>
                                        <div className='relative'>
                                            <input
                                                id='remember-me'
                                                name='remember-me'
                                                type='checkbox'
                                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded peer'
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-r from-blue-50 to-white rounded blur opacity-0 group-hover:opacity-30 transition duration-300'></div>
                                        </div>
                                        <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700 font-medium'>
                                            Remember me
                                        </label>
                                    </div>
                                    <div className='text-sm group'>
                                        <a href='#' className='font-semibold text-blue-600 hover:text-blue-500 transition-all duration-200 group-hover:translate-x-1 inline-block'>
                                            Forgot password?
                                        </a>
                                        <div className='w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300'></div>
                                    </div>
                                </div>
                            </div>

                            <div className='group'>
                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className={`relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white 
                                        ${isLoading 
                                            ? 'bg-blue-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                        } transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0`}
                                >
                                    <div className='absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300'></div>
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className='relative'>Signing In...</span>
                                        </>
                                    ) : <span className='relative text-blue-500'>Sign In</span>}
                                </button>
                            </div>

                            <div className='text-center pt-6 border-t border-gray-200/50'>
                                <p className='text-sm text-gray-600'>
                                    Don't have an account?{' '}
                                    <Link 
                                        to="/register" 
                                        className='font-semibold text-blue-600 hover:text-blue-500 transition-all duration-200 group inline-flex items-center'
                                    >
                                        Create one now
                                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* تذييل إضافي */}
                <div className='text-center'>
                    <p className='text-xs text-gray-500'>
                        Secure login with SSL encryption
                        <span className='mx-2'>•</span>
                        Protected by advanced security
                    </p>
                </div>
            </div>
            
            {/* خط زخرفي في الأسفل */}
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent'></div>
            
            {/* تأثيرات CSS للـ animate-blob */}
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    )
}

export default Login;