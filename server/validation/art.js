const Joi = require('@hapi/joi')

module.exports = {
  get: data => {
    const schema = Joi.object({
      id: Joi.number()
    })
    return schema.validate(data)
  },
  post: data => {
    const schema = Joi.object({
      artist: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      width: Joi.number().integer().min(0).required(),
      height: Joi.number().integer().min(0).required(),
      create_date: Joi.date().required(), //having date and time seperate will make filtering easier.
    })
    return schema.validate(data)
  },
  patch: data => {
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
    })
    return schema.validate(data)
  },
  delete: data => {
    const schema = Joi.object({
      id: Joi.number().required(),
    })
    return schema.validate(data)
  }
}
