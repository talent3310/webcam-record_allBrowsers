<?php
###################### HDFVR's PHP Configuration File ######################

/* 
 connectionstring:String
 description: the RTMP connection string to the hdfvr application on your media server
 values: 'rtmp://localhost/hdfvr/_definst_', 'rtmp://myfmsserver.com/hdfvr/_definst_', etc...
*/
$config['connectionstring']="rtmp://54.250.245.176/hdfvr/_definst_";
// $config['connectionstring']="rtmp://710c825a.ngrok.io/hdfvr/_definst_";
/* 
 The recorderId query variable contains the value of the recorderId variable sent to videorecorder.swf via flash vars.
 To edit it's value look in the VideoRecorder.html file for "&recorderId=123", 123 is it's default value.
 You can use this variabe to control the all below variables that are sent back to HDFVR based on a client side value (recorderId).
*/
if(isset($_GET["recorderId"])){
	$recorderId = $_GET["recorderId"];
}

/*
 languagefile:String
 description: path to the XML file containing words and phrases to be used in the video recorder interface, use this setting to switch between languages while maintaining several language files
 values: URL paths to the translation files
 default: "translations/en.xml"
*/
$config['languagefile']="translations/en.xml";

/*
 qualityurl: String
 description: path to the .xml file describing video and audio quality to use for recording, this variable has higher priority than the qualityurl flash var from the .html files
 values: URL paths to the audio/video quality profile files
 default: "" (in which case the qualityurl flash var is being used, it's found in the .html files embedding videorecorder.swf)
*/
$config['qualityurl']="";

/*
 maxRecordingTime: Number
 description: the maximum recording time in seconds. If set to -1, the 'mrt' flash var parameter will be used, this way the maximum recording time can be set through this flash param specifically if needed.
 values: any number greater than 0 OR -1;
 default:120
*/
$config['maxRecordingTime']=120;

/*
 userId: String
 description: the id of the user logged into the website, not mandatory, this var is passed back to the save_video_to_db.php file via GET when the [SAVE] button in the recorder is pressed, this variable can also be passed via flash vars like this: videorecorder.swf?userId=XXX, but the value in this file, if not empty, takes precedence. If $config["useUserId"]="true", the value of this variable is also used in the stream name.
 values: strings or numbers will do
 by default its empty: ""
*/
$config['userId']="";

/*
 outgoingBuffer: Number
 description: Specifies how long the buffer for the outgoing audio/video data can grow before Flash Player starts dropping frames. On a high-speed connection, buffer time will not affect anything because data is sent almost as quickly as it is captured and there is no need to buffer it. On a slow connection, however, there might be a significant difference between how fast Flash Player can capture audio and video data data and how fast it can be sent to the client, thus the surplus needs to be buffered. HDFVR will increase the value specified here as much as possible (if the buffer fills more than 90% of the available buffer, we double the available buffer) to prevent Flash Player from dumping the data in the buffer when it's full.
 values: 30,60,etc...
 default:60
*/
$config['outgoingBuffer']=60;

/*
 playbackBuffer: Number
 description: specifies how much video time (in seconds) to buffer when reviewing/playing the recorded video 
 values: 1, 10,20,30,60,etc...
 default:1
*/
$config['playbackBuffer']=1;

/*
 autoPlay: String
 description: weather the recorded video should play automatically after recording it or if HDFVR should  wait for the user to press the PLAY button
 values: false, true
 default: "false"
*/
$config['autoPlay']="false";

/*
 deleteUnsavedFlv: String
 description: weather the recorded videos for which the user has not pressed [SAVE] will be deleted from the media server or not
 values: false, true
 default: "false"
*/
$config['deleteUnsavedFlv'] = "true";

