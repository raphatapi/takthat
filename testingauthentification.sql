CREATE TABLE `mydatabase`.`members` (
2
`id` int( 11 ) NOT NULL AUTO_INCREMENT ,
3
`username` varchar( 30 ) NOT NULL ,
4
`email` varchar( 50 ) NOT NULL ,
5
`password` varchar( 128 ) NOT NULL ,
6
PRIMARY KEY ( `id` ) ,
7
UNIQUE KEY `username` ( `username` )
8
) ENGINE = MYISAM DEFAULT CHARSET = utf8;
