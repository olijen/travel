

CREATE TABLE IF NOT EXISTS `cookie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;





CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `place` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `comment` text COLLATE utf8_unicode_ci,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;



INSERT INTO `event` (`id`, `user_id`, `place`, `start`, `end`, `comment`, `create_date`) VALUES
(1, 2, 'Italia', '2015-08-26 19:32:33', '2015-08-29 19:32:33', 'Unitary state', '2015-08-27 19:32:33'),
(3, 2, 'Mexico', '2015-08-27 19:32:33', '2015-08-31 19:32:33', 'I <3 TEQUILA', '2015-08-27 19:32:33'),
(4, 2, 'Ukraine', '2015-08-24 19:32:33', '2015-08-31 19:32:33', 'Oh... We want the European Union...', '2015-08-27 19:32:33'),
(5, 2, 'USA', '2015-08-27 19:32:33', '2015-08-31 19:32:33', 'O say, can you see, by the dawn', '2015-08-27 19:32:33'),
(6, 2, 'Russia', '2015-08-24 19:32:33', '2015-08-31 19:32:33', 'I would drink vodka with a bear on unicycle', '2015-08-27 19:32:33'),
(7, 1, 'Future', '2015-09-05 00:00:00', '2015-09-08 00:00:00', 'Comment', '2015-08-28 13:06:55');



CREATE TABLE IF NOT EXISTS `tbl_migration` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `user` 
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  
`fname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  
`lname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  
`username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  
`password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  
`pw_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  
`email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  
`role` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  
`is_deleted` int(11) DEFAULT NULL,
  
`create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) 
ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;



INSERT INTO `user` (`id`, `fname`, `lname`, `username`, `password`, `pw_reset_token`, `email`, `role`, `is_deleted`, `create_date`) 
VALUES
(1, 'Admin', 'Adminovich', 'admin', '319d40d1aa3914d2ac0e44f8bfeb2474', '', 'admin@admin.loc', 'admin', 0, '2015-08-27 19:32:33'),

(2, 'User', 'Userovich', 'user', '319d40d1aa3914d2ac0e44f8bfeb2474', '', 'user@user.loc', 'user', 0, '2015-08-27 19:32:33');

CREATE TABLE IF NOT EXISTS `yii_session` (
  `id` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `expire` int(11) DEFAULT NULL,
  `data` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;