/*
 hideSaveButton:Number
 description: makes the [SAVE] button invisible. When the [SAVE] button is pressed the save_video_to_db.xxx script and the corresponding JS functions are called/executed. The creation/existence of the new video file and corresponding snapshot do not depend on pressing this button. An invisible SAVE button can be used to move the SAVE action to the HTML page where there can be other form fields that can be submitted together with the info about the vid. When the SAVE button is hidden you can use the onUploadDone java script hook to get some info about the newly recorded flv file and redirect the user/enable a button on the HTML page/populate some hidden FORM vars/etc... . NOTE: when hiding this button some functions/calls will never be performed: save_video_to_db.php will never be called, onSaveOk and onSaveFailed JS functions will not be called. Also see the autoSaveVideo variable which hides the button but still executes the server side script.
 values: 1 for hidden, 0 for visible
 default: 0 (visible)
*/
$config['hideSaveButton']=0;

/*
 onSaveSuccessURL:String
 description: when the [SAVE] button is pressed (if it's enabled) save_video_to_db.php (or .asp) is called. If the save operation succeeds AND if this variable is NOT EMPTY, the user will be taken to the URL specified by this variable
 values: any URL you want the user directed to after he presses the [Save] button
 default: ""
*/
$config["onSaveSuccessURL"]="";

/*
 snapshotSec:Number
 description: the snapshot is taken when the recording reaches this length/time
 NOTE: THE SNAPSHOT IS SAVED TO THE WEB SERVER AS A JPG WHEN THE USER PRESSES THE SAVE BUTTON. If Save is not pressed the snapshot is not saved.
 values: any number  greater or equal to 0,  if 0 then the snap shot is taken when the [REC] button is pressed
 default: 5
*/
$config["snapshotSec"] = 5;

/*
 snapshotEnable:Number
 description: if set to true the recorder will take a snapshot 
 values: true or false
 default: "true"
*/
$config["snapshotEnable"] = "false";
/*
 minRecordTime:Number
 description: the minimum number of seconds a recording must be in length. The STOP button will be disabled until the recording reaches this length! 
 values: any number lower them maxRecordingTime
 default: 5
*/
$config["minRecordTime"] = 5;

/*
 backgroundColor:String
 description: color of background area inside the video recorder around the video area
 values: any color in hex format
 default:0xf6f6f6
*/
$config["backgroundColor"] = "0xf6f6f6";

/*
 menuColor:String
 description: the color of the lower area of the recorder containing the buttons and the scrub bar
 values:any color in hex format
 default:0xe9e9e9
*/
$config["menuColor"] = "0xe9e9e9";

/*
 radiusCorner:Number
 description: the radius of the 4 corners of the video recorder
 values: 0 for no rounded corners, 4,8,16,etc...
 default: 8
*/
$config["radiusCorner"] = 8;

/*
 showFps:String
 description: Shows or hides the FPS counter
 values: "false" to hide it "true" to show it
 default: "false"
*/
$config["showFps"] = "false";

/*
 recordAgain:String
 description:if set to true the user will be able to record again and again until he is happy with the result. If set to false he only has 1 shot!
 values:"false" for one recording, "true" for multiple recordings
 default: "true"
*/
$config["recordAgain"] =  "true";

/*
 useUserId:String
 description:if set to "true" the stream name will be {prefix}{userId}{timestamp_random} instead of {prefix}{timestamp_random}. {userId} will be reaplced by HDFVR with the value of $config['userId'] from this file.
 values:"false" for not using the userId in the file name, "true" for using it
 default: "false"
*/
$config["useUserId"] =  "false";

/*
 streamPrefix:String
 description: adds a prefix to the video file name on the media server like this: {prefix}{timestamp_random} or {prefix}{userId}{timestamp_random} if the useUserId option is set to true
 values: a string
 default: "videoStream_"
*/
$config["streamPrefix"] = "videoStream_";

/*
 streamName:String
 description: By default the application generates a random name ({prefix}_{timestamp_random}) for the video file. If you want to use a certain name set this variable and it will overwrite the pattern {prefix}_{timestamp_random}. The stream extension (.flv , .mp4 or .f4v) should NOT be used in the stream name.
 values: a string
 default: ""
*/
$config["streamName"] = "";

