<?php
	include 'db.php';
	class Inproduct{
		public $id;
		public $inproduct_id;
		public $supplier;
		public $administrator;
		public $time;
		public $remark;
		private $db;
		const TABLE="t_inproduct";
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
		public function select($inProduct_id=''){
			$sql = '';
			if($inProduct_id==''){
				$sql = "select * from ".self::TABLE;
			}else{
				$sql = "select * from ".self::TABLE." where inProduct_id='".$inProduct_id."'";
			}
			$result = $this->db->query($sql);
			$arr = $this->db->my_fetch_array($result,'inProduct');
			return $arr;
		}
		//删除方法
		public function delete($inProduct_id){
			$sql = "delete from ".self::TABLE." where inProduct_id='".$inProduct_id."'";
			$result = $this->db->query($sql);
			return $result;
		}
		//插入方法
		public function insert($obj){
			$sql = "select * from ".self::TABLE." where inProduct_id='".$obj->inProduct_id."'";
			$result = $this->db->query($sql);
			$result = $this->db->rows($result);
			if(!$result){
				$sql = "insert into ".self::TABLE." value('','".$obj->inProduct_id."','".$obj->supplier."','".$obj->administrator."','".$obj->time."','".$obj->remark."')";
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
			$sql = "update ".self::TABLE." set supplier='".$obj->supplier."',administrator='".$obj->administrator."',time='".$obj->time."',remark='".$obj->remark."' where inProduct_id='".$obj->inProduct_id."'";
			return $result = $this->db->query($sql);
		}
		//模糊查询
		public function selectVague($search_Text){
			$sql = "select * from ".self::TABLE." where inProduct_id like '%".$search_Text."%' or supplier like '%".$search_Text."%' or administrator like '%".$search_Text."%' or time like '%".$search_Text."%'";
			$result = $this->db->query($sql);
			$arr = $this->db->my_fetch_array($result,'inProduct');
			return $arr;
		}
	}
?>