CREATE TABLE restaurants (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
	price_range INT NOT NULL CHECK(price_range >=1 and price_range <=5)
);

INSERT INTO restaurants (name, location, price_range) values ('McDonalds', 'City Terrace', 1);
INSERT INTO restaurants (name, location, price_range) values (`Carl's Jr`, 'Monterey Park', 2);
INSERT INTO restaurants (name, location, price_range) values ('Habit Burger Grill', 'Alhambra', 3);
INSERT INTO restaurants (name, location, price_range) values ('So Cal Burgers', 'East LA', 5);

CREATE TABLE reviews (
	id BIGSERIAL NOT NULL  PRIMARY KEY,
	restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
	name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
	rating INT NOT NULL CHECK(rating >=1 and rating <=5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) values (1, 'John', 'The view is nice but quality is not good', 2);
INSERT INTO reviews (restaurant_id, name, review, rating) values (1, 'Mary', 'Really bad.  Will never go again!', 1);
INSERT INTO reviews (restaurant_id, name, review, rating) values (1, 'Steve', 'View is awesome.  Fast Service', 4);
INSERT INTO reviews (restaurant_id, name, review, rating) values (2, 'Sally', 'Convenient, but the service is meh', 3);
INSERT INTO reviews (restaurant_id, name, review, rating) values (2, 'Mike', "Love how it's open 24 hours", 3);
INSERT INTO reviews (restaurant_id, name, review, rating) values (2, 'Janet', 'Gets really busy during school season', 3);
INSERT INTO reviews (restaurant_id, name, review, rating) values (3, 'Joe', 'Really good quality food and service', 4);
INSERT INTO reviews (restaurant_id, name, review, rating) values (3, 'Mike', "Good price vs quality", 3);
INSERT INTO reviews (restaurant_id, name, review, rating) values (3, 'Janet', 'Best place ever!', 5);
INSERT INTO reviews (restaurant_id, name, review, rating) values (4, 'John', 'The best quality burger in LA', 5);
INSERT INTO reviews (restaurant_id, name, review, rating) values (4, 'Sally', "Really high end food, but too expensive", 3);
INSERT INTO reviews (restaurant_id, name, review, rating) values (4, 'Mary', 'I love how you can order online', 5);

