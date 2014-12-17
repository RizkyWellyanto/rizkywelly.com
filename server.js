/**
 * Created by MuhammadRizky on 8/3/14.
 */

// Simple node server - CS22A

// The following function will be called whenever

// the server receives a request.

function servePage(request, response) {

    // MIME types supported by this server: html, txt, js, appcache, css and json

    // Create an object supportedTypes that maps file extensions to textContent type

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

    // Extract the filename and extension from the request.

    var filename = url.parse(request.url).pathname.substring(1);

    // If the user does not enter a file name,

    // we serve the page index.html

    if (!filename) {

        filename = 'index.html';

    }

    // Get the extension of the requested resource so we can determine the type

    var extension = filename.substring( filename.lastIndexOf(".") + 1) ;

    var type = supportedTypes[extension];  // type implied by extension

    // Read the file asynchronously

    fs.readFile( filename, function( err, content) {

        if (err) { // If there is an error, set the status code

            response.writeHead( 404,

                {'Content-Type': 'text/plain; charset = UTF-8'});

            response.write( err.message); // Include the error message body

            response.write( ' - The page requested is not found.');

            response.end(); // Done

        } else { // Otherwise, the file was read successfully.

            response.writeHead( 200, // Set the status code

                {'Content-Type': type});

            response.write(content); // Send file contents as response body

            response.end();

        }

    });

}

// load the url module

var url = require('url');

// Load the file system module

var fs = require("fs");

// load the http module

var http = require('http');

// create a server object

var server = http.createServer(servePage);

server.listen(8080, 'localhost');

console.log('Server running at http://localhost:8080');