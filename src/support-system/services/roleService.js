import {supportSystemApi} from './api';

function save(systemSave) {
  return supportSystemApi.post('/api/role/save', {
    data: {roleSave: JSON.stringify(systemSave)}
  });
}

function remove(roleId) {
  return supportSystemApi.post('/api/role/remove', {
    data: {roleId}
  });
}

function update(systemUpdate) {
  return supportSystemApi.post('/api/role/update', {
    data: {roleUpdate: JSON.stringify(systemUpdate)}
  });
}

function page(pageQuery, systemQuery) {
  return supportSystemApi.post('/api/role/page', {
    data: {pageQuery: JSON.stringify(pageQuery), roleQuery: JSON.stringify(systemQuery)}
  });
}

export {
  save,
  remove,
  update,
  page,
}
