const mongoose = require('mongoose');

  const paperSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    keywords: {
      type: [String],
      required: true
    },
    areaOfResearch: {
      type: String,
      required: true
    },
    authors: {
      type: [String],
      required: true,
      validate: [authorsLimit, 'Authors limit can not exceed 3']
    },
    uploadedBy: {
      type: String,
      required: true
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College'
    },
    publicationDate: {
      type: Date,
      default: null
    },
    path: {
      type: String,
      required: true
    },
    statusCode: {
      type: Number,
      enum: [0,1,2],
      default: 0,
      required: true
    },
  },
  { timestamps: true }
);

function authorsLimit(value){
  return value.length <= 3;
}

module.exports = mongoose.model('Paper', paperSchema, 'papers');
