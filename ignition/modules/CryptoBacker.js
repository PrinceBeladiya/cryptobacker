const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoBakerModule", (m) => {
  const CryptoBacker = m.contract("CryptoBacker");

  return { CryptoBacker };
});
