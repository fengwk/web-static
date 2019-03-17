import {supportSystemApi} from './api';

function save(systemSave) {
  return supportSystemApi.post('/api/system/save', {
    data: {systemSave: JSON.stringify(systemSave)}
  });
}

function remove(systemId) {
  return supportSystemApi.post('/api/system/remove', {
    data: {systemId}
  });
}

function update(systemUpdate) {
  return supportSystemApi.post('/api/system/update', {
    data: {systemUpdate: JSON.stringify(systemUpdate)}
  });
}

function page(pageQuery, systemQuery) {
  return supportSystemApi.post('/api/system/page', {
    data: {pageQuery: JSON.stringify(pageQuery), systemQuery: JSON.stringify(systemQuery)}
  });
}

export {
  save,
  remove,
  update,
  page,
}
