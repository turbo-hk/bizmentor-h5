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
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.startAmount && data.startAmount.isEmpty == false">
								<uni-col :span="10" :offset="1"><text>启动资金：</text></uni-col>
								<uni-col :span="12"><text>{{data.startAmount.min}}～{{data.startAmount.max}} 元</text>
								</uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.income && data.income.isEmpty == false">
								<uni-col :span="10" :offset="1"><text>月收入预期：</text></uni-col>
								<uni-col :span="12"><text>{{data.income.min}} ～ {{data.income.max}} 元</text>
								</uni-col>
							</uni-row>
							<uni-row :gutter="gutter" :width="nvueWidth" v-if="data.payBackm && data.payBackm.isEmpty == false">
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
							<view class="pay-message" v-if="data.makePublic === 0">
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
			<view @click.stop="footerClick('转发')">
				<text class="footer-box__item">
					<uni-icons custom-prefix="iconfont" type="icon-31zhuanfa" size="20"></uni-icons>
					转发
				</text>
			</view>
			<view @click.stop="footerClick('暂未开通')">
				<text class="footer-box__item">
					<uni-icons custom-prefix="iconfont" type="icon-31pinglun" size="20"></uni-icons>
					评论
				</text>
			</view>
			<view @click.stop="footerClick('点赞')">
				<text class="footer-box__item">
					<uni-icons custom-prefix="iconfont" type="icon-dianzan" size="20"></uni-icons>
					点赞
				</text>
			</view>
		</view>

	</view>
</template>

<script>
	import Utils from "/config/utils.js";
	import Config from "/config/index.js";

	export default {
		data() {
			return {
				id: undefined,
				title: 'title',
				data: {},
				gutter: 0,
				nvueWidth: 730,
				nodes_abstract_content: '',
				nodes_content: '',
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
			const that = this;
			let pageUrl = location.href;
			Utils.postForm("/member/wx-mp/create-jsapi-signature", {
				url: pageUrl
			}, function(res) {
				that.init(res.data);
			}, function(){

			})

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
				const that = this;
				let pageUrl = location.href;
				Utils.postData("/content/pay/create", {
					id: that.id
				}, function(res) {
					console.log(res)
					if (res.code === 0) {
						that.init(res.data);
						wx.chooseWXPay({
						  timestamp: res.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						  nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
						  package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						  signType: '', // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
						  paySign: '', // 支付签名
						  success: function (res) {
						    // 支付成功后的回调函数
						  }
						});
					}
				}, function() {})

			},
			footerClick(types) {
				uni.showToast({
					title: types,
					icon: 'none'
				});
			},
			init(e) {
				let _this = this;
				console.log(e)
				jWeixin.config({
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: e.appId, // 必填，公众号的唯一标识
					timestamp: e.timestamp, // 必填，生成签名的时间戳
					nonceStr: e.nonceStr, // 必填，生成签名的随机串
					signature: e.signature, // 必填，签名
					jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
				});
				jWeixin.ready(function(){
				  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					console.log('微信支付验证通过')
				});
				jWeixin.error(function(res){
				  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					console.log("微信验证失败")
				});
				jWeixin.checkJsApi({
				  jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				  success: function(res) {
				  // 以键值对的形式返回，可用的api值true，不可用为false
				  // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				  console.log("微信检测JS接口结果", res)
				  }
				});




			},
		}
	}
</script>

<style lang="scss" scoped>
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
		line-height: 100rpx;
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
	
	rich-text br{
		line-height: 50rpx;
	}
</style>
