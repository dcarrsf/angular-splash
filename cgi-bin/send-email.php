<?php
	// If "email" variable is filled out, send email
	if (isset($_REQUEST['email']))  {
  
		// Email information
		$admin_email = "dan@dancarr.co";
		$subject = $_REQUEST['subject'];
		$email = $_REQUEST['email'];
		$message = $_REQUEST['message'];
		
		// Send email
		if ( mail($admin_email, "$subject", $message, "From:" . $email) ) {
			echo "success";
		}else{
			echo "failed";
		}
	}
?>