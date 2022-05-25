<template>
	<view class="content">
		<!-- 搜索功能 -->
		<view class="uni-search-box">
			<uni-search-bar v-model="searchParam.keyword" class="uni-mt-10" radius="100" placeholder="关键字搜索"
				clearButton="auto" cancelButton="none" @confirm="search" @clear="searchClear" />
		</view>
		<uni-grid :column="3" :show-border="false" :highlight="true" @change="channelChange">
			<uni-grid-item v-for="(item, index) in channelGridList" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #fff;">
					<uni-icons custom-prefix="iconfont" :type="item.icon" color="green" size="50"></uni-icons>
					<text class="text">{{item.name}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
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
    import {msg} from "/common/js/util.js";
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
				},
				channelGridList: [{
					"name": "创业项目",
					"icon": "icon-chuangyexiangmu",
					"value": "business_project",
				}, {
					"name": "实战案例",
					"icon": "icon-shizhan",
					"value": "business_case",
				}, {
					"name": "干货分享",
					"icon": "icon-ganhuofenxiang",
					"value": "business_course",
				}]
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
			this.searchClear();
		},
		methods: {
			search() { //点击搜索框
				console.log(this.searchParam)
				this.resetForm();
				this.loadData(1);
			}, //搜索清除
			searchClear() {
				this.searchParam.keyword = undefined;
				this.resetForm();
				this.loadData(1);
			},
			resetForm() {
				this.searchParam.pageNo = 1;
				this.currentPage = 1;
				this.totalLength = 0;
				this.dataList = [];
			},
			loadData(pageNo) {
				this.statusLoadMore = "loading";
				this.searchParam.pageNo = pageNo;
				const queryData = this.searchParam;
				const that = this;
				Utils.postData('/content/page', queryData, function(res) {
					that.totalLength = res.total;
					if (res.list && res.list.length > 0) {
						that.dataList = that.dataList.concat(res.list);
						that.currentPage = that.currentPage + 1;
						if (that.dataList.length === that.totalLength) {
							that.statusLoadMore = 'nomore';
						}
					}
				}, function() {});
			},
			toDetail(item) {
				uni.navigateTo({
					url: "detail?id=" + item.id + "&title=" + item.title,
					animationType: 'fade-in'
				});
			},
			channelChange(e) {
				let {
					index
				} = e.detail
				let channel = this.channelGridList[index].value;
				if (this.searchParam.channel === channel) {
					this.searchParam.channel = undefined;
				} else {
					this.searchParam.channel = channel;
				}
				this.resetForm();
				this.loadData(1);
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

	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
</style>
