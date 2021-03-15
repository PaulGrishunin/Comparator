-- MySQL Script generated by MySQL Workbench
-- Mon Feb 22 05:09:54 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema my_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my_db` DEFAULT CHARACTER SET utf8 ;
USE `my_db` ;

-- -----------------------------------------------------
-- Table `my_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_db`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `my_db`.`marka`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_db`.`marka` (
  `marka_id` INT NOT NULL AUTO_INCREMENT,
  `marka` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`marka_id`),
  UNIQUE INDEX `marka_id_UNIQUE` (`marka_id` ASC) VISIBLE,
  UNIQUE INDEX `marka_UNIQUE` (`marka` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `my_db`.`platform_parsed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_db`.`platform_parsed` (
  `ad_id` INT NOT NULL AUTO_INCREMENT,
  `platform_code` TINYINT(1) NULL COMMENT '0 - ad from sale platform\n1 - ad from buy platform',
  `markaId` INT NOT NULL,
  `model` VARCHAR(25) NOT NULL,
  `year` YEAR(4) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'EUR',
  `photo_link` VARCHAR(255) NULL,
  `date_add` DATE NOT NULL,
  `ad_link` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ad_id`),
  UNIQUE INDEX `buy_add_id_UNIQUE` (`ad_id` ASC) VISIBLE,
  INDEX `fk_platform_parsed_marka1_idx` (`markaId` ASC) VISIBLE,
  CONSTRAINT `fk_platform_parsed_marka1`
    FOREIGN KEY (`markaId`)
    REFERENCES `my_db`.`marka` (`marka_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `my_db`.`sale_avg_prices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_db`.`sale_avg_prices` (
  `avg_price_id` INT NOT NULL AUTO_INCREMENT COMMENT 'MUST CONTAIN ONLY ad\'s from sale platform (platform_code=0)',
  `markaId` INT NOT NULL,
  `model` VARCHAR(25) NOT NULL,
  `year` YEAR(4) NOT NULL,
  `avg_price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`avg_price_id`),
  UNIQUE INDEX `sale_ad_id_UNIQUE` (`avg_price_id` ASC) VISIBLE,
  UNIQUE INDEX `model_UNIQUE` (`model` ASC) VISIBLE,
  INDEX `fk_sale_avg_prices_marka1_idx` (`markaId` ASC) VISIBLE,
  CONSTRAINT `fk_sale_avg_prices_marka1`
    FOREIGN KEY (`markaId`)
    REFERENCES `my_db`.`marka` (`marka_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `my_db`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_db`.`favorites` (
  `favorites_id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `adId` INT NOT NULL,
  PRIMARY KEY (`favorites_id`),
  UNIQUE INDEX `favorites_id_UNIQUE` (`favorites_id` ASC) VISIBLE,
  INDEX `fk_favorites_platform_parsed1_idx` (`adId` ASC) VISIBLE,
  INDEX `fk_favorites_user1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_favorites_platform_parsed1`
    FOREIGN KEY (`adId`)
    REFERENCES `my_db`.`platform_parsed` (`ad_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorites_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `my_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    

INSERT INTO `users` VALUES (1,'Tom','tom@gmail.com','1234','2021-02-22 02:11:33'),(2,'Bob','bob@gmail.com','55555','2021-02-22 02:11:55');
INSERT INTO `marka` VALUES (1,'Acura'),(2,'Alfa Romeo'),(3,'Aston Martin'),(4,'Audi'),(5,'Bentley'),(6,'BMW');
INSERT INTO `platform_parsed` VALUES (1,0,4,'Q7',2019,50000.00,'EUR','https://photoQ7','2021-02-20','https://link-to-audiQ7'),
(2,0,3,'DB9',2010,99000.00,'EUR','https://photoAstonDB9','2021-02-19','https://link-to-astonDB9'),
(3,0,6,'X7',2018,60000.00,'EUR','https://photoBMWX7','2021-02-19','https://link-to-BMWX7'),
(4,0,5,'Continental GT',2018,75000.00,'EUR','https://photoBentley-Conti-GT','2021-02-21','https://link-to-Bentley-conti-GT'),
(5,0,4,'Q7',2019,60000.00,'EUR','https://photoQ7-1','2021-02-19','https://link-to-audiQ7-1'),
(6,0,4,'Q7',2019,58000.00,'EUR','https://photoQ7-2','2021-02-20','https://link-to-audiQ7-2'),
(7,1,4,'Q7',2019,45000.00,'EUR','https://photoQ7-3','2021-02-20','https://link-to-audiQ7-3'),
(8,1,4,'Q7',2019,49000.00,'EUR','https://photoQ7-4','2021-02-20','https://link-to-audiQ7-4'),
(9,0,4,'Q7',2019,250000.00,'PLN','https://photoQ7-5','2021-02-19','https://link-to-audiQ7-5'),
(10,0,4,'Q7',2019,280000.00,'PLN','https://photoQ7-6','2021-02-20','https://link-to-audiQ7-6'),
(11,1,5,'Continental GT',2019,99000.00,'EUR','https://photoBentley-Conti-GT-1','2021-02-18','https://photoBentley-Conti-GT-1'),
(12,1,5,'Continental GT',2019,91000.00,'EUR','https://photoBentley-Conti-GT-2','2021-02-16','https://photoBentley-Conti-GT-2'),
(13,0,5,'Continental GT',2019,150000.00,'EUR','https://photoBentley-Conti-GT-3','2021-02-18','https://photoBentley-Conti-GT-3'),
(14,1,6,'M5',2016,50000.00,'EUR','https://photoBMWM5-1','2021-02-17','https://link-to-BMWM5-1');
INSERT INTO `sale_avg_prices` VALUES (1,'4','Q7','2019','80000'), (2,'3','DB9','2010','140000'),(3,'6','X7','2018','100000'),(4,'5','Continental GT','2018','145000');
INSERT INTO `favorites` VALUES (1, 1, 3), (2, 1, 4), (3, 1, 5), (4, 2, 4), (5, 2, 7);

`my_db`
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
