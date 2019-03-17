import dva from 'dva';
import {createHashHistory, createBrowserHistory} from 'history';
import createLoading from 'dva-loading';
import effectLock from '../plugins/effectLock';
import index from './models/index';
import system from './models/system';
import user from './models/user';
import role from './models/role';
import permission from './models/permission';
import router from './router';
import './index.css';

// 初始化应用
const app = dva({
  history: createHashHistory(),
	initialState: {}                                             // 初始化数据
});

// 挂载插件
app.use(createLoading());                                        // 全局loading
app.use(effectLock());

// 注册模型
app.model(index);
app.model(system);
app.model(user);
app.model(role);
app.model(permission);

// 注册路由
app.router(router);

// 启动应用
app.start('#root');
