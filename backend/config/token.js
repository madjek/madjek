import jwt from 'jsonwebtoken';

const newToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export default newToken;
