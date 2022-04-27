const moment = require('moment');

function formatDate(createdAt) {
    return moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
}

module.exports = formatDate;