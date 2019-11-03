import http from 'k6/http'

export default function () {
  http.get('https://poli-microservice.herokuapp.com/api/long-task')
}
