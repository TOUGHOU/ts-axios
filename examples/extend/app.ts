import axios from '../../src/index'

axios.get('/extend/get')

axios('/extend/hello', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios({
  url: '/extend/world',
  method: 'post',
  data: {
    msg: 'world'
  }
})

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}
test()
// axios({
//   method: 'post',
//   url: '/err/post500',
//   data: '2123'
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })
