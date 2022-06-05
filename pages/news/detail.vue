<template>
	<view class="u-page">
		<view class="context">
			<!-- 标题-->
			<view class="article-title">{{ title }}</view>

			<!-- 频道、点赞、阅读 -->
			<u-row v-if="data.channel">
				<u-col span="12">
					<view class="title-content">频道: {{data.channel.label}}&nbsp;&nbsp;
						日期: {{$u.timeFormat(data.bizTim, 'yyyy年mm月dd日')}}
						&nbsp;&nbsp;
						阅读: {{data.readCount}} &nbsp;&nbsp;
						点赞: {{data.likesCount}} &nbsp;&nbsp;</view>
				</u-col>
			</u-row>

			<!-- 作者 -->
			<u-row v-if="data.channel">
				<u-col span="12">
					<u--text align="center" :text="`作者：${data.author}`"></u--text>
				</u-col>
			</u-row>

			<!-- logo -->
			<view class="title-image-div">
				<image mode="widthFix" src="/static/img/title.png" />
			</view>

			<!-- 文章基本信息 -->
			<view>
				<u-row v-if="data.industry">
					<u-col span="6">行业分类：</u-col>
					<u-col span="6">{{data.industry.label}}</u-col>
				</u-row>
				<u-row :gutter="gutter" :width="nvueWidth" v-if="data.region">
					<u-col span="6">适用区域：</u-col>
					<u-col span="6">{{data.region}}</u-col>
				</u-row>
				<u-row v-if="data.startAmount && data.startAmount.empty === false">
					<u-col span="6">启动资金：</u-col>
					<u-col span="6">{{data.startAmount.min}} ～ {{data.startAmount.max}} 元</u-col>
				</u-row>
				<u-row v-if="data.income && data.income.empty === false">
					<u-col span="6">月收入预期：</u-col>
					<u-col span="6">{{data.income.min}} ～ {{data.income.max}} 元</u-col>
				</u-row>
				<u-row v-if="data.payBack && data.payBack.empty === false">
					<u-col span="6">投资回报周期：</u-col>
					<u-col span="6">{{data.payBack.min}} ～ {{data.payBack.max}} 个月</u-col>
				</u-row>
				<u-row v-if="data.operationMode && data.operationMode.label">
					<u-col span="6">运作模式：</u-col>
					<u-col span="6">{{data.operationMode.label}}</u-col>
				</u-row>
				<u-row v-if="data.skilled && data.skilled.label">
					<u-col span="6"> 行业经验和技能要求：</u-col>
						<u-col span="6"> {{data.skilled.label}}</u-col>
				</u-row>
				<u-row v-if="data.caseType && data.caseType.label">
					<u-col span="6"> 案例类型：</u-col>
						<u-col span="6"> {{data.caseType.label}}</u-col>
				</u-row>
				<u-row v-if="data.caseYear">
					<u-col span="6"> 案例发生时间：</u-col>
						<u-col span="6"> {{data.caseYear}} 年</u-col>
				</u-row>
				<u-row :gutter="gutter" :width="nvueWidth" v-if="data.courseType && data.courseType.label">
					<u-col span="6"> 干货类型：</u-col>
						<u-col span="6"> {{data.courseType.label}}</u-col>
				</u-row>
				<u-row :gutter="gutter" :width="nvueWidth" v-if="data.technical && data.technical.label">
					<u-col span="6"> 技能储备要求：</u-col>
						<u-col span="6"> {{data.technical.label}}</u-col>
				</u-row>
			</view>

			<!-- 摘要 -->
			<u-divider text="摘要" textColor="#2979ff" lineColor="#ff0000" textPosition="left"></u-divider>
			<view class="parse-text" v-if="data.abstractContent">
				<u-parse :content="data.abstractContent" :lazyLoad="true" loadingImg="/static/img/title.png"
					:tagStyle="parseStyle"></u-parse>
			</view>

			<!-- 正文-->
			<u-divider text="正文" textColor="#2979ff" lineColor="#ff0000" textPosition="left"></u-divider>
			<view v-if="data.content">
				<view class="parse-text">
					<u-parse :content="data.content" :lazyLoad="true" loadingImg="/static/img/title.png"
						:tagStyle="parseStyle"></u-parse>
					<!-- 支付区域-->
					<view class="hide-preCode-box" v-if="data.makePublic === 0" @click="pay">
						<view class="pay-message-text">
							<text> “成功创业需要投资”</text>
							<text>投资¥{{data.readIncome}}元，阅读全文 >> </text>
							<text>转发1次回本，2次赚钱 </text>
						</view>
					</view>
				</view>
				<!-- 分享区域-->
				<view class="pay-message" v-if="data.makePublic === 0">
					<view class="uni-flex uni-column share-area" @click="fx">
						<view class="flex-item flex-item-V" style="margin-top: 20rpx;"><text
								class="pay-message-text">你也可以通过分享赚钱！</text></view>

						<view class="flex-item flex-item-V">
							<text class="pay-message-text">立即去分享</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部操作按钮 -->
		<view class="footer">
			<view @tap="zf">
				<u--text prefixIcon="share" :iconStyle="footerIconStyle.zf.activite" text="转发"></u--text>
			</view>
			<view @click.stop="sc">
				<u--text prefixIcon="star" :iconStyle="footerIconStyle.sc.activite" text="收藏"></u--text>
			</view>
			<view @click.stop="dz">
				<u--text prefixIcon="thumb-up" :iconStyle="footerIconStyle.dz.activite" text="点赞"></u--text>
			</view>
			<view @click.stop="footerClick('3')">
				<u--text prefixIcon="chat" :iconStyle="footerIconStyle.pl.activite" text="评论"></u--text>
			</view>
		</view>

		<!-- 转发规则 -->
		<view>
			<u-modal :show="zhuanfa.show" :title="zhuanfa.title" @confirm="zf">
				<view class="slot-content">
					<rich-text :nodes="zhuanfa.content"></rich-text>
				</view>
			</u-modal>
		</view>
		<!-- 分享规则 -->
		<view>
			<u-modal :show="fenxiang.show" :title="fenxiang.title" confirmText="返回" @confirm="fx">
				<view class="slot-content">
					<rich-text :nodes="fenxiang.content"></rich-text>
				</view>
			</u-modal>
		</view>
	</view>
