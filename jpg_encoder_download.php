<?php
/*
This script file is executed automatically by videorecorder.swf when the recording 
process is stopped and all the audio and video data has finished streaming (uploading) 
to the media server. The snapshot image data (jpeg)is sent to this script as POST data 
using a Content-Type:application/octet-stream header.

2 variables are sent to this scripot via query string:

1) name
The name of the snaphsot including the extension

2) recorderId
The value of the recorderId fash var sent from the .html file embedding videorecorder.swf
*/

$photoName = $_GET["name"];
$recorderId= $_GET["recorderId"];

//We prevent injections by limiting possible extensions
$supported_extensions = array(
    'jpg',
    'jpeg'
);

$ext = strtolower(pathinfo($photoName, PATHINFO_EXTENSION));
if (in_array($ext, $supported_extensions)) {
    //it's an image so we continue
    
    //we make the snapshots folder if it does not exists
    if(!is_dir("snapshots")){
        $res = mkdir("snapshots",0777); 
    }

	//php://input is the preferred way to obtain POST data
	$postdata = file_get_contents("php://input");   
    
    //we save the image to disk
    if($postdata){
        $image = fopen("snapshots/".$photoName,"wb");
        fwrite($image , $postdata);
        fclose($image);   
    }
    //echo "save=ok" to tell videorecorder.swf the snapshot saving process has succeeded
    die("save=ok");
} else {
    //echo "save=failed" to tell videorecorder.swf the snapshot saving process has failed
	die("save=failed");
}
?>