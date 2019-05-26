import axios, { AxiosError } from '../../src/index'

axios({
  method: 'post',
  url: '/error/404',
  data: {
    a: 1,
    b: 2
  }
}).catch(err => {
  console.log(err)
})

axios({
  method: 'post',
  url: '/err/post500',
  data: '2123'
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 3000
})
  .then(res => {
    console.log(res)
  })
  .catch((err: AxiosError) => {
    console.log(err.code)
    console.log(err.config)
    console.log(err.message)
    console.log(err.name)
    console.log(err.request)
    console.log(err.response)
    console.log(err.stack)
  })
// network error
// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/network'
//   })
//     .then(res => {
//       console.log(res)
//     })
//     .catch((err: AxiosError) => {
//       console.log(err.code)
//       console.log(err.config)
//       console.log(err.message)
//       console.log(err.name)
//       console.log(err.request)
//       console.log(err.response)
//       console.log(err.stack)
//     })
// }, 5000)
