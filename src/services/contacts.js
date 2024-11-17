import { SORT_ORDER } from '../constants/sortOrder.js';
import ContactCollection from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactCollection.find({ userId });
    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite) {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const [contactsCount, contacts] = await Promise.all([
      ContactCollection.find().merge(contactsQuery).countDocuments(),
      contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec(),
    ]);

    const paginationData = calculatePaginationData(
      contactsCount,
      perPage,
      page,
    );

    return {
      data: contacts,
      ...paginationData,
    };
  } catch (error) {
    throw createHttpError(500, 'Failed to fetch contacts');
  }
};

export const getContactById = async (contactId, userId) => {
  try {
    const contact = await ContactCollection.findOne({ _id: contactId, userId });
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    return contact;
  } catch (error) {
    throw createHttpError(500, 'Failed to retrieve contact');
  }
};

export const addContact = async (payload) => {
  try {
    const contact = await ContactCollection.create(payload);
    return contact;
  } catch (error) {
    throw createHttpError(500, 'Failed to add contact');
  }
};

export const updateContact = async (contactId, payload, userId) => {
  try {
    const contact = await ContactCollection.findOneAndUpdate(
      { _id: contactId, userId },
      payload,
      { new: true },
    );
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    return contact;
  } catch (error) {
    throw createHttpError(500, 'Failed to update contact');
  }
};

export const deleteContact = async (contactId, userId) => {
  try {
    const contact = await ContactCollection.findOneAndDelete({
      _id: contactId,
      userId,
    });
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    return contact;
  } catch (error) {
    throw createHttpError(500, 'Failed to delete contact');
  }
};
