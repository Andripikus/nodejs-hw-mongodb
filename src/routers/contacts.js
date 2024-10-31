import { Router } from 'express';
import * as contactControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactControllers.getContactsControllers));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactControllers.getContactByIdControllers),
);

contactsRouter.post('/', ctrlWrapper(contactControllers.addContactControllers));

contactsRouter.patch(
  '/:contactId',
  ctrlWrapper(contactControllers.patchContactControllers),
);
contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactsRouter;
