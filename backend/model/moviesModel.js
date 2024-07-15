const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      poster_path: {
        type: String,
        required: true
      },
      adult: {
        type: Boolean,
        required: true
      },
      overview: {
        type: String,
        required: true
      },
      release_date: {
        type: Date,
        required: true
      },
      genre_ids: [{
        type: Number
      }],
      id: {
        type: Number,
        required: true,
        unique: true
      },
      original_title: {
        type: String,
        required: true
      },
      original_language: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      backdrop_path: {
        type: String,
        required: true
      },
      popularity: {
        type: Number,
        required: true
      },
      vote_count: {
        type: Number,
        required: true
      },
      video: {
        type: Boolean,
        required: true
      },
      vote_average: {
        type: Number,
        required: true
      }
    }, {
      timestamps: true
    });

module.exports = mongoose.model('Movies', movieSchema)