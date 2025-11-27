import { Router } from "express";
import * as usersController from '../controllers/users.controller.js';
import passport from '../middlewares/passport.mid.js';

const router = Router();

router.post('/activity/ping',passport.authenticate("jwt",{session:false}), usersController.userPing);

router.get('/', usersController.readUsers);

router.get('/:userId/carsValue', usersController.readUserCarsValue);

router.get('/checkNick', usersController.checkUserNick);

router.put('/:id', usersController.updateUser);

router.put('/:id/settings/language', usersController.updateUserLanguage);

export default router