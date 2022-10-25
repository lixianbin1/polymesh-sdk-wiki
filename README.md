# Polymesh-SDK

Polymesh是一种使您能够在区块链上创建、发行和管理数字证券的技术，旨在将传统证券的监管和合规与区块链技术联系起来，专门为受监管资产构建的机构级许可区块链。Polymesh的技术和基础设施在提高传统投资银行流程的效率方面具有巨大潜力，Polymesh-SDK则只是被封装的一个更利于开发的开发库。

这是个文档库，旨在为后续学习的人提供一个学习参考

## API

### 账户管理

处理账户管理的相关接口

#### 获取账户实例

  - getAccount

#### 查询账户余额

  - getAccountBalance

#### 查询默认签名账户

  - getSigningAccount

#### 查询签名账户列表

  - getSigningAccounts

#### 创建多个签名账户

  - createMultiSigAccount

#### 邀请辅助账户

  - inviteAccount

#### 修改辅助账户权限

  - modifyPermissions

#### 撤销辅助账户权限

  - revokePermissions

#### 补贴辅助账户

  - subsidizeAccount

#### 冻结辅助账户

  - freezeSecondaryAccounts

#### 解冻辅助账户

  - unfreezeSecondaryAccounts

#### 删除辅助账户

  - modifyPermissions

#### 离开辅助账户的身份

  - leaveIdentity

