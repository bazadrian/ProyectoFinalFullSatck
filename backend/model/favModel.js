const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    movie: 
    { type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', 
        required: true 
    },
        tmdb_id: { 
            type: Number,
            required: true
        }
  });
  
  // Índice compuesto para garantizar que un usuario no pueda tener la misma película varias veces
  favoriteSchema.index({ user: 1, movie: 1 }, { unique: true });
  
  const Favorite = mongoose.model('Favorite', favoriteSchema);

  module.exports = Favorite;
  