-- Active: 1769730037726@@127.0.0.1@5432@gluten_free_market

/* CREATE DATABASE gluten_free_market;

--drop databse in case of need:

DROP DATABASE gluten_free_market; */

--connect to DB
/
--c gluten_free_market;

-- PK id shape <entity>_id
-- FK id shape id_<entity>

--!!! CAMBIOS----------------
-- TABLE ORDER -> ORDER_TOTAL
-- description -> product_description
-- TABLE ORDER_TOTAL, column date -> order_date

------------------------------

CREATE TABLE categories (
    category_id VARCHAR PRIMARY KEY,
    category_description VARCHAR NOT NULL
);

CREATE TABLE type_of_movements (
    type_mov_id VARCHAR PRIMARY KEY,
    type_mov_description VARCHAR NOT NULL
);

CREATE TABLE customer (
    customer_id VARCHAR PRIMARY KEY,
    customer_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(30),
    customer_password VARCHAR(255) NOT NULL UNIQUE,
    shipping_address VARCHAR(255) NOT NULL,
    billing_address VARCHAR(255) NOT NULL,
    img_url_customer VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE product (
    product_id VARCHAR PRIMARY KEY,
    title VARCHAR,
    product_description VARCHAR,
    price INT,
    image_url VARCHAR,
    stock INT,
    category VARCHAR REFERENCES categories (category_id),
    sku INT,
    is_active BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE cart (
    cart_id VARCHAR(255) PRIMARY KEY,
    id_customer VARCHAR NOT NULL REFERENCES customer (customer_id) ON DELETE CASCADE,
    is_active BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE cart_item (
    cart_item_id VARCHAR PRIMARY KEY,
    id_cart VARCHAR NOT NULL REFERENCES cart (cart_id) ON DELETE CASCADE,
    id_product VARCHAR REFERENCES product (product_id),
    quantity INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE review (
    review_id VARCHAR PRIMARY KEY,
    id_customer VARCHAR REFERENCES customer (customer_id) ON DELETE CASCADE,
    id_product VARCHAR REFERENCES product (product_id),
    about_product BOOLEAN,
    review_body VARCHAR,
    rating INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE order_total (
    order_total_id VARCHAR PRIMARY KEY,
    id_customer VARCHAR REFERENCES customer (customer_id) ON DELETE CASCADE,
    total INT NOT NULL,
    order_date VARCHAR,
    is_paid BOOLEAN,
    is_shipped BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE order_item (
    order_item_id VARCHAR PRIMARY KEY,
    id_product VARCHAR REFERENCES product (product_id),
    id_order_total VARCHAR REFERENCES order_total (order_total_id),
    unit_price INT,
    quantity INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE stock_mov (
    mov_id SERIAL PRIMARY KEY,
    id_order_item VARCHAR REFERENCES order_item (order_item_id),
    id_product VARCHAR REFERENCES product (product_id),
    id_type_mov VARCHAR REFERENCES type_of_movements (type_mov_id),
    quantity VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

--FAVORITOS
-- añadir created_at
--añadir updated_at
CREATE TABLE favoritos (
    favoritos_id VARCHAR PRIMARY KEY,
    id_customer VARCHAR REFERENCES customer (customer_id) ON DELETE CASCADE,
    id_product VARCHAR REFERENCES product (product_id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

---------------------------
--DATASETS:

-- customers
INSERT INTO
    customer (
        customer_id,
        customer_name,
        email,
        phone,
        customer_password,
        shipping_address,
        billing_address,
        img_url_customer,
        created_at,
        updated_at
    )
VALUES (
        'cust-001',
        'Alice',
        'alice@email.com',
        NULL,
        'hashed_pw_1',
        '123 Main St, Lisbon',
        '123 Main St, Lisbon',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'cust-002',
        'Bob',
        'bob@email.com',
        NULL,
        'hashed_pw_2',
        '456 Oak Ave, Porto',
        '456 Oak Ave, Porto',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'cust-003',
        'Carol',
        'carol@email.com',
        NULL,
        'hashed_pw_3',
        '789 Pine Rd, Faro',
        '789 Pine Rd, Faro',
        NULL,
        NOW(),
        NOW()
    );

-- categories
INSERT INTO
    categories (
        category_id,
        category_description
    )
VALUES ('cat-001', 'Electronics'),
    ('cat-002', 'Clothing'),
    ('cat-003', 'Books');

-- products
INSERT INTO
    product (
        product_id,
        title,
        product_description,
        price,
        image_url,
        stock,
        category,
        sku,
        is_active,
        created_at,
        updated_at
    )
VALUES (
        'prod-001',
        'Wireless Mouse',
        'Ergonomic wireless mouse',
        2999,
        'https://img.com/mouse.jpg',
        50,
        'cat-001',
        1001,
        true,
        NOW(),
        NOW()
    ),
    (
        'prod-002',
        'Mechanical Keyboard',
        'TKL mechanical keyboard',
        7999,
        'https://img.com/kb.jpg',
        30,
        'cat-001',
        1002,
        true,
        NOW(),
        NOW()
    ),
    (
        'prod-003',
        'Cotton T-Shirt',
        'Basic cotton t-shirt',
        1499,
        'https://img.com/tshirt.jpg',
        100,
        'cat-003',
        1003,
        true,
        NOW(),
        NOW()
    ),
    (
        'prod-004',
        'Clean Code Book',
        'By Robert C. Martin',
        3499,
        'https://img.com/book.jpg',
        20,
        'cat-002',
        1004,
        true,
        NOW(),
        NOW()
    );

-- carts
INSERT INTO
    cart (
        cart_id,
        id_customer,
        is_active,
        created_at,
        updated_at
    )
VALUES (
        'cart-001',
        'cust-001',
        true,
        NOW(),
        NOW()
    ),
    (
        'cart-002',
        'cust-002',
        true,
        NOW(),
        NOW()
    ),
    (
        'cart-003',
        'cust-003',
        false,
        NOW(),
        NOW()
    );

-- cart_items
INSERT INTO
    cart_item (
        cart_item_id,
        id_cart,
        id_product,
        quantity,
        created_at,
        updated_at
    )
VALUES (
        'cart-item-001',
        'cart-001',
        'prod-001',
        1,
        NOW(),
        NOW()
    ),
    (
        'cart-item-002',
        'cart-001',
        'prod-002',
        2,
        NOW(),
        NOW()
    ),
    (
        'cart-item-003',
        'cart-002',
        'prod-003',
        3,
        NOW(),
        NOW()
    ),
    (
        'cart-item-004',
        'cart-003',
        'prod-004',
        1,
        NOW(),
        NOW()
    );

-- order_total
INSERT INTO
    order_total (
        order_total_id,
        id_customer,
        total,
        order_date,
        is_paid,
        is_shipped,
        created_at,
        updated_at
    )
VALUES (
        'order-001',
        'cust-001',
        18997,
        '2024-01-15',
        true,
        true,
        NOW(),
        NOW()
    ),
    (
        'order-002',
        'cust-002',
        1499,
        '2024-01-20',
        true,
        false,
        NOW(),
        NOW()
    ),
    (
        'order-003',
        'cust-003',
        3499,
        '2024-01-22',
        false,
        false,
        NOW(),
        NOW()
    );

-- order_items
INSERT INTO
    order_item (
        order_item_id,
        id_product,
        id_order_total,
        unit_price,
        quantity,
        created_at,
        updated_at
    )
VALUES (
        'oi-001',
        'prod-001',
        'order-001',
        2999,
        1,
        NOW(),
        NOW()
    ),
    (
        'oi-002',
        'prod-002',
        'order-001',
        7999,
        2,
        NOW(),
        NOW()
    ),
    (
        'oi-003',
        'prod-003',
        'order-002',
        1499,
        1,
        NOW(),
        NOW()
    ),
    (
        'oi-004',
        'prod-004',
        'order-003',
        3499,
        1,
        NOW(),
        NOW()
    );

-- type_of_movments
INSERT INTO
    type_of_movements (
        type_mov_id,
        type_mov_description
    )
VALUES ('1', 'Entrada'),
    ('2', 'Salida');

-- stock_mov
INSERT INTO
    stock_mov (
        id_order_item,
        id_product,
        id_type_mov, -- Using your parameter table FK
        quantity,
        created_at,
        updated_at
    )
VALUES (
        'oi-001',
        'prod-001',
        '2',
        1,
        NOW(),
        NOW()
    ),
    (
        'oi-002',
        'prod-002',
        '2',
        2,
        NOW(),
        NOW()
    ),
    (
        'oi-003',
        'prod-003',
        '2',
        1,
        NOW(),
        NOW()
    ),
    (
        'oi-004',
        'prod-004',
        '2',
        1,
        NOW(),
        NOW()
    );

-- reviews
INSERT INTO
    review (
        review_id,
        id_customer,
        id_product,
        about_product,
        review_body,
        rating,
        created_at,
        updated_at
    )
VALUES (
        'rev-001',
        'cust-001',
        'prod-001',
        TRUE,
        'Works great, very smooth.',
        5,
        NOW(),
        NOW()
    ),
    (
        'rev-002',
        'cust-001',
        'prod-002',
        TRUE,
        'Loud but satisfying to type on.',
        4,
        NOW(),
        NOW()
    ),
    (
        'rev-003',
        'cust-002',
        'prod-003',
        FALSE,
        'Delivery took too long, not happy.',
        2,
        NOW(),
        NOW()
    ),
    (
        'rev-004',
        'cust-003',
        'prod-004',
        TRUE,
        'Must read for every developer.',
        5,
        NOW(),
        NOW()
    );

--favoritos
INSERT INTO
    favoritos (
        favoritos_id,
        id_customer,
        id_product
    )
VALUES (
        'fav-001',
        'cust-002',
        'prod-004'
    ),
    (
        'fav-002',
        'cust-001',
        'prod-003'
    ),
    (
        'fav-003',
        'cust-003',
        'prod-001'
    ),
    (
        'fav-004',
        'cust-002',
        'prod-002'
    ),
    (
        'fav-005',
        'cust-001',
        'prod-001'
    ),
    (
        'fav-006',
        'cust-003',
        'prod-004'
    ),
    (
        'fav-007',
        'cust-002',
        'prod-003'
    ),
    (
        'fav-008',
        'cust-001',
        'prod-002'
    ),
    (
        'fav-009',
        'cust-003',
        'prod-002'
    );
---------------------------

select * from customer;

select * from product;

select * from cart;

select * from cart_item;

select * from order_item;

select * from order_total;

select * from stock_mov;

select * from review;

select * from categories;

select * from favoritos;