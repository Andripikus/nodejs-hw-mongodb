import Joi from 'joi';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name must have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must have at least {#limit} characters',
    'string.max': 'Phone number must have at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'IsFavourite should be a boolean value',
  }),
  contactType: Joi.string().valid('personal', 'home', 'work').required().messages({
    'any.only': 'Contact type must be one of [work, home, personal]',
    'any.required': 'Contact type is required',
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name must have at most {#limit} characters',
  }),

  phoneNumber: Joi.string().min(3).max(20).optional().messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must have at least {#limit} characters',
    'string.max': 'Phone number must have at most {#limit} characters',
  }),

  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
  }),

  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'IsFavourite should be a boolean value',
  }),

  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .optional()
    .messages({
      'any.only': 'Contact type must be one of [work, home, personal]',
    }),
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType');