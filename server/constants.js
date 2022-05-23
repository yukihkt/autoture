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

// exports.actions = {
//     initiate_wallet: 'init_wallet',
//     add_schedule: 'add_schedule',
//     start_task: 'start_task',
//     approve_task: 'approve_task',
//     fund_task: 'fund_task',
//     release_funds: 'release_funds',
//     end_project: 'end_project'
// }

exports.project_state = {
    initiated: "initiated",
    accepted: "accepted",
    closed: "closed"
}

exports.scheduleState = {
    planned: "planned",
    funded: "funded",
    started: "started",
    approved: "approved",
    released: "released"
}

exports.namespace = {
    vin: hash('autoture').substring(0,2)
}

exports.family = {
    name: 'autoture',
    namespace: hash('autoture').substring(0,6),
    version: '1.0'
}