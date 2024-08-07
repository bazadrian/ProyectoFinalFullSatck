const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({     
      tmdb_id: {
        type: Number,
        required: true,
        unique: true
      },
      title: {
        type: String,
        required: true,
      },
      overview: {
        type: String
      },
      poster_path: {
        type: String,
        required: true
      },
      likesCount: { 
        type: Number,
        default: 0 },
      likedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
      }]
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;