<?php
	include 'db.php';
	class User{
		public $id;
		public $user_id;
		public $password;
		public $name;
		public $identity;
		public $disabled;
		private $db;
		const TABLE="t_user";
		public function __construct(){
			$this->db = DB::M();
			//mssql_query("select * from user");
		}
		//__set()方法用来设置私有属性 
		public function __set($name,$value){ 
			$this->$name = $value; 
		} 
		//__get()方法用来获取私有属性 
		public function __get($name){ 
			return $this->$name; 
		} 
		//登录验证
		public function isLogin($user_id,$password){
			return $this->select($user_id,$password);
		}
		//查询方法
		public function select($user_id='',$password=''){
			$sql = '';
			if($user_id==''){
				$sql = "select * from ".self::TABLE;
			}else if($password==''){
				$sql = "select * from ".self::TABLE." where user_id='".$user_id."'";
			}else{
				$sql = "select * from ".self::TABLE." where user_id='".$user_id."' and password='".$password."'";
			}
			$result = $this->db->query($sql);
			$arr = $this->db->my_fetch_array($result,'User');
			return $arr;
		}
		//删除方法
		public function delete($user_id){
			$sql = "delete from ".self::TABLE." where user_id='".$user_id."'";
			$result = $this->db->query($sql);
			return $result;
		}
		//插入方法
		public function insert($obj){
			$sql = "select * from ".self::TABLE." where user_id='".$obj->user_id."'";
			$result = $this->db->query($sql);
			$result = $this->db->rows($result);
			if(!$result){
				$sql = "insert into ".self::TABLE." value('','".$obj->user_id."','".$obj->password."','".$obj->name."','".$obj->identity."','".$obj->disabled."')";
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
			$sql = "update ".self::TABLE." set password='".$obj->password."',name='".$obj->name."',identity='".$obj->identity."',disabled='".$obj->disabled."' where user_id='".$obj->user_id."'";
			return $result = $this->db->query($sql);
		}
		//模糊查询
		public function selectVague($search_Text){
			$sql = "select * from ".self::TABLE." where user_id like '%".$search_Text."%' or name like '%".$search_Text."%' or identity like '%".$search_Text."%'";
			$result = $this->db->query($sql);
			$arr = $this->db->my_fetch_array($result,'User');
			return $arr;
		}
	}
?>