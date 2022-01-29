import Product from '../models/productModel.js';
import ECOrder from '../models/ecommerceOrderModel.js';

const getProducts = async (req, res) => {
  const pageSize = 30;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({});

  Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .then((products) => {
      res.json({ products, page, pages: Math.round(count / pageSize) });
    });
};

const getProductById = async (req, res) => {
  Product.findById(req.params.id).then((product) => {
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
};

const deleteProduct = async (req, res) => {
  Product.findById(req.params.id).then((product) => {
    if (product) {
      product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
};

const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = product.save();
  res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  Product.findById(req.params.id).then((product) => {
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
};

const createProductReview = async (req, res) => {
  const { name, rating, comment } = req.body;
  Product.findById(req.params.id).then((product) => {
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user.id.toString()
      );

      if (alreadyReviewed) {
        res.status(401).json({ message: 'Product already reviewed' });
      } else {
        const review = {
          name: name,
          rating: Number(rating),
          comment,
          user: req.user.id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        product.save();
        res.status(201).json({ message: 'Review added' });
      }
    }
  });
};

const getTopProducts = async (req, res) => {
  Product.find({})
    .sort({ rating: -1 })
    .limit(3)
    .then((products) => {
      res.json(products);
    });
};

const newOrder = async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new ECOrder({
      user,
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = order.save();

    res.status(201).json(createdOrder);
  }
};

const getOrderById = async (req, res) => {
  ECOrder.findById(req.params.id)
    .populate('user', 'name email')
    .then((order) => {
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    });
};

const updateOrderToPaid = async (req, res) => {
  ECOrder.findById(req.params.id).then((order) => {
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = order.save();

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
};

const updateOrderToDelivered = async (req, res) => {
  ECOrder.findById(req.params.id).then((order) => {
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = order.save();

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
};

const getMyOrders = (req, res) => {
  ECOrder.find({ user: req.user.id }).then((orders) => {
    res.json(orders);
  });
};

const getOrders = async (req, res) => {
  ECOrder.find({})
    .populate('user', 'id name')
    .then((orders) => {
      res.json(orders);
    });
};

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  newOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
