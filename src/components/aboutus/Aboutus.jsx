import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Rocket } from 'lucide-react';

const AboutUs = ({ handleclick }) => {
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20" style={{marginTop: '50px'}}>        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
        >
          <FeatureCard 
            icon={<Shield className="w-16 h-16 text-blue-700" />}
            title="Secure & Transparent"
            description="Leveraging Ethereum blockchain for enhanced security and transparency in crowdfunding."
          />
          <FeatureCard 
            icon={<Users className="w-16 h-16 text-blue-700" />}
            title="Community-Driven"
            description="Empowering entrepreneurs and backers to bring innovative ideas to life."
          />
          <FeatureCard 
            icon={<Rocket className="w-16 h-16 text-blue-700" />}
            title="Innovation-Focused"
            description="Supporting groundbreaking projects across various fields and industries."
          />
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md p-8"
          style={{marginTop: '30px'}}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-black mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            CryptoBacker aims to revolutionize crowdfunding by creating a secure, transparent, and efficient platform leveraging blockchain technology. We strive to connect visionary creators with enthusiastic backers, fostering innovation and bringing groundbreaking ideas to life.
          </p>
          <p className="text-gray-600">
            Our platform ensures the integrity of campaigns through rigorous verification processes and smart contract-based fund management, providing a trustworthy environment for both creators and backers.
          </p>
        </motion.div>

        <motion.div 
          className="text-center"
          style={{marginTop: '30px'}}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-black mb-6">Join Us in Shaping the Future</h2>
          <p className="text-gray-600 mb-10">
            Whether you're an innovator with a world-changing idea or a backer looking to support the next big thing, CryptoBacker is your gateway to the future of crowdfunding.
          </p>
          <motion.button 
            onClick={handleclick} 
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg"
            style={{marginBottom: '30px'}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-white rounded-lg p-8 text-center"
      style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-black mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default AboutUs;