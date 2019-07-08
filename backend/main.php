<?php
	header("Access-Control-Allow-Origin:https://bin.maorx.cn");
	$action = $_POST['action'];

	switch ($action) {
    case 'post':
        post();
        break;
	}

	function post(){
		$postContent = $_POST['postContent'];
		$postTime = date("Y-m-d H:i:s");
		$dbhost = '148.66.18.130';
		$dbuser = 'maorx';
		$dbpass = 'FX_Highway123456';
		$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
		if(! $conn )
		{
		  die('连接失败: ' . mysqli_error($conn));
		}
		echo '连接成功<br />';
		mysqli_query($conn , "set names utf8");

		$sql = "INSERT INTO bin_main".
        "(content,postTime) ".
        "VALUES ".
        "('$postContent','$postTime')";

        mysqli_select_db( $conn, 'sqlmaorx' );
		$retval = mysqli_query( $conn, $sql );
		if(! $retval )
		{
		  die('无法插入数据: ' . mysqli_error($conn));
		}
		echo "数据插入成功\n";
		mysqli_close($conn);




		/*$lastModified0 = $_POST['lastModified0'];
		$eTag0 = $_POST['eTag0'];
		$rthServer = $_POST['rthServer'];
		$json_string = file_get_contents('likedList.json');
		$data = json_decode($json_string, true);
		$lastModified1 = $data['lastModified1'];
		$eTag1 = $data['eTag1'];
		if($rthServer=="RTH/CN" && $lastModified1!="" && $lastModified1!=undefined && $lastModified0!="" && $lastModified0!=undefined && $lastModified0!=$lastModified1 && $eTag0!=$eTag1){
			$dataNew = array("lastModified1"=>$lastModified0,"eTag1"=>$eTag0);
			$json_string = json_encode($dataNew);
			file_put_contents('likedList.json', $json_string);
			echo "0";
		}else{
			$count0 = count($data) - 2;
	    	echo $count0;
		}*/
	}

	/*function updateLikedCount(){
		function getRealIp()
		{
			$ip=false;
			if(!empty($_SERVER["HTTP_CLIENT_IP"])) {
				$ip = $_SERVER["HTTP_CLIENT_IP"];
			}
			if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
				$ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
				if ($ip) { array_unshift($ips, $ip); $ip = FALSE; }
				for ($i = 0; $i < count($ips); $i++) {
					if (!eregi ("^(10│172.16│192.168).", $ips[$i])) {
						$ip = $ips[$i];
						break;
					}
				}
			}
			return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
		}

		$json_string = file_get_contents('likedList.json');
		$data = json_decode($json_string, true);
		//var_dump($data);

		$userIP = getRealIp();
		if (array_key_exists($userIP,$data)){
			echo "liked";
		}else{
			$data1 = array($userIP=>"1");
			$dataNew = array_merge($data,$data1);
			$count1 = count($dataNew) - 2;
			$json_string = json_encode($dataNew);
			file_put_contents('likedList.json', $json_string);
			echo $count1;
		}
	}*/
	