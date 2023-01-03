const fastify = require('fastify')({ logger: true })
const { generateLicenseKey } = require('./build/Release/licenseGenerator.node')

const PORT = 8002

const randomString = (length, characters) => {
    
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

// Declare a route
fastify.get('/', async (request, reply) => {

    const baseChain = randomString(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') + '-' + randomString(4, '0123456789')
    const licenseKey = generateLicenseKey(baseChain)

    return licenseKey
})

// Run the server!
const start = async () => {

    try {
        await fastify.listen({ port: PORT })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()