const { TransactionHandler } = require('sawtooth-sdk-js/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk-js/processor/exceptions')
const { family, actions } = require('../constants');
const { hash } = require('../utils');


class Autoturehandler extends TransactionHandler {
    constructor() {
        super(family.name, [family.version], [family.name], [family.namespace])
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
            case actions.initiate_wallet:
                const address = family.namespace + hash(payload.id).slice(-64)
                
                const data = await context.getState([address]);
                return 0
            case actions.add_schedule:
                return 0
            case actions.approve_task:
                return 0
            case actions.fund_task:
                return 0
            case actions.release_funds:
                return 0
            case actions.end_project:
                return 0
            default:
                throw new InvalidTransaction('Invalid Action Type')
        }
    }

}

module.exports = Autoturehandler