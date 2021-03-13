module.exports.requireLoggin = (req, res, next) => {
  // console.log("REQ.USER...;", req.user);
  if (!req.session.currentUser) {
    return res.redirect('/login')
  }
  next();
}