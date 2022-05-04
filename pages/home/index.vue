<template>
	<view class="center">
		<view class="userInfo" @click="toUserInfo">
			<cloud-image width="150rpx" height="150rpx" v-if="userInfo && userInfo.avatar" :src="userInfo.avatar">
			</cloud-image>
			<image v-else class="logo-img" src="@/static/uni-center/defaultAvatarUrl.png"></image>
			<view class="logo-title">
				<text class="user-name" v-if="hasLogin">{{ userInfo?userInfo.nickname : ''}}</text>
				<text class="user-name" v-else>未登录</text>
			</view>
		</view>
		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-for="(item,index) in gridList" @click.native="tapGrid(index)" :key="index">
				<uni-icons class="icon" color="#007AFF" :type="item.icon" size="26"></uni-icons>
				<text class="text">{{ item.text }}</text>
			</uni-grid-item>
		</uni-grid>
		<uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index">
			<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :rightText="item.rightText" :key="i"
				:clickable="true" :to="item.to" @click="ucenterListClick(item)" :show-extra-icon="true"
				:extraIcon="{type:item.icon,color:'#999'}">
				<template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{ item.rightText }}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import Utils from "/config/utils.js";

	export default {
		data() {
			return {
				userInfo: {},
				gridList: [{
						"text": "测试1",
						"icon": "chat"
					},
					{
						"text": "2",
						"icon": "cloud-upload"
					},
				],
				ucenterList: [
					[{
						"title": '退出登录',
						"to": '',
						"event": 'logout',
						"icon": "paperplane"
					}],
					[{
						"title": '关于',
						"to": '/',
						"icon": "info"
					}]
				],
				listStyles: {
					"height": "150rpx", // 边框高度
					"width": "150rpx", // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "100%" // 边框圆角，支持百分比
					}
				}
			}
		},
		computed: {
			hasLogin() {
				return Utils.hasLogin();
			},
		},
		onTabItemTap(e) {
			this.loadUserInfo();
		},
		onLoad() {
			this.loadUserInfo();
		},
		methods: {
			toUserInfo() {
				Utils.NAVIGATE_TO_AUTHED_URL("/pages/home/user/user-info");
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				if (!item.to && item.event) {
					this[item.event]();
				}
			},
			logout() {
				Utils.logout();
				Utils.toIndex();
			},
			loadUserInfo() {
				console.log(1234)
				const that = this;
				if (Utils.hasLogin() && !Utils.loginUser()) {
					Utils.getData('/member/user/get', {}, function(res) {
						console.log(res)
						that.userInfo = res.data;
						uni.setStorageSync("loginUser", res.data);
					}, function() {})
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
	}

	.userInfo {
		width: 750 rpx;
		padding: 20 rpx;
		padding-top: 50px;
		background-image: url(../../static/uni-center/headers.png);
		flex-direction: column;
		align-items: center;
	}

	.logo-img {
		width: 150 rpx;
		height: 150 rpx;
		border-radius: 150 rpx;
	}

	.logo-title {
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.user-name {
		height: 100 rpx;
		line-height: 100 rpx;
		font-size: 38 rpx;
		color: #FFFFFF;
	}

	.grid {
		background-color: #FFFFFF;
		margin-bottom: 6px;
	}

	.uni-grid .text {
		font-size: 30 rpx;
		height: 25px;
		line-height: 25px;
		color: #817f82;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}

	.center-list {
		margin-bottom: 30 rpx;
		background-color: #f9f9f9;
	}

	.center-list-cell {
		width: 750 rpx;
		background-color: #007AFF;
		height: 40 rpx;
	}
</style>
