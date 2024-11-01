import createHttpError from 'http-errors';
import {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getContactsControllers = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdControllers = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found!');
  }
  res.status(200).json({
    status: 200,
    message: `Succesfuly found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactControllers = async (req, res) => {
  const {
    name,
    phoneNumber,
    email,
    isFavourite = false,
    contactType,
  } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Name, phoneNumber and contactType are required',
    );
  }

  const contact = await addContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactControllers = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};