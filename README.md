# Polymesh-SDK

Polymesh是一种使您能够在区块链上创建、发行和管理数字证券的技术，旨在将传统证券的监管和合规与区块链技术联系起来，专门为受监管资产构建的机构级许可区块链。Polymesh的技术和基础设施在提高传统投资银行流程的效率方面具有巨大潜力，Polymesh-SDK则只是被封装的一个更利于开发的开发库。

这是个文档库，旨在为后续学习的人提供一个学习参考

## API目录

  - [账户管理](#账户管理)
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
  - [资产](#资产)
    - [获取资产实例](#获取资产实例) getAsset
    - [查询区块链资产](#查询区块链资产) get
    - 申领以太坊股票代码 claimClassicTicker
    - [查询拥有资产](#查询拥有资产) getAssets 
    - [查询预定资产](#查询预定资产) getTickerReservation
    - [查询拥有预定资产](#查询预定资产) getTickerReservations
    - [查询名称是否可用](#查询名称是否可用) isTickerAvailable
    - [预定资产](#预定资产) reserveTicker
    - [创建资产](#创建资产) createAsset
  - [声明](#声明)
    - [添加声明](#添加声明) addClaims
    - [添加唯一性投资者声明](#添加唯一性投资者声明) addInvestorUniquenessClaim
    - [编辑声明](#编辑声明) editClaims
    - [获取CDD列表](#获取CDD列表) getCddClaims
    - [获取被证明的列表](#获取被证明的列表)getClaimScopes
    - 通过声明获得身份 getIdentitiesWithClaims
    - 使用声明V2获取身份 getIdentitiesWithClaimsV2
    - [唯一投资者声明列表](#唯一投资者声明列表) getInvestorUniquenessClaims
    - [查询所有声明](#查询所有声明) getIssuedClaims
    - 查询所有声明V2 getIssuedClaimsV2
    - 获取目标声明 getTargetingClaims
    - 获取目标声明v2 getTargetingClaimsV2
    - 撤销声明 revokeClaims
  - [身份](#身份)
    - [获取身份实例](#获取身份实例) getIdentity()
    - [验证身份标识](#验证身份标识) isIdentityValid()
    - [创建投资组合](#创建投资组合) createPortfolio()
    - [创建多个投资组合](#创建多个投资组合) createPortfolios()
    - 注册身份 registerIdentity()
  - [网络](#网络)
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
  - [结算](#结算)
    - [添加指令](#添加指令) addInstruction
    - [获取指令](#获取指令) getInstruction
    - [授权指令](#授权指令) affirmInstruction
    - [创建场地](#创建场地) createVenue
    - [获取场地实例](#获取场地实例) getVenue

  - [Polymesh](#Polymesh)
    - 账户管理 accountManagement
    - 资产 assets
    - 声明 claims
    - 身份 identities
    - 网络 network
    - 结算 settlements
    - [创建交易批处理](#创建交易批处理) createTransactionBatch()
    - [断开所有链接](#断开所有链接) disconnect()
    - [查看签名账户标识](#查看签名账户标识) getSigningIdentity()
    - [处理连接错误](#处理连接错误) onConnectionError()
    - [断开链接事件](#断开链接事件) onDisconnect()
    - [设置签名账户](#设置签名账户) setSigningAccount()
    - [设置签名管理器](#设置签名管理器) setSigningManager()
    - [创建实例](#创建实例) connect()


### 账户管理

处理账户管理的相关接口

#### 获取账户实例

通过地址获取账户实例 `getAccount()`

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({
    accounts: [
      {'mnemonic':'model smooth maid whale private around elite spice setup mushroom merit yellow'},
    ],
  });
  const apiAlice = await Polymesh.connect({
    nodeUrl: 'wss://testnet-rpc.polymesh.live',
    signingManager,
  });
  const account = await apiAlice.accountManagement.getAccount({
    // 地址为必选参数
    address:'5CK7bPZJrCXAVTs1RznLee5ZcecQTbKopS92yzPF8SS2r7mH'
  });

//  出参：账户实体
//  {
//    address: "5FWBFmHM2KraTMN8xqCccTeJoJz4STynAWUawyKYjKQUdY5g",
//    authorizations: Authorizations,
//    context: Proxy,
//    key: "0x982210e72d5131d5edca5e68e4cbf30d9b863b730940c226a206a9da4516a935",
//    uuid: "QWNjb3VudDp7ImFkZHJlc3MiOiI1RldCRm1ITTJLcmFUTU44eHFDY2NUZUpvSno0U1R5bkFXVWF3eUtZaktRVWRZNWcifQ==",
//    ...
//  }
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
    // 可选：账户，默认为当前账户
    account,
  });

// 出参：账户金额
// {
//     "free": BigNumber {s: 1, e: 4, c: Array(2)}
//     "locked": BigNumber {s: 1, e: 0, c: Array(1)},
//     "total": BigNumber {s: 1, e: 4, c: Array(2)},       
// }
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

//  出参：账户实体
//  {
//    address: "5FWBFmHM2KraTMN8xqCccTeJoJz4STynAWUawyKYjKQUdY5g",
//    authorizations: Authorizations,
//    context: Proxy,
//    key: "0x982210e72d5131d5edca5e68e4cbf30d9b863b730940c226a206a9da4516a935",
//    uuid: "QWNjb3VudDp7ImFkZHJlc3MiOiI1RldCRm1ITTJLcmFUTU44eHFDY2NUZUpvSno0U1R5bkFXVWF3eUtZaktRVWRZNWcifQ==",
//    ...
//  }
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

//  出参：账户实体
//  [{
//    address: "5FWBFmHM2KraTMN8xqCccTeJoJz4STynAWUawyKYjKQUdY5g",
//    authorizations: Authorizations,
//    context: Proxy,
//    key: "0x982210e72d5131d5edca5e68e4cbf30d9b863b730940c226a206a9da4516a935",
//    uuid: "QWNjb3VudDp7ImFkZHJlc3MiOiI1RldCRm1ITTJLcmFUTU44eHFDY2NUZUpvSno0U1R5bkFXVWF3eUtZaktRVWRZNWcifQ==",
//    ...
//  }...]
}
run()
```

#### 创建多重签名账户

需要使用一个拥有身份标识的账户替多个没身份标识的账户进行创建， createMultiSigAccount()
为了安全考虑，当多重签名账户发出交易的时候，需要多个人进行签名。 n/m 比如有m个人，当一笔交易发出后，需要n个人进行签名，才能成功

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
  const remove = await apiAlice.accountManagement.freezeSecondaryAccounts();
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

#### 查询拥有资产

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

#### 添加唯一性投资者声明

添加唯一性投资者声明 addInvestorUniquenessClaim()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
import { ClaimType, ScopeType } from '@polymeshassociation/polymesh-sdk/types';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const uIDv4 = "21d18606-5971-4136-90c1-decdef95fc1e"; // 投资者UID
  const uID = `0x${uIDv4.replace(/-/g, '')}`;
  const iuProofAsString = confidential_identity.process_create_claim_proof(
    JSON.stringify({
      "investor_did": Array.from(hexToU8a(identity.did)),
      "investor_unique_id": Array.from(hexToU8a(uID))
    }),
    JSON.stringify({
      "scope_did": Array.from(hexToU8a(acmeScopeDid)),
      "investor_unique_id": Array.from(hexToU8a(uID))
    })
  );
  const iuProof = JSON.parse(iuProofAsString);
  const proof = `0x${createHexString(iuProof.proof)}`;
  const scopeId = `0x${createHexString(iuProof.scope_id)}`;
  const acmeCddClaims = await apiAlice.claims.getCddClaims({
    "includeExpired": false
  });
  assert(acmeCddClaims.length > 0);
  const acmeCddClaim = acmeCddClaims[0].claim;  

  const claims = await apiAlice.claims.addInvestorUniquenessClaim({
    // 声明
    cddId: acmeCddClaim.id,, // CDD 的ID
    expiry:new Date('2022-11-15 12:00'), //可选：过期时间
    proof: proof, // 证明
    scope:{
      type:"Ticker", // Custom Identity Ticker
      value:"LXB"
    },
    scopeId: scopeId,
  })
  claims.run()
}
run()
```

#### 编辑声明

编辑与身份关联的声明（只能修改到期日期） editClaims()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const claimsList = await apiAlice.claims.getCddClaims();
  claimsList[0].expiry = new Date('2022-11-15 12:00')
  const editClaims = await apiAlice.claims.editClaims({
    claims:claimsList,
    operation:"Edit"
  });
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
  const claimsList = await apiAlice.claims.getCddClaims();
}
run()
```

#### 获取被证明的列表

根据身份标识获取被添加声明范围的资产列表,根据标识返回对应的作用范围，如身份标识可返回托管的资产 getClaimScopes

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

// 返回:被添加证明的资产列表
// [
//     {
//         "scope": {
//             "type": "Ticker",
//             "value": "LLL"
//         },
//         "ticker": "LLL"
//     },
//     ...
// ]
}
run()
```

#### 唯一投资者声明列表

检索目标身份的投资者唯一性声明列表 getInvestorUniquenessClaims()

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

#### 查询所有声明

查询账户标识的做为信任证明商发出的所有声明，需要中间件 getIssuedClaims()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const scopes = await apiAlice.claims.getIssuedClaims({
    // 可选参数
    includeExpired:true, //是否包含过期声明
    size:10, //分页数
    start:1, //当前页数
    target:'0xa39bd22fd2f078fd1c300614f564dda94a90ad3884601677fb3042b591dbede2' //身份标识
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
  const portfolio = await identity.portfolios.getPortfolio();
  const instruction = await apiAlice.settlements.addInstruction({
    legs:[{
      amount:new BigNumber(100),
      asset:'LXB',
      from:portfolio,
      to: '0xa75673cc417b0d958155fde4d39309c64c2f438cec9919bda1a9242f9dda4736'
    }],
    memo:"备注",
    venueId:new BigNumber(797)
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
    // 场地类型 分配:Distribution 置换:Exchange 其他:Other 发行/筹款:Sto
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

### Polymesh

#### 创建交易批处理

从单独交易记录列表创建批处理事务。该列表也可以包含批处理事务。  createTransactionBatch()

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  // 预定3资产
  const tx1 = await apiAlice.assets.reserveTicker({ ticker: 'FOO' });
  const tx2 = await apiAlice.assets.reserveTicker({ ticker: 'BAR' });
  const tx3 = await apiAlice.assets.reserveTicker({ ticker: 'BAZ' });
  const batch = apiAlice.createTransactionBatch(
    {
      // 交易列表
      transactions:[tx1, tx2, tx3] as const
    },
    // 指定签名账户
    { signingAccount: 'someAddress' }
  );
  const [res1, res2, res3] = await batch.run();
}
run()
```

#### 断开所有链接

断开客户端连接并关闭所有打开的连接和订阅 disconnect()

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const disconnect = await apiAlice.disconnect();
}
run()
```

#### 查看签名账户标识

检索查看与签名帐户关联的身份标识 getSigningIdentity()

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const identity = await apiAlice.getSigningIdentity();
}
run()
```

#### 处理连接错误

处理链接错误 onConnectionError()

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  // 处理订阅连接错误 订阅回调
  this.apiAlice.onConnectionError((err)=>{
    console.log(err)
  });
  await this.apiAlice.disconnect();
  console.log('断开链接')
}
run()
```

#### 断开链接事件

处理断开链接回调 onDisconnect()

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  // 处理断开 订阅回调
  this.apiAlice.onDisconnect((err)=>{
    console.log(err)
  });
  await this.apiAlice.disconnect();
  console.log('断开链接')
}
run()
```

#### 设置签名账户

将 SDK 的签名帐户设置为提供的帐户，需要签名管理器且传递的帐户需要在签名管理器中 setSigningAccount()

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getAccount({...})
  await apiAlice.setSigningAccount(account);
}
run()
```

#### 设置签名管理器

将 SDK 的签名管理器设置为提供的签名管理器 setSigningManager()

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
import { BrowserExtensionSigningManager } from '@polymeshassociation/browser-extension-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const signingManager = await BrowserExtensionSigningManager.create({
    appName:'polymesh-vue',
    extensionName: 'polywallet',
  });
  await apiAlice.setSigningManager(signingManager);
}
run()
```

#### 创建实例

创建SDK实例并连接到Polymesh节点 connect()

```js
import { Polymesh,BigNumber } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
}
run()
```


[下一个 entities](./zh/entities.md)