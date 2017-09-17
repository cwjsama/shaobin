<?php
	include 'db.php';
	class Outproduct{
		public $id;
		public $outProduct_id;
		public $purchase;
		public $administrator;
		public $time;
		public $remark;
		private $db;
		const TABLE="t_outproduct";
		public function __construct(){
			$this->db = DB::M();
		}
		//__set()方法用来设置私有属性 
		public function __set($name,$value){ 
			$this->$name = $value; 
		} 
		//__get()方法用来获取私有属性 
		public function __get($name){ 
			return $this->$name; 
		} 
		//查询方法
		public function select($outProduct_id=''){
			$sql = '';
			if($outProduct_id==''){
				$sql = "select * from ".self::TABLE;
			}else{
				$sql = "select * from ".self::TABLE." where outProduct_id='".$outProduct_id."'";
			}
			$result = $this->db->query($sql);
			$arr = $this->db->my_fetch_array($result,'Outproduct');
			return $arr;
		}
		//删除方法
		public function delete($outProduct_id){
			$sql = "delete from ".self::TABLE." where outProduct_id='".$outProduct_id."'";
			$result = $this->db->query($sql);
			return $result;
		}
		//插入方法
		public function insert($obj){
			$sql = "select * from ".self::TABLE." where outProduct_id='".$obj->outProduct_id."'";
			$result = $this->db->query($sql);
			$result = $this->db->rows($result);
			if(!$result){
				$sql = "insert into ".self::TABLE." value('','".$obj->outProduct_id."','".$obj->purchase."','".$obj->administrator."','".$obj->time."','".$obj->remark."')";
				$result = $this->db->query($sql);
				if($result>0){
					$result = true;
				}else{
					$result = false;
				}
			}else{
				$result = false;
			}
			return $result;
		}
		//修改方法
		public function modify($obj){
			$sql = "update ".self::TABLE." set purchase='".$obj->purchase."',administrator='".$obj->administrator."',time='".$obj->time."',remark='".$obj->remark."' where outProduct_id='".$obj->outProduct_id."'";
			return $result = $this->db->query($sql);
		}
		//模糊查询
		public function selectVague($search_Text){
			$sql = "select * from ".self::TABLE." where outProduct_id like '%".$search_Text."%' or purchase like '%".$search_Text."%' or administrator like '%".$search_Text."%' or time like '%".$search_Text."%'";
			$result = $this->db->query($sql);
			$arr = $this->db->my_fetch_array($result,'Outproduct');
			return $arr;
		}
	}
?>