const { TransactionProcessor } = require('sawtooth-sdk-js/processor');
const IntegerKeyHandler = require('./handler/intkey');
const VinSellHandler = require('./handler/vin-sell');

const VALIDATOR_URL = 'tcp://localhost:4004'
const transactionProcessor = new TransactionProcessor(VALIDATOR_URL)

// Add All the transaction processor handler

transactionProcessor.addHandler(new IntegerKeyHandler());
transactionProcessor.addHandler(new VinSellHandler());


transactionProcessor.start();


//Handle Stop Process
process.on('SIGUSR2', () => {
    transactionProcessor._handleShutdown();
})