const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const textValidation = require('../../validations/text.validation');
const textController = require('../../controllers/text.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(textValidation.createText), textController.createText)
  .get(validate(textValidation.getTexts), textController.getTexts);

router
  .route('/:textId')
  .get(validate(textValidation.getText), textController.getText)
  .patch(auth('manageTexts'), validate(textValidation.updateText), textController.updateText)
  .delete(auth('manageTexts'), validate(textValidation.deleteText), textController.deleteText);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Texts
 *   description: Text management and retrieval
 */

/**
 * @swagger
 * /texts:
 *   post:
 *     summary: Create a text
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: string *
 *             example:
 *               value: The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.
 *     responses:
 *       "201":
 *         description: Text Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Text'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all texts
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Text'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /texts/{id}:
 *   get:
 *     summary: Get a text
 *     description: Fetch a particular text by id.
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Text id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Text'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a text
 *     description: Updates a particular text by id.
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         _id: id
 *         required: true
 *         schema:
 *           type: ObjectId
 *         description: Text id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string *
 *             example:
 *               value: This is the updated text sample.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Text'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a text
 *     description: Deletes a particular text by id.
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         _id: id
 *         required: true
 *         schema:
 *           type: ObjectId
 *         description: Text id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
