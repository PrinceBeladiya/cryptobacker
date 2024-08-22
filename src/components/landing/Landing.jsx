/* eslint-disable react/no-unescaped-entities */
const Landing = () => {
  return (
    <div>
      {/* Hero Section */}
      <div id='hero'>
        <section className="bg-white mt-20" id='hero'>
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">"Join the Heroes of Crowdfunding"</h1>
            <p className="mt-7 text-lg font-serif text-gray-500 lg:text-xl sm:px-16 xl:px-48">At CryptoBacker, we champion innovation and collaboration to bring visionary projects to life. Join us in driving meaningful change and unlocking potential through collective support.</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white">
          <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="text-gray-500 sm:text-lg">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">Next-Gen Crowdfunding</h2>
              <p className="mb-4">Discover how our platform's advanced features revolutionize the crowdfunding landscape. Experience seamless transactions, enhanced security, and transparent processes designed for both campaign creators and backers.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <img className="w-full rounded-lg" src="https://plus.unsplash.com/premium_photo-1661715123134-123a59c7c414?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="office content 1" />
              <img className="w-full mt-4 rounded-lg lg:mt-10" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
            </div>
          </div>
        </section>
      </div>

      {/* Feature Section */}
      <section className="bg-white" id='feature'>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">Our Key Features</h2>
            <p className="text-gray-500 sm:text-xl">Explore the advanced features designed to enhance your crowdfunding experience and ensure a seamless, secure process for both creators and backers.</p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex items-center justify-center w-10 h-10 mb-4 bg-blue-100 rounded-full lg:h-12 lg:w-12">
                <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.536 5.464a1 1 0 00-1.414-1.414L10 7.172 7.879 5.05a1 1 0 00-1.414 1.414L8.586 9l-2.121 2.121a1 1 0 101.414 1.414L10 10.828l2.121 2.121a1 1 0 001.414-1.414L11.414 9l2.122-2.122z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Transparent Transactions</h3>
              <p className="text-gray-500">Utilize blockchain technology to ensure every transaction is secure, transparent, and immutable, giving contributors confidence in the funding process.</p>
            </div>
            <div>
              <div className="flex items-center justify-center w-10 h-10 mb-4 bg-blue-100 rounded-full lg:h-12 lg:w-12">
                <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.528 5.455a.75.75 0 00-1.056 1.05L12.79 10H7a.75.75 0 000 1.5h5.79l-2.318 2.318a.75.75 0 101.057 1.057l3.75-3.75a.75.75 0 000-1.06l-3.75-3.75a.75.75 0 00-1.057 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Legal</h3>
              <p className="text-gray-500">Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.</p>
            </div>
            <div>
              <div className="flex items-center justify-center w-10 h-10 mb-4 bg-blue-100 rounded-full lg:h-12 lg:w-12">
                <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Verified Campaigns</h3>
              <p className="text-gray-500">Implement a rigorous verification process to authenticate campaign details and creators, ensuring that all projects are legitimate and trustworthy</p>
            </div>
            <div>
              <div className="flex items-center justify-center w-10 h-10 mb-4 bg-blue-100 rounded-full lg:h-12 lg:w-12">
                <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l-2 2a1 1 0 001.414 1.414L8 10.414l1.707 1.707a1 1 0 001.414-1.414l-2-2 2-2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Community Feedback</h3>
              <p className="text-gray-500">Foster an engaged community by incorporating real-time feedback mechanisms, allowing backers to voice their opinions and interact with creators.</p>
            </div>
            <div>
              <div className="flex items-center justify-center w-10 h-10 mb-4 bg-blue-100 rounded-full lg:h-12 lg:w-12">
                <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.528 5.455a.75.75 0 00-1.056 1.05L12.79 10H7a.75.75 0 000 1.5h5.79l-2.318 2.318a.75.75 0 101.057 1.057l3.75-3.75a.75.75 0 000-1.06l-3.75-3.75a.75.75 0 00-1.057 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Secure Payments</h3>
              <p className="text-gray-500">Ensure peace of mind for backers and creators with secure payment gateways that guarantee the safety and privacy of all transactions.</p>
            </div>
            <div>
              <div className="flex items-center justify-center w-10 h-10 mb-4 bg-blue-100 rounded-full lg:h-12 lg:w-12">
                <svg className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Blockchain Integration</h3>
              <p className="text-gray-500">Utilize blockchain technology to ensure every transaction is secure, transparent, and immutable, giving contributors confidence in the funding process.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing