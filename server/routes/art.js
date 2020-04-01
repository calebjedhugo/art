const appRoot = require('app-root-path').path
const router = require('express').Router()
const path = require('path')
const conn = require(path.join(appRoot, 'util', 'conn'))
const artValidation = require('../validation/art')

router.route('/').all((req, res, next) => {
  var query = req.method.toLowerCase() === 'get' ? req.query : req.body

  //VALIDATE
  const {error} = artValidation[req.method.toLowerCase()](query)
  if(error) {
    console.error(error.details[0].message, query)
    res.status(400).json(error.details[0].message);
    return
  }

  //escape single quotes in strings.
  for(let prop in req.body){
    if(/^(name|artist|description)$/.test(prop)){
      req.body[prop] = req.body[prop].replace(/'/g, "''")
    }
  }

  next()
}).get((req, res) => {
  const {id} = req.query
  conn.query(`SELECT * FROM art${id ? ` where id = ${id}` : ''}`, (err, data) => {
    if(err) return handleError(err, res)
    res.json(data.rows)
  })
}).post((req, res) => {
  const {name, artist, description, width, height, create_date} = req.body
  const query = `
  INSERT INTO art
    (name, artist, description, width, height, create_date)
    VALUES ('${name}', '${artist}', '${description}', ${width}, ${height}, '${create_date}')
    RETURNING *
  `
  conn.query(query, (err, data) => {
    if(err) return handleError(err, res)
    res.json(data.rows)
  })
}).patch((req, res) => {
  const {description, name, id} = req.body
  const query = `
    UPDATE art
    SET description = '${description}', name = '${name}' where id = ${id}
    RETURNING *
  `
  conn.query(query, (err, data) => {
    if(err) return handleError(err, res)
    res.status(data.rows.length ? 200 : 400).json(data.rows.length ? data.rows : 'Art was not found.')
  })
}).delete((req, res) => {
  const query = `DELETE FROM art where id = ${req.body.id}`
  conn.query(query, (err, data) => {
    if(err) return handleError(err, res)
    res.json(`${req.body.id} was deleted successfully.`)
  })
})

handleError = (err, res) => {
  res.status(500).json(err.message)
  console.error(err)
}

module.exports = router
