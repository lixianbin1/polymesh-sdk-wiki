import Vue from 'vue'
import App from './App.vue'
import { BrowserExtensionSigningManager } from '@polymeshassociation/browser-extension-signing-manager'
import { Polymesh } from '@polymeshassociation/polymesh-sdk'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);

BrowserExtensionSigningManager.create({
  appName: 'Demo',
  extensionName: 'polywallet'
}).then(async signingManager => {
  new Vue({
    render: h => h(App),
  }).$mount('#app')
  const connect = () => {
    return Polymesh.connect({
      nodeUrl: 'wss://testnet-rpc.polymesh.live',
      signingManager,
      middleware: {
        link: 'https://testnet-graphql.polymesh.live',
        key: 'deprecated'
      }
    })
  }
  let polymesh = await connect()
  Vue.prototype.polymesh=polymesh

  // 切换账号
  signingManager.onAccountChange(async accounts => {
    console.log(accounts)
  })
  // 切换网络
  signingManager.onNetworkChange(async networkInfo => {
    console.log(networkInfo)
  })

}).catch(e => {
  console.error('error create :', e)
})