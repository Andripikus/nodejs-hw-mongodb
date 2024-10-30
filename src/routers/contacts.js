import { Router } from 'express';
import * as contactControllers from "../controllers/contacts.js"
import ctrlWrapper from "../utils/ctrlWrapper.js"

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactControllers.getContactsControllers));

contactsRouter.get('/:contactId', ctrlWrapper(contactControllers.getContactByIdControllers));

export default contactsRouter;
