import React from 'react';
import {Table, Button, Input, Select, Pagination} from 'antd';
import {connect} from 'dva';
import moment from 'moment';
import styles from './User.css';

function EditInput(props) {
  let {state, dispatch, text, record, keyName, type='text'} = props;
  switch (record.editStatus) {
    case 1:
      return <span>{text}</span>;
    case 2:
      return (
        <Input type={type} value={state.editRecords[record.id][keyName]} onChange={e => {
          let newEditRecords = {...state.editRecords};
          newEditRecords[record.id] = {...newEditRecords[record.id]};
          newEditRecords[record.id][keyName] = e.target.value;
          dispatch({
            type: 'user/setEditRecords',
            editRecords: newEditRecords
          });
        }} />
      );
  }
}

function defineColumns(state, dispatch) {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      render: (text) => <span>{text}</span>
    },
    {
      title: '用户类型',
      dataIndex: 'userTypeId',
      key: 'userTypeId',
      width: 150,
      render: (text) => <span>{text}</span>
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 200,
      render: (text, record) => <EditInput state={state} dispatch={dispatch} text={text} record={record} keyName='username' />
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (text, record) => <EditInput state={state} dispatch={dispatch} text={text} record={record} keyName='email' />
    },
    {
      title: '手机号',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
      width: 200,
      render: (text, record) => <EditInput state={state} dispatch={dispatch} text={text} record={record} keyName='mobilePhone' />
    },
    {
      title: '身份证',
      dataIndex: 'idCard',
      key: 'idCard',
      width: 200,
      render: (text, record) => <EditInput state={state} dispatch={dispatch} text={text} record={record} keyName='idCard' />
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 150,
      render: (text, record) => <EditInput state={state} dispatch={dispatch} text={text} record={record} keyName='avatar' />
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 150,
      render: (text, record) => <EditInput state={state} dispatch={dispatch} text={text} record={record} keyName='nickname' />
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text, record) => <EditInput state={state} dispatch={dispatch} text={text} record={record} keyName='name' />
    },
    {
      title: '姓别',
      dataIndex: 'sex',
      key: 'sex',
      width: 100,
      render: (text) => <span>{text}</span>
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 200,
      render: (text) => <span>{text}</span>
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreated',
      key: 'gmtCreated',
      width: 250,
      render: (text) => <span>{text}</span>
    },
    {
      title: '修改时间',
      dataIndex: 'gmtModified',
      key: 'gmtModified',
      width: 250,
      render: (text) => <span>{text}</span>
    },
    {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      width: 180,
      fixed: 'right',
      render: (text, record) => {
        switch (record.editStatus) {
          case 1:
            return (
              <span>
                <Button onClick={() => {
                  let cloneItem;
                  for (let item of state.records) {
                    if (item.id === record.id) {
                      cloneItem = {...item};
                    }
                  }
                  let currentEditRecords = {...state.editRecords};
                  currentEditRecords[record.id] = cloneItem;
                  dispatch({
                    type: 'user/setEditRecords',
                    editRecords: currentEditRecords
                  });
                }}>
                  编辑
                </Button>
              </span>
            );
          case 2:
            return (
              <span>
                <Button onClick={() => {
                  dispatch({
                    type: 'user/update',
                    recordId: record.id
                  })
                }}>
                  编辑
                </Button>
                <Button onClick={() => {
                  let newEditRecords = {...state.editRecords};
                  delete newEditRecords[record.id];
                  dispatch({
                    type: 'user/setEditRecords',
                    editRecords: newEditRecords
                  });
                }}>
                  取消
                </Button>
              </span>
            );
        }
      }
    }
  ];
}

class User extends React.Component {

  render() {
    let {state, dispatch} = this.props;
    let {editRecords, searchWay, search, pageSize, pageNumber, total, records} = state;
    let dataSource = [];
    for (let item of records) {
      let record = {
        ...item,
        key: item.id,
        gmtCreated: moment(item.gmtCreated).format('YYYY-MM-DD HH:mm:ss'),
        gmtModified: moment(item.gmtModified).format('YYYY-MM-DD HH:mm:ss'),
      };
      if (editRecords[record.id]) {
        record.editStatus = 2;
      } else {
        record.editStatus = 1;
      }
      dataSource.push(record);
    }

    return (
      <div className={styles.container}>
        <div className={styles.bar}>
          <Input.Group compact>
            <Select style={{width: 100}} value={searchWay} onChange={value => {
              dispatch({
                type: 'user/setSearchWay',
                searchWay: value
              });
              dispatch({
                type: 'user/setSearch',
                search: ''
              });
              dispatch({
                type: 'user/page'
              });
            }}>
              <Select.Option value='id'>id</Select.Option>
              <Select.Option value='userTypeId'>用户类型</Select.Option>
              <Select.Option value='username'>用户名</Select.Option>
              <Select.Option value='email'>邮箱</Select.Option>
              <Select.Option value='mobilePhone'>手机号</Select.Option>
              <Select.Option value='idCard'>身份证</Select.Option>
            </Select>
            <Input.Search
              placeholder='搜索'
              type={searchWay === 'id' || searchWay === 'userTypeId' ? 'number' : 'text'}
              value={search}
              onChange={e => {
                let value = e.target.value;
                dispatch({
                  type: 'user/setSearch',
                  search: value
                });
                // 延迟搜索
                setTimeout(() => {
                  if (value === this.props.state.search) {
                    this.props.dispatch({
                      type: 'user/page'
                    });
                  }
                }, 800);
              }}
              onSearch={() => {
                dispatch({
                  type: 'user/page'
                });
              }}
              style={{ width: 200 }}
            />
          </Input.Group>
        </div>
        <Table scroll={{ x: 2000 }} dataSource={dataSource} columns={defineColumns(state, dispatch)} pagination={false} />
        <div className={styles.footer}>
          <Pagination current={pageNumber} pageSize={pageSize} total={total} onChange={page => {
            dispatch({
              type: 'user/setPageNumber',
              pageNumber: page
            });
            dispatch({
              type: 'user/page'
            });
          }} />
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'index/setSub',
      sub: '用户'
    });
    this.props.dispatch({
      type: 'user/page'
    });
  }

}

export default connect(state => {
  return {state: state.user};
})(User);
