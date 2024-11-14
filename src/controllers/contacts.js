import createHttpError from 'http-errors';
import {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = req.query;
  const { sortBy, sortOrder } = req.query;
  const filter = req.query;
  const userId = req.user._id;

  try {
    const {
      data: contacts,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    } = await getAllContacts({
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
      page,
      perPage,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    });
  } catch (err) {
    next(createHttpError(500, 'Failed to fetch contacts'));
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  try {
    const contact = await getContactById(contactId, userId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const addContactController = async (req, res, next) => {
  const userId = req.user._id;
  const contactData = { ...req.body, userId };

  try {
    const contact = await addContact(contactData);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (err) {
    next(createHttpError(500, 'Failed to create contact'));
  }
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  try {
    const contact = await updateContact(contactId, req.body, userId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact,
    });
  } catch (err) {
    next(createHttpError(500, 'Failed to update contact'));
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  try {
    const contact = await deleteContact(contactId, userId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(204).send();
  } catch (err) {
    next(createHttpError(500, 'Failed to delete contact'));
  }
};
