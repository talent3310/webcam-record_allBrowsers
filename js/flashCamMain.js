
$(document).ready(function() { 
	var options = {   
			beforeSubmit:  beforeSubmit,  
			success:       afterSuccess,  
			uploadProgress: OnProgress, 
			resetForm: true        
		}; 
		
	$('#hdfvr-recording-form').submit(function() { 
			$(this).ajaxSubmit(options);
			return false; 
	});

	function beforeSubmit(){
		console.log("beforeSubmit()");
	   if (window.File && window.FileReader && window.FileList && window.Blob)
		{
			$('#output').css('color','#000');	
			$("#output").html("");
			if( !$('#hdfvr-file-input').val()) 
			{
				$("#output").html("Please select or record a video before uploading.");
				return false
			}
		
			$('#hdfvr-submit-btn').prop('value','Uploading...0%');

			var ftype = $('#hdfvr-file-input')[0].files[0].type; 
		
			switch(ftype)
			{
				case 'video/mp4':
				case 'video/quicktime':
				case 'video/3gpp':
				case 'video/3gpp2':
					break;
				default:
					$("#output").html("<b>"+ftype+"</b> Unsupported file type!");
					return false
			}
				
			$('#submit-btn').hide(); 
			$('#hdfvr-loading-img').show();
			$("#output").html("");  
		}
		else
		{
			$("#output").html("Please upgrade your browser! Your current one lacks the features needed to record & submit videos.");
			return false;
		}
	}


	function OnProgress(event, position, total, percentComplete)
	{
		$('#hdfvr-submit-btn').prop('value','Uploading...'+percentComplete + '%');
	}
	
	function afterSuccess(data)
	{
		$('#hdfvr-loading-img').hide(); 
		//var res = data.split("#");
		//var fileName = res[0];
		var res = JSON.parse(data);
		if (res.s==1){
			$("#output").html("Done!");
			$('#output').css('color','#090');	
			$('#hdfvr-submit-btn').prop('value','2. Upload');
			var fileName = res.f;
			console.log("filename="+fileName);
		}else if (res.s==0){
				$("#output").html("Upload failed!");
				$('#output').css('color','#f00');		
		}
	}
}); 


window.onbeforeunload = function(){
	if (navigator.appName == 'Microsoft Internet Explorer'){
		var swf = document.getElementById('VideoRecorder');
		swf.disconnectAndRemove();
	}
}


