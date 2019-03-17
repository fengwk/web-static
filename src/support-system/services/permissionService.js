import {supportSystemApi} from './api';

function save(systemSave) {
  return supportSystemApi.post('/api/permission/save', {
    data: {permissionSave: JSON.stringify(systemSave)}
  });
}

function remove(permissionId) {
  return supportSystemApi.post('/api/permission/remove', {
    data: {permissionId}
  });
}

function update(systemUpdate) {
  return supportSystemApi.post('/api/permission/update', {
    data: {permissionUpdate: JSON.stringify(systemUpdate)}
  });
}

function page(pageQuery, systemQuery) {
  return supportSystemApi.post('/api/permission/page', {
    data: {pageQuery: JSON.stringify(pageQuery), permissionQuery: JSON.stringify(systemQuery)}
  });
}

export {
  save,
  remove,
  update,
  page,
}
