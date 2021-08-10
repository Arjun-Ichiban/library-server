const Joi = require('joi');
    
const inputvalidate = data =>{

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().alphanum().min(3).max(30).required(),
        genre: Joi.string().required(),
    });

    return schema.validate(data);
}

module.exports = { inputvalidate }