var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var detect = require('detect-file-type');

http.createServer(function(request, response) {
	if (request.url == '/fileupload') {
		var form = new formidable.IncomingForm();
		form.maxFileSize = 1*1024*1024;
		form.parse(request, function (err, fields, files) {	
			if(err){
				console.log(err)
				response.write('File uploaded too big!');
				response.end();
				return
			}
			
			var fileType = files.filetoupload.name.split('.')[1];
			if(fileType != 'docx' && fileType != 'pdf') {
				response.write('Only accepting .docx and .pdf');
				response.end();
				return
			}
			
			var oldpath = files.filetoupload.path;
			var newpath = 'C:/Users/Lenovo/Desktop/' + files.filetoupload.name;
			fs.rename(oldpath,newpath,function(err) {
				if(err) throw err;
				response.write('File uploaded and moved!');
				response.end();
			});
		});
	} else {
		fs.readFile("index.html", function(err, data) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
	});
  }
	
}).listen(3000);