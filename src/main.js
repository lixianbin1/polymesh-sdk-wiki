import Vue from 'vue'
import App from './App.vue'
import { Polymesh } from '@polymeshassociation/polymesh-sdk'
// import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
 import { BrowserExtensionSigningManager } from '@polymeshassociation/browser-extension-signing-manager'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI);

/* 第一种连接方式：直接通过账号连接 */
// LocalSigningManager.create({
//   accounts: [
//     // 以12个单词密钥进行连接
//     {mnemonic:"xxxxx gesture robot hill visual sun tobacco episode canyon gravity sudden xxxxxx"},
//     // 
//   ],
// }).then(async signingManager =>{
//   new Vue({
//     render: h => h(App),
//   }).$mount('#app')
//   const polymesh = await Polymesh.connect({
//     nodeUrl: 'wss://testnet-rpc.polymesh.live',
//     signingManager,
//   });
//   Vue.prototype.polymesh=polymesh
//   console.log("wss://testnet-rpc.polymesh.live 已连接")
// })

/* 第二种连接方式：钱包授权 */
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
  console.log("wss://testnet-rpc.polymesh.live 已连接")
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