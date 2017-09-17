<?php
	header('Content-type:text/json;charset:utf-8');
	include '../Controllers/userController.php';
	include '../tool/tool.php';
	$result = false;
	$data = null;
	$arr = "";
	$user_id="";
	$password="";
	$search_Text="";
	$type="";
	$userC = new UserController();
	/**
	type的可能值
	0:登录
	1:添加
	2:查询
	3:修改
	****/
	$type = intval(@$_POST['type']);
	if(isset($type)){
		$user_id = @$_POST['user_id'];
		$password = @$_POST['password'];
		$arr = @$_POST['arr'];
		$search_Text = @$_POST['search_Text'];
		if($type==0 || $type==1){
			if(isset($user_id)){
			if(strlen($user_id)<6 || strlen($user_id)>12){
				$data = '请输入有效的用户名(6~12位字符)';
				echo Tool::returnJSON($result,$data);
				return;
				}
			}
		}
		switch($type){
			case 0:
				$data = $userC->isLogin($user_id,$password);
				if(!empty($data))$result=true;
			break;
			case 1:
				$result = $userC->insert($arr);
				if(!$result)$data = "用户已存在";
			break;
			case 2:
				$data = $userC->select($user_id);
				if(!empty($data))$result=true;
			break;
			case 3:
				$result = $userC->modify($arr);
				if(!$result)$data = "用户不存在，可能已经被删除！！！";
			break;
			case 4:
				$result = $userC->delete($user_id);
			break;
			case 5:
				$data = $userC->selectVague($search_Text);
				if(!empty($data))$result=true;
			break;
		}	
	}
	echo Tool::returnJSON($result,$data);
?>