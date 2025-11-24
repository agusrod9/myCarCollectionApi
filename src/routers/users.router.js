import { Router } from "express";
import * as usersController from '../controllers/users.controller.js'

const router = Router();

router.get('/', usersController.readUsers);

router.get('/:userId/carsValue', usersController.readUserCarsValue);

router.get('/checkNick', usersController.checkUserNick);

router.put('/:id', usersController.updateUser);

export default router