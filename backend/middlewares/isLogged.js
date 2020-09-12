const checkUserLoggedIn = async (req, res, next) => {
    const isid = req.session.userid;
    isid ? next(): res.send("not logged");
}

module.exports = checkUserLoggedIn;