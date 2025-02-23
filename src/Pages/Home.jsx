import React from 'react';
import FAQSection from '../ComponentsUI/FAQSection';
import Hero from '../ComponentsUI/Hero';
import Navbar from '../ComponentsUI/Navbar';

function Home() {
  return (
    <div className='w-full min-h-screen bg-white'>

      <main className='w-full'>
        <section className='w-full'>
          <Hero />
        </section>

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

        <section className='w-full py-20'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto'>
              <FAQSection />
            </div>
          </div>
        </section>

        
      </main>
    </div>
  );
}

export default Home;