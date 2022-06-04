<template>
	<view class="container">
		<view class="title">{{ title }}</view>
		<form @submit="formSubmit" @reset="formReset">
			<!-- 频道 -->
			<uni-data-select :clear=true v-model="resetFormData.channel" :localdata="formInit.channel"
				@change="bindPickerChange"></uni-data-select>
<!-- 标题 -->
			<view class="uni-form-item uni-column">
				<uni-easyinput class="uni-mt-5" trim="all" v-model="resetFormData.title" placeholder="请输入标题">
				</uni-easyinput>
			</view>
			<!-- 图 -->
			<uni-file-picker 
				v-model="resetFormData.thumbnailImage" 
				fileMediatype="image" 
				mode="grid" 
				limit=1
				title="项目图标"
				@select="uploadImage" 
			/>
		</form>
		<editor1 :store_detail="store_detail" @getContents="getContents" class="bg" style="height: 60vh;"></editor1>

	</view>
</template>

<script>
	import Utils from "/config/utils.js";
	import editor1 from '../../components/editor/editor.vue'
	import {
		msg
	} from '/common/js/util.js';
	export default {
		components: {
			editor1
		},
		data() {
			return {
				title: "发布内容",
				store_detail: '开始输入...',
				formInit: {
					channel: [{
						text: "创业项目",
						value: "business_project"
					}, {
						text: "实战案例",
						value: "business_case"
					}, {
						text: "干货分享",
						value: "business_course"
					}],
					channelIndex: 0,
				},
				resetFormData: {
					channel: undefined,
					title: undefined,
				},
				formDataRule: {

				}
			}
		},
		methods: {
			getContents(html) {
				this.store_detail = html
			},
			formSubmit(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset() {

			},
			bindPickerChange(mode) {
				msg(mode);
			},
			uploadImage(e) {
				console.log(e)
				let formData = new FormData();
					formData.append('file', file);
				const API_HEADER = Utils.apiHeaders("multipart/form-data");
				uni.request({
					url: "http://192.168.31.33:48080/app-api/infra/file/upload",
					method: 'POST',
					header: API_HEADER,
					data: {
						file: e.tempFiles[0].file
					},
					function(res) {
						console.log(res)
					},
					function(res) {
						console.log(res)
					}
				});
			},
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.title {
		padding: 20px 15px;
		padding-bottom: 0;
		text-align: center;
		font-weight: bold;
	}
</style>
