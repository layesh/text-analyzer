const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createText = {
  body: Joi.object().keys({
    value: Joi.string().required().min(1),
  }),
};

const getTexts = {
  query: Joi.object().keys({
    id: Joi.string(),
    value: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getText = {
  params: Joi.object().keys({
    textId: Joi.string().custom(objectId),
  }),
};

const updateText = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      value: Joi.string().min(1),
    })
    .min(1),
};

const deleteText = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createText,
  getTexts,
  getText,
  updateText,
  deleteText,
};
