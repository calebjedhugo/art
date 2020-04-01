const axios = require('axios')
require('dotenv').config()
let {test_url} = process.env
test_url += '/art'

const testObj = {
  artist: 'Caleb',
  name: 'Masterpeice',
  description: 'amazing',
  width: 1000,
  height: 1000,
  create_date: '2020-04-01'
}

describe("Art", () => {
  let currentObj
  beforeEach(async () => {
    currentObj = await createEntry()
  })

  it('should create an entry with an id', () => {
    currentObj.create_date = currentObj.create_date.slice(0, 10)
    expect(currentObj).toEqual({...testObj, id: currentObj.id})
  })

  it('should return the object when the id is requested', async () => {
    let res = await axios.get(`${test_url}?id=${currentObj.id}`)
    expect(res.data[0]).toEqual(currentObj)
  })

  it('should return the object when the id is requested', async () => {
    let res = await axios.patch(test_url, {
      id: currentObj.id,
      name: 'changedName',
      description: 'changedDescription'
    })
    currentObj.name = 'changedName'
    currentObj.description = 'changedDescription'
    expect(res.data[0]).toEqual(currentObj)
  })

  it('should delete entry', async () => {
    let res = await axios.delete(test_url, {data: {id: currentObj.id}})
    expect(res.data).toBe(`${currentObj.id} was deleted successfully.`)
  })
})

const createEntry = () => {
  return new Promise(async resolve => {
    let res = await axios.post(test_url, testObj)
    resolve(res.data[0])
  })
}
