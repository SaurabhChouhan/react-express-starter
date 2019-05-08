import express from 'express'

var router = express.Router({mergeParams:true});

router.get('/profile', (request, response, next)=> {
  response.json(request.user)
})

export default router