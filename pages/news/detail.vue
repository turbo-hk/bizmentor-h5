<template>
	<view class="article">
		<view class="article-title">{{ title }}</view>
		<template v-if="data">
			<uni-list :border="false">
				<uni-list-item>
					<template v-slot:body>
						<view class="header-content">
							<uni-row :gutter="gutter" :width="nvueWidth" class="title-content">
								<uni-col :span="23" :offset="1" v-if="data.channel">
									<text>频道: {{data.channel.label}}&nbsp;&nbsp;</text>
									<text>日期:
										<uni-dateformat :date="data.bizTime" format="yyyy年MM月dd日" />
										&nbsp;&nbsp;
									</text>
									<text>阅读: {{data.readCount}} &nbsp;&nbsp;</text>
									<text>点赞: {{data.likesCount}} &nbsp;&nbsp;</text>
								</uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" class="text-center author">
								<uni-col :span="24">
									<text>作者：{{data.author}}</text>
								</uni-col>
							</uni-row>

							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.industry">
								<uni-col :span="10" :offset="1"><text>行业分类：</text></uni-col>
								<uni-col :span="12"><text>{{data.industry.label}}</text></uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.region">
								<uni-col :span="10" :offset="1"><text>适用区域：</text></uni-col>
								<uni-col :span="12"><text>{{data.region}}</text></uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.startAmount">
								<uni-col :span="10" :offset="1"><text>启动资金：</text></uni-col>
								<uni-col :span="12"><text>{{data.startAmount.min}}～{{data.startAmount.max}} 元</text>
								</uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.income">
								<uni-col :span="10" :offset="1"><text>月收入预期：</text></uni-col>
								<uni-col :span="12"><text>{{data.income.min}} ～ {{data.income.max}} 元</text>
								</uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.payBack">
								<uni-col :span="10" :offset="1"><text>投资回报周期：</text></uni-col>
								<uni-col :span="12"><text>{{data.payBack.min}} ～ {{data.payBack.max}} 个月</text>
								</uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth"
								v-if="data.operationMode && data.operationMode.label">
								<uni-col :span="10" :offset="1"><text>运作模式：</text></uni-col>
								<uni-col :span="12"><text>{{data.operationMode.label}}</text></uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.skilled && data.skilled.label">
								<uni-col :span="10" :offset="1"><text>行业经验和技能要求：</text></uni-col>
								<uni-col :span="12"><text>{{data.skilled.label}}</text></uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.caseType && data.caseType.label">
								<uni-col :span="10" :offset="1"><text>案例类型：</text></uni-col>
								<uni-col :span="12"><text>{{data.caseType.label}}</text></uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.caseYear">
								<uni-col :span="10" :offset="1"><text>案例发生时间：</text></uni-col>
								<uni-col :span="12"><text>{{data.caseYear}} 年</text></uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth"
								v-if="data.courseType && data.courseType.label">
								<uni-col :span="10" :offset="1"><text>干货类型：</text></uni-col>
								<uni-col :span="12"><text>{{data.courseType.label}}</text></uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.technical && data.technical.label">
								<uni-col :span="10" :offset="1"><text>技能储备要求：</text></uni-col>
								<uni-col :span="12"><text>{{data.technical.label}}</text></uni-col>
							</uni-row>
						</view>
					</template>
				</uni-list-item>
				<view class="content-title">
					<uni-section title="摘要" type="line" />
				</view>
				<uni-list-item :border="false" v-if="data.abstractContent">
					<template v-slot:body>
						<view class="content-body">
							<rich-text type="text" :nodes="nodes_abstract_content"></rich-text>
						</view>
					</template>
				</uni-list-item>

				<view class="content-title">
					<uni-section title="正文" type="line" />
				</view>
				<uni-list-item :border="false">
					<template v-slot:body>
						<view class="content-body">
							<rich-text type="text" :nodes="nodes_content"></rich-text>
							<view class="pay-message" v-if="showPay === true">
								<view class="pay-message-text text-center" @click="pay">
									<text>¥{{data.readIncome}}元，阅读全文
										》</text>
								</view>
								<view class="pay-message-text text-center"><text>加入会员，免费阅读</text></view>
								<view class="pay-message-button-area text-center">
									<view class="pay-message-text">你也可以分享你的项目来赚钱！</view>
									<button type="primary" class="share-button" plain="true">立即去分享</button>
								</view>
							</view>

						</view>

					</template>
				</uni-list-item>
			</uni-list>
		</template>

		<!-- 底部 -->
		<view class="footer">
			<view @click.stop="footerClick('喜欢')">
				<uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
				<text class="footer-box__item">喜欢</text>
			</view>
			<view @click.stop="footerClick('评论')"><text class="footer-box__item">评论</text></view>
			<view @click.stop="footerClick('分享')"><text class="footer-box__item">分享</text></view>
		</view>

	</view>
