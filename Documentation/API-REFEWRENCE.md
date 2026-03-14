// ============================================================
// AUTH
// ============================================================

POST /register
request: {
    payload: {
        name:     String,
        email:    String,
        password: String,
    }
}
response: {
    message: String,
    token:   String,
    user: {
        id:    String,
        name:  String,
        email: String,
    }
}

// ------------------------------------------------------------

POST /login
request: {
    payload: {
        email:    String,
        password: String,
    }
}
response: {
    message: String,
    token:   String,
    user: {
        id:    String,
        name:  String,
        email: String,
    }
}

// ------------------------------------------------------------

GET /profile
request: {
    headers: {
        Authorization: Bearer <token>,
    }
}
response: {
    id:    String,
    name:  String,
    email: String,
}


// ============================================================
// PRODUCTS
// ============================================================

GET /products
request: {}
response: {
    products: [
        {
            id:          String,
            title:       String,
            user_id:     String,
            description: String,
            price:       Number,
	    category:    String,	
            image_url:   String,
            stock:       Number,
            created_at:  Date,
        }
    ]
}

GET /user/products
request: {
    headers: { Authorization: Bearer <token> }
}
response: {
    products: [ 
	{ 
	    id:         String, 
	    title:      String, 
            price:      Number, 
            stock:      Number,
            image_url:  String,
            category:   String
        } 
    ]
}

// ------------------------------------------------------------

GET /products/:id
request: {
    params: {
        id: String,
    }
}
response: {
    id:          String,
    title:       String,
    description: String,
    price:       Number,
    category:    String,
    image_url:   String,
    stock:       Number,
    created_at:  Date,
}

// ------------------------------------------------------------

POST /products
request: {
    headers: {
        Authorization: Bearer <token>,
    },
    payload: {
        title:       String,
        description: String,
        price:       Number,
        category:    String,
        image_url:   String,
        stock:       Number,
    }
}
response: {
    message: String,
    product: {
        id:          String,
	user_id:     String,
        title:       String,
        description: String,
        price:       Number,
        image_url:   String,
        stock:       Number,
        created_at:  Date,
    }
}



// ------------------------------------------------------------

PUT /products/:id
request: {
    headers: {
        Authorization: Bearer <token>,
    },
    params: {
        id: String,
    },
    payload: {
        title:       String,
        description: String,
        price:       Number,
        category:    String,
        image_url:   String,
        stock:       Number,
    }
}
response: {
    message: String,
    product: {
        id:          String,
        title:       String,
        description: String,
        price:       Number,
        category:    String,
        image_url:   String,
        stock:       Number,
        created_at:  Date,
    }
}

// ------------------------------------------------------------

DELETE /products/:id
request: {
    headers: {
        Authorization: Bearer <token>,
    },
    params: {
        id: String,
    }
}
response: {
    message: String,
}


// ============================================================
// CART
// ============================================================

GET /cart
request: {
    headers: {
        Authorization: Bearer <token>,
    }
}
response: {
    items: [
        {
            productId:    String,
            productTitle: String,
            quantity:     Number,
        }
    ],
    subtotal: Number,
}

// ------------------------------------------------------------

POST /cart
request: {
    headers: {
        Authorization: Bearer <token>,
    },
    payload: {
        cart: [
            {
                productId: String,
                quantity:  Number,
            }
        ]
    }
}
response: {
    message: String,
    cart: [
        {
            userId:       String,
            productId:    String,
            productTitle: String,
            quantity:     Number,
        }
    ],
    subtotal: Number,
}

// ------------------------------------------------------------

PUT /cart/:id
request: {
    headers: {
        Authorization: Bearer <token>,
    },
    params: {
        id: String,
    },
    payload: {
        productId: String,
        quantity:  Number,
    }
}
response: {
    message: String,
    cart: {
        userId:       String,
        productId:    String,
        productTitle: String,
        quantity:     Number,
    }
}

// ------------------------------------------------------------

DELETE /cart/:id
request: {
    headers: {
        Authorization: Bearer <token>,
    },
    params: {
        id: String,
    }
}
response: {
    message: String,
}


// ============================================================
// ORDERS
// ============================================================

GET /orders
request: {
    headers: {
        Authorization: Bearer <token>,
    }
}
response: {
    orders: [
        {
            id:         String,
            total:      Number,
            status:     String,
            created_at: Date,
        }
    ]
}

// ------------------------------------------------------------

POST /orders
request: {
    headers: {
        Authorization: Bearer <token>,
    }
}
response: {
    message: String,
    order: {
        id:         String,
        userId:     String,
        total:      Number,
        status:     String,
        created_at: Date,
    }
}