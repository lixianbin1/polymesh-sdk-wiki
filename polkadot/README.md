# Polkadot

Polkadot 是一个可扩展的异构多链区块链。由一个协作的去中心化区块链网络组成，这个网络叫做中继链，它与并行运行的分片链即平行链交互，所有平行链共享中继链的安全性,Polkadot 是将多个专用区块链连接到一个统一网络中的下一代区块链协议。作为「将互联网垄断的控制权交还给个人」这个广泛愿景的一部分

这是个文档库，旨在为后续学习的人提供一个学习参考

## 安装

安装polkadot

> yarn add @polkadot/api

## 使用

链接区块链网络

```js
import { ApiPromise, WsProvider } from '@polkadot/api';
// ......
// 链接测试网络（wss://testnet-rpc.polymesh.live）
const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });
```

## API

  - api.call
    - accountNonceApi.accountNonce() 账户随机数
    - authorityDiscoveryApi.authorities 权限？
    - babeApi
      - configuration 配置
      - currentEpoch 当前纪元
      - currentEpochStart 当前纪元开始
      - generateKeyOwnershipProof 生成密钥所有者证明
      - nextEpoch 下一个纪元
      - submitReportEquivocationUnsignedExtrinsic
    - blockBuilder
    - contractsApi
    - core
    - grandpaApi
    - metadata
    - offchainWorkerApi
    - sessionKeys
    - taggedTransactionQueue
    - transactionPaymentApi
  - api.consts 运行时常量
    - asset
    - authorship
    - babe
    - balances.existentialDeposit [创建新帐户所需的金额](#创建新帐户所需的金额)
    - base
    - complianceManager
    - contracts
    - corporateAction
    - grandpa
    - identity
    - imOnline
    - indices
    - scheduler
    - staking
    - statistics
    - system
    - timestamp
    - transactionPayment


  - api.derive
  - api.errors
  - api.events
  - api.extrinsicVersion
  - api.genesisHash
  - api.hasSubscriptions
  - api.isConnected
  - api.isReady
  - api.isReadyOrError
  - api.libraryInfo
  - api.query 查询
    - asset 资产
      - aggregateBalance
      - assetDocuments
      - assetDocumentsIdSequence
      - assetMetadataGlobalKeyToName
      - assetMetadataGlobalNameToKey
      - assetMetadataGlobalSpecs
      - assetMetadataLocalKeyToName
      - assetMetadataLocalNameToKey
      - assetMetadataLocalSpecs
      - assetMetadataNextGlobalKey
      - assetMetadataNextLocalKey
      - assetMetadataValueDetails
      - assetMetadataValues
      - assetNames
      - assetOwnershipRelations
      - balanceOf
      - balanceOfAtScope
      - classicTickers
      - customTypeIdSequence
      - customTypes
      - customTypesInverse
      - disableInvestorUniqueness
      - frozen
      - fundingRound
      - identifiers
      - issuedInFundingRound
      - palletVersion
      - scopeIdOf
      - storageVersion
      - tickerConfig
      - tickers
      - tokens
    - authorship
    - babe
    - balances
    - bridge
    - capitalDistribution
    - cddServiceProviders
    - checkpoint
    - committeeMembership
    - complianceManager
    - contracts
    - corporateAction
    - corporateBallot
    - externalAgents
    - grandpa
    - identity
    - imOnline
    - indices
    - multiSig
    - offences
    - pips
    - polymeshCommittee
    - polymeshContracts
    - portfolio
    - preimage
    - protocolFee
    - randomnessCollectiveFlip
    - relayer
    - rewards
    - scheduler
    - session
    - settlement
    - staking
    - statistics
    - sto
    - substrate
    - sudo
    - system
    - technicalCommittee
    - technicalCommitteeMembership
    - testUtils
    - timestamp
    - transactionPayment
    - upgradeCommittee
    - upgradeCommitteeMembership
    - utility
  - api.queryMulti 多项查询
  - api.registry
  - api.rpc
    - author
    - babe
    - beefy
    - chain
    - childstate
    - contracts
    - dev
    - engine
    - eth
    - grandpa
    - mmr
    - net
    - offchain
    - payment
    - rpc
    - state
    - syncstate
    - system
      - accountNextIndex
      - addLogFilter
      - addReservedPeer
      - chain
      - chainType
      - dryRun
      - health
      - localListenAddresses
      - localPeerId
      - name
      - nodeRoles
      - peers
      - properties
      - removeReservedPeer
      - reservedPeers
      - resetLogFilter
      - syncState
      - version
    - web3
  - api.runtimeChain
  - api.runtimeMetadata
  - api.runtimeVersion
  - api.rx
  - api.stats
  - api.supportMulti
  - api.tx
  - api.type

### 创建新帐户所需的金额

创建新帐户所需的金额

```js
const ws='wss://testnet-rpc.polymesh.live'
const wsProvider = new WsProvider(ws);
const api = await ApiPromise.create({ provider: wsProvider })
await api.isReady; // 检查链接是否成功

number = api.consts.balances.existentialDeposit.toNumber()
```


## 功能

### 创建账户

```js
import { ApiPromise, WsProvider } from '@polkadot/api';
import UiKeyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
// ......
const wsProvider = new WsProvider('wss://testnet-rpc.polymesh.live');
const api = await ApiPromise.create({ provider: wsProvider });
// 设置默认值
UiKeyring.loadAll({ ss58Format: 42, type: 'sr25519' });
// new 一个密钥管理器
const keyring = new Keyring();
// 生成助记词
const mnemonic = mnemonicGenerate()   //'question arrow glow suit uncle just hedgehog dwarf sell curtain carpet ostrich';
// 生成密钥对，并添加
const pair = keyring.addFromUri(mnemonic);
```

### JSO密钥文件

```js
import { ApiPromise, WsProvider } from '@polkadot/api';
import UiKeyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
// ......
const wsProvider = new WsProvider('wss://testnet-rpc.polymesh.live');
const api = await ApiPromise.create({ provider: wsProvider });
// 设置默认值
UiKeyring.loadAll({ ss58Format: 42, type: 'sr25519' });
const genesisHash = api.genesisHash.toString()
const name="lixianbin",password="mima123"
const tags=[],pairType="sr25519"
const json = UiKeyring.addUri(mnemonic, password, { genesisHash, isHardware: false, name, tags }, pairType);
// 文件生成并下载
FileSaver.saveAs(
  new Blob([JSON.stringify(json)], { type: 'application/json; charset=utf-8' }),
  `${pair.address}.json`
);
```

### 密钥恢复

```html
<el-upload
  action=""
  :on-change="handleChange"
  :before-upload="beforeUp"
  :file-list="fileList">
  <el-button size="small" type="primary">恢复账户</el-button>
</el-upload>
```

`fileList`为文件数组；`beforeUp`return false 用来取消默认上传行为；`handleChange`用来执行业务逻辑

```js
import { ApiPromise, WsProvider } from '@polkadot/api';
import UiKeyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import {u8aToString,isHex,hexToU8a } from '@polkadot/util';
// ......
const wsProvider = new WsProvider('wss://testnet-rpc.polymesh.live');
const api = await ApiPromise.create({ provider: wsProvider });
// 设置默认值
UiKeyring.loadAll({ ss58Format: 42, type: 'sr25519' });

// ......
convertResult (result){
  const data = new Uint8Array(result);
  // 判断是否16进制
  if (data[0] === '0'.charCodeAt(0) && data[1] === 'x'.charCodeAt(0)) {
    let hex = u8aToString(data);
    while (hex[hex.length - 1] === '\n') {
      hex = hex.substr(0, hex.length - 1);
    }
    if (isHex(hex)) {
      return hexToU8a(hex);
    }
  }
  return data;
}
handleChange(data){
  let file=data.raw
  const reader = new FileReader();
  reader.onabort = undefined;
  reader.onerror = undefined;
  reader.onload = ({ target }) => {
    if (target && target.result) {
      // 名称
      const name = file.name;
      const data = this.convertResult(target.result);
      const genesisHash = this.api.genesisHash.toHex()
      const pair = UiKeyring.createFromJson(JSON.parse(u8aToString(data)), { genesisHash });
      // 密码
      const password="mima123456"
      UiKeyring.addPair(pair, password);
    }
  };
  reader.readAsArrayBuffer(file)
}
```

## 使用 ui-keyring

安装

> yarn add @polkadot/keyring
  yarn add @polkadot/ui-keyring
  yarn add @polkadot/api

初始化

```js main.js
import { ApiPromise, WsProvider,Keyring } from '@polkadot/api';
import UiKeyring from '@polkadot/ui-keyring';


const wsProvider = new WsProvider('wss://testnet-rpc.polymesh.live');
const api = await ApiPromise.create({ provider: wsProvider });
api.then(()=>{
  UiKeyring.loadAll({ ss58Format: 42, type: 'sr25519' });
})
```

## 使用dapp扩展获取信息

```js
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable,web3FromAddress,web3AccountsSubscribe} from '@polkadot/extension-dapp';
// ......
const wsProvider = new WsProvider('wss://testnet-rpc.polymesh.live');
const api = await ApiPromise.create({ provider: wsProvider });
const extensions = await web3Enable('my cool dapp');
if (extensions.length === 0) {
    // 未安装扩展，或者用户未接受授权，提示用户添加扩展
    return;
}

//我们订阅任何帐户更改并记录新列表。
//请注意，`web3AccountsSubscribe`返回取消订阅的函数
let unsubscribe;
unsubscribe = await web3AccountsSubscribe(( injectedAccounts ) => { 
    injectedAccounts.map(( account ) => {
      // 扩展中钱包的账号.默认第一个为选中账户
      console.log(account.address);
    })
 });

// 获取扩展中所有账户
const allAccounts = await web3Accounts();

// 用于交易签名的账户地址
const SENDER = '5H3nEZFQNBQLYMriUy7YV5PZQgCN7q7kGDPaWbB2KMqHr7Pj';
const injector = await web3FromAddress(SENDER);
// 通过tx进行转账交易
api.tx.balances.transfer('5CQLm1GWpnq9zbAnJqRnTupJvB4QVtx9K8aaBuPYea5KVCo4', 100)
  .signAndSend(SENDER, { signer: injector.signer }, (status) => { 
    if (status.isInBlock) {
        console.log(`Completed at block hash #${status.asInBlock.toString()}`);
    } else {
        console.log(`Current status: ${status.type}`);
    }
  })
  .catch((error) => {
    console.log(':( transaction failed', error)
  })
```

## 注意

 - polkadot 和 polymesh 有所不同，polymesh有的方法是提供给 polkadot 使用的，并未申明在polymesh的wiki中。
