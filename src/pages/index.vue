<template>
  <div id="pageQuiList" >
    <div id="filelist">
      <span><qui-btn msg="获取文件列表" class="small" v-on:click.native="getFilesList"></qui-btn></span>
      <el-date-picker v-model="selectDate" type="date" placeholder="选择日期" value-format="timestamp"></el-date-picker>
    </div>
    <div id="local">
      <input type="radio" v-model='islocal' value=0 @click="radioChange" checked> 远程
      <input type="radio" v-model='islocal' value=1 @click="radioChange"> 本地
    </div>
    <div v-for="item in list" :key="item" >
      <qui-list :tipsText="item" msg="下载" @clickMethod="onDownload"></qui-list>
    </div>
  </div>
</template>

<script>
import quiList from '../components/quiList.vue'
import quiBtn from '../components/quiButton.vue'
import {getPathUrl, getFileUrl, setLocal} from './config.js'

export default {
  name: 'pageQuiList',
  data () {
    return {
      list: [],
      islocal: 0,
      selectDate: new Date().getTime()
    }
  },
  components: {
    'qui-list': quiList,
    'qui-btn': quiBtn
  },
  methods: {
    test: function () {
      alert('我是自定义的方法')
    },
    radioChange: function (event) {
      setLocal(event.target.value)
    },

    getFilesList: function () {
      this.$http.get(getPathUrl(),
        {params: {date: this.selectDate}}).then(function (res) {
        if (res.body.code !== 0) {
          alert('error msg:' + res.body.msg)
          return
        }
        this.list = res.body.msg
      }, function (response) {
        this.list = []
        alert(response.status)
      })
    },

    onDownload: function (item) {
      this.$http.get(getFileUrl(),
        {params: {path: item}}).then(function (response) {
        if (response.body.code != null) {
          alert('error msg:' + response.body.msg)
          return
        }

        let blob = new Blob([response.data], {type: response.headers.get('content-type')})
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'log.txt'
        link.click()
      }, function (response) {
        this.list = []
        alert(response.status)
      })
    }
  },
  beforeCreate: function () {},
  created: function () {},
  beforeMount: function () {},
  mounted: function () {
    console.log(this.$el)
    console.log(this.$children)
    console.log(this.$refs)
    console.log(this.$refs.child1.msg)
  },
  beforeUpdate: function () {},
  beforeDestroy: function () {},
  updated: function () {},
  destroyed: function () {}
}
</script>

<style scoped>

</style>

<!--
<template>
  <div class="mod-module mod-parallel">
    <div class="img-list type-full">
      <div class="img-box">
        <p class="img-item">
          <a class="page-link" href="#/btn">按钮</a>
        </p>
      </div>
      <div class="img-box">
        <p class="img-item">
          <a class="page-link" href="#/list">列表</a>
        </p>
      </div>
      <div class="img-box">
        <p class="img-item">
          <a class="page-link" href="#/nav">导航</a>
        </p>
      </div>
-->
      <!--<div class="img-box">-->
        <!--<p class="img-item">-->
          <!--<a class="page-link" href="#/btn">QUI<br/>按钮</a>-->
        <!--</p>-->
      <!--</div>-->
      <!--<div class="img-box">-->
        <!--<p class="img-item">-->
          <!--<a class="page-link" href="#/btn">QUI<br/>按钮</a>-->
        <!--</p>-->
      <!--</div>-->
      <!--<div class="img-box">-->
        <!--<p class="img-item">-->
          <!--<a class="page-link" href="#/btn">QUI<br/>按钮</a>-->
        <!--</p>-->
      <!--</div>-->
<!--
    </div>
  </div>
</template>

<style scoped>
 @import './css/index.css';
</style>
-->
