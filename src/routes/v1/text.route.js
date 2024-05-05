const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const textValidation = require('../../validations/text.validation');
const textController = require('../../controllers/text.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTexts'), validate(textValidation.createText), textController.createText)
  .get(auth('getTexts'), validate(textValidation.getTexts), textController.getTexts);

router
  .route('/:textId')
  .get(auth('getTexts'), validate(textValidation.getText), textController.getText)
  .patch(auth('manageTexts'), validate(textValidation.updateText), textController.updateText)
  .delete(auth('manageTexts'), validate(textValidation.deleteText), textController.deleteText);

router
  .route('/numberOfWords/:textId')
  .get(auth('analyzeTexts'), validate(textValidation.getText), textController.getNumberOfWordsInText)

router
  .route('/numberOfChars/:textId')
  .get(auth('analyzeTexts'), validate(textValidation.getText), textController.getNumberOfCharsInText)

router
  .route('/numberOfSentences/:textId')
  .get(auth('analyzeTexts'), validate(textValidation.getText), textController.getNumberOfSentencesInText)

router
  .route('/numberOfParagraphs/:textId')
  .get(auth('analyzeTexts'), validate(textValidation.getText), textController.getNumberOfParagraphsInText)

router
  .route('/longestWordInParagraphs/:textId')
  .get(auth('analyzeTexts'), validate(textValidation.getText), textController.getLongestWordInParagraphs)

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
 *     parameters:
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         description: Text Value
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. value:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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

 /**
  * @swagger
  * /texts/numberOfWords/{id}:
  *   get:
  *     summary: Get number of words in a text
  *     description: Fetch a particular text by id. Then it counts total words in that text.
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
  *                $ref: '#/components/schemas/NumberOfWordsInText'
  *       "401":
  *         $ref: '#/components/responses/Unauthorized'
  *       "403":
  *         $ref: '#/components/responses/Forbidden'
  *       "404":
  *         $ref: '#/components/responses/NotFound'
  */

  /**
   * @swagger
   * /texts/numberOfChars/{id}:
   *   get:
   *     summary: Get number of characters in a text
   *     description: Fetch a particular text by id. Then it counts total non-whitespace characters in that text.
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
   *                $ref: '#/components/schemas/NumberOfCharsInText'
   *       "401":
   *         $ref: '#/components/responses/Unauthorized'
   *       "403":
   *         $ref: '#/components/responses/Forbidden'
   *       "404":
   *         $ref: '#/components/responses/NotFound'
   */

   /**
    * @swagger
    * /texts/numberOfSentences/{id}:
    *   get:
    *     summary: Get number of sentences in a text
    *     description: Fetch a particular text by id. Then it counts total number of sentences in that text.
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
    *                $ref: '#/components/schemas/NumberOfSentencesInText'
    *       "401":
    *         $ref: '#/components/responses/Unauthorized'
    *       "403":
    *         $ref: '#/components/responses/Forbidden'
    *       "404":
    *         $ref: '#/components/responses/NotFound'
    */

   /**
    * @swagger
    * /texts/numberOfParagraphs/{id}:
    *   get:
    *     summary: Get number of paragraphs in a text
    *     description: Fetch a particular text by id. Then it counts total number of paragraphs in that text.
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
    *                $ref: '#/components/schemas/NumberOfParagraphsInText'
    *       "401":
    *         $ref: '#/components/responses/Unauthorized'
    *       "403":
    *         $ref: '#/components/responses/Forbidden'
    *       "404":
    *         $ref: '#/components/responses/NotFound'
    */

    /**
     * @swagger
     * /texts/longestWordInParagraphs/{id}:
     *   get:
     *     summary: Get longest word in paragraphs
     *     description: Fetch a particular text by id. Then it returns longest word in the paragraphs.
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
     *                $ref: '#/components/schemas/LongestWordInParagraphs'
     *       "401":
     *         $ref: '#/components/responses/Unauthorized'
     *       "403":
     *         $ref: '#/components/responses/Forbidden'
     *       "404":
     *         $ref: '#/components/responses/NotFound'
     */
