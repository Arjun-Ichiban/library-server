const Joi = require('joi');
    
const inputvalidate = data =>{

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().alphanum().min(3).max(30).required(),
        genre: Joi.string().required(),
    });

    return schema.validate(data);
}

const uservalidate = data =>{

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
    });

    return schema.validate(data);
}

const authvalidate = data =>{

    const schema = Joi.object().keys({
        password: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
    });

    return schema.validate(data);
}

module.exports = { inputvalidate, uservalidate, authvalidate }