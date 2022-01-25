import mongoose from 'mongoose';

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genres: {
      type: Array,
      required: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    original_language: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
