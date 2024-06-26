const httpStatus = require('http-status');
const { Text } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a text
 * @param {Object} textBody
 * @returns {Promise<Text>}
 */
const createText = async (textBody) => {
  return Text.create(textBody);
};

/**
 * Query for texts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTexts = async (filter, options) => {
  const texts = await Text.paginate(filter, options);
  return texts;
};

/**
 * Get text by id
 * @param {ObjectId} id
 * @returns {Promise<Text>}
 */
const getTextById = async (id) => {
  return Text.findById(id);
};

/**
 * Update text by id
 * @param {ObjectId} textId
 * @param {Object} updateBody
 * @returns {Promise<Text>}
 */
const updateTextById = async (textId, updateBody) => {
  const text = await getTextById(textId);
  if (!text) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Text not found');
  }
  Object.assign(text, updateBody);
  await text.save();
  return text;
};

/**
 * Delete text by id
 * @param {ObjectId} textId
 * @returns {Promise<Text>}
 */
const deleteTextById = async (textId) => {
  const text = await getTextById(textId);
  if (!text) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Text not found');
  }
  await text.remove();
  return text;
};

module.exports = {
  createText,
  queryTexts,
  getTextById,
  updateTextById,
  deleteTextById,
};
