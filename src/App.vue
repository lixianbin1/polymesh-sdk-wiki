<template>
  <div id="app">
    <el-skeleton v-if="loading" animated/>
    <div v-else>
      <h2 class="title">Polymesh 常规 API</h2>
      <el-row :gutter="20">
        <el-col :span="23">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-select v-model="client" size="mini" class="select" placeholder="请选择" @change="changeClient">
                <el-option
                  v-for="(item,i) in options"
                  :key="item.name"
                  :label="item.name"
                  :value="i">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.docs }}</span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="18">
              <el-select v-model="proapi" size="mini" class="select" placeholder="请选择" @change="changeProapi">
                <el-option
                  v-for="(item,i) in options[client]?.children"
                  :key="item.name"
                  :label="item.name"
                  :value="i">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.docs }}</span>
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="1">
          <el-button class="botton" type="primary" icon="el-icon-search" circle @click="search"></el-button>
        </el-col>
      </el-row>  

      <el-form ref="form" :model="form" label-width="80px" class="forBox">
        <el-row :gutter="20" v-for="(item,k) in options[client].children[proapi]?.parameters" :key="item.name">
          <el-col :span="1"></el-col>
          <el-col :span="22" v-if="item.name=='account'">
            <el-select @change="changeAcc(item.name)" v-model="temporary"  size="mini" class="select" :placeholder="item.docs" :disabled="!switchAcc2[k] && item.type=='optional'" clearable>
              <el-option
                v-for="(item,i) in accounts"
                :key="item.address"
                :label="item.address"
                :value="i">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="22" v-else-if="item.name=='expiry'">
            <el-date-picker
              :disabled="!switchAcc2[k] && item.type=='optional'"
              class="picker"
              @change="(val)=>changePic(val)"
              v-model="switchAcc[k]"
              type="datetime"
              :placeholder="item.docs">
            </el-date-picker>
          </el-col>
          <el-col :span="22" v-else>
            <el-input @change="(val)=>changeAtt(val,item.name,item)" v-model="switchAcc[k]" :placeholder="item.docs" class="inputSize" :disabled="!switchAcc2[k] && item.type=='optional'" clearable></el-input>
          </el-col>
          <el-col :span="1" v-if="item.type=='optional'">
            <el-switch
              v-model="switchAcc2[k]"
              @change="val=>changeSwi(val,item.name)"
              active-color="#13ce66">
            </el-switch>
          </el-col>
        </el-row>
      </el-form>  

      <div v-for="(item,i) in htmlString" :key="i" class="preBox">
        <el-row v-show="item" :gutter="20">
          <el-col :span="23">
            <pre>{{item}}</pre>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script>
import json from "./json"
import { BigNumber } from '@polymeshassociation/polymesh-sdk'
export default {
  name: 'App',
  components: {

  },
  data(){
    return{
      loading:true,
      options:json, // json数据
      client:0,// 当前client数据
      proapi:0, //当前选择的方法
      accounts:[],
      temporary:undefined,
      switchAcc:[],
      switchAcc2:[],
      form:{
        address:""
      },
      htmlString:[],
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    // 查找所有账号
    async init(){
      if(this.polymesh){
        const accounts = await this.polymesh.accountManagement.getSigningAccounts()
        this.accounts = accounts
        this.loading = false
      }else{
        setTimeout(()=>{
          this.init()
        },100)
      }
    },
    // 查询功能
    async search(){
      try{
        const OneObj=this.options[this.client]
        const OneName = OneObj.name
        const TwoObj=this.options[this.client].children[this.proapi]
        const TwoName = TwoObj.name
        let objectJSON = await this.polymesh[OneName][TwoName](this.form)
        if(objectJSON.hasRun===false){
          const runDate=await objectJSON.run()
          this.htmlString.unshift(this.setDate(runDate))
        }else{
          this.htmlString.unshift(this.setDate(objectJSON))
        }
      }catch(err){
        this.htmlString.unshift(err)
      }
    },
    // 显示数据：去除循环数据
    setDate(obj){
      obj.__proto__=null
      const stringJSON = JSON.stringify(obj,function(key,val){
        if(key=="context"){ return undefined }
        if(key=="parent"){ return undefined }
        return val
      },4)
      return stringJSON
    },
    // 修改账号
    changeAcc(name){
      this.form[name]=this.accounts[this.temporary]
    },
    // 清除数据
    changeSwi(val,name){
      if(!val){
        delete this.form[name]
      }
      if(name=='account'){
        this.temporary = undefined      
      }
    },
    // 修改数据
    changeAtt(val,name,item){
      if(item.datetype=='BigNumber'){
        this.form[name]=new BigNumber(val)
      }else{
        this.form[name]=val
      }
    },
    changePic(val){
      this.form[name]=val
    },
    //重置数据
    changeClient(){
      this.proapi=0
      this.form={}
    },
    changeProapi(){
      this.form={}
    },

  },
}
</script>

<style scoped>
#app{padding:15px}
.title{margin-bottom:10px}
.select,.picker{
  width:100%!important;
  height: 36px;
  line-height: 36px;
}
.select /deep/ input{
  height:36px;
}
.picker >>> input{
  height:100%;
}
.forBox,.preBox{
  margin-bottom: 20px;
}
.inputSize{
  height: 36px;
  line-height: 36px;
}
.inputSize >>> input{
  height: 100%;
}
.botton{
  border-radius: 50%;
  height: 36px;
  line-height: 36px;
  padding: 0 10px!important;
}
.el-row {
  margin-bottom: 20px;
  background: #eee;
  padding: 5px 0;
  display: flex;
  align-items: center;
}
.el-row:last-child{
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
