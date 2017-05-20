<?php
/*
This PHP script is called by the videorecorder.swf file in these 3 cases:
a) when the [SAVE] icon is pressed on the HDFVR UI. 
b) automatically after jpg_encoder_download.xxx is executed sucessfully when autoSave is 
set to 1 in avc_settings.xxx
c) When the save() function is called on the video recorder through the JS Control API

It is executed on the web server and 11 vars are passed to this script via query string:

1) streamName  
contains the name of the video file, without extension, as it is on the Red5/FMS/Wowza 
server on which it was saved

2) streamDuration
contains the duration of the video stream in seconds but it is accurate to the millisecond 
like this: 4.231 (4 seconds and 231 milliseconds)

3) userId
contains the value of the userId var sent from avc_settings.php or the value of the userId
flash vars sent from VideoRecorder.html to the swf file, if userId si found in both 
places the one in avc_settings.php is used

4) recorderId 
contais the value of the recorderId fash var sent from VideoRecorder.html to the swf file

5) payload contains any type of additional information needed. By default if not specified
in avc_settings or via flash params this will be empty. Strings and JSON strings can be 
used as values.

6)authenticity_token is used only for Ruby on Rails implementation where it is needed to
validate POST requests for the CSRF mechanism

*/

$streamName=$_GET["streamName"];
$streamDuration=$_GET["streamDuration"];
$userId= $_GET["userId"];
$recorderId= $_GET["recorderId"];
$payload = urldecode($_GET["payload"]);
$audioCodec = urldecode($_GET["audioCodec"]);
$videoCodec = urldecode ($_GET["videoCodec"]);
$fileType = $_GET["fileType"];
$cameraName = urldecode($_GET["cameraName"]);
$microphoneName = urldecode($_GET["microphoneName"]);
$authenticity_token = $_GET["authenticity_token"];
$httpReferer = urldecode($_GET["httpReferer"]);

/*
We include an external file you can use add your own code. This way you can overwrite this
file (when updating HDFVR) without having to re-add your code.
*/
if(file_exists('int_svtd.php')){
    include 'int_svtd.php';
}

/*
Output save=ok to tell videorecorder.swf this script has run sucessfully
Output save=failed to tell videorecorder.swf this script has NOT run sucessfully. If not 
hidden, the [Save] icon will be shown again in HDFVR.
*/
echo "save=ok";

?>