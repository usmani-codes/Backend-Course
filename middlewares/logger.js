import colors from 'colors' // Import colors is neccaesary to use colors in console.log

export const logger = (req, res, next) => {
    const colorMethod = {
        GET: 'green',
        POST: 'yellow',
        PUT: 'blue',
        DELETE: 'red'
    }

    const color = colorMethod[req.method] || 'white'
    console.log(`${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`[color])
    next()
}

