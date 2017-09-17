<?php
	include '../Modues/outproduct.php';
	class OutproductController{
		public $outproduct;
		public function __construct(){
			$this->outproduct = new Outproduct();		
		}
		public function select($outProduct_id){
			return $this->outproduct->select($outProduct_id);
		}
		public function delete($outProduct_id){
			return $this->outproduct->delete($outProduct_id);
		}
		public function insert($arr){
			$obj = Adapta::setAdapta('Outproduct',$arr);
			return $this->outproduct->insert($obj);
		}
		public function modify($arr){
			$obj = Adapta::setAdapta('Outproduct',$arr);
			return $this->outproduct->modify($obj);
		}
		public function selectVague($search_Text){
			return $this->outproduct->selectVague($search_Text);
		}
	}
?>