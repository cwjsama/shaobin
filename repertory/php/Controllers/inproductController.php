<?php
	include '../Modues/inproduct.php';
	class InproductController{
		public $inproduct;
		public function __construct(){
			$this->inproduct = new Inproduct();		
		}
		public function select($inProduct_id){
			return $this->inproduct->select($inProduct_id);
		}
		public function delete($inProduct_id){
			return $this->inproduct->delete($inProduct_id);
		}
		public function insert($arr){
			$obj = Adapta::setAdapta('Inproduct',$arr);
			return $this->inproduct->insert($obj);
		}
		public function modify($arr){
			$obj = Adapta::setAdapta('Inproduct',$arr);
			return $this->inproduct->modify($obj);
		}
		public function selectVague($search_Text){
			return $this->inproduct->selectVague($search_Text);
		}
	}
?>