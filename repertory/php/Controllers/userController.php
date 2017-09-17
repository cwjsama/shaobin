<?php
	include '../Modues/user.php';
	class UserController{
		public $user;
		public function __construct(){
			$this->user = new User();		
		}
		public function isLogin($user_id,$password){
			return $this->user->isLogin($user_id,$password);
		}
		public function select($user_id){
			return $this->user->select($user_id);
		}
		public function delete($user_id){
			return $this->user->delete($user_id);
		}
		public function insert($arr){
			$obj = Adapta::setAdapta('User',$arr);
			return $this->user->insert($obj);
		}
		public function modify($arr){
			$obj = Adapta::setAdapta('User',$arr);
			return $this->user->modify($obj);
		}
		public function selectVague($search_Text){
			return $this->user->selectVague($search_Text);
		}
	}
?>