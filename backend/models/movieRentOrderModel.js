import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Movie',
    },
    title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MROrder = mongoose.model('MROrder', orderSchema);

export default MROrder;
