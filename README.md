# Polymesh-SDK

Polymesh是一种使您能够在区块链上创建、发行和管理数字证券的技术，旨在将传统证券的监管和合规与区块链技术联系起来，专门为受监管资产构建的机构级许可区块链。Polymesh的技术和基础设施在提高传统投资银行流程的效率方面具有巨大潜力，Polymesh-SDK则只是被封装的一个更利于开发的开发库。

这是个文档库，旨在为后续学习的人提供一个学习参考

## API目录

 - 账户管理
  - [获取账户实例](#获取账户实例) getAccount
  - [查询账户余额](#查询账户余额)
  - [查询默认签名账户](#查询默认签名账户)
  - [查询签名账户列表](#查询签名账户列表)
  - [创建多个签名账户](#创建多个签名账户)
  - [邀请辅助账户](#邀请辅助账户)
  - [修改辅助账户权限](#修改辅助账户权限)
  - [撤销辅助账户权限](#撤销辅助账户权限)
  - [补贴辅助账户](#补贴辅助账户)
  - [冻结辅助账户](#冻结辅助账户)
  - [解冻辅助账户](解冻辅助账户)
  - [删除辅助账户](#删除辅助账户)
  - [离开辅助账户的身份](#离开辅助账户的身份)
 - 资产
  - 获取资产实例
  - 查询区块链资产
  - 申领以太坊股票代码
  - 查询拥有资产
  - 获取投票者保留
  - 获取投票者保留
  - 是可编辑的
  - 预定资产
  - 创建资产

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

  - createMultiSigAccount

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
    "expiry":new Date("2022/10/25 11:15"),
    // 必选参数targetAccount 邀请的目标账户
    "targetAccount": account
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
  const modify = await this.apiAlice.accountManagement.modifyPermissions({
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
  const revoke = await this.apiAlice.accountManagement.revokePermissions({
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
  const invite = await this.apiAlice.accountManagement.subsidizeAccount({
    // 必选，补贴的金额，需要BigNumber类型
    allowance:new BigNumber(101),
    // 指定的辅助账户地址
    beneficiary:"5HQJBgwoAjkSMZNsCUYv5TxQkSFAoF9atopCidxHCXjcuvHq"
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

根据资产名称获取资产实例 

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

查询区块链上的所有资产

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

#### 查询资产