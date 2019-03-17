import React from 'react';
import {Table, Button, Input, Popconfirm, Pagination} from 'antd';
import Toast from '../../../components/Toast';
import {connect} from 'dva';
import moment from 'moment';
import {copyToClipboard} from '../../../lib/utils'
import styles from './System.css';

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
                  type: 'system/setEditRecords',
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
                  type: 'system/setSaveRecords',
                  saveRecords: newSaveRecords
                });
              }} />
            );
        }
      }
    },
    {
      title: '私钥（点击复制）',
      dataIndex: 'privateKey',
      key: 'privateKey',
      render: (text, record) => {
        if (record.editStatus === 1) {
          return (
            <span className={styles.pkCellView} onClick={() => {
              copyToClipboard(text);
              Toast.show('复制成功');
            }}>
              {text}
            </span>
          );
        } else {
          return <span className={styles.pkCell}>{text}</span>;
        }
      }
    },
    {
      title: '公钥（点击复制）',
      dataIndex: 'publicKey',
      key: 'publicKey',
      render: (text, record) => {
        if (record.editStatus === 1) {
          return (
            <span className={styles.pkCellView} onClick={() => {
              copyToClipboard(text);
              Toast.show('复制成功');
            }}>
              {text}
            </span>
          );
        } else {
          return <span className={styles.pkCell}>{text}</span>;
        }
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
            // 区分默认系统
            let remove;
            if (record.id === 1) {
              remove = (
                <Button disabled={true}>删除</Button>
              );
            } else {
              remove = (
                <Popconfirm placement="topRight" title='确认删除么？' okText='确认' cancelText='取消' onConfirm={() => {
                  dispatch({
                    type: 'system/remove',
                    recordId: record.id
                  });
                }}>
                  <Button>删除</Button>
                </Popconfirm>
              );
            }
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
                    type: 'system/setEditRecords',
                    editRecords: currentEditRecords
                  });
                }}>
                  编辑
                </Button>
                {remove}
              </span>
            );
          case 2:
            return (
              <span>
                <Button onClick={() => {
                  dispatch({
                    type: 'system/update',
                    recordId: record.id
                  })
                }}>
                  编辑
                </Button>
                <Button onClick={() => {
                  let newEditRecords = {...state.editRecords};
                  delete newEditRecords[record.id];
                  dispatch({
                    type: 'system/setEditRecords',
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
                    type: 'system/save',
                    recordKey: record.key
                  })
                }}>
                  新增
                </Button>
                <Button onClick={() => {
                  let newSaveRecords = {...state.saveRecords};
                  delete newSaveRecords[record.key];
                  dispatch({
                    type: 'system/setSaveRecords',
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

class System extends React.Component {

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
                type: 'system/setSearch',
                search: value
              });
              // 延迟搜索
              setTimeout(() => {
                if (value === this.props.state.search) {
                  this.props.dispatch({
                    type: 'system/page'
                  });
                }
              }, 800);
            }}
            onSearch={value => {
              dispatch({
                type: 'system/page'
              });
            }}
            style={{ width: 200 }}
          />
          <Button className={styles.addButton} onClick={() => {
            let newSaveRecords = {...saveRecords};
            let len = Object.getOwnPropertyNames(newSaveRecords).length;
            newSaveRecords[`save-${len + 1}`] = {};
            dispatch({
              type: 'system/setSaveRecords',
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
              type: 'system/setPageNumber',
              pageNumber: page
            });
            dispatch({
              type: 'system/page'
            });
          }} />
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'index/setSub',
      sub: '系统'
    });
    this.props.dispatch({
      type: 'system/page'
    });
  }

}

export default connect(state => {
  return {state: state.system};
})(System);
