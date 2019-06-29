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
