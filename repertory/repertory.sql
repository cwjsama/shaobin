-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 09 月 17 日 10:46
-- 服务器版本: 5.5.24-log
-- PHP 版本: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `repertory`
--

-- --------------------------------------------------------

--
-- 表的结构 `t_inproduct`
--

CREATE TABLE IF NOT EXISTS `t_inproduct` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增列',
  `inProduct_id` char(20) NOT NULL COMMENT '进货单号',
  `supplier` varchar(20) NOT NULL COMMENT '供货商',
  `administrator` varchar(11) NOT NULL COMMENT '经手人',
  `time` varchar(11) NOT NULL COMMENT '进货时间',
  `remark` varchar(50) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `t_inproduct`
--

INSERT INTO `t_inproduct` (`id`, `inProduct_id`, `supplier`, `administrator`, `time`, `remark`) VALUES
(1, 'IN201708162346281013', '阿旺', '小斌', '2017-09-06', ''),
(3, 'IN201708170157016567', '淘宝', '小斌', '2017-09-17', ''),
(4, 'IN201708170158174658', '淘宝', '小涛', '2017-09-17', '');

-- --------------------------------------------------------

--
-- 表的结构 `t_outproduct`
--

CREATE TABLE IF NOT EXISTS `t_outproduct` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增列',
  `outProduct_id` varchar(20) NOT NULL COMMENT '出货单',
  `purchase` varchar(20) NOT NULL COMMENT '买方',
  `administrator` varchar(11) NOT NULL COMMENT '经手人',
  `time` varchar(11) NOT NULL COMMENT '出货时间',
  `remark` varchar(50) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='出货表' AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `t_outproduct`
--

INSERT INTO `t_outproduct` (`id`, `outProduct_id`, `purchase`, `administrator`, `time`, `remark`) VALUES
(1, 'OUT20170816234806145', '淘宝', '小涛', '2017-09-13', ''),
(2, 'OUT20170816234825832', '天猫', '小红', '2017-09-06', ''),
(3, 'OUT20170817003004510', '京东', '小斌', '2017-09-17', ''),
(4, 'OUT20170817005326114', '1号店', '小斌', '2017-09-17', ''),
(5, 'OUT20170817005420482', '天猫', '小红', '2017-09-17', ''),
(6, 'OUT20170817005752693', '淘宝啊旺', '小涛', '2017-09-17', '');

-- --------------------------------------------------------

--
-- 表的结构 `t_user`
--

CREATE TABLE IF NOT EXISTS `t_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增列',
  `user_id` varchar(12) NOT NULL COMMENT '用户id',
  `password` char(32) NOT NULL COMMENT '密码',
  `name` varchar(10) NOT NULL COMMENT '真实名字',
  `identity` int(11) NOT NULL DEFAULT '0' COMMENT '管理权限(0:普通管理员;1:仓库管理员;2:超级管理员)',
  `disabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '启用/禁用',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='用户表' AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `t_user`
--

INSERT INTO `t_user` (`id`, `user_id`, `password`, `name`, `identity`, `disabled`) VALUES
(1, '00000001', '202cb962ac59075b964b07152d234b70', '小斌', 2, 0),
(2, '12345678', '202cb962ac59075b964b07152d234b70', '小涛', 1, 0),
(3, '00000012', '202cb962ac59075b964b07152d234b70', '小红', 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
