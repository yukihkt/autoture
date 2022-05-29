const { randomBytes, createHash } = require('crypto')
const secp256k1 = require('secp256k1')
const { Secp256k1PrivateKey } = require('sawtooth-sdk-js/signing/secp256k1');
const { CryptoFactory, createContext } = require('sawtooth-sdk-js/signing')


const getSigner = (privateKeyHex) => {
    // Create Instance of the private key with a internal class
    const privateKey = new Secp256k1PrivateKey(Buffer.from(privateKeyHex, 'hex'));
    const context = createContext('secp256k1');

    // Create a new signer to sign the payload
    const signer = new CryptoFactory(context).newSigner(privateKey);

    return signer;
}
exports.createPrivateKey = () => {
    let privKey
    do {
        privKey = randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privKey))
    const signer = getSigner(privKey.toString('hex'))

    return {
        privateKey: privKey.toString('hex'),
        publicKey: signer.getPublicKey().asHex()
    }
}


exports.getSigner = getSigner;