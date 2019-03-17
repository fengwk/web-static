import api from './api';

function loginByEmailAndPassword(email, password) {
  return api.post('/api/user/access/loginByEmailAndPassword', {
    data: {email, password, userTypeId: 1, timeout: 1000 * 60 * 60 * 24 * 7, mode: 1}
  });
}



export {
  loginByEmailAndPassword
}
