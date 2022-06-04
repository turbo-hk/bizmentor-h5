<template>
	<view class="u-page">
		<u--form labelPosition="left" :model="formField" :rules="rules" ref="form1">
			<u-form-item label="频道" prop="channel" borderBottom @click="formInitData.channel.show = true;" ref="item1">
				<u--input v-model="formField.channelField" disabled disabledColor="#ffffff" placeholder="请选择频道"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
				<u-picker :show="formInitData.channel.show" :columns="formInitData.channel.data" keyName="label"
					@cancel="formInitData.channel.show = false" @confirm="formChannelSelect"></u-picker>
			</u-form-item>
			<u-form-item label="标题" prop="title" borderBottom ref="item1">
				<u--input v-model="formField.title" border="none" placeholder="请输入标题"></u--input>
			</u-form-item>
			<u-form-item label="项目图片" prop="thumbnailImage">
				<u-upload :fileList="formInitData.thumbnailImage.files" @afterRead="afterRead" @delete="deletePic"
					name="5" multiple :maxCount="1"></u-upload>
			</u-form-item>
			<u-form-item label="行业分类" prop="industry" borderBottom @click="formInitData.industry.show = true;"
				ref="item1">
				<u--input v-model="formField.industryField" disabled disabledColor="#ffffff" placeholder="请选择行业分类"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
				<u-picker :show="formInitData.industry.show" :columns="formInitData.industry.data" keyName="label"
					@cancel="formInitData.channel.show = false" @confirm="formIndustrySelect">
				</u-picker>
			</u-form-item>
			<u-form-item label="案例类型" prop="caseType" borderBottom @click="formInitData.caseType.show = true;"
				v-show="formField.channel == dictType.channelCase" ref="item1">
				<u--input v-model="formField.caseTypeField" disabled disabledColor="#ffffff" placeholder="请选择案例类型"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
				<u-picker :show="formInitData.caseType.show" :columns="formInitData.caseType.data" keyName="label"
					@cancel="formInitData.caseType.show = false" @confirm="formCaseTypeSelect"></u-picker>
			</u-form-item>
			<u-form-item label="案例发生时间（年）" prop="caseYear" borderBottom @click="formInitData.caseYear.show = true;"
				v-show="formField.channel == dictType.channelCase" ref="item1">
				<u--input v-model="formField.caseYearField" disabled disabledColor="#ffffff" placeholder="请选择案例发生时间"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
				<u-datetime-picker :show="formInitData.caseYear.show" title="请选择年份" mode="year-month"
					:formatter="caseYearFormatter" @cancel="formInitData.caseYear.show = false"
					@confirm="formCaseYearConfirm">
				</u-datetime-picker>
			</u-form-item>
			<u-form-item label="干货类型" prop="courseType" borderBottom @click="formInitData.courseType.show = true;"
				v-show="formField.channel == dictType.channelCourse" ref="item1">
				<u--input v-model="formField.courseTypeField" disabled disabledColor="#ffffff" placeholder="请选择干货类型"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
				<u-picker :show="formInitData.courseType.show" :columns="formInitData.courseType.data" keyName="label"
					@cancel="formInitData.courseType.show = false" @confirm="formCourseTypeSelect"></u-picker>
			</u-form-item>
			<u-form-item label="技能储备要求" prop="technical" borderBottom @click="formInitData.technical.show = true;"
				v-show="formField.channel == dictType.channelCourse" ref="item1">
				<u--input v-model="formField.technicalField" disabled disabledColor="#ffffff" placeholder="请选择技能储备要求"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
				<u-picker :show="formInitData.technical.show" :columns="formInitData.technical.data" keyName="label"
					@cancel="formInitData.technical.show = false" @confirm="formTechnicalSelect"></u-picker>
			</u-form-item>

			<u-form-item label="行业经验和技能要求" prop="skilled" borderBottom @click="formInitData.skilled.show = true;"
				v-show="formField.channel == dictType.channelProject" ref="item1">
				<u--input v-model="formField.skilledField" disabled disabledColor="#ffffff" placeholder="请选择行业经验和技能要求"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
				<u-picker :show="formInitData.skilled.show" :columns="formInitData.skilled.data" keyName="label"
					@cancel="formInitData.skilled.show = false" @confirm="formSkilledSelect"></u-picker>
			</u-form-item>
			<u-form-item label="运作模式" prop="operationMode" borderBottom @click="formInitData.operationMode.show = true;"
				v-show="formField.channel == dictType.channelProject" ref="item1">
				<u--input v-model="formField.operationModeField" disabled disabledColor="#ffffff" placeholder="请选择运作模式"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
				<u-picker :show="formInitData.operationMode.show" :columns="formInitData.operationMode.data"
					keyName="label" @cancel="formInitData.operationMode.show = false"
					@confirm="formOperationModeSelect"></u-picker>
			</u-form-item>
			<u-form-item label="适用区域" prop="region" borderBottom v-show="formField.channel == dictType.channelProject"
				ref="item1">
				<u--input v-model="formField.region" border="none" placeholder="请输入适用区域"></u--input>
			</u-form-item>
			<u-form-item label="启动资金(元)" prop="startAmount" borderBottom
				v-show="formField.channel == dictType.channelProject" ref="item1">
				<u-number-box v-model="formField.startAmountMin" :step="0.01" :min="0" :max="999999999"
					:decimalLength="2" :inputWidth="150"></u-number-box> 至
				<u-number-box v-model="formField.startAmountMax" :step="0.01" :min="0" :max="999999999"
					:decimalLength="2" :inputWidth="150"></u-number-box>
			</u-form-item>
			<u-form-item label="投资回报周期(月)" prop="payBack" borderBottom
				v-show="formField.channel == dictType.channelProject" ref="item1">
				<u-number-box v-model="formField.payBackMin" :step="0.01" :min="0" :max="999999999" :decimalLength="2"
					:inputWidth="150"></u-number-box> 至
				<u-number-box v-model="formField.payBackMax" :step="0.01" :min="0" :max="999999999" :decimalLength="2"
					:inputWidth="150"></u-number-box>
			</u-form-item>
			<u-form-item label="单次浏览收益(元)" prop="readIncome" borderBottom ref="item1">
				<u-number-box v-model="formField.readIncome" :step="0.01" :min="0" :max="999999999" :decimalLength="2"
					:inputWidth="150"></u-number-box>
			</u-form-item>
			<u-form-item label="文章免费阅读比例(%)" prop="showPercent" borderBottom v-show="formField.readIncome > 0"
				ref="item1">
				<u-slider v-model="formField.showPercent" :step="0.01" min="0" max="100" :showValue="true"
					customStyle="width:100%"></u-slider>
			</u-form-item>
			<u-form-item label="摘要" prop="abstractContent" ref="item1">
				<editor1 @getContents="getAbstractContent" class="bg" style="height: 15vh;"></editor1>
			</u-form-item>
			<u-form-item label="正文" prop="content" ref="item1">
				<editor1 @getContents="getContent" class="bg" style="height: 30vh;"></editor1>
			</u-form-item>
			<u-form-item label="状态" prop="status" borderBottom ref="item1">
				<u-radio-group v-model="formField.statusField" placement="row">
					<u-radio :customStyle="{marginLeft: '18px'}" v-for="(item, index) in formInitData.status.data"
						:key="index" :label="item.name" :name="item.name" @change="statusChange(item)">
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="点赞数" prop="likesCount" borderBottom ref="item1">
				<u-number-box v-model="formField.likesCount" :step="1" :min="0" :max="999999999" :decimalLength="0"
					:inputWidth="150"></u-number-box>
			</u-form-item>
			<u-form-item label="阅读次数" prop="readCount" borderBottom ref="item1">
				<u-number-box v-model="formField.readCount" :step="1" :min="0" :max="999999999" :decimalLength="0"
					:inputWidth="150"></u-number-box>
			</u-form-item>
			<u-form-item label="作者" prop="author" ref="item1">
				<u--input v-model="formField.author" border="none" placeholder="请输入作者"></u--input>
			</u-form-item>

		</u--form>
		<u-button @click="submit">提交</u-button>

		<!-- 底部导航栏 -->
		<app-footer :index="1"></app-footer>
	</view>
