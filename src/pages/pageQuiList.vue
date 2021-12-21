<template>
  <div id="pageQuiList" >
    <div id="test">
      <span><qui-btn msg="获取文件列表" class="small" v-on:click.native="getFilesList"></qui-btn></span>
    <div v-for="item in list" :key="item" >
    </div>
      <qui-list :tipsText="item" msg="下载" @clickMethod="onDownload"></qui-list>
    </div>
  </div>
</template>

<script>
import quiList from '../components/quiList.vue'
import quiBtn from '../components/quiButton.vue'
export default {
  name: 'pageQuiList',
  data () {
    return {
      list: ['111', '222']
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

    getFilesList: function () {
      const t = Date.now()
      this.$http.get('http://127.0.0.1:8000/gm/get_log_path',
        {params: {date: t}}).then(function (res) {
        this.list = res.body.msg
      }, function (response) {
        this.list = []
        alert(response.status)
      })
    },

    onDownload: function (item) {
      this.$http.get('http://127.0.0.1:8000/gm/get_log_file',
        {params: {path: item}}).then(function (response) {
        let blob = new Blob([response.data], {type: response.headers.get('content-type')})
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'log'
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
