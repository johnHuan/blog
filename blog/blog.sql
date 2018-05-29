/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50713
Source Host           : 127.0.0.1:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2017-04-04 16:23:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog_blog
-- ----------------------------
DROP TABLE IF EXISTS `blog_blog`;
CREATE TABLE `blog_blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_blog
-- ----------------------------
INSERT INTO `blog_blog` VALUES ('1', 'osk', '解锁大键盘的三个字母', '2017-04-04 10:25:08');
INSERT INTO `blog_blog` VALUES ('2', '啦啦啦啦', '大家好，我就会啦啦啦', '2017-04-04 10:25:46');
INSERT INTO `blog_blog` VALUES ('3', '开心', '超级开心，流氓会武术，谁也挡不住', '2017-04-04 10:26:16');
INSERT INTO `blog_blog` VALUES ('4', 'osk', 'osk\n', '2017-04-04 10:26:27');

-- ----------------------------
-- Table structure for blog_skin
-- ----------------------------
DROP TABLE IF EXISTS `blog_skin`;
CREATE TABLE `blog_skin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `small_bg` varchar(50) DEFAULT NULL,
  `big_bg` varchar(50) DEFAULT NULL,
  `bg_color` varchar(50) DEFAULT NULL,
  `bg_text` varchar(255) DEFAULT NULL,
  `bg_flag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_skin
-- ----------------------------
INSERT INTO `blog_skin` VALUES ('1', 'small_bg1.png', 'bg1.jpg', '#E7E9E8', '皮肤1', '1');
INSERT INTO `blog_skin` VALUES ('2', 'small_bg2.png', 'bg2.jpg', '#ECF0FC', '皮肤2', '0');
INSERT INTO `blog_skin` VALUES ('3', 'small_bg3.png', 'bg3.jpg', '#E2E2E2', '皮肤3', '0');
INSERT INTO `blog_skin` VALUES ('4', 'small_bg4.png', 'bg4.jpg', '#FFFFFF', '皮肤4', '0');
INSERT INTO `blog_skin` VALUES ('5', 'small_bg5.png', 'bg5.jpg', '#F3F3F3', '皮肤5', '0');
INSERT INTO `blog_skin` VALUES ('6', 'small_bg6.png', 'bg6.jpg', '#EBDEBE', '皮肤6', '0');

-- ----------------------------
-- Table structure for blog_user
-- ----------------------------
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `ques` varchar(255) DEFAULT NULL,
  `ans` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `birthday` varchar(50) DEFAULT NULL,
  `ps` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_user
-- ----------------------------
INSERT INTO `blog_user` VALUES ('1', 'zhanghuan', '53d23ec3f15b2219c864994c0bfa92c172f589bf', '1', '素菜', 'yz30.com@aliyun.com', '1993-6-6', '大家好，我是张桓');
SET FOREIGN_KEY_CHECKS=1;
