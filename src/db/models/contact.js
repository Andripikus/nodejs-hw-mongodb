import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, // Було 'requaired', але повинно бути 'required'
      default: null,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true, // Було 'requaired', але повинно бути 'required'
      default: 'personal',
    },
  },
  {
    timestamps: true, // Було 'timestrams', але повинно бути 'timestamps'
    versionKey: false,
  },
);

export const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
