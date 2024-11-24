import createHttpError from 'http-errors';
import {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = { ...parseFilterParams(req.query), userId: req.user._id };

  try {
    const {
      data: contacts,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    } = await getAllContacts({
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

  try {
    const contact = await getContactById(contactId, req.user._id);
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
  const {
    name,
    phoneNumber,
    email,
    isFavourite = false,
    contactType,
  } = req.body;
  const userId = req.user._id;
  const photo = req.file;
  let photoUrl;

  try {
    if (photo) {
      photoUrl =
        env('ENABLE_CLOUDINARY') === 'true'
          ? await saveFileToCloudinary(photo)
          : await saveFileToUploadDir(photo);
    }

    const contactData = {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      userId,
      photo: photoUrl,
    };
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
  const photo = req.file;
  let photoUrl;

  try {
    if (photo) {
      photoUrl =
        env('ENABLE_CLOUDINARY') === 'true'
          ? await saveFileToCloudinary(photo)
          : await saveFileToUploadDir(photo);
    }

    const updatedData = { ...req.body, photo: photoUrl };

    const contact = await updateContact(contactId, updatedData, userId);
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
