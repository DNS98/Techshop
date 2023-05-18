import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    nume: { type: String, required: true },
    rating: { type: Number, required: true },
    comentariu: { type: String, required: true },
    titlu: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const produsSchema = new mongoose.Schema(
  {
    nume: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
    },
    descriere: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
    },
    pret: {
      type: Number,
      required: true,
      default: 0,
    },
    stoc: {
      type: Number,
      required: true,
      default: 0,
    },
    produsIsNew: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Produs = mongoose.model('Produs', produsSchema);

export default Produs;
