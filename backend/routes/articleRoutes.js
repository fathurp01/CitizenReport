const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const upload = require('../middleware/upload');

router.get('/', articleController.getAllArticles);
router.post('/', upload.single('image'), articleController.createArticle);
router.put('/:id', upload.single('image'), articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
router.put('/:id/status', articleController.approveArticle);


module.exports = router;
