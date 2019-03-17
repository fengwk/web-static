import {supportSystemApi} from './api';

function update(userUpdate) {
  return supportSystemApi.post('/api/user/update', {
    data: {userUpdate: JSON.stringify(userUpdate)}
  });
}

function page(pageQuery, userQuery) {
  return supportSystemApi.post('/api/user/page', {
    data: {pageQuery: JSON.stringify(pageQuery), userQuery: JSON.stringify(userQuery)}
  });
}

export {
  update,
  page,
}
