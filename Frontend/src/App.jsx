import React, { useEffect, useState } from 'react';
import { Users, Share2, MessageCircle, ArrowRight } from 'lucide-react';
import AnimatedLogo from './components/AnimatedLogo';
import FeatureCard from './components/FeatureCard';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const LandingPage = () => {
 const navigate= useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (validateEmail(email)) {
      toast.success('Subscribed successfully!');
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  const features = [
    {
      icon: Users,
      title: "Group Sessions",
      description: "Create or join listening rooms with friends. Everyone can add songs and vote on what plays next."
    },
    {
      icon: Share2,
      title: "Shared Playlists",
      description: "Collaboratively build playlists in real-time. Perfect for parties, study groups, or virtual hangouts."
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "React to songs, share thoughts, and discuss music with other listeners in your group."
    }
  ];

  return (
    <>
    <Outlet/>
    <div className="relative min-h-screen  bg-black overflow-x-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container mx-auto px-4 py-16 relative">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <AnimatedLogo />
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start text-left mb-20 w-full">
          <div className="w-full md:w-1/2 ">
            <h1 className="mt-[100px] text-4xl md:text-6xl font-bold mb-6 text-white">
              Listen Together,
              <span className="text-cyan-600"> In Perfect Sync</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Create music rooms, invite friends, and enjoy a synchronized listening experience. Vote on songs, chat in real-time, and discover music together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-full text-lg font-medium flex items-center justify-center transition-colors text-white"
              >
                Start a Room <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto border border-cyan-600 hover:bg-cyan-600/20 px-8 py-3 rounded-full text-lg font-medium transition-colors text-white"
              >
                Join Room
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-[110px] mb-0 md:mt-[90px]">
            <DotLottieReact
              src="https://lottie.host/ca4ed8bc-ba1b-40e9-bbf9-98cdb31cc7d2/y8unDCSl3J.lottie"
              loop
              autoplay
              style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
            />
            <DotLottieReact
              src="https://lottie.host/1242ccba-00bf-4bbb-a527-95e6c6b2d5bc/Dyt2Ev76iQ.lottie"
              loop
              autoplay
              style={{ width: '100%', maxWidth: '600px', height: 'auto', transform: 'scaleX(-1)' }}
            />
          </div>
        </div>

        {/* Features Section */}
        <section className="py-12 ">
          <h2 className="text-[50px] font-bold text-center mb-12 text-white ">Better Together</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-transparent border-2 rounded-[10px] border-cyan-600">
          <h2 className=" text-[50px] font-bold text-center mb-12 text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-3xl bg-cyan-600 w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto text-white">1</div>
              <h3 className="font-bold text-3xl text-white">Create a Room</h3>
              <p className="text-xl text-gray-400">Start a music room and invite your friends with a simple share link</p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl bg-cyan-600 w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto text-white">2</div>
              <h3 className="font-bold text-3xl text-white">Add Songs</h3>
              <p className="text-xl text-gray-400">Everyone can add songs to the queue and vote on what plays next</p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl bg-cyan-600 w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto text-white">3</div>
              <h3 className="font-bold text-3xl text-white">Enjoy Together</h3>
              <p className="text-xl text-gray-400">Listen in perfect sync, chat, and react to songs in real-time</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-[10px] py-16 text-center border-2 border-cyan-600 mt-[55px]">
          <div className="bg-transparent rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Subscribe for Updates</h2>
            <p className="text-xl text-gray-400 mb-8">
              Stay updated with the latest features and news. Subscribe to our newsletter!
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={handleSubscribe}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-full border w-full sm:w-[400px] border-gray-300 focus:outline-none focus:border-cyan-600"
              />
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-full text-lg font-medium transition-colors text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} GroupSync. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default LandingPage;