# entities

主要介绍一下实体的的属性和方法

## 属性与方法

  - 账户 [Account](#Account)
    - 地址 address :`Polymesh`账户的特定地址，当作标识符
    - 授权 authorizations
      - [查询单个授权](#查询单个授权) getOne()
      - [查询所有授权](#查询所有授权) getReceived()
    - 密钥 key :帐户的加密公钥的十六进制表示形式。这在`Substrate`链中是一致的，而地址也取决于链
    - 标识 uuid :由标识转为的`uuid`,继承于实体Entity
    - [检查权限](#检查权限) checkPermissions()
    - [是否存在](#Account.exists) exists()
    - [获取余额](#获取余额) getBalance()
    - [获取随机数](#获取随机数) getCurrentNonce()
    - [获取标识](#获取标识) getIdentity()
    - [获取多重签名](#获取多重签名) getMultiSig()
    - [查看权限](#查看权限) getPermissions()
    - [查看补贴](#查看补贴) getSubsidy()
    - [获取交易历史记录](#获取交易历史记录) getTransactionHistory()
    - 获取交易历史记录v2 getTransactionHistoryV2()
    - [是否拥有权限](#是否拥有权限) hasPermissions()
    - [是否相同](#Account.isEqual) isEqual()
    - [是否冻结](#Account.isFrozen) isFrozen()
    - [人类可读](#Account.toHuman) toHuman()
    - 生成Uuid generateUuid()
    - 解析Uuid unserialize()

  - 资产 Asset
    - 资产持有人 assetHolders :处理所有与资产持有者相关的功能
      - [查询持有人资产](#查询持有人资产) get() :检索所有资产持有人及其各自的余额
    - 检查点 checkpoints :处理所有与检查点相关的功能
      - 时间表 schedules ：处理所有与检查点计划相关的功能
        - [计算复杂度](#计算复杂度) complexityOf()
        - [创建检查点计划](#创建检查点计划) create()
        - [当前复杂度](#当前复杂度) currentComplexity()
        - [获取所有计划](#获取所有计划) get()
        - [获取特定计划](#获取特定计划) getOne()
        - [最大复杂度](#最大复杂度) maxComplexity()
        - [删除计划](#删除计划) remove()
      - [创建快照](#创建快照) create()
      - [获取所有快照](#获取所有快照) get()
      - [获取单独快照](#获取单独快照) getOne()
    - 合规 compliance
      - 要求 requirements
        - [添加要求](#添加要求) add
        - 检查已暂停要求 arePaused
        - 检查身份 checkSettle
        - 获取所有要求 get
        - 修改要求 modify
        - 暂停要求 pause
        - 删除要求 remove
        - 重置要求 reset
        - 设置要求 set
        - 取消暂停 unpause
      - 信任的声明发行人 trustedClaimIssuers
        - [添加标识](#添加标识) add
        - 获取标识 get
        - 删除标识 remove
        - 设置标识 set
    - 公司行为 corporateActions
      - 分配 distributions
        - [配置股息分配](#配置股息分配) configureDividendDistribution()
        - [查询所有股息](#查询所有股息) get()
        - [查询单独股息](#查询单独股息) getOne()
      - 获取代理 getAgents() **已弃用** 推荐[查询代理权限](#查询代理权限)
      - [获取默认配置](#获取默认配置) getDefaultConfig()
      - [删除公司行为](#删除公司行为) remove()
      - 删除代理 removeAgent() **已弃用** 推荐[删除代理](#删除代理)
      - 设置代理 setAgent() **已弃用** 推荐[邀请代理](#邀请代理)
      - 设置默认配置 setDefaultConfig
    - 标识 did :资产的标识 ID（用于声明）
    - 文件 documents
      - 查找所有文档 get()
      - 设置文档列表 set()
    - 发行 issuance
      - [发行铸币](#发行铸币) issue()
    - 产品 offerings
      - 查询所有产品 get()
      - 查询单个产品 getOne()
      - 启动产品 launch()
    - 权限 permissions
      - [创建权限组](#创建权限组) createGroup
      - [查询代理权限](#查询代理权限) getAgents
      - [查询单个权限组](#查询单个权限组) getGroup
      - [查询所有权限组](#查询所有权限组) getGroups()
      - [邀请代理](#邀请代理) inviteAgent()
      - [删除代理](#删除代理) removeAgent()
    - 结算 settlements
      - [是否可转让代币](#是否可转让代币) canSettle()
      - [是否可转让资产](#是否可转让资产) canTransfer()
    - 股票 ticker :资产的股票代码
    - 转移限制 transferRestrictions
      - 声明持有总数限制 claimCount
        - addRestriction
        - disableStat
        - enableStat
        - get
        - removeRestrictions
        - setRestrictions
      - 声明持有百分比限制 claimPercentage
        - addRestriction
        - disableStat
        - enableStat
        - get
        - removeRestrictions
        - setRestrictions
      - 总数转移限制 count
        - addRestriction
        - disableStat
        - enableStat
        - get
        - investorCount
        - removeRestrictions
        - setRestrictions
      - 百分比转移限制 percentage
        - addRestriction
        - disableStat
        - enableStat
        - get
        - removeRestrictions
        - setRestrictions
    - 标识 uuid :由标识转为的`uuid`,继承于实体Entity
  - [控制转移](#控制转移) controllerTransfer()
  - 创建数据 createdAt()
  - 创建数据V2 createdAtV2()
  - 资金融资回合 currentFundingRound()
  - [资产数据](#资产数据) details()
  - 是否存在 exists()
  - 冻结资产 freeze()
  - 获取标识符列表 getIdentifiers()
  - 获取操作历史 getOperationHistory()
  - 获取操作历史V2 getOperationHistoryV2()
  - 投资者人数 investorCount()
  - 是否相等 isEqual()
  - 是否冻结 isFrozen()
  - 修改属性 modify()
  - 添加新的主发行代理 modifyPrimaryIssuanceAgent()
  - 销毁代币 redeem()
  - 修改主发行代理 removePrimaryIssuanceAgent()
  - 人类可读 toHuman()
  - [转让所有权](#转让所有权) transferOwnership()
  - 解冻资产 unfreeze()
  - 生成Uuid generateUuid()
  - 解析Uuid unserialize()

  - 快照 Checkpoint
    - 资产 asset :快照中记录余额的资产
    - ID id :快照ID
    - 标识 uuid :由标识转为的`uuid`,继承于实体Entity
    - 所有余额 allBalances()
    - 余额 balance()
    - 创建信息 createdAt()
    - 是否存在 exists()
    - 是否相同 isEqual()
    - 人类可读 toHuman()
    - 总供应量 totalSupply()
    - 生成Uuid generateUuid()
    - 解析Uuid unserialize()

  - 公司行为 CorporateAction
    - 资产 asset :受公司行为影响的资产
    - 创建日期 declarationDate
    - 默认扣税 defaultTaxWithholding
    - 简要描述 description
    - 公司行为id id
    - 行为目标 targets
    - 持有与扣税 taxWithholdings
    - 标识 uuid :由标识转为的`uuid`,继承于实体Entity
    - 查看快照 checkpoint()
    - 是否存在 exists()
    - 是否相等 isEqual()
    - 链接文档 linkDocuments()
    - 修改快照 modifyCheckpoint()
    - 静态数据 toHuman()
    - 生成Uuid generateUuid()
    - 解析Uuid unserialize()

  - 默认投资组合 DefaultPortfolio
    - 投资组合所有者身份 owner
    - 标识 uuid :由标识转为的`uuid`,继承于实体Entity
    - 是否存在 exists()
    - 查询投资组合余额 getAssetBalances()
    - 查询托管人身份 getCustodian()
    - 获取交易历史记录 getTransactionHistory()
    - 获取交易历史记录V2 getTransactionHistoryV2()
    - 是否为托管人 isCustodiedBy()
    - 是否相等 isEqual()
    - 是否为所有者 isOwnedBy()
    - 移动基金 moveFunds()
    - 托管人退出 quitCustody()
    - 设置托管人 setCustodian()
    - 人类可读 toHuman()
    - 生成Uuid generateUuid()
    - 解析Uuid unserialize()

  - 实体 Entity

  - 身份 Identity
    - 资产权限 assetPermissions
      - [检查权限](#Identity.检查权限) checkPermissions()
      - [查看添加权限块](#查看添加权限块) enabledAt()
      - [查看添加权限块V2](查看添加权限块V2) enabledAtV2()
      - [获取所有](#获取所有) get()
      - [获取权限组](#获取权限组) getGroup()
      - getOperationHistory
      - getOperationHistoryV2
      - [是否有权限](#是否有权限) hasPermissions()
      - [设置权限组](#设置权限组) setGroup()
      - [退出权限组](#退出权限组) waive()
    - 身份授权 authorizations
      - [查询单个授权](#Identity.authorizations.getOne) getOne
      - [查询所有授权](#Identity.authorizations.getReceived) getReceived
      - [查询发送请求](#查询发送请求) getSent
    - 身份ID did
    - 投资组合 portfolios
      - delete()
      - getCustodiedPortfolios()
      - [获取投资组合](#获取投资组合) getPortfolio()
      - [获取拥有投资组合](#获取拥有投资组合) getPortfolios()
    - 标识 uuid :由标识转为的`uuid`,继承于实体Entity
    - 检查辅助账户是否冻结 areSecondaryAccountsFrozen()
    - 检查是否拥有指定角色 checkRoles()
    - 是否存在 exists()
    - 查看余额 getAssetBalance()
    - 查看资产列表 getHeldAssets()
    - 查看资产列表V2 getHeldAssetsV2()
    - [获取所有指令](获取所有指令) getInstructions()
    - [查看未支付的股息分配](#查看未支付的股息分配) getPendingDistributions()
    - 查看待处理的指令 getPendingInstructions()
    - [查看主账户](#查看主账户) getPrimaryAccount()
    - 获取关联ID getScopeId()
    - [获取辅助账户](#获取辅助账户) getSecondaryAccounts()
    - 获取信任资产 getTrustingAssets()
    - 获取信任资产V2 getTrustingAssetsV2()
    - [查看拥有场地](#查看拥有场地) getVenues()
    - 是否拥有角色 hasRole()
    - 是否拥有所有角色 hasRoles()
    - 是否有CDD hasValidCdd()
    - 是否是CDD供应商 isCddProvider()
    - 是否相等 isEqual()
    - 是否为治理委员会成员 isGcMember()
    - 人类可读 toHuman()
    - 生成Uuid generateUuid()
    - 解析Uuid unserialize()

  - 指令 Instructions
    - 场地ID id :场地标识符编号 
    - 标识 uuid :由标识转为的`uuid`,继承于实体Entity
    - 确认指令 affirm()
    - 指令详情 details()
    - 是否存在 exists()
    - 查看指令授权 getAffirmations()
    - 查看所有步骤 getLegs()
    - 查看当前状态 getStatus()
    - 查看当前状态V2 getStatusV2()
    - 是否相等 isEqual()
    - 是否执行 isExecuted()
    - 是否挂起 isPending()
    - 拒绝指令 reject()
    - 重现尝试 reschedule()
    - 人类可读 toHuman()
    - 撤销授权 withdraw()
    - 生成Uuid generateUuid()
    - 解析Uuid unserialize()

  - 已知权限组 KnownPermissionGroup
    - 资产 asset :相关的资产实例
    - 类型 type :[权限组类型](#权限组类型)
    - 标识 uuid :由标识转为的`uuid`,继承于实体Entity
    - [是否存在](#KnownPermissionGroup.exists) exists()
    - [权限详情](#权限详情) getPermissions()
    - [是否相等](#是否相等) isEqual()
    - toHuman
    - generateUuid
    - unserialize

  - 场地 Venue
    - 场地ID id :场地标识符编号 
    - 标识 uuid :由标识转为的`uuid`,继承于实体Entity
    - [添加结算指令](#添加结算指令) addDirective()
    - addInstructions
    - [查看场地详情](#查看场地详情)details
    - exists
    - [获取场地指令](#获取场地指令) getInstructions()
    - getPendingInstructions
    - isEqual
    - modify
    - [人类可读](#Venue.toHuman) toHuman()
    - generateUuid
    - unserialize

## 相关功能

  - [权限相关](./permissions.md)

### Account

#### 查询单个授权

通过授权ID查询单个授权请求 getOne()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const received = await  account.authorizations.getOne({
    /*必填参数:授权的标识ID*/
    id:new BigNumber(15438)
  })
}
run()
```

#### 查询所有授权

查询所有授权请求,可通过参数进行筛选 getReceived()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const received = await account.authorizations.getReceived({
    /* 可选参数:筛选类型，默认为所有
     'AddMultiSigSigner',
     'AddRelayerPayingKey',
     'AttestPrimaryKeyRotation',
     'BecomeAgent',
     'JoinIdentity',
     'PortfolioCustody',
     'RotatePrimaryKey',
     'RotatePrimaryKeyToSecondary',
     'TransferAssetOwnership',
     'TransferTicker'
    */
    type:'AddMultiSigSigner',
    /* 可选参数：是否包括过期的授权
      true,
      false
    */
    includeExpired:true,
  })
}
run()
```

#### 检查权限

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

#### Account.exists

检查此账户是否在区块链上 exists()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const exists = await account.exists()
}
run()
```

#### 获取余额

获取账户可用余额/冻结金额/总金额,可以订阅 getBalance()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const balance = await account.getBalance()
}
run()
```

#### 获取随机数

获取该账户的当前随机数 getCurrentNonce()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const nonce = await account.getCurrentNonce()
}
run()
```

#### 获取标识

获取用户的身份标识 getIdentity()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const identity = await account.getIdentity()
}
run()
```

#### 获取多重签名

获取账户所属的多重签名，如没有则返回null getMultiSig()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const multiSig = await account.getMultiSig()
}
run()
```

#### 查看权限

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

#### 查看补贴

查看该账户的补贴 getSubsidy()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const subsidy = await account.getSubsidy()
}
run()
```

#### 获取交易历史记录

查看交易的历史记录，需要`中间件` getTransactionHistory()


```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const transaction = await account.getTransactionHistory({
    filters:{ //参数可选
      blockHash:"",
      size:10,
      start:1
    },
  })
}
run()
```

#### 是否拥有权限

查询该账户是否拥有此权限 hasPermissions()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const hasPermissions = await account.hasPermissions({
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

#### Account.isEqual

判断两个实体是否相同 isEqual()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const account2 = await this.apiAlice.accountManagement.getAccount({
    address:'5CQLm1GWpnq9zbAnJqRnTupJvB4QVtx9K8aaBuPYea5KVCo4'
  })
  const isEqual = await account.isEqual(account,account2)
}
run()
```

#### Account.isFrozen

判断该实体是否冻结 isFrozen()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const isFrozen = await account.isFrozen()
}
run()
```

#### Account.toHuman

返回账户地址 toHuman()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const address = await account.toHuman()
}
run()
```

#### 生成Uuid 

生成Uuid:被隐藏 generateUuid()

### Asset

#### 查询持有人资产

查询资产的所有的持有人的资产持有余额 get()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const address = await asset.assetHolders.get()
}
run()
```

#### 计算复杂度

计算给定日历周期复杂性的抽象度量 complexityOf()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const complexity = await asset.checkpoints.schedules.complexityOf({
    amount:new BigNumber(100),// 必填参数：数量
    unit:'day', //必填参数：单位 day hour minute month second week year
  })
}
run()
```

#### 创建检查点计划

创建检查点创建计划（例如，"从下周二开始，每周创建一个检查点，持续 5 周"） create()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const schedules = await asset.checkpoints.schedules.create({
    period:{
      amount:new BigNumber(5),// 必填参数：数量
      unit:'day',
    }, //循环周期，null为不考虑其他，只创建一个
    repetitions:new BigNumber(2), //重复次数，null为无限重复
    start:null, //开始时间，null为立即开始
  })
  schedules.run()
}
run()
```

#### 当前复杂度

计算此资产的所有当前检查点时间表的复杂性总和，计算此资产的所有当前检查点时间表的复杂性总和 currentComplexity()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const complexity = await asset.checkpoints.schedules.currentComplexity()
}
run()
```

#### 获取所有计划

获取资产所有活跃的检查点计划 get()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const complexity = await asset.checkpoints.schedules.get()
}
run()
```

#### 获取特定计划

获取资产的指定计划 getOne()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const complexity = await asset.checkpoints.schedules.getOne({
    id:new BigNumber(1)
  })
}
run()
```

#### 最大复杂度

获取资产允许的最大复杂度 maxComplexity()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const max = await asset.checkpoints.schedules.maxComplexity()
}
run()
```

#### 删除计划

删除指定的计划 remove()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const remove = await asset.checkpoints.schedules.remove({
    schedule:new BigNumber(1)
  })
  remove.run()
}
run()
```

#### 创建快照

创建当前时间的的资产的持有人快照 create()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const create = await asset.checkpoints.create({
    nonce:account.getCurrentNonce, //可选参数 随机数,可以是随机数或者随机数函数
    signingAccount:account, //可选参数 签名账户
  })
  create.run()
}
run()
```

#### 获取所有快照

获取该资产的所有快照 get()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const create = await asset.checkpoints.get()
}
run()
```

#### 获取单独快照

获取资产的单独的指定的快照 getOne()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const checkpoints = await asset.checkpoints.getOne({
    id:new BigNumber(1)
  })
}
run()
```

#### 添加要求

向资产添加新的合规性要求。这不会修改现有的合规性要求 requirements.add()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const address = await assets.issuance.issue({
    // amount:需要发行的代币数量
    amount:new BigNumber(100)
  })
}
run()
```

#### 添加标识

向资产添加新的受信任的发行商。 trustedClaimIssuers.add()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const identity = await apiAlice.identities.getIdentity({
    // 必选参数 did
    did: '0x79b016838689f4ef7e3ed32c55d8b33394eea71c0eeb664725449ded9429ee28',
  });
  const trustedClaimIssuers = await assets.compliance.trustedClaimIssuers.add({
    claimIssuers:[
      {
        identity:identity,
        trustedFor:[
          'BuyLockup', //购买锁定
          'SellLockup',//出售锁定
          'KnowYourCustomer',//KYC 客户尽职调查
          'Jurisdiction',//管辖
          'Accredited', //认可
          'Affiliate',//附属公司
          'Exempted', //豁免
          'Blocked', //封锁
          //'CustomerDueDiligence', //CDD 用户身份认证
          //'InvestorUniqueness',   //投资者唯一性
          //'InvestorUniquenessV2', //投资者唯一性V2
          //'NoData', //无数据
          //'NoType', //无类型
        ],
      }
    ]
  })
  await trustedClaimIssuers.run()
}
run()
```

#### 配置股息分配

通过公司行为创建股息分配，在执行人付款后，股息直接到帐，在执行人未付款的时候，需要接受人去认领

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const checkpoint = await assets.checkpoints.getOne({...})
  // 在给相应的接受人创建股息的时候，需要选择有该接受人的检查点
  const createQ = await asset.corporateActions.distributions.configureDividendDistribution({
    checkpoint, //检查点
    originPortfolio, // 默认为 默认投资组合
    currency: 'USD', // 支付的代币
    perShare: new BigNumber(10), //每股的股息
    maxAmount: new BigNumber(500), //最大可分配的金额
    paymentDate: new Date(...), //支付的时间
    expiryDate: new Date(...), //过期时间，需要比支付时间后
    declarationDate: new Date(...), //声明日期，需要在检查点日期前
    description: 'Gonna throw some money around', //备注
    targets: { //目标 持股接收人
      identities: [
        '0x0100000000000000000000000000000000000000000000000000000000000000',
        '0x0200000000000000000000000000000000000000000000000000000000000000',
      ],
      treatment: 'Include', //类型 包含或是排除
    }, // optional
    defaultTaxWithholding: new BigNumber(10), //默认预扣税
    taxWithholdings: [ //配置各人的扣税
      {
        identity: '0x0100000000000000000000000000000000000000000000000000000000000000',
        percentage: new BigNumber(15),
      },
    ],
  });
  const distribution = await createQ.run();
}
run()
```

#### 查询所有股息

查询和选择资产有关的所有股息

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const checkpoint = await assets.checkpoints.get()
}
run()
```

#### 查询单独股息

查询和选择资产有关的单独的指定股息

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const checkpoint = await assets.checkpoints.getOne({
    id:new BigNumber(1) //股息的ID
  })
}
run()
```

#### 获取代理

获取资产的公司行为代理人列表

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const agents = await assets.corporateActions.getAgents()
}
run()
```

#### 获取默认配置

检索由目标、全局预扣税百分比和每个身份的预扣税百分比组成的默认配置

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const default = await assets.corporateActions.getDefaultConfig()
}
run()
```

#### 删除公司行为

删除公司行为,已激活分发的公司行为不能删除

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const remove = await assets.corporateActions.remove({
    corporateAction:new BigNumber(1) //公司行为ID
  })
  remove.run()
}
run()
```

#### 发行铸币

给指定的资产发行代币

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const address = await assets.issuance.issue({
    // amount:需要发行的代币数量
    amount:new BigNumber(100)
  })
}
run()
```

#### 创建权限组

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

#### 查询代理权限

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

#### 查询所有权限组

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


#### 邀请代理

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

#### 删除代理

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

#### 是否可转让代币

检查是否可以创建结算指令，以便在两个投资组合之间转移一定数量的该资产代币 canSettle()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const Signing =  await apiAlice.accountManagement.getSigningAccount()
  const identity = await Signing.getIdentity()
  const portfolio = await identity.portfolios.getPortfolio()
  const portfolio2 = await identity2.portfolios.getPortfolio({...})
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const settle = asset.settlements.canSettle({
    amount:new BigNumber(100),
    from:portfolio, //可选参数：默认为当前签名账户的默认投资组合
    to:portfolio2
  })
}
run()
```

#### 是否可转让资产

检查是否可以创建结算指令，以便在两个投资组合之间转移一定数量的该资产代币，返回包含一般错误（如余额不足或收款人无效）、任何违反的转账限制以及任何合规性失败的事务明细 canTransfer()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const Signing =  await apiAlice.accountManagement.getSigningAccount()
  const identity = await Signing.getIdentity()
  const portfolio = await identity.portfolios.getPortfolio()
  const portfolio2 = await identity2.portfolios.getPortfolio({...})
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const settle = asset.settlements.canTransfer({
    amount:new BigNumber(100),
    from:portfolio, //可选参数：默认为当前签名账户的默认投资组合
    to:portfolio2
  })
}
run()
```

#### 控制转移

从给定投资组合转移到目的者的默认投资组合 controllerTransfer()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const identity = await Signing.getIdentity()
  const portfolio = await identity.portfolios.getPortfolio({id:new BigNumber(21)})
  const controller = await assets.controllerTransfer({
    amount:new BigNumber(100),
    originPortfolio:portfolio,
  })
  controller.run()
}
run()
```

### 资产数据

查看资产的一些数据

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const details = await assets.details()
}
run()
```

#### 转让所有权

转让资产的所有权

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const asset = await apiAlice.assets.getAsset({ticker:'LXB'});
  const controller = await asset.transferOwnership({
    target:'0xa75673cc417b0d958155fde4d39309c64c2f438cec9919bda1a9242f9dda4736'
  })
  controller.run()
}
run()
```

#### 创建数据

检索创建令牌时发出的事件的标识符数据（块号、日期和事件索引） createdAt()


### Identity

#### Identity.检查权限

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

#### 查看添加权限块

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

#### 查看添加权限块V2

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

#### 获取所有

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

#### 获取权限组

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

#### Identity.authorizations.getOne

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount()
  const identity = await account.getIdentity()
  const received = await  identity.authorizations.getOne({
    /*必填参数:授权的标识ID*/
    id:new BigNumber(15438)
  })
}
run()
```

#### Identity.authorizations.getReceived

查询关于身份的所有授权,可通过参数进行筛选 getReceived()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const account = await apiAlice.accountManagement.getSigningAccount();
  const identity = await account.getIdentity()
  const received = await identity.authorizations.getReceived({
    /* 可选参数:筛选类型，默认为所有
     'AddMultiSigSigner',
     'AddRelayerPayingKey',
     'AttestPrimaryKeyRotation',
     'BecomeAgent',
     'JoinIdentity',
     'PortfolioCustody',
     'RotatePrimaryKey',
     'RotatePrimaryKeyToSecondary',
     'TransferAssetOwnership',
     'TransferTicker'
    */
    type:'AddMultiSigSigner',
    /* 可选参数：是否包括过期的授权
      true,
      false
    */
    includeExpired:true,
  })
}
run()
```

#### 查询发送请求

获取身份标识发出的所有待处理授权请求 getSent()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const Signing =  await apiAlice.accountManagement.getSigningAccount()
  const identity = await Signing.getIdentity()
  const sent = await identity.authorizations.getSent()
}
run()
```

#### 获取投资组合

根据ID获取投资组合实体 getPortfolio()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const Signing =  await apiAlice.accountManagement.getSigningAccount()
  const identity = await Signing.getIdentity()
  const portfolioses = await identity.portfolios.getPortfolio({
    // portfolioId:投资组合ID，如不传则为默认投资组合
    portfolioId:new BigNumber(3)
  })
}
run()
```

#### 获取拥有投资组合

获取该身份的投资组合 getPortfolios()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const Signing =  await apiAlice.accountManagement.getSigningAccount()
  const identity = await Signing.getIdentity()
  const portfolioses = await identity.portfolios.getPortfolios()
}
run()
```

#### 查看主账户

获取该账户的主密钥 getPrimaryAccount()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const Signing =  await apiAlice.accountManagement.getSigningAccount()
  const identity = await Signing.getIdentity()
  const Accounts = await identity.getPrimaryAccount()
}
run()
```

#### 获取辅助账户

获取该账户的辅助密钥 getSecondaryAccounts()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const Signing =  await apiAlice.accountManagement.getSigningAccount()
  const identity = await Signing.getIdentity()
  const Accounts = await identity.getSecondaryAccounts()
}
run()
```

#### 查看拥有场地

查看当前身份拥有场地 getVenues()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const Signing =  await apiAlice.accountManagement.getSigningAccount()
  const identity = await Signing.getIdentity()
  const portfolioses = await identity.getVenues()
}
run()
```

#### KnownPermissionGroup.exists

检查已知权限组是否在区块链上 exists()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const assets = await apiAlice.assets.getAsset({ticker:'LXB'});
  const groups = await assets.permissions.getGroups()
  const exists = await groups[0].exists()
}
run()
```

#### 权限详情

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

#### 是否相等



#### 添加结算指令

添加结算指令 addDirective()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const venue = await this.apiAlice.settlements.getVenue({...});
  const identity = await Signing.getIdentity()
  const portfolio = await identity.portfolios.getPortfolio()
  const details = await venue.addDirective({
    legs:[{
      // to:接受人的did
      to: '0x56fffe845776656af85d0dac519abb073ca4073228ed9207588407bc9704d9b0',
      from: portfolio,
      // 数量
      amount: new BigNumber(100),
      // 资产代币
      asset: 'LXB',
    }],
  })
}
run()
```

#### 查看场地详情

查看场地的详情 details()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const venue = await this.apiAlice.settlements.getVenue({...});
  const details = await venue.details()
}
run()
```

#### 获取场地指令

获取场地的所有指令 getInstructions()

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const venue = await this.apiAlice.settlements.getVenue({...});
  const instructions = await venue.getInstructions()
}
run()
```

#### Venue.toHuman

人类可读

```js
import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';
// ......
async function run(){
  const signingManagerAlice = await LocalSigningManager.create({...});
  const apiAlice = await Polymesh.connect({...});
  const venue = await this.apiAlice.settlements.getVenue({...});
  const instructions = await venue.toHuman()
}
run()
```

### 权限组类型

 - Full :所有交易授权
 - ExceptMeta :除Meta外
 - PolymeshV1Caa :企业行动 公司选票 资本分布
 - PolymeshV1Pia :资产问题 资产赎回 资产.控制者转移 STO（sto.invest除外）



[下一个 Polkadot](../polkadot/README.md)