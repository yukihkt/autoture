const { hash } = require("./utils")

exports.actions = {
    register_vehicle: 'register_vehicle',
    approve_vehicle: 'approve_vehicle',
    reject_vehicle: 'reject_vehicle',
    limit_enhancement_request: 'limit_enhancement_request',
    approve_limit_enhancement_request: 'approve_limit_enhancement_request',
    reject_limit_enhancement_request: 'reject_limit_enhancement_request',
    purhcase: 'purhcase',
    put_on_sale: 'put_on_sale',
    pull_off_sale: 'pull_off_sale',
}


exports.namespace = {
    vin: hash('vin').substring(0,2)
}

exports.family = {
    name: 'vin-sell',
    namespace: hash('vin-sell').substring(0,6),
    version: '1.0'
}