var flashvars = {
        userId: "u1",
        qualityurl: "audio_video_quality_profiles/320x240x30x90.xml",
        recorderId: "r1",
        sscode: "php",
        lstext: "Loading...",
        mrt: "120",
        authenticity_token: ""
    };
    var params = {
        quality: "high",
        bgcolor: "#dfdfdf",
        play: "true",
        loop: "false",
        allowscriptaccess: "sameDomain",
        wmode: "transparent"
    };
    var attributes = {
        name: "VideoRecorder",
        id: "VideoRecorder",
        align: "middle"
    };

    var size = {
        width: 320,
        height: 270
    };

    var mobile = false;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("ipad") != -1 || ua.indexOf("iphone") != -1 || ua.indexOf("android") != -1 || ua.indexOf("ipod") != -1 || ua.indexOf("windows ce") != -1 || ua.indexOf("windows phone") != -1) {
        mobile = true;
    }

    <!-- Detecting if Flash Player is of the PPAPI variety used by Chrome and Opera -->
    function getFlashPlayerType() {

        var isPPAPI = false;
        var type = 'application/x-shockwave-flash';
        var mimeTypes = navigator.mimeTypes;

        if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && (mimeTypes[type].enabledPlugin.filename.match(/pepflashplayer|Pepper/gi))) {
            isPPAPI = true;
        }

        return isPPAPI;
    }

    if (mobile == false) {
        /*
        The "hdfvr-content" DIV contains the HTML5 mobile version. If we're on desktop we 
        replace it with an OBJECT or MOVIE (with the id "VideoRecorder") containing the 
        videorecorder.swf used to record from desktop devices.
        */
        var hasFlash = function(a, b) {
            try {
                a = new ActiveXObject(a + b + '.' + a + b)
            } catch (e) {
                a = navigator.plugins[a + ' ' + b]
            }
            return !!a
        }('Shockwave', 'Flash')
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        var isFirefox = typeof InstallTrigger !== 'undefined';

        if ((isIE && hasFlash == false) || (isFirefox && hasFlash == false)) {

            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = "div.getFlash{width:" + size["width"] + "px;height:" + size["height"] + "px;background-color:#363738;margin:0 auto;}div.getFlash p {text-align:center;vertical-align: middle;line-height:" + size["height"] + "px;font-family:sans-serif;font-size:14px;color:#ffffff;text-decoration:underline;}";
            document.body.appendChild(css);

            document.getElementById('flashCamContainer').innerHTML = '<div class="getFlash"><p><a style = "color:#ffffff !important;" href="' + ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.adobe.com/go/getflashplayer" target="_blank">Flash Player is needed to display this content</a></p></div>';

        } else {

            if (flashvars && typeof flashvars === "object") {
                for (var k in flashvars) {
                    if (typeof flashVarsString != "undefined") {
                        flashVarsString += "&" + k + "=" + flashvars[k];
                    } else {
                        flashVarsString = k + "=" + flashvars[k];
                    }
                }
            }

            //console.log(flashVarsString);
            flashVarsString = flashVarsString.replace(/\"/g, '\&quot;');
            //console.log(flashVarsString);

            //Detecting IE less than version 9
            var div = document.createElement("div");
            div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
            var isIeLessThan9 = (div.getElementsByTagName("i").length == 1);

            if (isIE && isIeLessThan9) {
                document.getElementById('flashCamContainer').innerHTML = '<object type="application/x-shockwave-flash" name="' + attributes["name"] + '" id="' + attributes["id"] + '" align="' + attributes["align"] + '" width="' + size["width"] + '" height="' + size["height"] + '"><param name="quality" value="' + params["quality"] + '"><param name="bgcolor" value="' + params["bgcolor"] + '"><param name="play" value="' + params["play"] + '"><param name="loop" value="' + params["loop"] + '"><param name="allowscriptaccess" value="' + params["allowscriptaccess"] + '"><param name="wmode" value="' + params["wmode"] + '"><param name="flashvars" value="' + flashVarsString + '"><param name="movie" value="VideoRecorder.swf"</object> ';
            } else {
                document.getElementById('flashCamContainer').innerHTML = '<object type="application/x-shockwave-flash" name="' + attributes["name"] + '" id="' + attributes["id"] + '" align="' + attributes["align"] + '" data="VideoRecorder.swf" width="' + size["width"] + '" height="' + size["height"] + '"><param name="quality" value="' + params["quality"] + '"> <param name="bgcolor" value="' + params["bgcolor"] + '"><param name="play" value="' + params["play"] + '"><param name="loop" value="' + params["loop"] + '"><param name="allowscriptaccess" value="' + params["allowscriptaccess"] + '"><param name="wmode" value="' + params["wmode"] + '"><param name="flashvars" value="' + flashVarsString + '"></object> ';
            }
        }
    } else {
        document.getElementById('flashCamContainer').innerHTML = '<div id="hdfvr-content" style="width:400px;margin:auto;"><form action="uploadFromMobile.php" method="post" enctype="multipart/form-data" id="hdfvr-recording-form"><input name="FileInput" id="hdfvr-file-input" type="file" accept="video/*" capture="camcorder" value="Start Recording" /><input type="submit"  id="hdfvr-submit-btn" value="2. Upload"/></form><img src="loaderb16.gif" id="hdfvr-loading-img" alt="Uploading please wait..."/><div id="output"></div></div>';
    }

    function onRecorderInit(recorderId) {
        console.log("onRecorderInit(" + recorderId + ")");
        //Triggers after the initial [Record Video] screen is drawn. After this function is called you can safely call document.VideoRecorder.startRecorder(). If skipInitialScreen is turned on in avc_settings.xxx this function is not called. Added in HDFVR 2.2.
        document.getElementById("startRecorderBtn").disabled = false;
    }

    function onSnapshotTaken(recorderId) {
        console.log("onSnapshotTaken(" + recorderId + ")");
    }

    function userHasCamMic(cam_number, mic_number, recorderId) {
        console.log("userHasCamMic(" + cam_number + "," + mic_number + "," + recorderId + ")");
        //this function is called when HDFVR is initialized
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
    }

    function btRecordPressed(recorderId) {
        console.log("btRecordPressed(" + recorderId + ")");
        //this function is called whenever the Record button is pressed to start a recording
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page

        document.getElementById("recordbtn").disabled = true;
        document.getElementById("stopBtn").disabled = false;
        document.getElementById("playBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("saveBtn").disabled = true;
    }

    function btStopRecordingPressed(recorderId) {
        document.getElementById("saveBtn").disabled = false;
        document.getElementById("playBtn").disabled = false;
        console.log('kAAkkk');

        //this function is called whenever a recording is stopped
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
        document.getElementById("resumeRecordingBtn").disabled = true;
        document.getElementById("pauseRecordingBtn").disabled = true;
        document.getElementById("recordbtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
        
        document.getElementById("pauseBtn").disabled = true;
        console.log('kkkk');

    }

    function btPlayPressed(recorderId) {
        console.log("btPlayPressed(" + recorderId + ")");
        //this function is called whenever the Play button is pressed to start/resume playback
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page

        document.getElementById("recordbtn").disabled = true;
        document.getElementById("stopBtn").disabled = true;
        document.getElementById("playBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = false;
        document.getElementById("saveBtn").disabled = true;
    }

    function btPauseRecordingPressed(recorderId) {
        console.log("btPauseRecordingPressed(" + recorderId + ")");
        //this function is called whenever the Pause Recording button is pressed to pause a recording
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
        document.getElementById("resumeRecordingBtn").disabled = false;
        document.getElementById("pauseRecordingBtn").disabled = true;
        document.getElementById("recordbtn").disabled = true;
        document.getElementById("stopBtn").disabled = false;
        document.getElementById("playBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("saveBtn").disabled = true;
    }

    function btResumeRecordingPressed(recorderId) {
        console.log("btResumeRecordingPressed(" + recorderId + ")");
        //this function is called whenever the Resume Recording button is pressed to resume a recording
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
        document.getElementById("resumeRecordingBtn").disabled = true;
        document.getElementById("pauseRecordingBtn").disabled = false;
        document.getElementById("recordbtn").disabled = true;
        document.getElementById("stopBtn").disabled = false;
        document.getElementById("playBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("saveBtn").disabled = true;
    }

    function btPausePressed(recorderId) {
        console.log("btPausePressed(" + recorderId + ")");
        //this function is called whenever the Pause button is pressed during playback
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page

        document.getElementById("recordbtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
        document.getElementById("playBtn").disabled = false;
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("saveBtn").disabled = false;
    }

    function onUploadDone(streamName, streamDuration, userId, recorderId, audioCodec, videoCodec, fileType) {
        var args = Array.prototype.slice.call(arguments);
        console.log("onUploadDone(" + args.join(",") + ")");

        //this function is called when the video/audio stream has been all sent to the media server and has been saved to the video server HHD, 
        //on slow client->server connections, because the data can not reach the media server in real time, it is stored in the recorder's buffer until it is sent to the server, you can configure the buffer size in avc_settings.XXX

        //this function is called with 7 parameters: 
        //streamName: a string representing the name of the stream recorded on the video server WITHOUT the filename extension (.flv , .f4v or .mp4)
        //userId: the userId sent via flash vars or via the avc_settings.XXX file, the value in the avc_settings.XXX file takes precedence if its not empty
        //duration of the recorded video/audio file in seconds but acccurate to the millisecond (like this: 4.322)
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
        //audioCodec: the audio codec used for the recording, Nelly Moser or Speex
        //videoCodec: the video codec used for the recording, Sorenson or H.264
        //fileType: the format in which the resulting recording will be saved in: FLV, F4V or MP4
    }

    function onSaveJpgOk(streamName, userId, recorderId) {
        console.log("onSaveJpgOk(" + streamName + "," + userId + "," + recorderId + ")");

        //jpg_encoder_download.XXX is called when the user presses the [stop recording] button inside the video. When  jpg_encoder_download.XXX script returns save=ok this JS function is called.
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
    }

    function onSaveJpgFailed(streamName, userId, recorderId) {
        console.log("onSaveJpgFailed(" + streamName + "," + userId + "," + recorderId + ")");
        //jpg_encoder_download.XXX is called when the user presses the [stop recording] button inside the video. When  jpg_encoder_download.XXX script returns save=fail this JS function is called.
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
    }

    function onSaveOk(streamName, streamDuration, userId, cameraName, micName, recorderId, audioCodec, videoCodec, fileType, videoId) {
        var args = Array.prototype.slice.call(arguments);
        document.getElementById("saveBtn").disabled = true;
        console.log("onSaveOk(" + args.join(",") + ")");

        //the user pressed the [save] button inside the recorder and the save_video_to_db.XXX script returned save=ok
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
        //audioCodec: the audio codec used for the recording, Nelly Moser or Speex
        //videoCodec: the video codec used for the recording, Sorenson or H.264
        //fileType: the format in which the resulting recording will be saved in: FLV, F4V or MP4
        //videoId: the videoId sent via flash vars
    }

    function onSaveFailed(streamName, streamDuration, userId, recorderId) {
        console.log("onSaveFailed(" + streamName + "," + streamDuration + "," + userId + "," + recorderId + ")");

        //the user pressed the [save] button inside the recorder but the save_video_to_db.XXX script returned save=fail
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
    }

    function onFlashReady(recorderId) {
        //deprecated, use onRecorderReady instead
    }

    function onRecorderReady(recorderId) {
        console.log("onRecorderReady(" + recorderId + ")");
        //HDFVR has moved past the initial screen, privacy screen and device selection screen and has reached the recording UI. You can now trigger the recording process using document.VideoRecorder.record().
        //Example : document.VideoRecorder.record(); will make a call to flash in order to start recording
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
        document.getElementById("recordbtn").disabled = false
        document.getElementById("getStreamNameBtn").disabled = false
        document.getElementById("getStreamTimeBtn").disabled = false
        document.getElementById("getPlaybackTimeBtn").disabled = false
    }

    function onPlaybackComplete(recorderId) {
        console.log("onPlaybackComplete(" + recorderId + ")")
            //this function is called when HDFVR plays back a recorded video and the playback completes
            //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
        document.getElementById("recordbtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
        document.getElementById("playBtn").disabled = false;
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("saveBtn").disabled = false;
    }

    function onRecordingStarted(recorderId) {
        console.log("onRecordingStarted(" + recorderId + ")")
        console.log('here');
        document.getElementById("pauseRecordingBtn").disabled = false;
        //this function is called when HDFVR starts recording
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
    }

    function onCamAccess(allowed, recorderId) {
        console.log("onCamAccess(" + allowed + "," + recorderId + ")");
        //the user clicked Allow or Deny in the Camera/Mic access dialog box in Flash Player
        //when the user clicks Deny this function is called with allowed=false
        //when the user clicks Allow this function is called with allowed=true
        //this function can be called anytime during the life of the HDFVR instance as the user has permanent access to the Camera/Mic access dialog box in Flash Player
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page

    }

    function onFPSChange(recorderId, currentFPS) {
        //console.log("onFPSChange("+recorderId+","+currentFPS+")");
        //this function is called by HDFVR every second
        //currentFPS:the current frames-per-second that HDFVR reports (during recording, playback, uploading and saving) depending of the state of HDFVR.
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
    }

    function onConnectionClosed(recorderId) {
        console.log("onConnectionClosed(" + recorderId + ")");
        //this function is called by HDFVR when the connection to the media server has been lost
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
    }

    function onConnectionStatus(status, recorderId) {
        console.log("onConnectionStatus(" + status + "," + recorderId + ")");
        //this function is called by HDFVR for every connection event.
        //status: the actual connection status: (connected, rejected, invalid app, closed, failed)
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
    }

    function onMicActivityLevel(recorderId, currentActivityLevel) {
        //console.log("onMicActivityLevel("+recorderId+","+currentActivityLevel+")");
        //this function is called by HDFVR every second
        //currentActivityLevel:The amount of sound the microphone is detecting
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
    }

    function onFFMPEGConversionFinished(recorderId, status, streamName) {
        console.log("onFFMPEGConversionFinished(" + recorderId + "," + status + "," + streamName + ")");
        //this function is called by HDFVR after the conversion with FFMPEG has finished server side
        //recorderId: the recorderId sent via flash vars, to be used when there are many recorders on the same web page
        //status: the status when the conversion is finished: success or fail
        //streamName: the name of the stream for which the conversion finished
    }