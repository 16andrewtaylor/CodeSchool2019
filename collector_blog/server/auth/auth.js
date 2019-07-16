var ensureAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403); // Forbidden
        res.json({
            msg: "Please login first"
        });
    }
};

module.exports = {
    protected: ensureAuthentication
};
