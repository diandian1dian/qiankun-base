import { createApp } from 'vue'
import App from './App.vue'
import router from './router'




// app.use(router).mount('#app')

let app = null

function render(props) {
    app = createApp(App, props)
    app.use(router).mount('#app') //挂载到自己的html中 基座会拿到这个挂载后的html 将其插入进去
}

//子组件的协议
if (window.__POWERED_BY_QIANKUN__) { //区分当前是否运行在 qiankun 的主应用的上下文中
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__; //动态添加publicPath
    console.log(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__, window.__POWERED_BY_QIANKUN__)
}
if (!window.__POWERED_BY_QIANKUN__) { //默认独立运行
    render();
}

export async function bootstrap(props) {
    console.log('react app bootstraped');
}

export async function mount(props) { //组件挂载的时候
    console.log(props) //onGlobalStateChange方法相当于发布订阅 父组件传递给子组件 子组件改好后再传递给父组件
    render()
}


export async function unmount() { //组件卸载的时候
    app.use(router).unmount('#app')
}
