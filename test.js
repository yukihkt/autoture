const { randomBytes, sign, createHash } = require('crypto')
const secp256k1 = require('secp256k1')

const axios = require('axios').default;

const { Secp256k1PrivateKey }  = require('sawtooth-sdk-js/signing/secp256k1');
const { CryptoFactory, createContext }  =require('sawtooth-sdk-js/signing')
const protobuf = require('sawtooth-sdk-js/protobuf');
const { family, actions } = require('./constants');


// This create a new private key and returns hex version of the key
const createPrivateKey = () => {
    const msg = randomBytes(32)
    let privKey
    do {
        privKey = randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privKey))
    const pubKey = secp256k1.publicKeyCreate(privKey)
    const sigObj = secp256k1.ecdsaSign(msg, privKey)
    console.log(secp256k1.ecdsaVerify(sigObj.signature, msg, pubKey))
    return privKey.toString('hex')
}

const privateKeyHexStr = createPrivateKey();

// Create Instance of the private key with a internal class
const privateKey = new Secp256k1PrivateKey(Buffer.from(privateKeyHexStr, 'hex'));

const context = createContext('secp256k1');

// Create a new signer to sign the payload
const signer = new CryptoFactory(context).newSigner(privateKey);


// Prepare a payload
const payload = JSON.stringify({
    id: 'REALMAD123',
    action: actions.register_vehicle,
});
const payloadBytes = Buffer.from(payload);


// Payload -> Transaction -> TransactionList -> Batch -> BatchList -> Byte -> REST_API
// Prepare Transaction Header


const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: family.name,
    familyVersion: family.version,
    inputs: [family.namespace],
    outputs: [family.namespace],
    signerPublicKey: signer.getPublicKey().asHex(),
    nonce: `${Math.random()}`,
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash('sha512').update(payloadBytes).digest('hex')
}).finish()

const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes, 
    headerSignature: signer.sign(transactionHeaderBytes),
    payload: payloadBytes
})

const transactions = [transaction];

const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map(t => t.headerSignature)
}).finish();

const batch = protobuf.Batch.create({
    header: batchHeaderBytes, 
    headerSignature: signer.sign(batchHeaderBytes),
    transactions: transactions
})
const batches  = [batch];
const batchListBytes = protobuf.BatchList.encode({
    batches: batches
}).finish();

// Forward

axios.post('http://localhost:8008/batches', batchListBytes, {
    headers: {
        'Content-Type': 'application/octet-stream'
    },
} ).then((res)=> {
    console.log(res.data);
}).catch((err)=>{
    console.log(err)
})