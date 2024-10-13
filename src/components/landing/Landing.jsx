import React from 'react';
import { motion } from 'framer-motion';

const FeatureIcon = ({ d }) => (
  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);

const Feature = ({ title, description, iconPath }) => (
  <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      viewport={{ once: true }}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100"
    >
      <motion.div 
        className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        <FeatureIcon d={iconPath} />
      </motion.div>
      <h3 className="mb-2 text-xl font-bold text-center text-gray-900">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

const EnhancedFeatureSection = () => {
  const features = [
    {
      title: "Transparent Transactions",
      description: "Utilize blockchain technology to ensure every transaction is secure, transparent, and immutable, giving contributors confidence in the funding process.",
      iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    },
    {
      title: "Legal Compliance",
      description: "Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.",
      iconPath: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    },
    {
      title: "Verified Campaigns",
      description: "Implement a rigorous verification process to authenticate campaign details and creators, ensuring that all projects are legitimate and trustworthy",
      iconPath: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    },
    {
      title: "Community Feedback",
      description: "Foster an engaged community by incorporating real-time feedback mechanisms, allowing backers to voice their opinions and interact with creators.",
      iconPath: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
    },
    {
      title: "Secure Payments",
      description: "Ensure peace of mind for backers and creators with secure payment gateways that guarantee the safety and privacy of all transactions.",
      iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
      title: "Blockchain Integration",
      description: "Utilize blockchain technology to ensure every transaction is secure, transparent, and immutable, giving contributors confidence in the funding process.",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z"
    }
  ];

  return (
    <section className="bg-white py-16" style={{marginLeft: '40px'}} id="feature">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};


const Landing = () => {
  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id='hero'
      >
        <section className="bg-white mt-20">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
            <motion.h1
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
            >
              "Join the Heroes of Crowdfunding"
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-7 text-lg font-serif text-gray-500 lg:text-xl sm:px-16 xl:px-48"
            >
              At CryptoBacker, we champion innovation and collaboration to bring visionary projects to life. Join us in driving meaningful change and unlocking potential through collective support.
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white">
          <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-500 sm:text-lg"
            >
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">Next-Gen Crowdfunding</h2>
              <p className="mb-4">Discover how our platform's advanced features revolutionize the crowdfunding landscape. Experience seamless transactions, enhanced security, and transparent processes designed for both campaign creators and backers.</p>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              <img className="w-full rounded-lg" src="https://plus.unsplash.com/premium_photo-1661715123134-123a59c7c414?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="office content 1" />
              <img className="w-full mt-4 rounded-lg lg:mt-10" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* Feature Section */}
      <section className="bg-white" id='feature'>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-screen-md mb-8 lg:mb-16"
          >
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">Our Key Features</h2>
            <p className="text-gray-500 sm:text-xl">Explore the advanced features designed to enhance your crowdfunding experience and ensure a seamless, secure process for both creators and backers.</p>
          </motion.div>
          <EnhancedFeatureSection />
        </div>
      </section>
    </div>
  )
}

export default Landing;