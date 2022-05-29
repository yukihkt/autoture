const { TransactionHandler } = require('sawtooth-sdk-js/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk-js/processor/exceptions')
const { family, actions } = require('../constants');
const { hash } = require('../utils');



class VinSellHandler extends TransactionHandler {
    constructor() {
        super(family.name, [family.version], [family.namespace])
    }

    async apply(transactionProcessRequest, context) {
        let payload;
        try {
            payload = JSON.parse(transactionProcessRequest.payload)
        } catch (error) {
            throw new InvalidTransaction('Errored while decoding payload' + error.message)
        }
        if (!payload.action) {
            throw new InvalidTransaction('Invalid Action Type')
        }

        switch (payload.action) {
            case actions.register_vehicle:
                const address = family.namespace + hash(payload.id).slice(-64)
                
                const data = await context.getState([address]);
                if(data && data[address] && data[address].length !== 0){
                    throw new InvalidTransaction('Existing car found with this VIN');
                }
                return context.setState({
                    [address]: payload.id
                }).then((addresses) => {
                    if (addresses.length === 0) {
                        throw new InvalidTransaction('State Error!. Nothing got updated')
                    }
                })
            default:
                throw new InvalidTransaction('Invalid Action Type')
        }
    }

}

module.exports = VinSellHandler
