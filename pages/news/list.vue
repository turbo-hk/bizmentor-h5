<template>
	<view class="u-page">
		<!-- 搜索栏 -->
		<u-search v-model="searchParam.keyword" :show-action="true" placeholder="关键字搜索" actionText="搜索"
			:animation="true" margin="10rpx" @search="searchForm" @clear="searchClear" @custom="searchForm"></u-search>

		<!-- 顶部图标 -->
		<u-grid class="head-icon" :border="false" @click="channelChange">
			<u-grid-item v-for="(item, index) in channelGridList" :key="index">
				<u-icon :name="item.icon" color="#18b566" :size="50"></u-icon>
				<text class="text">{{item.name}}</text>
			</u-grid-item>
		</u-grid>

		<!-- 列表数据 -->
		<u-list @scrolltolower="scrolltolower">
			<u-list-item v-for="(item, index) in dataList" :key="index">
				<view class="album" @click="toDetail(item)">
					<view class="album__avatar">
						<image :src="item.thumbnailImage" mode="" border='0' style="width: 92px;height: 101px;"></image>
					</view>
					<view class="album__content">
						<u--text :text="item.title" :bold="true"></u--text>
						<view class="title-content">频道：{{item.channel.label}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{formatDate(item.bizTime)}}</view>
					</view>
				</view>
				<u-gap height="10" bgColor="#f3f4f6" customStyle="margin-top: 6rpx;margin-bottom:6rpx;"></u-gap>
			</u-list-item>
		</u-list>
		<u-loadmore :status="statusLoadMore" />


		<!-- 底部导航栏 -->
		<app-footer :index="0"></app-footer>
	</view>
</template>

<script>
	import Footer from '@/pages/common/footer-tabbar.vue';
	import {
		contentList
	} from "../../config/api.js";
	import {
		navigateTo
	} from "../../common/js/util.js";
	export default {
		data() {
			return {
				channelGridList: [{
					"name": "创业项目",
					"icon": "red-packet",
					"value": "business_project",
				}, {
					"name": "实战案例",
					"icon": "file-text",
					"value": "business_case",
				}, {
					"name": "干货分享",
					"icon": "share",
					"value": "business_course",
				}],
				searchParam: {
					pageSize: 6,
					pageNo: 1,
					keyword: undefined,
					channel: undefined
				},
				dataList: [],
				statusLoadMore: 'loadmore',
				totalLength: 0,
				currentPage: 0,
			}
		},
		components: {
			'app-footer': Footer,
		},
		onLoad() {
			this.loadmore(1)
		},
		onReachBottom() {
			console.log("上拉加载更多...", this.currentPage);
			this.loadmore(this.currentPage + 1);
		},
		methods: {
			scrolltolower() {
				this.loadmore(this.currentPage + 1)
			},
			loadmore(pageNo, opt) {
				console.log(pageNo)
				this.searchParam.pageNo = pageNo;
				const _this = this;
				contentList(this.searchParam).then(res => {
					_this.totalLength = res.total;
					
					_this.dataList = _this.dataList.concat(res.list);
					_this.currentPage = pageNo;
					if (_this.dataList.length === _this.totalLength) {
						_this.statusLoadMore = 'nomore';
					} else {
						_this.statusLoadMore = "loading";
					}
				}).catch(err => {

				})
			},
			searchForm() {
				this.resetForm();
				this.loadmore(1);
			},
			searchClear() {
				this.searchParam.keyword = undefined;
				this.resetForm();
				this.loadmore(1);
			},
			resetForm() {
				this.searchParam.pageNo = 1;
				this.currentPage = 0;
				this.totalLength = 0;
				this.dataList = [];
			},
			channelChange(index) {
				let channel = this.channelGridList[index].value;
				if (this.searchParam.channel === channel) {
					this.searchParam.channel = undefined;
				} else {
					this.searchParam.channel = channel;
				}
				this.resetForm();
				this.loadmore(1);
			},
			toDetail(item) {
				navigateTo("/pages/news/detail?id=" + item.id)
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
	
	.head-icon{
		margin-top: 10rpx;
		margin-bottom: 30rpx;
	}
	
	/* 描述 额外文本 */
	.title-content {
		color: #999;
		font-size: 14px;
	}
	
	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 2rpx;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10rpx;
			flex: 1;
		}
	}
</style>
