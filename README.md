# CryptoBacker

CryptoBacker is an innovative platform that leverages blockchain technology to facilitate secure and transparent backing for your cryptocurrency projects. Follow these steps to set up and run the project on your local machine.

## Table of Contents
- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with CryptoBacker, clone the repository and install the necessary dependencies.

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/PrinceBeladiya/cryptobacker.git
    ```

2. **Navigate to the Project Directory:**

    ```sh
    cd cryptobacker
    ```

3. **Install Dependencies:**

    ```sh
    npm install
    ```

## Setup

Before running the application, you need to compile and deploy the smart contracts. This requires setting up multiple terminal sessions.

1. **Compile the Contracts:**

    Open a new terminal and run:

    ```sh
    npx hardhat compile
    ```

2. **Start the Local Blockchain Node:**

    Open another terminal and run:

    ```sh
    npx hardhat node
    ```

3. **Deploy the Contracts:**

    In the first terminal, deploy the smart contracts with the following command (make sure the local blockchain node is running):

    ```sh
    npx hardhat ignition deploy ignition/modules/CryptoBacker.js --network hard
    ```

    After deployment, you'll see the deployed contract address in the terminal. Copy this address.

4. **Configure the Environment Variables:**

    Open the `.env` file and set the `REACT_APP_CryptoBackerContractAddress` variable to the contract address you copied in the previous step:

    ```env
    REACT_APP_CryptoBackerContractAddress="<Address_you_got>"
    ```

## Running the Application

With the setup complete, you can now run the application.

1. **Start the Application:**

    In the project directory, execute:

    ```sh
    npm run start
    ```

2. **Interact with the Application:**

    Open your browser and navigate to `http://localhost:3000` to interact with the CryptoBacker application.
