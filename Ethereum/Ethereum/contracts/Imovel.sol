pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Imovel {

    struct imovel{     
        string GPS;
        string morada;
        string localidade;
    }

    imovel[] imoveis;

    function addImovel(string memory GPS, string memory morada, string memory localidade) public {
        imovel memory newImovel = imovel(GPS, morada, localidade);
        imoveis.push(newImovel);
    }

    function updateImovel(uint imovelIndex, string memory newMorada) public returns (bool) {
        if(imoveis.length > imovelIndex){
            imoveis[imovelIndex].morada = newMorada;
            return true;
        }
        return false;
    }

    function deleteImovel(uint imovelIndex) public returns (bool) {
        if(imoveis.length > imovelIndex){
            for(uint i=imovelIndex; i < imoveis.length-1; i++){
              imoveis[i] = imoveis[i+1];
            }

            imoveis.pop();

            return true;
        }
        return false;
    }

    function getImoveis() public view returns (imovel[] memory) {
        return imoveis;
    }
}