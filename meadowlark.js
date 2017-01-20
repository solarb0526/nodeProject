/**
 * Created by jihyun on 2017. 1. 13..
 */

var express = require('express');
var foreach = require('foreach');
var app = express();

var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }

});

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&  req.query.test === '1';
    next();
});

app.use(require('body-parser').urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var requests = require('./lib/requests');
var upload = require('./lib/upload');
foreach(requests.gets, function(fn, url){ app.get(url, fn); });
foreach(requests.posts, function(fn, url){ app.post(url, fn); });

app.use('/upload', upload.upload);

app.use(express.static(__dirname + '/public'));

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
