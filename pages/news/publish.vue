<template>
  <view class="page">
    <view class="feedback-body">
			<textarea placeholder="请输入摘要..." style="border-bottom:1px solid   #F1F1F3;" v-model="sendDate.content"
                class="feedback-textare"/>
      <choose :count="count" :imgList="imgList" @changes="fileChange"></choose>
      <compress ref="compress" :maxwh="maxwh" :quality="quality"></compress>
    </view>

  </view>
</template>

<script>
import Utils from "/config/utils.js";
import choose from "../../components/template/image/choose.vue"
import compress from "../../components/template/image/compress.vue"

export default {
  name: 'newsPublish',
  components: {
    choose,
    compress
  },
  data() {
    return {
      count: 6,
      imgList: [],
      maxwh: 280,
      quality: 1,

      sendDate: {
        score: 0,
        content: "",
        contact: ""
      }
    }
  },
  onLoad() {
    if (!Utils.hasLogin()){
      Utils.toLogin();
    }
  },
  methods: {
    fileChange(e) {
      this.imgList = e;
    },
  }
}
</script>

<style>
page {
  background-color: #EFEFF4;
}

.input-view {
  font-size: 28 upx;
}

.close-view {
  text-align: center;
  line-height: 14px;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #FF5053;
  color: #FFFFFF;
  position: absolute;
  top: -6px;
  right: -4px;
  font-size: 12px;
}
</style>
