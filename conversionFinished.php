<?php
error_reporting(E_ERROR | E_PARSE);

$status = urldecode($_POST["status"]);//the status of the conversion when finished: success or fail
$streamName = urldecode($_POST["streamName"]);// the name of the recording that finished converting

$result ="&result=".$status." ".$streamName;
echo $result;
?>