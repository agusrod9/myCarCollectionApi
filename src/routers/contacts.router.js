import { Router } from "express";
import * as contactsController from '../controllers/contacts.controller.js'

const router = Router();

router.post("/", contactsController.createContact);

router.get("/", ()=>{})

export default router;