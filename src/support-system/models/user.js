import {update, page} from '../services/userService';
import Toast from '../../components/Toast';

export default {

  namespace: 'user',

  state: {

    editRecords: {},// id为key,编辑项为value

    searchWay: 'id',
    search: '',
    pageNumber: 1,
    pageSize: 6,
    total: 0,
    records: []

  },

  reducers: {

    setEditRecord(state, {editRecord}) {
      return {...state, editRecord};
    },

    setEditRecords(state, {editRecords}) {
      return {...state, editRecords};
    },

    setSearchWay(state, {searchWay}) {
      return {...state, searchWay};
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

    *update({recordId}, {select, put}) {
      let {records, editRecords} = yield select(state => state.user);
      let editRecord = editRecords[recordId];
      let res = yield update({
        id: editRecord.id,
        username: editRecord.username,
        email: editRecord.email,
        mobilePhone: editRecord.mobilePhone,
        idCard: editRecord.idCard,
        password: editRecord.password,
        avatar: editRecord.avatar,
        nickname: editRecord.nickname,
        name: editRecord.name,
        sex: editRecord.sex,
        birthday: editRecord.birthday,
        isDisabled: editRecord.isDisabled
      });
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
      let {searchWay, search, pageNumber, pageSize} = yield select(state => state.user);
      let userQuery = {};
      userQuery[searchWay] = search ? search : undefined;
      let res = yield page({pageNumber, pageSize}, userQuery);
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