/*
 disableAudio:String
 description: By default the application records audio and video. If you want to disable audio recording set this var to "true".
 values: "false" to include audio in the recording, "true" to record without audio
 default: "false"
*/
$config["disableAudio"] = "false";

/*
 chmodStreams:String
 description: If you want to change the permissions on the newly recorded video file after it is saved to the disk on the media server you can use this variable. This works only on Red5 and Wowza.
 values: "0666","0777", etc.
 default: ""
*/
$config["chmodStreams"] = "";

/*
 countdownTimer:String
 description: set to true if you want the timer to decrease from the upper limit (maxRecordingTime) down to 0
 values: "true","false"
 defaut:"false"
*/
$config["countdownTimer"]="false";

/*
 overlayPath:String
 description: realtive URL path to the image to be shown as overlay
 values: any realtive path
 defaut: ""  (no overlay)
*/
$config["overlayPath"]="fullStars.png";

/*
 overlayPosition:String
 description: position of the overlay image mentioned above
 values: "tr" for top right, "tl" for top left and "cen" for centered, no other positions are supported
 defaut: "tr"
*/
$config["overlayPosition"]="tr";

/*
 loopbackMic:String
 description: whether or not the sound should be also played back in the speakers/heaphones during recording
 values: "true" for yes,"false" for no
 defaut:"false"
*/
$config["loopbackMic"]="false";

/*
 showMenu:String
 description: whether or not the bottom menu in the HDFVR shoud show, some people choose to control the HDFVR via JS and they do ot need the menu, when not using the menu you can decrease the height of HDFVR by 32 (3o is the height of the button 2 is the default padding value in this config file)
 values: "true" to show,"false" to hide
 default: "true"
*/
$config["showMenu"]="true";

/*
 showTimer:String
 description: Show or hides the timer
 values: "false" to hide it "true" to show it
 default: "true"
*/
$config["showTimer"] = "false";

/*
 showSoundBar:String
 description: Shows or hides the sound bar
 values: "false" to hide it "true" to show it
 default: "true"
*/
$config["showSoundBar"] = "false";

/*
 flipImageHorizontally: String
 description: When set to "false" HDFVR will show the webcam feed exactly as it comes from the webcam and text shown to the camera can be read. When set to "true" HDFVR shows the webcam flipped horizontally, in a similar way to the way you see yourself in a mirror. With the image flipped text shown to the webcam can not be read. The final .flv file will not be flipped/mirrored regardless of this setting.
 values: "true" to flip it (mirror mode), "false" to show the feed as it comes from the webcam
 default:"false"
*/
$config["flipImageHorizontally"] = "false";

/*
 hidePlayButton:Number
 description: This controls whether or not the play/pause button is visible in the controls menu of HDFVR
 values: 1 for hidden, 0 for visible
 default: 0 (visible)
*/
$config['hidePlayButton']=0;

/*
 enablePauseWhileRecording:Number
 description: This controls whether or not HDFVR can be paused/resumed during a recording. Pausing the video on Red5 1.0.2 is known to cause issues with the consistency of the final recording produced
 values: 1 for enabled, 0 for disabled
 default: 0 (disabled)
*/
$config['enablePauseWhileRecording']=1;
/*
 enableBlinkingRec:Number
 description: This controls whether or not HDFVR will display the Rec blinking animation while recording
 values: 1 for enabled, 0 for disabled
 default: 1 (enabled)
*/
$config['enableBlinkingRec']=1;

/*
 microphoneGain:Number
 description: This controls the amount by which the microphone boosts the signal. Altough this value is applied and reflects the recording level, the setting does not update Flash Player's  "Record Volume" slider in Flash Player Settings > Microphone. This seems to be a bug in Flash Player.
 values: 0 to 100
 default: 50
*/
$config['microphoneGain']=50;

/*
 allowAudioOnlyRecording:Number
 description: This controls whether or not HDFVR is permitted to record audio only when a webcam is missing and only a microphone is detected.
 values:1 for enabled, 0 for disasbled
 default: 1 (enabled)
*/
$config['allowAudioOnlyRecording']=1;

