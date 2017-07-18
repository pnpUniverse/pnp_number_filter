var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var Contact = require('./app/models/numberInfo');

var fs = require('fs');
var json2csv = require('json2csv');

var multer = require('multer');
var lineReader = require('line-reader');
var contentLength = 0;

var column = ["areaCode","phoneNumber","prefrence","opsType","phoneType"];
var fieldName = ['Service Area Code','Phone Numbers','Preferences','Opstype','Phone Type'];
var csvWriter = require('csv-write-stream');

var availableContent = [];

var port = process.env.PORT || 8000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

var lineCount = 0;
var queryCount = 0;

var keyArray = ['areaCode','phoneNumber','prefrence','opsType','phoneType'];

app.use(morgan('dev'));
app.use(bodyParser.json({limit: "400mb"}));
app.use(bodyParser.urlencoded({limit: "400mb", extended: true, parameterLimit:400000}));


app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);

var option = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};

var mongoURI = 'mongodb://localhost:27017/meanApp';
mongoose.connect(mongoURI, option).then(function(){
        console.log("sucessfully connected to mongoDB");
}, function(err) {
    if(err){
        console.log('not connected to the database : '+err);
    }
});

var storage = multer.diskStorage({      
    destination: function(req, file, cb){
        cb(null, 'uploads/')
        lineReader.eachLine('uploads/'+file.originalname,'utf8', function(line, last) {
            lineCount = lineCount + 1;
            var str = line.split(',');

            var phoneNumber = str[1].replace(/["]/g,"");
            Contact.find({ phoneNumber: phoneNumber },function(err, results){
                queryCount = queryCount + 1;
                if(err){
                    console.log(err)
                }else{
                    if(results[0]){
                        var responseContent = {
                            areaCode:results[0].areaCode,
                            phoneNumber:results[0].phoneNumber,
                            prefrence:results[0].prefrence,
                            opsType:results[0].opsType,
                            phoneType:results[0].phoneType
                        };

                        json2csv({data: responseContent, fields: column}, function(err, csv) {
                            if (err) console.log(err);
                            var contents = csv.split('\n');
                            fs.appendFileSync('available.csv', contents[1]+'\n', {'flags': 'a+'}, function(err) {
                                if (err){
                                    console.log(err);
                                }else{
                                    console.log('file saved');
                                }
                            });
                        });                        
                    }else{
                        fs.appendFileSync('not_available.csv', line+'\n', {'flags': 'a+'}, function(err) {
                            if (err){
                                console.log(err);
                            }else{
                                availableContent=[];
                                console.log('file saved');
                            }
                        });
                    }
                }
                if(queryCount == lineCount){
                    console.log(path._makeLong('available.csv'));
                }
            });
            if(last){
                console.log(last);
                fs.unlink('uploads/'+file.originalname,function(err){
                    if(err) return console.log(err);
                        console.log('file deleted successfully');
                });
            }
        });
    },filename : function(req, file, cb){
        cb(null, file.originalname);
    }
})

var combineObject = function( keys, values)
{
    var obj = {};
    if ( keys.length != values.length)
       return null;
    for (var index in keys)
        obj[keys[index]] = values[index];
     return obj;
};

var upload = multer({ dest: 'uploads/' });
app.post('/filterFileData', upload.single('myFile'), function(req,res,next){
    lineReader.eachLine(req.file.path,'utf8', function(line, last) {
        lineCount = lineCount + 1;
        var str = line.split(',');

        var phoneNumber = str[1].replace(/["]/g,"");
        Contact.find({ phoneNumber: phoneNumber },function(err, results){
            queryCount = queryCount + 1;
            if(err){
                console.log(err)
            }else{
                if(results[0]){
                    var responseContent = {
                        areaCode:results[0].areaCode,
                        phoneNumber:results[0].phoneNumber,
                        prefrence:results[0].prefrence,
                        opsType:results[0].opsType,
                        phoneType:results[0].phoneType
                    };

                    json2csv({data: responseContent, fields: column}, function(err, csv) {
                        if (err) console.log(err);
                        var contents = csv.split('\n');
                        fs.appendFileSync('available.csv', contents[1]+'\n', {'flags': 'a+'}, function(err) {
                            if (err){
                                console.log(err);
                            }else{
                                console.log('file saved');
                            }
                        });
                    });                        
                }else{
                    fs.appendFileSync('not_available.csv', line+'\n', {'flags': 'a+'}, function(err) {
                        if (err){
                            console.log(err);
                        }else{
                            availableContent=[];
                            console.log('file saved');
                        }
                    });
                }
            }
            if(queryCount == lineCount){
                // res.sendFile(__dirname+'/available.csv');
                var availabeCsv = fs.existsSync(__dirname+'/available.csv');
                var notavailabeCsv = fs.existsSync(__dirname+'/not_available.csv');
                if(availabeCsv && notavailabeCsv){
                    res.send({success: true, message: 'File uploaded successfully!', availablefile : availabeCsv, notavailablefile : notavailabeCsv});
                }else{
                    if(availabeCsv){
                        res.send({success: true, message: 'File uploaded successfully!', availablefile : availabeCsv});
                    }
                    if(notavailabeCsv){
                        res.send({success: true, message: 'File uploaded successfully!', notavailablefile : notavailabeCsv});
                    }
                }
            }
        });
        if(last){
            fs.unlink(req.file.path,function(err){
                if(err) return console.log(err);
            });
        }
    });
});

app.get('/getAvailable',function(req,res){
    res.sendFile(__dirname+'/available.csv');
});

app.get('/getnotAvailable',function(req,res){
    res.sendFile(__dirname+'/not_available.csv');
});

app.get('/deleteAvailable',function(req,res){
    fs.unlink(__dirname+'/available.csv',function(err){
        if(err){
            console.log(err);
            res.send({success: true, message:err});
        }else{            
            console.log('file deleted successfully');
            res.send({success: true, message:'file deleted successfully'});
        }
    });
});

app.get('/deletenotAvailable',function(req,res){
    fs.unlink(__dirname+'/not_available.csv',function(err){
        if(err){
            res.send({success: true, message:err});
            console.log(err);
        }else{
            res.send({success: true, message:'file deleted successfully'});
            console.log('file deleted successfully');
        }
    });
});

app.get('*', function(req, resp){
	resp.sendFile(__dirname+'/public/app/views/index.html');
});

app.listen(port,function(){
	console.log('Running the server on port : '+port);
});