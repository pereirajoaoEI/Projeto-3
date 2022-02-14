'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        
        for(let i = 0; i < this.roundArguments.assets; i++){
            let request = {
                contract: 'imovel',
                readOnly: false,
                verb: 'addImovel',
                args: ["123", "Rua 5 de Abril", "Braga"]
            };  

            await this.sutAdapter.sendRequests(request);

        }
    }

    async submitTransaction() {
        for (let i = 0; i < this.roundArguments.assets; i++) {
            let request2 = {
                contract: 'imovel',
                readOnly: true,
                verb: 'getImoveis',
                args: []
            };

            await this.sutAdapter.sendRequests(request2);

        }
    }

    async cleanupWorkloadModule() {
        for (let i = 0; i < this.roundArguments.assets; i++) {
            let request3 = {
                contract: 'imovel',
                readOnly: false,
                verb: 'deleteImovel',
                args: [0]
            };

            await this.sutAdapter.sendRequests(request3);

        }
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;