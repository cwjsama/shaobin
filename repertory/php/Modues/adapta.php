<?php
	class Adapta{
		static function setAdapta($className,$arr){
			$class = new ReflectionClass($className);
			$properties = $class->getProperties();
			$instance  = $class->newInstanceArgs();
			foreach($arr as $key=>$value ) { 
				$instance->__set($key,$value);  
			}  	
			return $instance;
		}
	}
?>