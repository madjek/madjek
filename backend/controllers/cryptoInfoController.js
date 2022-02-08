import CoinPortfolio from '../models/coinPortfolio.js';

const getMyCoins = (req, res) => {
  CoinPortfolio.find({ user: req.user.id }).then((coins) => {
    res.json(coins);
  });
};

const addCoinPortfolio = (req, res) => {
  const { user, id, price, qty, volume } = req.body;
  if (!id) {
    res.status(400).json({ message: 'No any coin' });
  } else {
    const coin = new CoinPortfolio({
      user,
      id,
      price,
      qty,
      volume,
    });

    const addedCoin = coin.save();
    res.status(201).json(addedCoin);
  }
};

export { getMyCoins, addCoinPortfolio };
