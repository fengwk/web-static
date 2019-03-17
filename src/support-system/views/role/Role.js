import React from 'react';
import {Table, Button, Input, Popconfirm, Pagination, Radio} from 'antd';
import Toast from '../../../components/Toast';
import {connect} from 'dva';
import moment from 'moment';
import {copyToClipboard} from '../../../lib/utils'
import styles from './Role.css';

function defineColumns(state, dispatch) {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        switch (record.editStatus) {
          case 1:
            return <span>{text}</span>;
          case 2:
            return (
              <Input value={state.editRecords[record.id].name} onChange={e => {
                let newEditRecords = {...state.editRecords};
                newEditRecords[record.id] = {...newEditRecords[record.id], name: e.target.value};
                dispatch({
                  type: 'role/setEditRecords',
                  editRecords: newEditRecords
                });
              }} />
            );
          case 3:
            return (
              <Input value={state.saveRecords[record.key].name} onChange={e => {
                let newSaveRecords = {...state.saveRecords};
                newSaveRecords[record.key] = {...newSaveRecords[record.key], name: e.target.value};
                dispatch({
                  type: 'role/setSaveRecords',
                  saveRecords: newSaveRecords
                });
              }} />
            );
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'isDisabled',
      key: 'isDisabled',
      render: (text, record) => {
        if (record.editStatus === 2) {
          return (
            <Radio.Group value={state.editRecords[record.id].isDisabled} onChange={e => {
              let newEditRecords = {...state.editRecords};
              newEditRecords[record.id] = {...newEditRecords[record.id], isDisabled: e.target.value};
              dispatch({
                type: 'role/setEditRecords',
                editRecords: newEditRecords
              });
            }}>
              <Radio value={0}>可用</Radio>
              <Radio value={1}>禁用</Radio>
            </Radio.Group>
          );
        }
        return <span>{text}</span>;
      }
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreated',
      key: 'gmtCreated',
      render: (text) => <span>{text}</span>
    },
    {
      title: '修改时间',
      dataIndex: 'gmtModified',
      key: 'gmtModified',
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
                    type: 'role/setEditRecords',
                    editRecords: currentEditRecords
                  });
                }}>
                  编辑
                </Button>
                <Popconfirm placement="topRight" title='确认删除么？' okText='确认' cancelText='取消' onConfirm={() => {
                  dispatch({
                    type: 'role/remove',
                    recordId: record.id
                  });
                }}>
                  <Button>删除</Button>
                </Popconfirm>
              </span>
            );
          case 2:
            return (
              <span>
                <Button onClick={() => {
                  dispatch({
                    type: 'role/update',
                    recordId: record.id
                  })
                }}>
                  编辑
                </Button>
                <Button onClick={() => {
                  let newEditRecords = {...state.editRecords};
                  delete newEditRecords[record.id];
                  dispatch({
                    type: 'role/setEditRecords',
                    editRecords: newEditRecords
                  });
                }}>
                  取消
                </Button>
              </span>
            );
          case 3:
            return (
              <span>
                <Button onClick={() => {
                  dispatch({
                    type: 'role/save',
                    recordKey: record.key
                  })
                }}>
                  新增
                </Button>
                <Button onClick={() => {
                  let newSaveRecords = {...state.saveRecords};
                  delete newSaveRecords[record.key];
                  dispatch({
                    type: 'role/setSaveRecords',
                    saveRecords: newSaveRecords
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

class Role extends React.Component {

  render() {
    let {state, dispatch} = this.props;
    let {saveRecords, editRecords, search, pageSize, pageNumber, total, records} = state;
    let dataSource = [];
    for (let key in saveRecords) {
      dataSource.push({...saveRecords[key], key, editStatus: 3});
    }
    for (let item of records) {
      let record = {
        ...item,
        key: item.id,
        isDisabled: item.isDisabled ? '禁用' : '可用',
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
          <Input.Search
            placeholder='搜索'
            value={search}
            onChange={e => {
              let value = e.target.value;
              dispatch({
                type: 'role/setSearch',
                search: value
              });
              // 延迟搜索
              setTimeout(() => {
                if (value === this.props.state.search) {
                  this.props.dispatch({
                    type: 'role/page'
                  });
                }
              }, 800);
            }}
            onSearch={value => {
              dispatch({
                type: 'role/page'
              });
            }}
            style={{ width: 200 }}
          />
          <Button className={styles.addButton} onClick={() => {
            let newSaveRecords = {...saveRecords};
            let len = Object.getOwnPropertyNames(newSaveRecords).length;
            newSaveRecords[`save-${len + 1}`] = {};
            dispatch({
              type: 'role/setSaveRecords',
              saveRecords: newSaveRecords
            });
          }}>
            新增
          </Button>
        </div>
        <Table scroll={{ x: 1000 }} dataSource={dataSource} columns={defineColumns(state, dispatch)} pagination={false} />
        <div className={styles.footer}>
          <Pagination current={pageNumber} pageSize={pageSize} total={total} onChange={page => {
            dispatch({
              type: 'role/setPageNumber',
              pageNumber: page
            });
            dispatch({
              type: 'role/page'
            });
          }} />
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'index/setSub',
      sub: '角色'
    });
    this.props.dispatch({
      type: 'role/page'
    });
  }

}

export default connect(state => {
  return {state: state.role};
})(Role);
