export const AdminsOnly = async (req, res, next) => {
    console.log('adminOnly ..')
    const payload = req.user

    if (payload.isAdmin) {
        console.log('welcome admin!! ')
    } else {
        return res.status(401).json({ success: false, message: 'un-authorized!! admins only' })
    }
    next()
}