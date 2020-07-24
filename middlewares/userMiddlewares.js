const userMiddlewares = {

    auth: function (req, res, next) {

        if (req.session.userFound != undefined) {
            next();
        } else {
            res.redirect("/");
        }
    },

    gest: function (req, res, next) {

        if (req.session.userFound == undefined) {
            next();
        } else {
            res.redirect("/");
        }
    },

    admin: function (req, res, next) {

        if (req.session.userFound == undefined) {
            res.redirect("/")
                        
        } else if (req.session.userFound[0].userType == "admin"){
            next();            
        } else {
            res.redirect("/")
        }
    }
}

module.exports = userMiddlewares;