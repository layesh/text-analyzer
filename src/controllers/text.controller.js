const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { textService } = require('../services');

const createText = catchAsync(async (req, res) => {
  const text = await textService.createText(req.body);
  res.status(httpStatus.CREATED).send(text);
});

const getTexts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['value']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await textService.queryTexts(filter, options);
  res.send(result);
});

const getText = catchAsync(async (req, res) => {
  const text = await textService.getTextById(req.params.textId);
  if (!text) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Text not found');
  }
  res.send(text);
});

const updateText = catchAsync(async (req, res) => {
  const text = await textService.updateTextById(req.params.textId, req.body);
  res.send(text);
});

const deleteText = catchAsync(async (req, res) => {
  await textService.deleteTextById(req.params.textId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getNumberOfWordsInText = catchAsync(async (req, res) => {
  const text = await textService.getTextById(req.params.textId);
  if (!text) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Text not found');
  }
  var wordCount = (text.value.trim()).split(/\s+/).length;
  const numberOfWordsInText = {};
  numberOfWordsInText.value = text.value;
  numberOfWordsInText.id = text.id;
  numberOfWordsInText.numberOfWords = wordCount;
  res.send(numberOfWordsInText);
});

const getNumberOfCharsInText = catchAsync(async (req, res) => {
  const text = await textService.getTextById(req.params.textId);
  if (!text) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Text not found');
  }
  var charCount = (text.value.trim()).length;
  const numberOfCharsInText = {};
  numberOfCharsInText.value = text.value;
  numberOfCharsInText.id = text.id;
  numberOfCharsInText.numberOfChars = charCount;
  res.send(numberOfCharsInText);
});

module.exports = {
  createText,
  getTexts,
  getText,
  updateText,
  deleteText,
  getNumberOfWordsInText,
  getNumberOfCharsInText,
};
