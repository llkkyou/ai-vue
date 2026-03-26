import service from '@/utils/request'

export const register = (data) => {
  return service.post('/user/add', data)
}

export const startSession = (data) => {
  return service.post('/psychological-chat/session/start', data)
}

export const sendSessionList = (params) => {
  return service.get('/psychological-chat/sessions', { params })
}