/*
 enableFFMPEGConverting:Number
 description: This controls whether or not HDFVR will trigger server side the execution of FFMPEG converting once the stream finished uploading.
 values:1 for enabled, 0 for disasbled
 default: 0 (disabled)
*/
$config['enableFFMPEGConverting'] = 0;

/*
 ffmpegCommand:String
 description: This sets the conversion command that will be executed with FFMPEG when enableFFMPEGConverting is set to 1. The command has the following pattern: "ffmpeg -i [THE_INPUT_FLV_FILE]  [codec parameters audio/video] [THE_OUTPUT_MP4_FILE]" . The [THE_INPUT_FLV_FILE] and [THE_OUTPUT_MP4_FILE] parts must not be changed, both the path to ffmpeg and to the video files will be detected and set automatically by the media server. Only the codec parameters will be taken into account. The command is expressed like this to put it more into context as opposed to just sending the codec parameters.
 values:Example command: ffmpeg -i [THE_INPUT_FLV_FILE] -c:v libx264 [THE_OUTPUT_MP4_FILE]
 default: ffmpeg -i [THE_INPUT_FLV_FILE] -c:v libx264 [THE_OUTPUT_MP4_FILE]
*/
$config['ffmpegCommand'] = "ffmpeg -i [THE_INPUT_FLV_FILE] -c:v libx264 [THE_OUTPUT_MP4_FILE]";

/*
 autoSave:Number
 description: This controls whether or not HDFVR will automatically call the save_video_to_db script, having the same effect as pressing the [SAVE] button in menu. To eliminate the issue of double entries in the database, enabling this setting will automatically hide the [SAVE] button. 
 values:1 for enabled, 0 for disasbled
 default: 1 (enabled)
*/
$config['autoSave'] = 0;

/*
 payload: String
 description: The payload var is used to transmit data in the form of strings or JSON encoded string, not mandatory, this var is passed back to the save_video_to_db.php file via GET when the [SAVE] button in the recorder is pressed, this variable can also be passed via flash vars like this: videorecorder.swf?payload=XXX.
 values: strings, numbers, JSON encoded strings
 by default its empty: ""
*/
$config['payload']="";

/*
 normalColor:String
 description: color of the text and icons
 values: any color in hex format
 default:0x334455
*/
$config["normalColor"] = "0x334455";

/*
 overColor:String
 description: color applied to text and icons on mouse over
 values: any color in hex format
 default:0x556677
*/
$config["overColor"] = "0x556677";

/* 
 skipInitialScreen:Number
 description: If this settings is enabled HDFVR won't show the initial pre-recording screen introduced in HDFVR 2.0
 values: 1 for enabled, 0 for disasbled 
 default:0 (disabled) 
*/
$config["skipInitialScreen"] = 0;

/*
 hideDeviceSettingsButtons:Number
 description: If this settings is enabled HDFVR won't display the camera and microphone settings buttons when the showMenu setting is set to FALSE. This is especially helpfull if you are integrating HDFVR on a platform that will use the same hardware specifications and no changing of the devices will be needed.
 values: 1 for enabled, 0 for disasbled 
 default:0 (disabled)
*/
$config["hideDeviceSettingsButtons"] = 1;

/*
 proxyType:String
 description: determines which fallback methods are tried if an initial connection attempt to Flash Media Server fails. See http: help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/NetConnection.html#proxyType for details.
 values: "none", "HTTP", "CONNECTOnly", "CONNECT", and "best"
 default:none
*/
$config["proxyType"] = "none";

##################### DO NOT EDIT BELOW ############################

//integration.php most commonly contains code for integrating with 3rd party CMS systems , it is generally used for overwriting values in this file so that whenever you update HDFVR and it's avc_settings.php the integration remains unchanged
if (file_exists("integration.php")){ include("integration.php");}

//output all the values of the $config array
echo "donot=removethis";
foreach ($config as $key => $value){
	echo '&'.$key.'='.$value;
}
?>