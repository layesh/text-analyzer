const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const textSchema = mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
textSchema.plugin(toJSON);
textSchema.plugin(paginate);

/**
 * @typedef Text
 */
const Text = mongoose.model('Text', textSchema);

module.exports = Text;
