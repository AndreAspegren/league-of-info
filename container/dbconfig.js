const config = {
    user: 'Stjernenett',
    password: 'Velkommen',
    server: 'BEAST',
    database: 'League of info',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
}

module.exports = config