import * as Joi from 'joi'

const user_id_joi = Joi.object({
    user_id: Joi.number().required()
}).unknown(true);

const product_id_joi = Joi.object({
    product_id: Joi.number().required()
}).unknown(true);

const base_filter_joi = Joi.object({
    query: Joi.string().allow(null),
    status: Joi.string().allow(null),
    from_date: Joi.string().allow(null),
    to_date: Joi.string().allow(null),
    limit: Joi.number().min(1),
    page: Joi.number().min(1)
}).unknown(true);

export {
    user_id_joi,
    base_filter_joi, 
    product_id_joi
}
