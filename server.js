/**
 * Created by MuhammadRizky on 8/3/14.
 */

function servePage(request, response) {

    var supportedTypes = {

        // general stuff
        'html': 'text/html; charset = UTF-8',
        'txt': 'text/plain; charset = UTF-8',
        'js': 'application/javascript; charset = UTF-8',
        'appcache': 'text/cache-manifest; charset = UTF-8',
        'css': 'text/css; charset = UTF-8',
        'json': 'application/json; charset = UTF-8',
        'htm' : 'text/html',
        'php' : 'text/html',
        'xml' : 'application/xml',
        'swf' : 'application/x-shockwave-flash',
        'flv' : 'video/x-flv',

        // images
        'png' : 'image/png',
        'jpe' : 'image/jpeg',
        'jpeg' : 'image/jpeg',
        'jpg' : 'image/jpeg',
        'gif' : 'image/gif',
        'bmp' : 'image/bmp',
        'ico' : 'image/vnd.microsoft.icon',
        'tiff' : 'image/tiff',
        'tif' : 'image/tiff',
        'svg' : 'image/svg+xml',
        'svgz' : 'image/svg+xml',

        // archives
        'zip' : 'application/zip',
        'rar' : 'application/x-rar-compressed',
        'exe' : 'application/x-msdownload',
        'msi' : 'application/x-msdownload',
        'cab' : 'application/vnd.ms-cab-compressed',

        // audio/video
        'mp3' : 'audio/mpeg',
        'qt' : 'video/quicktime',
        'mov' : 'video/quicktime',

        // adobe
        'pdf' : 'application/pdf',
        'psd' : 'image/vnd.adobe.photoshop',
        'ai' : 'application/postscript',
        'eps' : 'application/postscript',
        'ps' : 'application/postscript',

        // ms office
        'doc' : 'application/msword',
        'rtf' : 'application/rtf',
        'xls' : 'application/vnd.ms-excel',
        'ppt' : 'application/vnd.ms-powerpoint',

        // open office
        'odt' : 'application/vnd.oasis.opendocument.text',
        'ods' : 'application/vnd.oasis.opendocument.spreadsheet'

    };

    var filename = url.parse(request.url).pathname.substring(1);
    if (!filename) {
        filename = 'index.html';
    }
    var extension = filename.substring( filename.lastIndexOf(".") + 1) ;
    var type = supportedTypes[extension];
    fs.readFile( filename, function( err, content) {
        if (err) {
            response.writeHead( 404, {
                'Content-Type': 'text/plain; charset = UTF-8'
            });
            response.write( err.message);
            response.write( ' - The page requested is not found.');
            response.end();
        } else {
            response.writeHead( 200, {
                'Content-Type': type
            });
            response.write(content);
            response.end();
        }
    });
}

var url = require('url');
var fs = require("fs");
var http = require('http');
var server = http.createServer(servePage);
server.listen(4040, 'localhost');
console.log('Server running at http://localhost:4040');