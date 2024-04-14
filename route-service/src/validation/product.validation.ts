import * as Joi from 'joi'

const product_joi = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    user_id: Joi.number().required()
}).unknown(true);


export { product_joi }