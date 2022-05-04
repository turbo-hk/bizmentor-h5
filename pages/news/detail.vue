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
								<uni-col :span="12"><text>{{data.income.min}} ～ {{data.income.max}} 元</text></uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.payBack">
								<uni-col :span="10" :offset="1"><text>投资回报周期：</text></uni-col>
								<uni-col :span="12"><text>{{data.payBack.min}} ～ {{data.payBack.max}} 个月</text>
								</uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.operationMode">
								<uni-col :span="10" :offset="1"><text>运作模式：</text></uni-col>
								<uni-col :span="12"><text>{{data.operationMode.label}}</text></uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.skilled">
								<uni-col :span="10" :offset="1"><text>行业经验和技能要求：</text></uni-col>
								<uni-col :span="12"><text>{{data.skilled.label}}</text></uni-col>
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
							<view class="pay-message" v-if="showPay">
								<view class="pay-message-text text-center" @click="pay"><text>¥{{data.readIncome}}元，阅读全文
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
		<view class="post-footer">
			<view class="footer_content">
				<text>转发</text>
			</view>
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
				showPay: 1,
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
						if (that.makePublic == 0) {
							that.showPay = true;
						}
					},
					function() {

					})
			},
			formatRichText(content) {
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

			}
		}
	}
</script>

<style>
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

	.title-content {
		font-size: 10px;
		color: #330000;
	}

	/* 描述 额外文本 */
	.uni-note {
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
	}

	.text-center {
		text-align: center;
	}

	.pay-message-text {
		color: #f8b35a;
	}

	.pay-message-button-area {
		background-color: #0f1f38;
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
		text-align: center;
		line-height: 36px;
	}

	rich-text .img_class {
		width: 100%;
		height: auto;

	}
</style>
