var User = require('../models/user');
var Contact = require('../models/numberInfo');
var fs = require('fs');
var multer = require('multer');
var lineReader = require('line-reader');
var contentLength = 0;
// var addNum = [];

var keyArray = ['areaCode','phoneNumber','prefrence','opsType','phoneType'];
var storage = multer.diskStorage({		
	destination: function(req, file, cb){
		cb(null, 'uploads/')
		lineReader.eachLine('uploads/'+file.originalname,'utf8', function(line, last) {
			contentLength = contentLength + 1;
			if(contentLength>1){
				var str = line.split(',');

  				var numInfo = new Contact();
  				var areaCode = str[0].replace(/["]/g,"");
  				var phoneNumber = str[1].replace(/["]/g,"");
  				var prefrence = str[2].replace(/["]/g,"");
  				var opsType = str[3].replace(/["]/g,"");
  				var phoneType = str[4].replace(/["]/g,"");
  				numInfo.areaCode = areaCode;
  				numInfo.phoneNumber = phoneNumber;
  				numInfo.prefrence = prefrence;
  				numInfo.opsType = opsType;
  				numInfo.phoneType = phoneType;

  				// addNum.push(numInfo);

	  			// if(addNum.length == 10){	  					
		  		// 	numInfo.collection.insertMany(addNum, function(err){
		  		// 		if(err){
		  		// 			console.log(err);
		  		// 		}else{
		  		// 			addNum = [];
		 			// 	}
	 				// });
  				// }

  				numInfo.save(function(err){
  					if(err){
  						console.log(err);
  					}
  				});
			}  			
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

module.exports = function(router){
	router.post('/addNumber', function(req,resp){
		var user = new User();
		user.mobileNumber = req.body.mobileNumber;
		user.save(function(err){
			if(err){
				resp.json({success:false, message:'Number added Failed reason duplicate Entry'});
			}else{
				resp.json({success:true, message:'Number added successfully'});
			}
		});
	});

	router.post('/filterNumber', function(req,resp){
		var myArray = [];
		var str = req.body.num;
		var dd=str.length;
		for(var s=0; s<str.length; s++){
			var query = { phoneNumber: str[s], opsType:'A' };
			Contact.collection.findOne(query, function(err, result) {
    			if (err){
    			 	 console.log(str.length+"dinesh kumar"+result.phoneNumber);
    			}else{
    				myArray.push(result);
    				if(myArray.length == str.length){
    					resp.send(myArray);
    				}
			    }
    		});
  		}
	});

	router.get('/getNumber',function(req,resp){
		User.findOne({"mobileNumber":req.query.mobileNumber})
		.select('mobileNumber').exec(function(err,user){
			if(err) throw err;
			if(!user){
				resp.json({success:false, message:'number is not avaialble'});
			}else if(user){
				resp.json({success:true, message:'number is avaialble'});
			}
		});
	});

	router.get('/getContact',function(req,resp){
		Contact.collection.find().toArray(function(err, result){
			if(err){
				console.log(err);
			}else{
				resp.send(result);
			}			
		});
	});


	router.get('/getContactByNumber',function(req,resp){
		var query = { phoneNumber: req.query.phoneNumber };

		Contact.find(query, function(err, results){
			if(err){
				console.log(err)
			}else{
	   			console.log(JSON.stringify(results)); // output all records
	   			resp.send(results);				
			}
		});
	});

	var upload = multer({storage : storage}).single('myFile');
	// var upload = multer({ dest: 'uploads/' });
	router.post('/fileData', function(req,res,next){
		// if(req.file){	
		// 	var file = req.file;		
		// 	lineReader.eachLine(file.path,'utf8', function(line, last) {
		// 		contentLength = contentLength + 1;
		// 		if(contentLength>1){
		// 			var str = line.split(',');

	 //  				var numInfo = new Contact();
	 //  				var areaCode = str[0].replace(/["]/g,"");
	 //  				var phoneNumber = str[1].replace(/["]/g,"");
	 //  				var prefrence = str[2].replace(/["]/g,"");
	 //  				var opsType = str[3].replace(/["]/g,"");
	 //  				var phoneType = str[4].replace(/["]/g,"");
	 //  				numInfo.areaCode = areaCode;
	 //  				numInfo.phoneNumber = phoneNumber;
	 //  				numInfo.prefrence = prefrence;
	 //  				numInfo.opsType = opsType;
	 //  				numInfo.phoneType = phoneType;

	 //  				addNum.push(numInfo);

	 //  				if(addNum.length == 10){	  					
		//   				numInfo.collection.insertMany(addNum, function(err){
		//   					if(err){
		//   						console.log(err);
		//   					}else{
		//   						addNum = [];
		//   					}
		//   				});
	 //  				}

		// 		}  			
	 //  			if(last){
	 //  				console.log(last);
	 //  				fs.unlink(file.path,function(err){
	 //        			if(err) return console.log(err);
	 //        				console.log('file deleted successfully');
	 //        				res.json({success: true, message: 'File uploaded successfully!'});
	 //   				});
	 //  			}
		// 	});
		// }
		upload(req,res, function(err){
			if(err){
				if(err.code === 'filetype'){
					res.json({success: false, message: 'File type is invalid. Must be .csv'});
				}else{
					console.log(err);
					res.json({success: false, message: 'File was not able to be uploaded'});
				}
			}else{
				if(!req.file){
					res.json({success: false, message: 'No file was selected'});
				}else{
					res.json({success: true, message: 'File uploaded successfully!'});
				}
			}
		})
	});

	router.post('/filterFileData', function(req,res,next){
		upload(req,res, function(err){
			if(err){
				if(err.code === 'filetype'){
					res.json({success: false, message: 'File type is invalid. Must be .csv'});
				}else{
					console.log(err);
					res.json({success: false, message: 'File was not able to be uploaded'});
				}
			}else{
				if(!req.file){
					res.json({success: false, message: 'No file was selected'});
				}else{
					res.json({success: true, message: 'File uploaded successfully!'});
				}
			}
		})
	});

	return router;
}
