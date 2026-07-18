CREATE TABLE "users" (
  "user_id" integer PRIMARY KEY,
  "username" varchar,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "phonenumber" varchar NOT NULL,
  "age" integer NOT NULL,
  "gender" varchar
  "created_at" timestamp
);

CREATE TABLE "role" (
  "role_id" integer PRIMARY KEY,
  "role_name" varchar
);

CREATE TABLE "permission" (
  "permission_id" integer PRIMARY KEY,
  "permission_name" varchar
);

CREATE TABLE "role_permission" (
  "role_id" integer,
  "permission_id" integer,
  FOREIGN KEY ("permission_id") REFERENCES "permission" ("permission_id"),
  FOREIGN KEY ("role_id") REFERENCES "role" ("role_id")
);

CREATE TABLE "services" (
  "services_id" integer PRIMARY KEY,
  "services_name" varchar,
  "user_id" integer,
  "created_at" timestamp,
  "price" decimal,
  "image_url" varchar,
  "video_url" varchar,
  FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
);

CREATE TABLE "booking" (
  "book_id" integer PRIMARY KEY,
  "user_id" integer,
  "user_name" varchar,
  "service_id" integer,
  "time" timestamp NOT NULL,
  FOREIGN KEY ("service_id") REFERENCES "services" ("services_id"),
  FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
);

CREATE TABLE "comments" (
  "comment_id" integer PRIMARY KEY,
  "article_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  FOREIGN KEY ("user_id") REFERENCES "users" ("user_id"),
  FOREIGN KEY ("article_id") REFERENCES "article" ("article_id")
);

CREATE TABLE "orders" (
  "order_id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "total_price" decimal,
  "status" varchar DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now()),
  FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
);

CREATE TABLE "article" (
  "article_id" integer PRIMARY KEY,
  "services_id" integer,
  "comments" varchar,
  "user_id" integer,
  "title" varchar,
  "content" varchar,
  FOREIGN KEY ("services_id") REFERENCES "services" ("services_id"),
  FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
);

CREATE TABLE "skin_product" (
  "product_id" integer,
  "product_name" varchar,
  "order_id" integer,
  "user_id" integer,
  "deliver_at" timestamp,
  "image_url" varchar,
  "price" decimal,
  FOREIGN KEY ("user_id") REFERENCES "users" ("user_id"),
    FOREIGN KEY ("order_id") REFERENCES "orders" ("order_id")
  
);


CREATE TABLE "payment" (
  "payment_id" integer,
  "product_id" integer,
  "product_name" varchar,
  "order_id" integer,
  "user_id" integer,
  "user_phoneNumber"  VARCHAR,
  "price" decimal,
 FOREIGN KEY ("user_id") REFERENCES "users" ("user_id"),
FOREIGN KEY ("order_id") REFERENCES "orders" ("order_id")
  )
