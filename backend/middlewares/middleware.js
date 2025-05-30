const jwt = require('jsonwebtoken')
const Users = require('../models/user')

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

const authenticate = async (req, res, next) => {
  try {
    const cookies = req.cookies
    const authCookie = cookies[process.env.COOKIE_NAME]

    if (!authCookie)
      return res.status(401).json({
        msg: 'Phiên làm việc đã kết thúc! Vui lòng đăng nhập lại',
        noCookies: true,
      })
    const payload = isTokenValid(authCookie)

    if (!payload)
      return res.status(401).json({
        msg: 'Phiên làm việc không hợp lệ! Vui lòng đăng nhập lại',
        noCookies: false,
      })
    const user = await Users.findOne({ _id: payload.id })
    req.user = user
    return next()
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = { authenticate }
