<template>
	<view class="u-page">
		<!-- 头像区域 -->
		<view class="album">
			<view class="album__avatar">
				<u-image :src="loginUser.avatar" shape="circle" width="80px" height="80px"></u-image>
			</view>
			<view class="album__content">
				<u--text :text="loginUser.nickname" :bold="true" size="17"></u--text>
				<u--text :text="loginUser.mobile"></u--text>
			</view>
		</view>
		<!-- 宫格区域-->
		<u-grid :border="false">
			<u-grid-item v-for="(item,index) in gridList" :key="index">
				<u--text :text="item.title" align="center" :bold="true" type="info"></u--text>
				<u-count-to :endVal="item.text" separator="," :decimals="2"></u-count-to>
			</u-grid-item>
		</u-grid>
		<u-grid :border="false">
			<u-grid-item v-for="(item,index) in gridList" :key="index">
				<u-button v-show="item.btn.show" customStyle="width: 60rpx;" :text="item.btn.text" type="primary"
					size="mini" @click="tx"></u-button>
			</u-grid-item>
		</u-grid>
		<!-- 单元格区域 -->
		<view class="center-list">
			<u-cell-group v-for="(sublist , index) in ucenterList" :key="index" :border="false">
				<u-cell v-for="(item,i) in sublist" :title="item.title" @click="ucenterListClick(item)"
					:icon="item.icon" :border="false" :isLink="item.link" arrow-direction="right" :value="item.value"></u-cell>
				<u-gap v-show="index!=ucenterList.length-1" height="6" bgColor="#f3f4f6"></u-gap>
			</u-cell-group>
		</view>

		<!-- 底部导航栏 -->
		<app-footer :index="2"></app-footer>

		<!-- 隐藏框 -->
		<u-popup :show="logoutModal.show" mode="bottom" :closeable="true"></u-popup>
	</view>
</template>

<script>
	import Footer from '@/pages/common/footer-tabbar.vue';
	import {
		getAccount,
		logout
	} from "../../config/api.js";
	import {
		getUser,
		isLogin,
		navigateTo,
		toIndex,
		msg
	} from "../../common/js/util.js";
	export default {
		data() {
			return {
				loginUser: {
					avatar: "/static/img/defaultAvatarUrl.png",
					nickname: "未登录",
					mobile: undefined
				},
				gridList: [{
					"title": "累计收入(元)",
					"text": "0.00",
					"btn": {
						show: false,
						text: undefined
					}
				}, {
					"title": "可提现金额(元)",
					"text": "0.00",
					"btn": {
						show: true,
						text: "提现",
					}
				}, ],
				ucenterList: [
					[{
							"title": '我的创作',
							"to": '/pages/home/settings/settings',
							"icon": "order",
							"link": true,
							"value":"敬请期待"
						},
						{
							"title": '我的收藏',
							"to": '/pages/home/settings/settings',
							"icon": "star",
							"link": true,
							"value":"敬请期待"
						},
						{
							"title": '我的点赞',
							"to": '/pages/home/settings/settings',
							"icon": "thumb-up",
							"link": true,
							"value":"敬请期待"
						},
					],
					[{
						"title": '设置',
						"to": '/pages/home/settings/index',
						'event': undefined,
						"icon": "setting",
						"link": true
					}, ]
				],
				logoutModal: {
					show: false,
				}

			}
		},
		components: {
			'app-footer': Footer,
		},
		onLoad() {
			this.loadUserInfo();
			this.loadAccount();
		},
		methods: {
			loadUserInfo() {
				let loginData = getUser();
				console.log(loginData);
				this.loginUser = loginData.loginUser;
			},
			loadAccount() {
				const that = this;
				getAccount().then(res => {
					that.gridList[0].text = res.data.total;
					that.gridList[1].text = res.data.available;
				})
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				if (item.to) {
					navigateTo(item.to);
				} else if (!item.to && item.event) {
					this[item.event]();
				}
			},
			tx(){
				msg("敬请期待");
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

	.u-page {
		margin-top: 15rpx;
		padding: 0 30rpx;
	}

	.album {
		@include flex;
		align-items: flex-start;
		background-color: #f3f4f6;
		height: 180rpx;
		align-items: center;

		&__avatar {
			// background-color: $u-bg-color;
			padding: 2px;
			border-radius: 3px;
			margin-left: 10rpx;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}

	.u-grid {
		margin-top: 20rpx;
		line-height: 50rpx;
	}

	.center-list {
		margin-top: 20rpx;
	}
</style>
