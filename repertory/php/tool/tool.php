<?php
	class Tool{
		static function returnJSON($result,$data){
			return json_encode(array('result'=>$result,'data'=>$data),JSON_UNESCAPED_UNICODE);
		}
	}
?>