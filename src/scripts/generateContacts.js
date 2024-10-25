import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

const generateContacts = async (number) => {
  const constants = await readContacts();
  const newContact = Array(number).fill(0).map(createFakeContact);
  const result = [...constants, ...newContact];
  await writeContacts(result);
};

generateContacts(5);
