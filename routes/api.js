import express from 'express'
import userRoutes from './users'
import passport from 'passport'

var router = express.Router({mergeParams: true});

router.use('/', passport.authenticate('jwt', { session: false }))
router.use('/users', userRoutes)

export default router