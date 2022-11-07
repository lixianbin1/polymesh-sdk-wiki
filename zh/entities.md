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
    - [是否存在](#是否存在) exists()
    - [获取余额](#获取余额) getBalance()
    - [获取随机数](#获取随机数) getCurrentNonce()
    - [获取标识](#获取标识) getIdentity()
    - [获取多重签名](#获取多重签名) getMultiSig()
    - [查看权限](#查看权限) getPermissions()
    - [查看补贴](#查看补贴) getSubsidy()
    - 获取交易历史记录 getTransactionHistory()
    - 获取交易历史记录v2 getTransactionHistoryV2()
    - [拥有权限](#拥有权限) hasPermissions()
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
        - complexityOf
        - create
        - currentComplexity
        - get
        - getOne
        - maxComplexity
        - remove
      - [创建快照](#创建快照) create()
      - [获取所有快照](#获取所有快照) get()
      - [获取单独快照](#获取单独快照) getOne()
    - 合规 compliance
      - 要求 requirements
        - 添加要求 add
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
        - 添加标识 add
        - 获取标识 get
        - 删除标识 remove
        - 设置标识 set
    - 公司行为 corporateActions
      - 分配 distributions
      - 获取代理 getAgents
      - 获取默认配置 getDefaultConfig
      - 删除公司行为 remove
      - 删除代理 removeAgent
      - 设置代理 setAgent
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
      - 创建权限组 createGroup
      - 查询代理权限组 getAgents
      - 查询单个权限组 getGroup
      - 查询所有权限组 getGroups
      - 邀请代理 inviteAgent
      - 删除代理 removeAgent
    - 结算 settlements
      - 是否可转让代币 canSettle()
      - 是否可转让资产 canTransfer()
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
  - 转让所有权 transferOwnership()
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

  - 默认端口页 DefaultPortfolio
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
    - 身份授权 authorizations
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
    - 查看未支付的股息分配 getPendingDistributions()
    - 查看待处理的指令 getPendingInstructions()
    - 查看主账户 getPrimaryAccount()
    - 获取关联ID getScopeId()
    - 获取辅助账户 getSecondaryAccounts()
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

## Account

### 查询单个授权

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

### 查询所有授权

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

### 检查权限

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

#### 是否存在

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

#### 拥有权限

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

#### 创建快照



#### 获取所有快照

#### 获取单独快照

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

#### 控制转移

从给定投资组合转移到目的者的默认投资组合 controllerTransfer()


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

#### 创建数据

检索创建令牌时发出的事件的标识符数据（块号、日期和事件索引） createdAt()

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
  const portfolioses = await identity.getVenues()()
}
run()
```

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
  // 投资组合
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

[下一个 entities]