# permissions

主要介绍一下和权限相关的的属性，方法和应用

## 属性与方法

  - [账户管理](#AccountManagement)
    - [修改辅助账户权限](#修改辅助账户权限) modifyPermissions
    - [撤销辅助账户权限](#撤销辅助账户权限) revokePermissions

  - 账户 [Account](#Account)
    - [检查权限](#Account.检查权限) checkPermissions()
    - [查看权限](#查看权限) getPermissions()

  - 资产 [Asset](#Asset)
    - 权限 [permissions](# )
      - [创建权限组](创建权限组) createGroup()
      - [查询代理权限](#查询代理权限) getAgents()
      - [查询单个权限组](#查询单个权限组) getGroup()
      - [查询所有权限组](#查询所有权限组) getGroups()
      - [邀请代理](#邀请代理) inviteAgent()
      - [删除代理](#删除代理) removeAgent()

  - 身份 [Identity](#Identity)
    - 资产权限 assetPermissions
      - [检查权限](#Identity.检查权限) checkPermissions()
      - [查看添加权限块](#查看添加权限块) enabledAt()
      - [查看添加权限块V2](查看添加权限块V2) enabledAtV2()
      - [获取所有](#获取所有) get()
      - [获取权限组](#获取权限组) getGroup()
      - [是否有权限](#是否有权限) hasPermissions()
      - [设置权限组](#设置权限组) setGroup()
      - [退出权限组](#退出权限组) waive()
    - 是否拥有角色 hasRole()
    - 是否拥有所有角色 hasRoles()
    - 是否有CDD hasValidCdd()
    - 是否是CDD供应商 isCddProvider()
    - 是否是治理委员会成员 isGcMember()

  - 已知权限组 [KnownPermissionGroup](#KnownPermissionGroup)
    - 类型 type :[权限组类型](#权限组类型)
    - [权限详情](#权限详情) getPermissions()
    - toHuman
    - generateUuid
    - unserialize

## AccountManagement

### 修改辅助账户权限

修改辅助账户的对资产的权限，需要主账户拥有资产权限 modifyPermissions()

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

### 撤销辅助账户权限

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

## Account

### Account.检查权限

检查此帐户是否具有代表其相应身份行事的某些权限 checkPermissions()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const received = await account.checkPermissions({
    // 必选参数:资产,null代表查询是否拥有所有权限
    assets:['corporateActions'],
    // 必选参数:投资组合,null代表查询是否拥有所有权限
    portfolios:null,
    // 必选参数:交易,null代表查询是否拥有所有权限
    transactions:null,
  })
}
run()
```

### 查看权限

检索此帐户作为其相应标识的许可帐户所拥有的权限 getPermissions

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const permission = await account.getPermissions()
}
run()
```

## Asset

### 创建权限组

给指定资产创建自定义权限组或者权限 **注意：不能再同一个资产创建具有相同权限的自定义权限**

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const creat = await assets.permissions.createGroup({
    permissions:{
      transactions:{ //权限
        type:"Include", //权限类型:包含Include 或是排除Exclude
        exceptions:[ //例外:比如包含A模块，但是A模块里的B权限不要。或者排除A模块，但是A模块的B权限我要
          "asset.createAsset"
        ], 
        values:[ //值:包含或是排除的值
          "asset", //模块名称
          "corporateAction.changeRecordDate", //精细权限
        ]
      },
      //设置了权限组，权限就不需要设置，设置权限，权限组就不要, 他们会互相自动生成
      // transactionGroups:[ //权限组

    // ],
    }
  })
  await creat.run()
}
run()
```

### 查询代理权限

查询该资产中所有的代理和权限

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const agents = await assets.permissions.getAgents()
}
run()
```

### 查询单个权限组

查询此资产中单个特定的权限 传递ID 将获取自定义权限组，而传递类型将获取已知权限组

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const groups = await assets.permissions.getGroup({
    type:"Full", //已知权限组的类型
    // 传递type 就不传ID，传ID就不传type 二选一
    // id:new BigNumber(1), //ID:自定义权限组的ID
  })
}
run()
```

### 查询所有权限组

检索此资产的所有权限组 getGroups

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const groups = await assets.permissions.getGroups()
}
run()
```


### 邀请代理

邀请身份成为对此资产具有权限的代理 inviteAgent()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const groups = await assets.permissions.getGroups()
  const invite = await assets.permissions.inviteAgent({
    // 可选:过期时间，不设置则永不过期 
    // expiry:null,
    // 必选:权限组
    permissions:groups.known[0],
    target:'0xa75673cc417b0d958155fde4d39309c64c2f438cec9919bda1a9242f9dda4736',
  })
  await invite.run()
}
run()
```

### 删除代理

删除此资产具有权限的代理 removeAgent()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const groups = await assets.permissions.getGroups()
  const invite = await assets.permissions.removeAgent({
    // 可选:过期时间，不设置则永不过期 
    // expiry:null,
    // 必选:权限组
    permissions:groups.known[0],
    target:'0xa75673cc417b0d958155fde4d39309c64c2f438cec9919bda1a9242f9dda4736',
  })
  await invite.run()
}
run()
```

## Identity

### Identity.检查权限

检查此身份是否对资产具有特定的事务权限 checkPermissions()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount()
  const identity = await account.getIdentity()
  const received = await identity.assetPermissions.checkPermissions({
    // 必选参数:资产,null代表所有资产
    assets:['LXB'], //资产名称，或资产实体
    // 必选参数:事务,null代表查询是否拥有所有权限
    transactions:null,
  })
}
run()
```

### 查看添加权限块

查看添加此身份到指定资产的权限的区块 enabledAt()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount()
  const identity = await account.getIdentity()
  const received = await identity.assetPermissions.enabledAt({
    assets:'LXB', //资产名称，或资产实体
  })
}
run()
```

### 查看添加权限块V2

使用中间件V2查看添加此身份到指定资产的权限的区块 enabledAtV2()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount()
  const identity = await account.getIdentity()
  const received = await identity.assetPermissions.enabledAtV2({
    assets:'LXB', //资产名称，或资产实体
  })
}
run()
```

### 获取所有

获取该身份所有资产的权限组 get()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount()
  const identity = await account.getIdentity()
  const received = await identity.assetPermissions.get()
}
run()
```

### 获取权限组

获取该身份所有资产的权限组 getGroup()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount()
  const identity = await account.getIdentity()
  const received = await identity.assetPermissions.getGroup({
    asset:"LXB" //资产名称或者资产实体
  })
}
run()
```

### 是否有权限()

检查此身份是否对资产具有特定的事务权限 hasPermissions()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount()
  const identity = await account.getIdentity()
  const received = await identity.assetPermissions.hasPermissions({
    asset:"LXB", //资产名称或者资产实体
    transactions:[
      "AssetManagement",
    ],
  })
}
run()
```

### 设置权限组

将此身份分配给给定资产的其他权限组 setGroup()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount()
  const identity = await account.getIdentity()
  const groups = await assets.permissions.getGroups()
  const received = await identity.assetPermissions.setGroup({
    asset:"LXB", //资产名称或者资产实体
    group:groups.known[0],
  })
}
run()
```

### 退出权限组

从给定资产的当前权限组中退位。这意味着此身份将不再对所述资产拥有任何权限 waive()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount()
  const identity = await account.getIdentity()
  const groups = await assets.permissions.getGroups()
  const received = await identity.assetPermissions.waive({
    asset:"LXB", //资产名称或者资产实体
  })
}
run()
```

## KnownPermissionGroup

### 权限详情

获取已知权限组的详细权限 getPermissions()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const groups = await assets.permissions.getGroups()
  const permiss = await groups.known[0].getPermissions()
}
run()
```

### 权限组类型

 - Full :所有交易授权
 - ExceptMeta :除Meta外
 - PolymeshV1Caa :企业行动 公司选票 资本分布
 - PolymeshV1Pia :资产问题 资产赎回 资产.控制者转移 STO（sto.invest除外）



[下一个 Polkadot](../polkadot/README.md)