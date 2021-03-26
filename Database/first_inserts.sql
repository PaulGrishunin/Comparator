Use my_db;

INSERT INTO `ads_users` VALUES (1,'Tom','tom@gmail.com','1234','2021-02-22 02:11:33'),(2,'Bob','bob@gmail.com','55555','2021-02-22 02:11:55'); INSERT INTO `ads_brands` VALUES (1,'Acura'),(2,'Alfa Romeo'),(3,'Aston Martin'),(4,'Audi'),(5,'Bentley'),(6,'BMW');
INSERT INTO `ads_platform` VALUES (1,0,'Q7',2019,50000,'EUR','https://photoQ7','2021-02-20','https://link-to-audiQ7',4),
(2,0,'DB9',2010,99000,'EUR','https://photoAstonDB9','2021-02-19','https://link-to-astonDB9',3),
(3,0,'X7',2018,60000,'EUR','https://photoBMWX7','2021-02-19','https://link-to-BMWX7',6),
(4,0,'Continental GT',2018,75000,'EUR','https://photoBentley-Conti-GT','2021-02-21','https://link-to-Bentley-conti-GT',5),
(5,0,'Q7',2019,60000,'EUR','https://photoQ7-1','2021-02-19','https://link-to-audiQ7-1',4),
(6,0,'Q7',2019,58000,'EUR','https://photoQ7-2','2021-02-20','https://link-to-audiQ7-2',4),
(7,1,'Q7',2019,45000,'EUR','https://photoQ7-3','2021-02-20','https://link-to-audiQ7-3',4),
(8,1,'Q7',2019,49000,'EUR','https://photoQ7-4','2021-02-20','https://link-to-audiQ7-4',4),
(9,0,'Q7',2019,250000,'PLN','https://photoQ7-5','2021-02-19','https://link-to-audiQ7-5',4),
(10,0,'Q7',2019,280000,'PLN','https://photoQ7-6','2021-02-20','https://link-to-audiQ7-6',4),
(11,1,'Continental GT',2019,99000,'EUR','https://photoBentley-Conti-GT-1','2021-02-18','https://photoBentley-Conti-GT-1',5),
(12,1,'Continental GT',2019,91000,'EUR','https://photoBentley-Conti-GT-2','2021-02-16','https://photoBentley-Conti-GT-2',5),
(13,0,'Continental GT',2019,150000,'EUR','https://photoBentley-Conti-GT-3','2021-02-18','https://photoBentley-Conti-GT-3',5),
(14,1,'M5',2016,50000,'EUR','https://photoBMWM5-1','2021-02-17','https://link-to-BMWM5-1',6);
INSERT INTO `ads_sale_avg` VALUES (1,'Q7',2019,80000,4), (2,'DB9',2010,140000,3),(3,'X7',2018,100000,6),(4,'Continental GT',2018,145000,5);
INSERT INTO `ads_favorites` VALUES (1, 1, 3), (2, 1, 4), (3, 1, 5), (4, 2, 4), (5, 2, 7);    

SELECT * From ads_platform;


