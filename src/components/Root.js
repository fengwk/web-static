import React from 'react';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

function Root(props) {
	return (
		<LocaleProvider locale={zhCN}>
			{props.children}
		</LocaleProvider>
	);
}

export default Root;
