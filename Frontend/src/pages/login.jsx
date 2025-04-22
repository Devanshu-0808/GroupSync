import React, { useState } from 'react';
import { Music, Mail, Lock, Chrome, Github } from 'lucide-react';
import { login, signUp } from '../services/user-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!isLoginForm) {
      signUp({ email, password })
        .then(({ data }) => {
          if(data==="Registered Sucessfully")
          toast.success(data);
        else
          toast.error(data);
        })
        .catch((error) => {
       
          toast.error("An error occurred. Please try again.");
        });
    } else {
      const username = email;
      login({ username, password })
        .then(({ data }) => {
          if (data === "Login Sucessful") {
            toast.success("Successfully logged in");
            authLogin(); // Update authentication state
            
            navigate("/create"); // Redirect to create page
          }
          else
          {
            toast.error(data)
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("An error occurred. Please try again.");
        });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-gray-300">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="p-4 max-w-md mx-auto space-y-6 relative">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Music className="w-7 h-7 text-cyan-600" /> {/* Changed to cyan-600 */}
          <span className="ml-2 text-2xl font-bold text-white">GroupSync</span> {/* Changed to cyan-600 */}
        </div>

        {/* Main Card */}
        <div className="bg-transparent p-8 rounded-2xl shadow-lg">
          {/* Toggle Buttons */}
          <div className="flex mb-8 bg-transparent rounded-lg p-1">
            <button
              className={`flex-1 py-2 rounded-lg transition-colors ${
                isLoginForm ? 'bg-cyan-600 text-white' : 'hover:bg-gray-600 text-white'
              }`}
              onClick={() => setIsLoginForm(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-lg transition-colors ${
                !isLoginForm ? 'bg-cyan-600 text-white' : 'hover:bg-gray-600 text-white'
              }`}
              onClick={() => setIsLoginForm(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                 className="w-full bg-transparent rounded-lg py-2 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white selection:bg-gray-700 selection:text-white border border ring-blue-400"
                  placeholder="Enter your email"
                  name='username'
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-transparent rounded-lg py-2 pl-10 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white selection:bg-gray-700 selection:text-white border border ring-blue-400"
                  placeholder="Enter your password"
                  name='password'
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-lg transition-colors font-medium text-white"
            >
              {isLoginForm ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Terms */}
        <p className="mt-8 text-center text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <button className="text-cyan-600 hover:underline">Terms of Service</button> {/* Changed to cyan-600 */}
          {' '}and{' '}
          <button className="text-cyan-600 hover:underline">Privacy Policy</button> {/* Changed to cyan-600 */}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;