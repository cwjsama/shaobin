<?php
	header('Content-type:text/json;charset:utf-8');
	include '../Controllers/inproductController.php';
	include '../tool/tool.php';
	$result = false;
	$data = null;
	$arr = "";
	$inProduct_id="";
	$search_Text="";
	$type="";
	$inproductC = new InproductController();
	/**
	type的可能值
	1:添加
	2:查询
	3:修改
	4:删除
	****/
	$type = intval(@$_POST['type']);
	if(isset($type)){
		$inProduct_id = @$_POST['inProduct_id'];
		$arr = @$_POST['arr'];
		$search_Text = @$_POST['search_Text'];
		switch($type){
			case 1:
				$result = $inproductC->insert($arr);
				if(!$result)$data = "系统异常，请刷新试试！！！";
			break;
			case 2:
				$data = $inproductC->select($inProduct_id);
				if(!empty($data))$result=true;
			break;
			case 3:
				$result = $inproductC->modify($arr);
				if(!$result)$data = "进货订单ID号不存在，可能已经被删除！！！";
			break;
			case 4:
				$result = $inproductC->delete($inProduct_id);
			break;
			case 5:
				$data = $inproductC->selectVague($search_Text);
				if(!empty($data))$result=true;
			break;
		}	
	}
	echo Tool::returnJSON($result,$data);
?>