import dva from 'dva';
import createLoading from 'dva-loading';
import index from './models/index';
import login from './models/login';
import register from './models/register';
import repassword from './models/repassword';
import router from './router';
import './index.css';

// 初始化应用
const app = dva({
	initialState: {}                                             // 初始化数据
});

// 挂载插件
app.use(createLoading());                                        // 全局loading

// 注册模型
app.model(index);
app.model(login);
app.model(register);
app.model(repassword);

// 注册路由
app.router(router);

// 启动应用
app.start('#root');