</template>

<script>
	import Utils from "/config/utils.js";

	export default {
		data() {
			return {
				id: "",
				title: 'title',
				data: {},
				gutter: 0,
				nvueWidth: 730,
				nodes_abstract_content: '',
				nodes_content: '',
				showPay: false,
			}

		},
		onLoad(event) {
			if (event.id) {
				this.id = event.id
			}
			if (event.title) {
				this.title = event.title
				uni.setNavigationBarTitle({
					title: event.title
				})
			}

		},
		onReady() {
			if (this.id) { // ID 不为空，则发起查询
				this.loadOne();
			} else {
				uni.showToast({
					icon: 'none',
					title: "加载成功"
				})
			}
		},
		methods: {
			loadOne() {
				const that = this;
				Utils.getData('/content/detail?id=' + that.id, {},
					function(res) {
						that.data = res.data;
						that.nodes_content = that.formatRichText(that.data.content);
						that.nodes_abstract_content = that.formatRichText(that.data.abstractContent);
						if (that.makePublic === 0) {
							that.showPay = true;
						}
					},
					function() {

					})
			},
			formatRichText(content) {
				if (!content || content.length == 0) {
					return content;
				}
				content = content.replace(/&quot;/g, '"');
				content = content.replace(/&amp;/g, '&');
				content = content.replace(/&lt;/g, '<');
				content = content.replace(/&gt;/g, '>');
				content = content.replace(/&nbsp;/g, ' ');
				content = content.replace(/<p/gi, '<p class="p_class" ');
				content = content.replace(/<span/gi, '<span class="span_class" ');
				content = content.replace(/<img/gi, '<img class="img_class" ');
				return content;
			},
			pay() {
				if (!Utils.hasLogin()) {
					Utils.toLogin();
					return;
				}
			},
			footerClick(types) {
				uni.showToast({
					title: types,
					icon: 'none'
				});
			}
		}
	}
</script>

<style>
	.article {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		background-color: rgb(241, 241, 241);
		line-height: 45rpx;
	}

	.footer-box__item {
		font-size: 16px;
		color: #666;
	}

	.article-title {
		padding: 20px 15px;
		padding-bottom: 0;
		text-align: center;
		font-weight: bold;
	}

	.header-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 14px;
	}

	/* 标题 */
	.uni-title {
		display: flex;
		margin-bottom: 5px;
		font-size: 14px;
		font-weight: bold;
		color: #3b4144;
	}

	/* 描述 额外文本 */
	.title-content {
		color: #999;
		font-size: 12px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.content-title {
		width: 100%;
	}

	uni-section {
		height: 60%;
	}

	.button-sp-area {
		width: 100%;
		height: 100rpx;
		background-color: #999;
	}

	.content-body {
		overflow: auto;
		margin-bottom: 100rpx;
	}

	.text-center {
		text-align: center;
	}

	.pay-message-text {
		color: #f8b35a;
		line-height: 55rpx;
	}

	.pay-message-button-area {
		padding-top: 15rpx;
		padding-bottom: 15rpx;
	}

	.uni-row {
		line-height: 30px;
	}

	.author {
		font-weight: bold;
	}

	.share-button {}

	rich-text {
		width: 100%;
		margin: 16rpx auto;
		position: relative;
		display: block;

	}

	rich-text .span_class {
		width: 100%;
		font-size: 16px;
		line-height: 36px;

	}

	rich-text .p_class {
		width: 100%;
		font-size: 18px;
		line-height: 36px;
	}

	rich-text .ql-align-center {
		text-align: center;
		line-height: 48px;
	}

	rich-text .img_class {
		width: 100%;
		height: auto;
	}
</style>
