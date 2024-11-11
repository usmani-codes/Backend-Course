const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        msg: 'Not Route Found'
    })
    next()
}


export default notFound