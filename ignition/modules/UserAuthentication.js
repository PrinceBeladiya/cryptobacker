const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UserAuthenticationModule", (m) => {
  const userAuthentication = m.contract("UserAuthentication");

  return { userAuthentication };
});
