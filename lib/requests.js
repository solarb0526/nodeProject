var fortune = require('./fortune');
var formidable = require('formidable');
exports.gets = {
    "/": function (req, res) {
        res.render('home');
    },
    "/newsletter": function (req, res) {
        res.render('newsletter', {csrf: 'CSRF token goes here'});
    },
    "/about": function (req, res) {
        res.render('about', {
            fortune: fortune.getFortune(),
            pageTestScript: '/qa/tests-about.js'
        });
    },
    "/tours/hood-river": function (req, res) {
        res.render('tours/hood-river');
    },
    "/tours/request-group-rate": function (req, res) {
        res.render('tours/request-group-rate');
    },
    "/headers": function (req, res) {
        var headers = [];
        for (var x in req.headers) headers.push(x + ': ' + req.headers[x]);
        res.render('headers', {headers: headers});
    },
    "/thank-you": function (req, res) {
        res.render('thank-you');
    },
    "/jquery-test": function (req, res) {
        res.render('jquery-test');
    },
    "/nursery-rhyme": function (req, res) {
        res.render('nursery-rhyme');
    },
    "/data/nursery-rhyme": function (req, res) {
        res.json({
            animal: 'squirrel',
            bodyPart: 'tail',
            adjective: 'bushy',
            noun: 'heck'
        });
    },
    "/contest/vacation-photo": function(req, res){
        var now = new Date();
        res.render('contest/vacation-photo', {
            year: now.getFullYear(),
            month: now.getMonth()
        })
    }
};

exports.posts = {
    "/process": function (req, res) {
        if (req.xhr || req.accepts('json,html') === 'json') {
            res.send({success: true});
        } else {
            res.redirect('/thank-you', '303');
        }
    },
    "/contest/vacation-photo/:year/:month": function(req, res){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            if(err) return res.redirect(303, '/error');
            console.log('received fields:');
            console.log(fields);
            console.log(files);
            res.redirect(303, '/thank-you');
        });
    }
};