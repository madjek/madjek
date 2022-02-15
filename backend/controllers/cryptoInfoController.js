import axios from 'axios';
import CoinPortfolio from '../models/coinPortfolio.js';

const getMyCoins = async (req, res) => {
  CoinPortfolio.find({ user: req.user.id }).then((coins) => {
    coins.map(async (coin) => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd`
      );
      coin.currentPrice = data[Object.keys(data)[0]]?.usd;
    });

    setTimeout(() => {
      res.json(coins);
    }, 100);
  });
};

const addCoinPortfolio = async (req, res) => {
  const { user, id, rank, symbol, price, currentPrice, qty, volume } = req.body;
  if (!id) {
    res.status(400).json({ message: 'No any coin' });
  } else {
    const coin = new CoinPortfolio({
      user,
      id,
      rank,
      symbol,
      price,
      currentPrice,
      qty,
      volume,
    });

    const addedCoin = coin.save();
    res.status(201).json(addedCoin);
  }
};

const deleteCoinPortfolio = async (req, res) => {
  CoinPortfolio.findById(req.params.id).then((product) => {
    if (product) {
      product.remove();
      res.json({ message: 'Coin removed' });
    } else {
      res.status(404).json({ message: 'Coin not found' });
    }
  });
};

export { getMyCoins, addCoinPortfolio, deleteCoinPortfolio };
