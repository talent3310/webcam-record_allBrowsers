 function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
                navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
            }
            var mediaConstraints = {
                audio: !IsOpera && !IsEdge, // record both audio/video in Firefox/Chrome
                video: true
            };
            
            $( document ).ready(function() {
                $('#webrtc_processing').hide();
                $('#webrtc_save').hide();
            });
            document.querySelector('#start-recording').onclick = function() {
                this.disabled = true;
                document.getElementById('save-recording').disabled = true;
                captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
                 
            };
            document.querySelector('#stop-recording').onclick = function() {
                this.disabled = true;
                document.querySelector('#resume-recording').disabled = true;
                 $('#webrtc_processing').show();
                 console.log('mediaRecorder=> ', mediaRecorder);
                mediaRecorder.stop(function(blob) {
                    console.log('blob here=> ', blob);
                    document.querySelector('#start-recording').disabled = false;
                    document.getElementById('save-recording').disabled = false;
                    // $('#webrtcCamContainer video').src = URL.createObjectURL(blob);
                    console.log('URL==> ', URL.createObjectURL(blob));
                    $('#webrtcCamContainer video').attr('src', URL.createObjectURL(blob));
                    console.log('finished');
                     $('#webrtc_processing').hide();
                    
                });
                mediaRecorder.stream.stop();
                document.querySelector('#pause-recording').disabled = true;
                
            };
            document.querySelector('#pause-recording').onclick = function() {
                this.disabled = true;
                mediaRecorder.pause();
                document.querySelector('#resume-recording').disabled = false;
            };
            document.querySelector('#resume-recording').onclick = function() {
                this.disabled = true;
                mediaRecorder.resume();
                document.querySelector('#pause-recording').disabled = false;
            };
            document.querySelector('#save-recording').onclick = function() {
                this.disabled = true;
                $('#webrtc_save').show();
                document.querySelector('#start-recording').disabled = true;
                mediaRecorder.save(function() {
                    $('#webrtc_save').hide();
                    alert('Successfully saved to the server!');
                    document.querySelector('#start-recording').disabled = false;
                });
               
            };
            var mediaRecorder;
            var blob
            function onMediaSuccess(stream) {
                var video = document.createElement('video');
                var videoWidth = 320;//document.getElementById('video-width').value || 320;
                var videoHeight = 240;//document.getElementById('video-height').value || 240;
                video = mergeProps(video, {
                    controls: true,
                    muted: true,
                    width: videoWidth,
                    height: videoHeight,
                    src: URL.createObjectURL(stream)
                });
                video.play();
              
                $("#webrtcCamContainer video").remove();
                videosContainer.appendChild(video);
                // videosContainer.appendChild(document.createElement('hr'));
                mediaRecorder = new MediaStreamRecorder(stream);
                mediaRecorder.stream = stream;
                // var recorderType = document.getElementById('video-recorderType').value;
                // if (recorderType === 'MediaRecorder API') {
                //     mediaRecorder.recorderType = MediaRecorderWrapper;
                // }
                // if (recorderType === 'WebP encoding into WebM') {
                //     mediaRecorder.recorderType = WhammyRecorder;
                // }
                mediaRecorder.recorderType = MediaRecorderWrapper;
                // don't force any mimeType; use above "recorderType" instead.
                // mediaRecorder.mimeType = 'video/webm'; // video/webm or video/mp4
                mediaRecorder.videoWidth = videoWidth;
                mediaRecorder.videoHeight = videoHeight;
                mediaRecorder.ondataavailable = function(blob) {
                    blob = blob;
                    var a = document.createElement('a');
                    a.target = '_blank';
                    a.innerHTML = 'Open Recorded Video No. ' + (index++) + ' (Size: ' + bytesToSize(blob.size) + ') Time Length: ' + getTimeLength(timeInterval);
                    a.href = URL.createObjectURL(blob);

                    // videosContainer.appendChild(a);
                    // videosContainer.appendChild(document.createElement('hr'));
                };
                var timeInterval = null;
                if (timeInterval) timeInterval = parseInt(timeInterval);
                else timeInterval = 100;
                // get blob after specific time interval
                mediaRecorder.start(timeInterval);
                document.querySelector('#stop-recording').disabled = false;
                document.querySelector('#pause-recording').disabled = false;
                
            }
            function onMediaError(e) {
                console.error('media error', e);
            }
            var videosContainer = document.getElementById('webrtcCamContainer');
            var index = 1;
            // below function via: http://goo.gl/B3ae8c
            function bytesToSize(bytes) {
                var k = 1000;
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes === 0) return '0 Bytes';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
                return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            }
            // below function via: http://goo.gl/6QNDcI
            function getTimeLength(milliseconds) {
                var data = new Date(milliseconds);
                return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
            }
            window.onbeforeunload = function() {
                document.querySelector('#start-recording').disabled = false;
            };