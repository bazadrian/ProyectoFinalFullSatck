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
      poster_path:{
        type: String,
        required: true
      }
    }, {
      timestamps: true
    });

module.exports = mongoose.model('Movie', movieSchema)