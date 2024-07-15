// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UserAuthentication {
    struct User {
        string name;
        string email;
        string mobileNo;
        bytes32 passwordHash;
        address walletAddress;
    }

    mapping(address => User) private users;
    mapping(address => bool) private registeredUsers;

    event UserRegistered(address walletAddress, string email);
    event UserLoggedIn(address walletAddress, string email);

    // Register a new user
    function register(
        string memory _name,
        string memory _email,
        string memory _mobileNo,
        string memory _password
    ) public {
        require(!registeredUsers[msg.sender], "User already registered");

        bytes32 passwordHash = keccak256(abi.encodePacked(_password));

        users[msg.sender] = User({
            name: _name,
            email: _email,
            mobileNo: _mobileNo,
            passwordHash: passwordHash,
            walletAddress: msg.sender
        });

        registeredUsers[msg.sender] = true;

        emit UserRegistered(msg.sender, _email);
    }

    // User login with email and password
    function loginWithEmail(string memory _email, string memory _password) public view returns (bool) {
        require(registeredUsers[msg.sender], "User not registered");

        User memory user = users[msg.sender];
        require(keccak256(abi.encodePacked(_email)) == keccak256(abi.encodePacked(user.email)), "Email does not match");
        require(keccak256(abi.encodePacked(_password)) == user.passwordHash, "Password does not match");

        return true;
    }

    // User login with wallet address
    function loginWithWallet() public view returns (bool) {
        require(registeredUsers[msg.sender], "User not registered");

        return true;
    }

    // Get user information
    function getUserInfo() public view returns (string memory, string memory, string memory, address) {
        require(registeredUsers[msg.sender], "User not registered");

        User memory user = users[msg.sender];
        return (user.name, user.email, user.mobileNo, user.walletAddress);
    }
}