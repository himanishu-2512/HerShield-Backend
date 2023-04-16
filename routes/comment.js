const {
    newComment,
    updateComment,
    deleteComment,
    
  } = require('../controller/commentController')
  
  const router = require('express').Router()
  
  //comments Routes
  router.post('/:postId/:userId/newcomment', newComment)
  router.post('/:postId/:userId/:commentId/updatecomment', updateComment)
  router.post('/:postId/:userId/:commentId/deletecomment', deleteComment)

  module.exports = router;