</template>

<script>
	import Footer from '@/pages/common/footer-tabbar.vue';
	import editor1 from '../../components/editor/editor.vue'
	import {
		uploadImg,
		getDict,
		createContent
	} from "@/config/api.js";
	import {
		toIndex
	} from "@/common/js/util.js"
	export default {
		data() {
			return {
				dictType: {
					channelCase: "business_case",
					channelCourse: "business_course",
					channelProject: "business_project"
				},
				formField: {
					channelField: undefined,
					channel: undefined,
					title: undefined,
					thumbnailImage: undefined,
					industry: undefined,
					industryField: undefined,
					channelCase: undefined,
					channelCaseField: undefined,
					caseType: undefined,
					caseTypeField: undefined,
					caseYear: undefined,
					caseYearField: undefined,
					courseType: undefined,
					courseTypeField: undefined,
					technical: undefined,
					technicalField: undefined,
					skilled: undefined,
					skilledField: undefined,
					operationMode: undefined,
					operationModeField: undefined,
					region: undefined,
					startAmountMin: undefined,
					startAmountMax: undefined,
					payBackMin: undefined,
					payBackMax: undefined,
					readIncome: undefined,
					showPercent: 10,
					abstractContent: undefined,
					content: undefined,
					statusField: undefined,
					status: undefined,
					likesCount: undefined,
					readCount: undefined,
					author: undefined
				},
				formInitData: {
					channel: {
						show: false,
						data: [
							[{
								label: "创业项目",
								dictType: "business_project"
							}, {
								label: "实战案例",
								dictType: "business_case"
							}, {
								label: "干货分享",
								dictType: "business_course"
							}]
						]
					},
					industry: {
						show: false,
						data: [
							[]
						]
					},
					caseType: {
						show: false,
						data: [
							[]
						]
					},
					courseType: {
						show: false,
						data: [
							[]
						]
					},
					technical: {
						show: false,
						data: [
							[]
						]
					},
					skilled: {
						show: false,
						data: [
							[]
						]
					},
					operationMode: {
						show: false,
						data: [
							[]
						]
					},
					status: {
						show: false,
						data: [{
							name: "立即发布",
							value: "PUSHED"
						}, {
							name: "暂不发布",
							value: "PENDING"
						}]
					},
					caseYear: {
						show: false,
					},
					thumbnailImage: {
						files: []
					},
				},
				rules: {
					'channel': {
						type: 'string',
						required: true,
						message: '请选择频道',
						trigger: ['blur', 'change']
					},
					'title': {
						type: 'string',
						required: true,
						message: '请输入标题',
						trigger: ['blur', 'change']
					},
					'thumbnailImage': {
						type: 'string',
						required: true,
						message: '请上传图片',
						trigger: ['blur', 'change']
					},
					'industry': {
						type: 'string',
						required: true,
						message: '请选择行业分类',
						trigger: ['blur', 'change']
					},
					'status': {
						type: 'string',
						required: true,
						message: '"状态：不能为空',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		components: {
			'app-footer': Footer,
			editor1,
		},
		onLoad() {
			getDict({
				"dictType": "business_assist_content_industry"
			}).then(res => {
				this.formInitData.industry.data = [res.data.list];
			});

			getDict({
				"dictType": "business_assist_content_skilled"
			}).then(res => {
				this.formInitData.skilled.data = [res.data.list];
			});
			getDict({
				"dictType": "business_assist_content_operation_mode"
			}).then(res => {
				this.formInitData.operationMode.data = [res.data.list];
			});
			getDict({
				"dictType": "business_assist_content_case_type"
			}).then(res => {
				this.formInitData.caseType.data = [res.data.list];
			});
			getDict({
				"dictType": "business_assist_content_channel_course_type"
			}).then(res => {
				this.formInitData.courseType.data = [res.data.list];
			});
			getDict({
				"dictType": "business_assist_content_channel_course_technical"
			}).then(res => {
				this.formInitData.technical.data = [res.data.list];
			});
		},
		methods: {
			formChannelSelect(e) {
				let data = e.value[0];
				this.formField.channel = data.dictType;
				this.formField.channelField = data.label;
				this.formInitData.channel.show = false;
				this.$refs.form1.validateField('channel');
			},
			formIndustrySelect(e) {
				let data = e.value[0];
				this.formField.industry = data.dictType;
				this.formField.industryField = data.label;
				this.formInitData.industry.show = false;
				this.$refs.form1.validateField('industry')
			},
			formCaseTypeSelect(e) {
				let data = e.value[0];
				this.formField.caseType = data.dictType;
				this.formField.caseTypeField = data.label;
				this.formInitData.caseType.show = false;
			},
			caseYearFormatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				return value
			},
			formCaseYearConfirm(e) {
				let date = new Date();
				date.setTime(e.value);
				let year = date.getFullYear();
				this.formField.caseYear = year;
				this.formField.caseYearField = year + "年";
				this.formInitData.caseYear.show = false;
			},
			formCourseTypeSelect(e) {
				let data = e.value[0];
				this.formField.courseType = data.dictType;
				this.formField.courseTypeField = data.label;
				this.formInitData.courseType.show = false;
			},
			formTechnicalSelect(e) {
				let data = e.value[0];
				this.formField.technical = e.dictType;
				this.formField.technicalField = e.label;
				this.formInitData.technical.show = false;

			},
			formSkilledSelect(e) {
				let data = e.value[0];
				this.formField.skilled = data.dictType;
				this.formField.skilledField = data.label;
				this.formInitData.skilled.show = false;

			},
			formOperationModeSelect(e) {
				let data = e.value[0];
				this.formField.operationMode = data.dictType;
				this.formField.operationModeField = data.label;
				this.formInitData.operationMode.show = false;
			},
			statusChange(e) {
				console.log(e.value)
				this.formField.status = e.value;
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					uni.$u.toast('校验通过')
					console.log(this.formField);
					createContent(this.formField).then(res => {
						console.log(res);
						if (res.code === 0) {
							toIndex();
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			// 删除图片
			deletePic(event) {
				this.formInitData.thumbnailImage.files.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				console.log(lists)
				let fileListLen = this.formInitData.thumbnailImage.files.length
				lists.map((item) => {
					this.formInitData.thumbnailImage.files.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.formInitData.thumbnailImage.files[fileListLen]
					this.formInitData.thumbnailImage.files.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				let _this = this;
				uploadImg(url).then(res => {
					_this.formField.thumbnailImage = JSON.parse(res).data;
					console.log(this.formField)
				})
			},
			getAbstractContent(html) {
				this.formField.abstractContent = html;
			},
			getContent(html) {
				this.formField.content = html;
			},
			convertDictData(resList) {},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	.u-page {
		margin-top: 15rpx;
		padding: 0 30rpx;
	}
</style>