</template>
<script>
	import {
		contentDetail,
		createOrder,
		submitOrder,
		wxJsApiSign,
		contentRead,
		contentDianzan,
		contentShoucang
	} from "../../config/api.js";
	import {
		isLogin,
		getUser
	} from "@/common/js/util.js";
	var jWeixin = require('../../node_modules/jweixin-module/lib/index.js');
	export default {
		data() {
			return {
				id: undefined,
				title: undefined,
				data: {},
				gutter: 0,
				nvueWidth: 730,
				currentPay: '0',
				sharedUserId: undefined,
				footerIconStyle: {
					zf: {
						activite: 'font-size: 24px;',
						unChecked: 'font-size: 24px;',
						checked: 'color: #18b566; font-size: 24px;'
					},
					sc: {
						activite: 'font-size: 24px;',
						unChecked: 'font-size: 24px;',
						checked: 'color: #18b566; font-size: 24px;'
					},
					dz: {
						activite: 'font-size: 24px;',
						unChecked: 'font-size: 24px;',
						checked: 'color: #18b566; font-size: 24px;'
					},
					pl: {
						activite: 'font-size: 24px;',
						unChecked: 'font-size: 24px;',
						checked: 'color: #18b566; font-size: 24px;'
					}

				},
				parseStyle: {
					// p: 'font-size:32rpx; line-height:30rpx;',
					// span: 'font-size: 32rpx; line-height:30rpx;',
				},
				zhuanfa: {
					show: false,
					title: "转阅赚钱规则",
					content: "点击右上角的 “...” 分享文章,<span style='color:red;'>你将获得收益</span>。收益比例为：<span style='color:red;'>文章付费金额的50%</span>；" +
						"<br> <br> <span style='color:red;'>先行付费阅读文章，将获得更多流量</span>。<br /> <br />" +
						"<span style='color:#999;'>(转阅赚钱规则平台可根据实际情况适时调整)</span>"
				},
				fenxiang: {
					show: false,
					title: "两种赚钱方式",
					content: "<div style='text-align:center;'><span> 1、转发好文赚钱；</span><br> " +
						"<span> 2、写文章赚钱。</span><br>" 
						+"</div>"
				},
			}
		},
		components: {},
		onLoad(event) {
			if (event.id) {
				this.id = event.id
			}
			//this.id = 50;
			// if (event.title) {
			// 	this.title = event.title
			// 	uni.setNavigationBarTitle({
			// 		title: event.title
			// 	})
			// }
			if (event.shared) {
				this.sharedUserId = event.shared;
			}
			this.loadOne();
			this.read();
		},

		methods: {
			loadOne() {
				const that = this;
				contentDetail({
					"id": that.id,
					"pay": that.currentPay
				}).then(res => {
					that.data = res.data;
					that.title = res.data.title;
					if (that.data.sc > 0) {
						that.footerIconStyle.sc.activite = that.footerIconStyle.sc.checked;
					}
					if (that.data.dz > 0) {
						that.footerIconStyle.dz.activite = that.footerIconStyle.dz.checked;
					}
					that.initWx();
				});
			},
			pay() {
				if (isLogin() === false) {
					return;
				}
				const that = this;
				let pageUrl = location.href;
				createOrder({
					id: that.id,
					"channelId": 18,
					"sharedMemberUserId": that.sharedUserId,
				}).then(res => {
					console.log(res)
					if (res.code === 0) {
						const payOrderId = res.data.payOrderId;
						const openid = getUser().openId;
						console.log('openid', openid, 'payOrderId', payOrderId)
						submitOrder({
							"channelCode": "wx_pub",
							"channelExtras": {
								"openid": openid
							},
							"id": payOrderId
						}).then(res2 => {
							console.log(res2.data)
							const payData = res2.data.invokeResponse;
							jWeixin.chooseWXPay({
								timestamp: payData
									.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								nonceStr: payData.nonceStr, // 支付签名随机串，不长于 32 位
								package: payData
									.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
								signType: payData
									.signType, // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
								paySign: payData.paySign, // 支付签名
								success: function(res3) {
									that.currentPay = "1";
									setTimeout(() => {
										that.loadOne();
									}, 1000)
								}
							});
						})
					}
				});
			},
			footerClick(types) {},
			initWx() {
				const that = this;
				let pageUrl = location.href;
				wxJsApiSign({
					url: pageUrl
				}).then(res => that.init(res.data));
			},
			init(e) {
				let _this = this;
				console.log(e)
				jWeixin.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: e.appId, // 必填，公众号的唯一标识
					timestamp: e.timestamp, // 必填，生成签名的时间戳
					nonceStr: e.nonceStr, // 必填，生成签名的随机串
					signature: e.signature, // 必填，签名
					jsApiList: ["chooseWXPay", "updateAppMessageShareData",
						"updateTimelineShareData"
					] // 必填，需要使用的JS接口列表
				});
				jWeixin.ready(function() {
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					//console.log('微信支付验证通过')
					_this.wxAppShareCore();
				});
				jWeixin.error(function(res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					console.log("微信验证失败", res)
				});
				jWeixin.checkJsApi({
					jsApiList: ["chooseWXPay", "updateAppMessageShareData",
						"updateTimelineShareData"
					], // 需要检测的JS接口列表，所有JS接口列表见附录2,
					success: function(res) {
						// 以键值对的形式返回，可用的api值true，不可用为false
						// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
						console.log("微信检测JS接口结果", res)
					}
				});
			},
			wxAppShareCore() {
				let userId = getUser().userId;
				let userIdParam = userId ? "&shared=" + userId : "";
				let url = window.location.href + userIdParam;
				const params = {
					"title": this.data.title,
					"desc": this.data.abstractContent.replace(/<[^<>]+>/g, ""),
					"link": url,
					"img": this.data.thumbnailImage
				}
				console.log(params)
				jWeixin.updateAppMessageShareData({
					title: params.title, // 分享标题
					desc: params.desc, // 分享描述
					link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: params.img, // 分享图标
					success: function() {
						// 设置成功
						console.log("设置微信好友分享成功");
					},
					fail: function(err) {
						console.log("设置微信好友分享失败", err);
					}
				});

				jWeixin.updateTimelineShareData({
					title: params.title, // 分享标题
					desc: params.desc, // 分享描述
					link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: params.img, // 分享图标
					success: function() {
						// 设置成功
						console.log("设置微信好友分享成功");
					},
					fail: function(err) {
						console.log("设置微信好友分享失败", err);
					}
				});

			},
			read() {
				contentRead({
					contentId: this.id,
					count: 1
				})
			},
			dz() {
				if (this.data.dz && this.data.dz > 0) {
					return;
				}
				const that = this;
				contentDianzan({
					contentId: this.id,
					count: 1
				}).then(res => {
					console.log("点赞", res)
					if (res.code == 0) {
						that.footerIconStyle.dz.activite = that.footerIconStyle.dz.checked;
						that.data.dz = res.data.count;
					}
				})
			},
			sc() {
				if (this.data.sc && this.data.sc > 0) {
					return;
				}
				const that = this;
				contentShoucang({
					contentId: this.id,
					count: 1
				}).then(res => {
					console.log("收藏", res);
					if (res.code == 0) {
						that.footerIconStyle.sc.activite = that.footerIconStyle.sc.checked;
						that.data.sc = res.data.count;
					}
				})
			},
			zf() {
				this.zhuanfa.show = !this.zhuanfa.show;
			},
			fx() {
				this.fenxiang.show = !this.fenxiang.show;
			},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	.context {
		padding: 0 30rpx;
	}

	.u-row {
		line-height: 60rpx;
	}

	.article-title {
		padding: 20px 15px;
		padding-bottom: 0;
		text-align: center;
		font-weight: bold;
	}

	/* 描述 额外文本 */
	.title-content {
		color: #999;
		font-size: 12px;
		text-align: center;
	}

	.title-image-div image {
		width: 100%;
		height: auto;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}

	.parse-text {
		padding: 24rpx;
		font-size: 32rpx;
		color: $u-content-color;
		line-height: 2.1;
		margin-bottom: 80rpx;
	}

	.hide-preCode-box {
		background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #000000 105%);
		//background-image: -webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,0)),to(#fff));
		padding-top: 200rpx;
		margin-top: -210rpx;
		text-align: center;
	}

	.pay-message-text {
		color: #f8b35a;
		line-height: 55rpx;
	}

	.share-area {
		background-color: black;
		text-align: center;
		border-radius: 10px;
		margin-top: 10px;
		margin-bottom: 80px;
		height: 80px;
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

	.red {
		color: red;
	}
</style>
