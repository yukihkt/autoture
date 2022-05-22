const { TransactionHandler } = require('sawtooth-sdk-js/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk-js/processor/exceptions')

const crypto = require('crypto')

const _hash = (x) =>
    crypto.createHash('sha512').update(x).digest('hex').toLowerCase()

const INT_KEY_FAMILY = 'intkey'
const INT_KEY_NAMESPACE = _hash(INT_KEY_FAMILY).substring(0, 6)

class IntegerKeyHandler extends TransactionHandler {
    constructor() {
        super(INT_KEY_FAMILY, ['1.0'], [INT_KEY_NAMESPACE])
    }

    apply(transactionProcessRequest, context) {
        //
        // Validate the update
        let name = "foo"
        let value = 100;

        let address = INT_KEY_NAMESPACE + _hash(name).slice(-64)

        return context.setState({
            [address]: JSON.stringify(value)
        }).then((addresses) => {
            if (addresses.length === 0) {
                throw new InvalidTransaction('State Error!. Nothing got updated')
            }
        })
    }
}

module.exports = IntegerKeyHandler