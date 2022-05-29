const { actions, project_state } = require("../constants");
const { sendTransaction } = require("../service/transaction");


// exports.registerVehicle = (req, res) => {
//     const id = req.params.id;
//     const payload = {
//         id,
//         owner: req.user.publicKey,
//         action: actions.register_vehicle,
//     }

//     return sendTransaction(payload, req.user.publicKey).then((result) => {
//         console.log(result.data);
//         res.json(result.data)
//     }).catch((err) => {
//         res.status(400).json(err && err.response ? err.response.data : err.message);
//     })
// }

exports.initiateWallet = (req, res) => {
    const id = req.params.id;
    const payload = {
        id,
        user: req.user.publicKey,
        role: req.user.role,
        wallet: req.params.freelancerWallet,
        action: actions.initiate_wallet,
        projectState: project_state.initiated
    }

    return sendTransaction(payload, req.user.publicKey).then((result) => {
        console.log(result.data)
        res.json(result.data)
    }).catch((err) => {
        res.status(400).json(err && err.response ? err.response.data : err.message)
    })

}

exports.addSchedule = (req, res) => {
    // shortcode, description, scheduleState, value, scheduleRegister, totalSchedules(variable), 
}

exports.acceptProject = (req, res) => {
    // 
}

exports.fundTask = (req, res) => {
    // 
}

exports.startTask = (req, res) => {
    // 
}

exports.approveTask = (req, res) => {
    // 
}

exports.releaseFunds = (req, res) => {
    // 
}

exports.endProject = (req, res) => {
    // 
}

exports.getBalance = (req, res) => {
    // 
}