const Joi = require('joi');
    
const inputvalidate = data =>{

    const schema = Joi.object().keys({
        title: Joi.string().alphanum().min(3).max(30).required(),
        isbn: Joi.string().required(),
        author: Joi.string().required(),
        description: Joi.string().required(),
        published_date: Joi.date().required(),
        publisher: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports = { inputvalidate }