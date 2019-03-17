import {save, remove, update, page} from '../services/systemService';
import Toast from '../../components/Toast';

export default {

  namespace: 'system',

  state: {

    saveRecords: {},

    editRecords: {},// id为key,编辑项为value

    search: '',
    pageNumber: 1,
    pageSize: 6,
    total: 0,
    records: []

  },

  reducers: {

    setSaveRecords(state, {saveRecords}) {
      return {...state, saveRecords};
    },

    setEditRecord(state, {editRecord}) {
      return {...state, editRecord};
    },

    setEditRecords(state, {editRecords}) {
      return {...state, editRecords};
    },

    setSearch(state, {search}) {
      return {...state, search};
    },

    setPageNumber(state, {pageNumber}) {
      return {...state, pageNumber};
    },

    setTotal(state, {total}) {
      return {...state, total};
    },

    setRecords(state, {records}) {
      return {...state, records};
    }

  },

  effects: {

    *save({recordKey}, {select, put}) {
      let {saveRecords, records, pageSize, total} = yield select(state => state.system);
      let saveRecord = saveRecords[recordKey];
      if (!saveRecord.name) {
        Toast.show('系统名称不能为空');
        return;
      }
      let res = yield save({name: saveRecord.name});
      if (res && res.code === '0' && res.data) {
        if (records.length < pageSize) {// 若未达到页面尺寸则在尾部添加
          let newRecords = records.slice(0);
          newRecords.push(res.data);
          yield put({
            type: 'setRecords',
            records: newRecords
          });
        } else {// 已达到页面尺寸则更新分页器
          yield put({
            type: 'setTotal',
            total: total + 1
          });
        }
        let newSaveRecords = {...saveRecords};
        delete newSaveRecords[recordKey];
        yield put({
          type: 'setSaveRecords',
          saveRecords: newSaveRecords
        });
      } else {
        Toast.show(res.message);
      }
    },

    *remove({recordId}, {select, put}) {
      let {pageNumber, pageSize, total, records} = yield select(state => state.system);
      let res = yield remove(recordId);
      if (res && res.code === '0') {
        Toast.show(res.message);
        if (records.length === 1 && pageNumber > 1) {
          // 当前页已经美元元素且还有前页时刷新到前一页
          yield put({
            type: 'setPageNumber',
            pageNumber: pageNumber - 1
          });
          yield put({
            type: 'page'
          });
        } else if (records.length === pageSize) {
          yield put({
            type: 'page'
          });
        } else {
          let newRecords = [];
          for (let item of records) {
            if (item.id !== recordId) {
              newRecords.push(item);
            }
          }
          yield put({
            type: 'setRecords',
            records: newRecords
          });
          yield put({
            type: 'setTotal',
            total: total - 1
          });
        }
      } else {
        Toast.show(res.message);
      }
    },

    *update({recordId}, {select, put}) {
      let {records, editRecords} = yield select(state => state.system);
      let editRecord = editRecords[recordId];
      let res = yield update({id: editRecord.id, name: editRecord.name});
      if (res && res.code === '0' && res.data) {
        let newRecord = res.data;
        let newRecords = [];
        for (let item of records) {
          if (item.id === newRecord.id) {
            newRecords.push(newRecord);
          } else {
            newRecords.push(item);
          }
        }
        yield put({
          type: 'setRecords',
          records: newRecords
        });
        let newEditRecords = {...editRecords};
        delete newEditRecords[newRecord.id];
        yield put({
          type: 'setEditRecords',
          editRecords: newEditRecords
        });
      } else {
        Toast.show(res.message);
      }
    },

    *page(action, {select, put}) {
      let {search, pageNumber, pageSize} = yield select(state => state.system);
      let res = yield page({pageNumber, pageSize}, {partOfName: search ? search : undefined});
      if (res && res.code === '0' && res.data) {
        yield put({
          type: 'setRecords',
          records: res.data.results || []
        });
        yield put({
          type: 'setTotal',
          total: res.data.total
        });
      } else {
        Toast.show(res.message);
      }
    }

  },

  subscriptions: {

  }

}
