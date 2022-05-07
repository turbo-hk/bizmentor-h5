<template>
	<view class="content">
		<!-- 搜索功能 -->
		<view class="uni-search-box">
			<uni-search-bar v-model="searchParam.keyword" ref="searchBar" radius="100" cancelButton="none" disabled
				:placeholder="inputPlaceholder" />
			<view class="cover-search-bar" @click="searchClick"></view>
		</view>
		<!-- 列表展示 -->
		<uni-list class="uni-list" :border="false" :style="{height:listHight}">
			<uni-list-item @click="toDetail(item)" v-for="(item,index) in dataList" :key="index" link>
				<template v-slot:header>
					<image class="avatar" :src="item.thumbnailImage" mode="aspectFill"></image>
				</template>
				<template v-slot:body>
					<view class="main">
						<text class="title">{{item.title}}</text>
						<view class="info">
							<text class="category">频道：{{item.channel.label}}</text>
							<uni-dateformat class="biz_time" :date="item.bizTime" format="yyyy-MM-dd"
								:threshold="[60000, 2592000000]" />
						</view>
					</view>
				</template>
			</uni-list-item>
			<!-- 加载状态：上拉加载更多，加载中，没有更多数据了，加载错误 -->
			<uni-list-item>
				<template v-slot:body>
					<uni-load-more :status="statusLoadMore"></uni-load-more>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import Utils from "/config/utils.js";

	export default {
		computed: {
			inputPlaceholder(e) {
				return '请输入搜索内容';
			}
		},
		data() {
			return {
				listHight: 0,
				statusLoadMore: "more",
				totalLength: 0,
				dataList: [],
				currentPage: 0,
				searchParam: {
					pageSize: 6,
					pageNo: 1,
					keyword: undefined,
					channel: undefined
				}
			}
		},
		onLoad(event) {
			if (event.channel) {
				this.searchParam.channel = event.channel;
			}
			this.loadData(1);
		},
		onReachBottom() {
			console.log("上拉加载更多...", this.currentPage);
			this.statusLoadMore = "loading";
			this.loadData(this.currentPage + 1);
			if (this.dataList.length === this.totalLength) {
				this.statusLoadMore = 'nomore';
			}
		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			var that = this;
			setTimeout(function() {
				let options = {
					msg: "加载成功",
					duration: 2000,
					type: "green"
				}
				this.$refs.toast.showTips(options);
				uni.stopPullDownRefresh();
			}, 2000)
		},
		methods: {
			searchClick(e) { //点击搜索框
				uni.hideKeyboard();
				uni.navigateTo({
					url: "search/search",
					animationType: 'fade-in'
				});
			},
			loadData(pageNo) {
				this.searchParam.pageNo = pageNo;
				const queryData = this.searchParam;
				const that = this;
				Utils.postData('/content/page', queryData, function(res) {
					that.totalLength = res.total;
					if (res.list && res.list.length > 0) {
						that.dataList = that.dataList.concat(res.list);
						that.currentPage = that.currentPage + 1;
					}
				}, function() {});
			},
			toDetail(item) {
				uni.navigateTo({
					url: "detail?id=" + item.id + "&title=" + item.title,
					animationType: 'fade-in'
				});
			}
		}
	}
</script>

<style>
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	.avatar {
		width: 200rpx;
		height: 200rpx;
		margin-right: 10rpx;
	}

	.title {
		width: 480rpx;
		font-size: 32rpx;
	}

	.info {
		flex-direction: row;
		justify-content: space-between;
	}

	.category,
	.biz_time {
		font-size: 28rpx;
		color: #999999;
	}

	.cover-search-bar {
		height: 50px;
		position: relative;
		top: -50px;
		margin-bottom: -50px;
		/* #ifndef APP-NVUE */
		z-index: 999;
		/* #endif */
	}
</style>
