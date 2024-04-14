import * as Joi from 'joi'

const user_joi = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    middle_name: Joi.string().allow(null),
    email: Joi.string().allow(null),
    phone: Joi.string().required(),
    password: Joi.string().allow(null)
}).unknown(true);


export { user_joi }
