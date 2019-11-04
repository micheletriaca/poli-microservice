import http from 'k6/http'

export default function () {
  const payload = JSON.stringify({ email: 'aaa', password: 'bbb' })
  const params = { headers: { 'Content-Type': 'application/json' } }
  http.post('http://poli-microservice.herokuapp.com/api/amqp-task', payload, params)
}
