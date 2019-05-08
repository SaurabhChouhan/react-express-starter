import express from 'express'

var router = express.Router({mergeParams:true});

router.get('/profile', (request, response, next)=> {
  response.json(request.user)
})

var userRouter = express.Router({mergeParams:true})
userRouter.use('/users', router)
export default userRouter