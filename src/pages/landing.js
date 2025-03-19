import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  Smartphone, 
  ChartBar, 
  Target, 
  Clock, 
  ArrowRight, 
  Check,
  Briefcase,
  DollarSign,
  Home,
  PieChart,
  Clock3,
  Mail
} from 'lucide-react';

const WealthPulseLanding = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup with email:', email);
    setEmail('');
    alert('Thank you for your interest! We\'ll be in touch soon.');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="text-blue-600 mr-2" />
          <span className="text-2xl font-bold text-gray-800">WealthPulse</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
          <a href="#howItWorks" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
          <Link to="/login?mode=login" className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">Log In</Link>
          <Link to="/login?mode=signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Sign Up</Link>
        </div>
        <button className="md:hidden text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Track Your Wealth Journey Like Never Before</h1>
            <p className="text-xl mb-8 text-blue-100">Visualize your complete financial picture. Set goals, track progress, and make informed decisions with WealthPulse.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/login?mode=signup" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center">Get Started - It's Free</Link>
              <a href="#demo" className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors text-center">See Demo</a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-xl shadow-2xl p-4 transform rotate-1">
              <img src="/api/placeholder/600/400" alt="Dashboard Preview" className="rounded-lg" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-6 w-6" />
                <span className="text-lg font-bold">+24% Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Highlights */}
      <section id="features" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">Why Choose WealthPulse?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Our comprehensive financial tracking solution gives you the clarity and control you need to achieve your financial goals.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <ChartBar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Comprehensive Dashboard</h3>
              <p className="text-gray-600">Get a complete picture of your finances with our intuitive dashboard showing all your assets in one place.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Goal Setting</h3>
              <p className="text-gray-600">Set financial goals and track your progress with visual indicators to stay motivated and on track.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <PieChart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Asset Allocation</h3>
              <p className="text-gray-600">Visualize your asset distribution across different categories to optimize your investment strategy.</p>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-orange-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Clock3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Trend Analysis</h3>
              <p className="text-gray-600">Track your net worth over time with detailed trend analysis to see your financial growth.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Secure & Private</h3>
              <p className="text-gray-600">Your financial data is encrypted and protected. We never share your information with third parties.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-teal-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Smartphone className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Mobile Friendly</h3>
              <p className="text-gray-600">Access your financial dashboard anytime, anywhere with our responsive mobile design.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="howItWorks" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">How WealthPulse Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Simple steps to gain control of your financial future.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold mb-2 text-gray-800">Create Account</h3>
              <p className="text-gray-600">Sign up for free and set up your secure profile.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold mb-2 text-gray-800">Add Your Assets</h3>
              <p className="text-gray-600">Enter your financial data across different categories.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold mb-2 text-gray-800">Set Goals</h3>
              <p className="text-gray-600">Define your financial targets and timeline.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-bold mb-2 text-gray-800">Track Progress</h3>
              <p className="text-gray-600">Monitor your growth and adjust strategies as needed.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">What Our Users Say</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Join thousands of satisfied users who have transformed their financial lives.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm relative">
              <div className="absolute -top-4 -left-4 bg-blue-500 text-white p-2 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .527-.422.957-.95.957-.532 0-.954-.43-.954-.957l-.002-1.584-3.593-1.538a1 1 0 110-1.838l7-3zM15.949 6.263a1 1 0 00-.788 0l-7 3a1 1 0 000 1.838l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.838l-7-3zM5.023 12.194a1 1 0 01-.452-.105l-3.571-1.532a1 1 0 110-1.84l3.571-1.532a1 1 0 011.356.538 1 1 0 01-.538 1.356l-2.118.907 2.118.908a1 1 0 11-.452 1.842l-3.916-1.678-1.89.811a1 1 0 01-.787 0l-7-3a1 1 0 01-1.838l7-3a1 1 0 01.787 0l5.391 2.313a1 1 0 01-.452 1.842l-3.916-1.678-3.32 1.42 3.32 1.425a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-4.772-2.046-2.215.951 2.215.951a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-3.916-1.678-1.89.811a1 1 0 01-.787 0l-7-3a1 1 0 01-1.838l7-3a1 1 0 01.787 0l5.391 2.313a1 1 0 01-.452 1.842l-3.916-1.678-3.32 1.42 3.32 1.425a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-4.772-2.046-2.215.951 2.215.951a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-3.916-1.678-1.89.811a1 1 0 01-.787 0l-7-3a1 1 0 01-1.838l7-3a1 1 0 01.787 0l5.391 2.313a1 1 0 01-.452 1.842z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">"WealthPulse helped me visualize my entire financial picture for the first time. Now I can make informed decisions about my investments and savings."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Sarah Thompson</h4>
                  <p className="text-gray-500 text-sm">Entrepreneur</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm relative">
              <div className="absolute -top-4 -left-4 bg-blue-500 text-white p-2 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .527-.422.957-.95.957-.532 0-.954-.43-.954-.957l-.002-1.584-3.593-1.538a1 1 0 110-1.838l7-3zM15.949 6.263a1 1 0 00-.788 0l-7 3a1 1 0 000 1.838l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.838l-7-3zM5.023 12.194a1 1 0 01-.452-.105l-3.571-1.532a1 1 0 110-1.84l3.571-1.532a1 1 0 011.356.538 1 1 0 01-.538 1.356l-2.118.907 2.118.908a1 1 0 11-.452 1.842l-3.916-1.678-1.89.811a1 1 0 01-.787 0l-7-3a1 1 0 01-1.838l7-3a1 1 0 01.787 0l5.391 2.313a1 1 0 01-.452 1.842l-3.916-1.678-3.32 1.42 3.32 1.425a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-4.772-2.046-2.215.951 2.215.951a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-3.916-1.678-1.89.811a1 1 0 01-.787 0l-7-3a1 1 0 01-1.838l7-3a1 1 0 01.787 0l5.391 2.313a1 1 0 01-.452 1.842l-3.916-1.678-3.32 1.42 3.32 1.425a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-4.772-2.046-2.215.951 2.215.951a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-3.916-1.678-1.89.811a1 1 0 01-.787 0l-7-3a1 1 0 01-1.838l7-3a1 1 0 01.787 0l5.391 2.313a1 1 0 01-.452 1.842z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">"Setting financial goals was always abstract for me until WealthPulse. The visual dashboard keeps me motivated and on track toward my targets."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Michael Chen</h4>
                  <p className="text-gray-500 text-sm">Software Engineer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm relative">
              <div className="absolute -top-4 -left-4 bg-blue-500 text-white p-2 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .527-.422.957-.95.957-.532 0-.954-.43-.954-.957l-.002-1.584-3.593-1.538a1 1 0 110-1.838l7-3zM15.949 6.263a1 1 0 00-.788 0l-7 3a1 1 0 000 1.838l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.838l-7-3zM5.023 12.194a1 1 0 01-.452-.105l-3.571-1.532a1 1 0 110-1.84l3.571-1.532a1 1 0 011.356.538 1 1 0 01-.538 1.356l-2.118.907 2.118.908a1 1 0 11-.452 1.842l-3.916-1.678-1.89.811a1 1 0 01-.787 0l-7-3a1 1 0 01-1.838l7-3a1 1 0 01.787 0l5.391 2.313a1 1 0 01-.452 1.842l-3.916-1.678-3.32 1.42 3.32 1.425a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-4.772-2.046-2.215.951 2.215.951a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-3.916-1.678-1.89.811a1 1 0 01-.787 0l-7-3a1 1 0 01-1.838l7-3a1 1 0 01.787 0l5.391 2.313a1 1 0 01-.452 1.842l-3.916-1.678-3.32 1.42 3.32 1.425a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-4.772-2.046-2.215.951 2.215.951a1 1 0 01.452 1.338 1 1 0 01-1.338.452l-3.916-1.678-1.89.811a1 1 0 01-.787 0l-7-3a1 1 0 01-1.838l7-3a1 1 0 01.787 0l5.391 2.313a1 1 0 01-.452 1.842z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">"I love how WealthPulse gives me a breakdown of my assets. It's helped me diversify my portfolio and made me more confident about my financial future."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Emily Rodriguez</h4>
                  <p className="text-gray-500 text-sm">Financial Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Choose the plan that fits your needs.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Basic</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-gray-800">$0</span>
                  <span className="text-gray-500 ml-2 mb-1">/month</span>
                </div>
                <p className="text-gray-600 mb-6">Perfect for beginners and casual users.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Basic dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Manual data entry</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">1 financial goal</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">3 months history</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link to="/login?mode=signup" className="block w-full py-3 px-4 bg-gray-100 text-center rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors">Get Started</Link>
              </div>
            </div>
            
            <div className="bg-white border-2 border-blue-500 rounded-xl shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">POPULAR</div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Premium</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-gray-800">$9.99</span>
                  <span className="text-gray-500 ml-2 mb-1">/month</span>
                </div>
                <p className="text-gray-600 mb-6">For serious investors and financial planners.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Advanced dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Data import capabilities</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Unlimited financial goals</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Unlimited history</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Custom asset categories</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link to="/login?mode=signup" className="block w-full py-3 px-4 bg-blue-600 text-center rounded-lg font-medium text-white hover:bg-blue-700 transition-colors">Get Started</Link>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Enterprise</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-gray-800">$29.99</span>
                  <span className="text-gray-500 ml-2 mb-1">/month</span>
                </div>
                <p className="text-gray-600 mb-6">For wealth managers and financial advisors.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Everything in Premium</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Client management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Custom reports</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">Priority support</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link to="/login?mode=signup" className="block w-full py-3 px-4 bg-gray-100 text-center rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors">Contact Sales</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="signup" className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Financial Future?</h2>
          <p className="text-xl mb-8 text-blue-100">Start tracking your wealth journey today with WealthPulse.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Link to="/login?mode=signup" className="px-6 py-3 bg-blue-900 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </form>
          
          <p className="mt-4 text-blue-200 text-sm">No credit card required. Start with a free account.</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <TrendingUp className="text-blue-500 mr-2" />
              <span className="text-xl font-bold text-white">WealthPulse</span>
            </div>
            <p className="mb-4">Visualize your wealth journey and make informed financial decisions.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Financial Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>© {new Date().getFullYear()} WealthPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WealthPulseLanding;