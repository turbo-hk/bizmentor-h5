<template>
	<view class="u-page">
		<!-- 单元格区域 -->
		<view class="center-list">
			<u-cell-group v-for="(sublist , index) in ucenterList" :key="index" :border="false">
				<u-cell v-for="(item,i) in sublist" :title="item.title" @click="ucenterListClick(item)"
					:icon="item.icon" :border="false" :isLink="item.link" arrow-direction="right"
					:customStyle="item.customStyle"></u-cell>
				<u-gap v-show="index!=ucenterList.length-1" height="6" bgColor="#f3f4f6"></u-gap>
			</u-cell-group>
		</view>

		<!-- 隐藏框 -->
		<u-popup :show="logoutModal.show" mode="bottom" :round="16" :safeAreaInsetBottom="true">
			<u-cell-group :border="false">
				<u-cell title="退出登录"  @click="confirmLogout" customStyle="text-align:center"></u-cell>
				<u-gap height="6" bgColor="#f3f4f6"></u-gap>
				<u-cell title="取消" @click="logoutModalClose" customStyle="text-align:center"></u-cell>
			</u-cell-group>
		</u-popup>
	</view>
</template>

<script>
	import Footer from '@/pages/common/footer-tabbar.vue';
	import {
		logout
	} from "@/config/api.js";
	import {
		navigateTo,
		toIndex,
		msg
	} from "@/common/js/util.js";
	export default {
		data() {
			return {
				ucenterList: [
					[{
							"title": '关于创业好帮手',
							"to": '',
							"icon": "info-circle",
							"link": true
						},
						{
							"title": '帮助与反馈',
							"to": '',
							"icon": "info-circle",
							"link": true
						}
					],
					[{
						"title": '退出',
						"to": undefined,
						'event': 'eventLogout',
						"icon": "",
						"customStyle": "text-align:center",
					}]
				],
				logoutModal: {
					show: false,
				}

			}
		},
		components: {
			'app-footer': Footer,
		},
		onLoad() {},
		methods: {
			ucenterListClick(item) {
				if (item.to) {
					navigateTo(item.to);
				} else if (!item.to && item.event) {
					this[item.event]();
				}
			},
			eventLogout(confirm) {
				this.logoutModal.show = !this.logoutModal.show;
			},
			confirmLogout(){
				logout().then(res => {
					msg("退出登录成功")
					uni.clearStorageSync();
					this.logoutModal.show = !this.logoutModal.show;
					toIndex();
				})
			},
			logoutModalClose() {
				this.logoutModal.show = !this.logoutModal.show;
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

	.center-list {
		margin-top: 20rpx;
	}
</style>
