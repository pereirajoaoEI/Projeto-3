var Imoveis = artifacts.require("./Imovel.sol");

module.exports = function(deployer) {
  deployer.deploy(Imoveis);
};