const {
    newComment,
    updateComment,
    deleteComment,
    
  } = require('../controller/commentController')
  
  const router = require('express').Router()
  
  //comments Routes
  router.post('/:postId/:userId/newcomment', newComment)//postId,userId
  router.post('/:postId/:userId/:commentId/updatecomment', updateComment)//postId,userId,commentId
  router.post('/:postId/:userId/:commentId/deletecomment', deleteComment)//postId,userId,commentId

  module.exports = router;