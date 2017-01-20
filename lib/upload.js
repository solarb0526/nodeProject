var jqupload = require('jquery-file-upload-middleware');
exports.upload = function(req, res, next){
    var now = Date.now();
    jqupload.fileHandler({
        uploadDir: function(){
            return __dirname + '/../public/uploads/' + now;
        },
        uploadUrl: function(){
            return '/uploads/' + now
        }
    })(req, res, next);
};
