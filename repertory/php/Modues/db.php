<?php
	include 'adapta.php';
	class DB{
		const mysql_server_name='localhost'; //改成自己的mysql数据库服务器
		const mysql_username='root'; //改成自己的mysql数据库用户名
		const mysql_password=''; //改成自己的mysql数据库密码
		const mysql_database='repertory'; //改成自己的mysql数据库名
		private $con;
		private function __construct(){
			header('Content-type:text/html;charset=utf-8');	
		} 
		public static function M(){
			$db =  new DB();
			$db->db_connect();
			return $db;	
		}
		private function db_connect(){
			$this->con = mysql_connect(self::mysql_server_name,self::mysql_username,self::mysql_password);
			if (!$this->con)
			{
				die('Could not connect: ' . mysql_error());
			}else{
				mysql_query("set names 'utf8'");
				mysql_select_db(self::mysql_database, $this->con);
			}
			// Create database
		}
		//执行sql语句
		public function query($sql){
			return mysql_query($sql,$this->con);
		}
		//返回资源结果集的行数
		public function rows($result){
			return mysql_num_rows($result);
		}
		//解析资源结果集
		public function my_fetch_array($result,$className){
			$arr = array();
			$i=0;	
			while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) { 
				$arr[$i] = Adapta::setAdapta($className,$row);
				$i++;
			}
			return $arr;
		}
	}
?>