const { actions } = require("../constants");
const { sendTransaction } = require("../service/transaction");


exports.registerVehicle = (req, res) => {
    const id = req.params.id;
    const payload = {
        id,
        owner: req.user.publicKey,
        action: actions.register_vehicle,
    }

    return sendTransaction(payload, req.user.publicKey).then((result) => {
        console.log(result.data);
        res.json(result.data)
    }).catch((err) => {
        res.status(400).json(err && err.response ? err.response.data : err.message);
    })
}