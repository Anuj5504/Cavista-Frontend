import React from 'react';
import FAQSection from '../ComponentsUI/FAQSection';
import Hero from '../ComponentsUI/Hero';
import Navbar from '../ComponentsUI/Navbar';

function Home() {
  return (
    <div className='w-full min-h-screen bg-white'>

      {/* Main Content */}
      <main className='w-full'>
        {/* Hero Section */}
        <section className='w-full'>
          <Hero />
        </section>

        {/* Features Section */}
        <section className='w-full bg-gray-50 py-20'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Why Choose HealthSetu?
              </h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                We provide comprehensive healthcare solutions that connect patients with the right healthcare providers, ensuring quality care and better health outcomes.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {[
                {
                  title: 'Easy Access',
                  description: 'Connect with healthcare providers instantly through our platform.',
                },
                {
                  title: 'Secure Platform',
                  description: 'Your health data is protected with enterprise-grade security.',
                },
                {
                  title: 'Quality Care',
                  description: 'Access to verified healthcare professionals across India.',
                },
              ].map((feature) => (
                <div key={feature.title} className='bg-white p-6 rounded-xl shadow-lg'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3'>{feature.title}</h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section with proper spacing and styling */}
        <section className='w-full py-20'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <FAQSection />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='w-full bg-blue-600 text-white py-12'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
              <div>
                <h3 className='text-xl font-bold mb-4'>HealthSetu</h3>
                <p className='text-blue-100'>
                  Connecting healthcare across India
                </p>
              </div>
              <div>
                <h4 className='font-semibold mb-4'>Quick Links</h4>
                <ul className='space-y-2'>
                  <li><a href="#" className='text-blue-100 hover:text-white'>About Us</a></li>
                  <li><a href="#" className='text-blue-100 hover:text-white'>Services</a></li>
                  <li><a href="#" className='text-blue-100 hover:text-white'>Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-4'>Support</h4>
                <ul className='space-y-2'>
                  <li><a href="#" className='text-blue-100 hover:text-white'>Help Center</a></li>
                  <li><a href="#" className='text-blue-100 hover:text-white'>Privacy Policy</a></li>
                  <li><a href="#" className='text-blue-100 hover:text-white'>Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-4'>Contact Us</h4>
                <p className='text-blue-100'>
                  Email: support@healthsetu.com<br />
                  Phone: +91 XXX XXX XXXX
                </p>
              </div>
            </div>
            <div className='border-t border-blue-400 mt-8 pt-8 text-center text-blue-100'>
              <p>&copy; 2024 HealthSetu. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Home;