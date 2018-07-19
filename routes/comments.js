var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campgrounds');
var Comment = require('../models/comment');

//NEW COMMENT
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
        } else {
        res.render("comments/new", {campground: campground})
        }
    });
})

//CREATE COMMENT
router.post("/", isLoggedIn, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                    res.redirect('/campgrounds')
                } else {
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                }
                //redirect
                res.redirect(`/campgrounds/${req.params.id}`)
            });
        }
    });
});

//MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;