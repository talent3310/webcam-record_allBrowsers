<?php

header("Access-Control-Allow-Origin:*");

if(!is_dir("mobileRecordings")){
	$res = mkdir("mobileRecordings",0777); 
}

if(isset($_FILES["FileInput"]) && $_FILES["FileInput"]["error"]== UPLOAD_ERR_OK)
{
	$UploadDirectory	= 'mobileRecordings/'; 	

	//Note: if memory_limit, upload_max_filesize or post_max_size is set too low (lower than the size of the uploaded video) in php.ini the upload will fail. 
	
	if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])){
		die("HTTP_X_REQUESTED_WITH" . $_SERVER['HTTP_X_REQUESTED_WITH'] );
	}

	/*if ($_FILES["FileInput"]["size"] > 5242880){
		die("File size is too big!");
	}*/
	
	switch(strtolower($_FILES['FileInput']['type']))
	{
			case 'video/mp4':
			case 'video/quicktime':
			case 'video/3gpp':
			case 'video/3gpp2':
				break;
			default:
				die('{"s":0,"e":"Unsupported file type '.$_FILES['FileInput']['type'].'"}');
	}
	
	$File_Name          = strtolower($_FILES['FileInput']['name']);
	$File_Ext           = substr($File_Name, strrpos($File_Name, '.')); 
	$Random_Number      = rand(0, 9999999999); 
	$NewFileName 		= "mvs".$Random_Number.$File_Ext; 
	
	if(file_exists($UploadDirectory.$NewFileName) == FALSE){
		if(move_uploaded_file($_FILES['FileInput']['tmp_name'], $UploadDirectory.$NewFileName )){
				
			//we include an external file that should handle the job, this way you can overwrite this file when updating HDFVR
			if(file_exists('int_ufm.php')){
				include 'int_ufm.php';
			}
			die('{"s":1,"f":"'.$NewFileName.'"}');
		}else{
			die('{"s":0,"e":"error uploading file (move_uploaded_file failed)","f":"'.$NewFileName.'"}');
		}	
	}else{
		$Random_Number      = rand(0, 9999999999); 
		$NewFileName 		= "mvs".$Random_Number.$File_Ext; 
		
		if(move_uploaded_file($_FILES['FileInput']['tmp_name'], $UploadDirectory.$NewFileName )){
				
			//we include an external file that should handle the job, this way you can overwrite this file when updating HDFVR
			if(file_exists('int_ufm.php')){
				include 'int_ufm.php';
			}
			
			die('{"s":1,"f":"'.$NewFileName.'"}');
		}else{
			die('{"s":0,"e":"error uploading file (move_uploaded_file failed)","f":"'.$NewFileName.'"}');
		}
	}
	
}
else
{
	die('{"s":0,"e":"error uploading file (check upload_max_filesize value)"}');
}