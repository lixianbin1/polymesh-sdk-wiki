# Polymesh-SDK

Polymesh是一种使您能够在区块链上创建、发行和管理数字证券的技术，旨在将传统证券的监管和合规与区块链技术联系起来，专门为受监管资产构建的机构级许可区块链。Polymesh的技术和基础设施在提高传统投资银行流程的效率方面具有巨大潜力，Polymesh-SDK则只是被封装的一个更利于开发的开发库。

这是个文档库，旨在为后续学习的人提供一个学习参考

## API目录

 - 账户管理
   - [获取账户实例](#获取账户实例) getAccount
   - [查询账户余额](#查询账户余额) getAccountBalance
   - [查询默认签名账户](#查询默认签名账户) getSigningAccount
   - [查询签名账户列表](#查询签名账户列表) getSigningAccounts
   - [创建多重签名账户](#创建多重签名账户) createMultiSigAccount
   - [邀请辅助账户](#邀请辅助账户) inviteAccount
   - [修改辅助账户权限](#修改辅助账户权限) modifyPermissions
   - [撤销辅助账户权限](#撤销辅助账户权限) revokePermissions
   - [补贴辅助账户](#补贴辅助账户) subsidizeAccount
   - [冻结辅助账户](#冻结辅助账户) freezeSecondaryAccounts
   - [解冻辅助账户](解冻辅助账户) unfreezeSecondaryAccounts
   - [删除辅助账户](#删除辅助账户)removeSecondaryAccounts
   - [离开辅助账户的身份](#离开辅助账户的身份) leaveIdentity
 - 资产
   - [获取资产实例](#获取资产实例) getAsset
   - [查询区块链资产](#查询区块链资产) get
   - 申领以太坊股票代码 claimClassicTicker
   - [查询拥有资产](#查询拥有资产) getAssets 
   - [查询预定资产](#查询预定资产) getTickerReservation
   - [查询拥有预定资产](#查询预定资产) getTickerReservations
   - [查询名称是否可用](#查询名称是否可用) isTickerAvailable
   - [预定资产](#预定资产) reserveTicker
   - [创建资产](#创建资产) createAsset
 - 声明
   - [添加声明](#添加声明) addClaims
   - 添加唯一性投资者声明 addInvestorUniquenessClaim
   - 编辑声明 editClaims
   - [获取CDD列表](#获取CDD列表) getCddClaims
   - [获取声明范围](#获取声明范围)getClaimScopes
   - 通过声明获得身份 getIdentitiesWithClaims
   - 使用声明V2获取身份 getIdentitiesWithClaimsV2
   - [唯一投资者声明列表](唯一投资者声明列表) getInvestorUniquenessClaims
   - 查询所有声明 getIssuedClaims
   - 查询所有声明V2 getIssuedClaimsV2
   - 获取目标声明 getTargetingClaims
   - 获取目标声明v2 getTargetingClaimsV2
   - 撤销声明 revokeClaims
 - 身份
   - [获取身份实例](#获取身份实例) getIdentity()
   - [验证身份标识](#验证身份标识) isIdentityValid()
   - [创建投资组合](#创建投资组合) createPortfolio()
   - [创建多个投资组合](#创建多个投资组合) createPortfolios()
   - 注册身份 registerIdentity()
 - 网络
   - 按索引参数获取事件 getEventByIndexedArgs
   - 按索引参数v2获取事件 getEventByIndexedArgsV2
   - 按索引参数获取多个事件 getEventsByIndexedArgs
   - 按索引参数v2获取多个事件 getEventsByIndexedArgsV2
   - [获取最新区块编号](#获取最新区块编号) getLatestBlock
   - [获取当前网络信息](#获取当前网络信息) getNetworkProperties
   - [获取协议费用](#获取协议费用) getProtocolFees
   - [检索链的SS58格式](#检索链的SS58格式) getSs58Format
   - 通过哈希获取交易 getTransactionByHash
   - 通过哈希v2获取交易 getTransactionByHashV2
   - [获取财务部账户](#获取财务部账户) getTreasuryAccount
   - [获取财务部余额](#获取财务部余额) getTreasuryBalance
   - [获取版本](#获取版本) getVersion
   - [转移Polyx](#转移Polyx) transferPolyx
 - 结算
   - [添加指令](#添加指令) addInstruction
   - [获取指令](#获取指令) getInstruction
   - [授权指令](#授权指令) affirmInstruction
   - [创建场地](#创建场地) createVenue
   - [获取场地实例](#获取场地实例) getVenue

### 账户管理

处理账户管理的相关接口

#### 获取账户实例

通过地址获取账户实例 `getAccount()`

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({
    // 地址为必选参数
    address:'5CK7bPZJrCXAVTs1RznLee5ZcecQTbKopS92yzPF8SS2r7mH'
  });
}
run()
```

#### 查询账户余额

通过实例(默认是当前实例账户)去查询账户余额 getAccountBalance()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const accountBalance = await apiAlice.accountManagement.getAccountBalance({
    // 参数为可选参数
    account,
  });
}
run()
```

#### 查询默认签名账户

查询当前登录的默认签名账户 getSigningAccount()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const accountBalance = await apiAlice.accountManagement.getSigningAccount();
}
run()
```

#### 查询签名账户列表

查询当前的签名账户列表 getSigningAccounts()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const accountBalance = await apiAlice.accountManagement.getSigningAccounts();
}
run()
```

#### 创建多个签名账户

需要使用一个拥有身份标识的账户替一个没有身份标识的账户进行创建。 createMultiSigAccount()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const create =  await apiAlice.accountManagement.createMultiSigAccount({
    requiredSignatures:new BigNumber(1),
    signers:[account],
  })
  create.run()
}
run()
```

创建执行后，需要被创建者进行授权

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const signing = await apiAlice.accountManagement.getSigningAccount({...});
  const received = await signing.authorizations.getReceived();
  // 这里需要去查找 received 里相对应的授权请求，我这里直接取巧，选最近的的授权请求
  const acceptQueue = await received[0].accept()
  acceptQueue.run()
}
run()
```

#### 邀请辅助账户

发送邀请辅助账户的邀请 inviteAccount()

**注意：** 这是一个`ProcedureMethod`,需要被邀请的账户进行授权

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const invite = await apiAlice.accountManagement.inviteAccount({
    // 可选参数expiry 过期时间
    expiry:new Date("2022/10/25 11:15"),
    // 必选参数targetAccount 邀请的目标账户
    targetAccount: account
  });
  invite.run()
}
run()
```

辅助账户如果需要接受邀请,需要默认登录账户为辅助账户

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const pendingAuthorizations = await this.Signing.authorizations.getReceived();
  const acmeAuthorization = pendingAuthorizations.find((pendingAuthorization) => {
    //通过判断did 得到所有挂起请求的指定挂起请求，也可以执行其他操作
    pendingAuthorization.issuer.did === '0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2';
  });
  //accept为接受方法
  const acceptQueue = await acmeAuthorization.accept();
  await acceptQueue.run();
}
run()
```

#### 修改辅助账户权限

修改辅助账户权限 modifyPermissions()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const modify = await apiAlice.accountManagement.modifyPermissions({
    secondaryAccounts:[
      {
        // 需要修改权限的辅助账户
        account,
        // 权限设置，null代表拥有全部权限
        permissions:{
          assets:null,
          portfolios: null,
          transactionGroups:[],
          transactions:null,
        },
      },
    ],
  });
  modify.run()
}
run()
```

#### 撤销辅助账户权限

撤销辅助账户权限 revokePermissions

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const revoke = await apiAlice.accountManagement.revokePermissions({
    secondaryAccounts:[
      // 需要修改权限的辅助账户
      account,
    ],
  });
  revoke.run()
}
run()
```

#### 补贴辅助账户

对辅助账户进行资金补贴，需要辅助账户拥有权限，可以对辅助账户进行授权 subsidizeAccount()

**注意：** 这是一个`ProcedureMethod`,需要被邀请的账户进行授权

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const invite = await apiAlice.accountManagement.subsidizeAccount({
    // 必选，补贴的金额，需要BigNumber类型
    allowance:new BigNumber(101),
    // 指定的辅助账户地址
    beneficiary:"5HQJBgwoAjkSMZNs...v5TxQkSFAoF9atopCidxHCXjcuvHq"
  });
  const subsidize = await invite.run()
}
run()
```

#### 冻结辅助账户

冻结签名账户的所有辅助账户 freezeSecondaryAccounts()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const remove = await apiAlice.accountManagement.freezeSecondaryAccounts({
    // 可选参数：被删除的指定账户，可以是多个
    accounts:[account],
  });
  remove.run()
}
run()
```

#### 解冻辅助账户

解开被冻结的所有辅助账户 unfreezeSecondaryAccounts()
```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const remove = await apiAlice.accountManagement.unfreezeSecondaryAccounts({
    // 可选参数：被删除的指定账户，可以是多个
    accounts:[account],
  });
  remove.run()
}
run()
```

#### 删除辅助账户

删除当前账户下的指定辅助账户 removeSecondaryAccounts()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...});
  const remove = await apiAlice.accountManagement.removeSecondaryAccounts({
    // 可选参数：被删除的指定账户，可以是多个
    accounts:[account],
  });
  remove.run()
}
run()
```

#### 离开辅助账户的身份

离开当前的辅助账户身份，当前账户需要是辅助账户 leaveIdentity()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const leave = await apiAlice.accountManagement.leaveIdentity();
  leave.run()
}
run()
```

### 资产

处理资产的相关接口

#### 获取资产实例

根据资产名称获取资产实例 getAsset()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({
    // 必填参数：资产名称
    ticker:"QK"
  });
}
run()
```

#### 查询区块链资产

查询区块链上的所有资产 get()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assetsList = await apiAlice.assets.get();
}
run()
```

#### 申领以太坊股票代码

claimClassicTicker()

#### 查询资产

获取身份标识拥有的发行资产 getAssets()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assetsList = await apiAlice.assets.getAssets({
    owner:'0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2',
  });
}
run()
```

#### 查询预定资产

根据名称查询预定资产 getTickerReservation()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const reservation = await apiAlice.assets.getTickerReservation({
    // 必选参数 ticker
    ticker:'QS',
  });
}
run()
```

#### 查询拥有预定资产

根据身份标识获取拥有的预定资产 getTickerReservations()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const reservations = await apiAlice.assets.getTickerReservations({
    // 必选参数 owner
    owner: '0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2',
  });
}
run()
```

#### 查询名称是否可用

查询该ticker名称是否可用 isTickerAvailable()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const isTicker = await apiAlice.assets.isTickerAvailable({
    // 必选参数 ticker
    ticker:"LXB",
  });
}
run()
```

#### 预定资产

使用名称预定资产，防止抢注 reserveTicker()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  // 在预定之前可先查询是名称否可用
  const reserve = await apiAlice.assets.reserveTicker({
    // 必选参数 ticker
    ticker:"LXB",
  });
}
run()
```

#### 创建资产

使用预定资产进行资产的创建 createAsset()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const reserveTicker = await apiAlice.assets.reserveTicker({
    // 必选参数 ticker
    "ticker":"LXB",
  });
  const assetQueue = await reserveTicker.createAsset({
      name: "CES0012 Co", //别名
      assetType: "EquityPreferred", //类型
      isDivisible: false // 是否可分割
  });
  const asset = await assetQueue.run();

}
run()
```

### 声明

#### 添加声明

添加声明 addClaims()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
import { ClaimType, ScopeType } from '@polymeshassociation/polymesh-sdk/types';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const claims = await apiAlice.claims.addClaims({
    // 声明
    claims: [
      {
        // 身份标识
        target: '0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2',
        // 声明
        claim: {
          type: ClaimType.Accredited,
          scope: {
            type: ScopeType.Ticker,
            value: 'LXB',
          },
        },
      },
    ],
  });
  claims.run()
}
run()
```



#### 获取CDD列表

根据身份标识获取CDD列表 getCddClaims()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const cddList = await apiAlice.claims.getCddClaims({
    // 可选参数，默认为当前账号 target
    target: '0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2',
  });

}
run()
```

#### 获取声明范围

根据身份标识获取声明范围,根据标识返回对应的作用范围，如身份标识可返回托管的资产 getClaimScopes

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const scopes = await apiAlice.claims.getClaimScopes({
    // 可选参数，默认为当前账号 target
    target: '0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2',
  });
}
run()
```

#### 唯一投资者声明列表

检索目标身份的投资者唯一性声明列表 getInvestorUniquenessClaims

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const scopes = await apiAlice.claims.getInvestorUniquenessClaims({
    // 可选参数
  });
}
run()
```



### 身份

#### 获取身份实例

根据did获取身份实例 getIdentity()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const identity = await apiAlice.identities.getIdentity({
    // 必选参数 did
    did: '0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2',
  });

}
run()
```

#### 验证身份标识

验证提供的did身份存在 isIdentityValid()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const identity = await apiAlice.identities.isIdentityValid({
    // 必选参数 identity
    identity: '0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2',
  });
}
run()
```

#### 创建投资组合

创建投资组合，就是把资产拿出去给你设置的管理 createPortfolio()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const portfolio = await apiAlice.identities.createPortfolio({
    // 必选参数 name
    name: '资产组合01',
  });
  portfolio.run()
}
run()
```

#### 创建多个投资组合

创建多个投资组合 createPortfolios()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const portfolios = await apiAlice.identities.createPortfolios({
    // 必选参数 names ,名称不能与已有组合重复
    names: ['资产组合02','资产组合03'],
  });
  portfolios.run()
}
run()
```

#### 注册身份

### 网络

#### 获取最新区块编号

获取区块链上的最新区块的编号 getLatestBlock()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const latestBlock = await apiAlice.network.getLatestBlock();
}
run()
```

#### 获取当前网络信息

获取当前Polymesh的网络信息 getNetworkProperties()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const latestBlock = await apiAlice.network.getNetworkProperties();
}
run()
```

#### 获取协议费用

获取与运行特定事务相关的协议费用 getProtocolFees()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const latestBlock = await apiAlice.network.getProtocolFees({
    // 必填参数 tag 
    tags:['asset.createAsset','asset.registerTicker']
  });
}
run()
```

#### 检索链的SS58格式

检索链的SS58格式 getSs58Format()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const latestBlock = await apiAlice.network.getSs58Format();
}
run()
```

#### 通过哈希获取交易

通过哈希获取交易 getTransactionByHash

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const latestBlock = await apiAlice.network.getTransactionByHash({
    // 必填参数:txHash哈希
    txHash:'0xd545bfc3b032f3cd6414fc78d87b4a1a0ca82ad354bb048cb1ac9644ef7876cb',
  });
}
run()
```

#### 获取财务部账户

获取财务部账户地址 getTreasuryAccount

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.network.getTreasuryAccount();
}
run()
```

#### 获取财务部余额

获取POLYX财务库的余额 getTreasuryBalance

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const balance = await apiAlice.network.getTreasuryBalance();
}
run()
```

#### 获取版本

获取当前网络版本 getVersion

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const version = await apiAlice.network.getVersion();
}
run()
```

#### 转移Polyx

将一定数量的Polyx转移到指定账户

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const transfer = await apiAlice.network.transferPolyx({
    //金额
    amount:new BigNumber(100),
    //备注
    memo:'memo',
    //收款人
    to:'5CFZnPhgGW2B4zoS7n1voprdxxiCLvD48kTKj42KguWebQPW'
  });
  transfer.run()
}
run()
```

### 结算

#### 添加指令

创建交换资产的指令 addInstruction

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const identity = await apiAlice.identities.getIdentity({
    did: '0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2',
  });
  const destinationPortfolio = await identity.portfolios.getPortfolio();
  const venue = await this.apiAlice.settlements.getVenue({
    // 场地标识符
    id:new BigNumber(825),
  });
  const instruction = await venue.addInstruction({
    legs:[{
      to: '0xa75673cc417b0d958155fde4d39309c64c2f438cec9919bda1a9242f9dda4736',
      from: destinationPortfolio ,
      amount: new BigNumber(100),
      asset: 'LXB',
    }],
  });
}
run()
```

#### 获取指令

获取指令实例 getInstruction()

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const instruction = await apiAlice.settlements.getInstruction({
    // 指令标识符
    id:new BigNumber(2867),
  });
}
run()
```

#### 授权指令

affirmInstruction()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const affirm = await apiAlice.settlements.affirmInstruction({
    // 指令标识符
    id:new BigNumber(2867),
  });
  const venue = await affirm.run()
}
run()
```

#### 创建场地

根据身份标识创建场地 createVenue()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const create = await apiAlice.settlements.createVenue({
    // 场地类型
    type:"Other",
    // 描述
    description:"这是一个实验性场所",
  });
  const venue = await create.run()
}
run()
```

#### 获取场地实例

根据场地标识符获取场地实例

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const venue = await apiAlice.settlements.getVenue({
    // 场地标识符
    id:new BigNumber(825),
  });
}
run()
```

[下一个 entities](./zh/entities.md)