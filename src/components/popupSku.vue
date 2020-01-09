<template>
	<view>
		<view class="uni-mask" v-show="show" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup" v-show="show">
			<view class="uni-close-btn" @click="hide">
				<view class="iconfont icon-close"></view>
			</view>
			<view class="uni-pd10">
				<slot></slot>
				<view class="pop-product">
					<view class="itembox clear">
						<view class="image-view fl">
							<image class="img" :src="ProductImg" mode="aspectFill"></image>
						</view>
						<view class="txtbox">
							<!-- 普通产品 -->
							<view class="uni-product-price">
								<text class="saleprice">￥{{price}}</text>
								<text class="plusprice" v-if="IsPlusPrice==1&&isLimint!=1">￥{{plusprice}}<text class="icon icon-plusprice"></text></text>
								<text class="oprice" v-if="IsPlusPrice==0">￥{{oprice}}</text>
							</view>
							<view class="product-stock">库存{{stock}}件</view>
							<view class="product-selected" v-if="hasSKU">已选：“{{SpecText}}”</view>
						</view>
					</view>
				</view>
				<!-- sku -->
				<view class="skuBoxContent" v-if="hasSKU">
					<view class="skuBox natureSku" v-for="(item,sIndex) in specificationValue3" :key="sIndex">
						<view class="skuTitle">{{item.keyName}}</view>
						<view class="skuCon">
							<view class="skuList">
								<view class="skuitem" v-for="(item2,index2) in item.val" :key="index2" :class="{'active':index2 == activeArr[item.id] && item2.isHide !=true,'forever':item2.foreverHide,'disabled':item2.isHide || item2.foreverHide}"
								 @click="selectSku(item.keyName,sIndex,index2,item2.name,item2.isHide,item2.foreverHide,$event)">{{item2.name}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 购买数量 -->
				<view class="skuBox buyNum_skuBox clear" v-if="!fromcart||fromPinTuan">
					<view class="skuTitle fl">购买数量</view>
					<view class="flexItem fr">
						<uni-number-box :disabled="false" class="selNumRow" :inputValue="number" :min="minBuyNum" :max="maxBuyNum"  v-on:change="change"></uni-number-box>
					</view>
				</view>
			</view>
			<view style="height: 120rpx;"></view>
			<view class="popup-ft" style="margin-left:20rpx;" v-if="fromcart||fromPinTuan">
				<view class="bottom-btns" style="line-height: 80rpx;" @click="sureSku">确定</view>
			</view>
			<view class="popup-ft" style="margin-left:20rpx;" v-if="!(fromcart||fromPinTuan)">
				<view class="bottom-btns">
					<view class="btn addcart" @click="toAddcart">
						加入购物车
					</view>
					<view class="btn buynow" @click="gouBuy">
						立即购买
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {post,get,toLogin} from '@/utils';
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			fromcart: {
				type: Boolean,
				default: false
			},
			fromPinTuan: {
				type: Boolean,
				default: false
			},
			/**
			 * h5遮罩是否到顶
			 */
			h5Top: {
				type: Boolean,
				default: false
			},
			proInfo: {
				type: Object,
				default: null
			},
			isLimint:{
				type:Number,
				default: 0
			},
			isPlus:{
				type:Number,
				default: 0
			},
			ShareId:{
				type:String,
				default:""
			}
		},
		created: function(option) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.goodsDetail();
			this.selectAllStock(); //筛选出所有没有库存的
		},
		components: {
			uniNumberBox
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage: "",
				offsetTop: 0,
				proId:this.proInfo.ProductId,
				hasSKU: false, //产品是否含有sku
				SpecList: this.proInfo.ProductSpecList, //数据中的ProductSpecList
				specificationValue: {},
				specificationValue2: [],
				specificationValue3: [], //从数据中拿到的并重新组合在一起，渲染的时候也是用这个
				activeArr: [],
				skuKey: [], //存放key的值
				selectedSku: [], //选中的sku,按key的顺序存进去
				SpecText:"",  //选择的sku文本
				selectedSkuLen: '',
				stock: this.proInfo.Stock, //接收父组件传参，库存默认值
				ProductImg: this.proInfo.ProductImgList[0].PicUrl,
				price: this.proInfo.ProductPrice, //产品售价
				IsPlusPrice:this.proInfo.IsPlusPrice,//是否开启plus
				plusprice:this.proInfo.PlusPrice,//产品plus价格
				oprice:this.proInfo.MarketPrice,//原价
				minBuyNum: this.proInfo.MinBuyNum, //最少购买量
				maxBuyNum: this.proInfo.MaxBuyNum, //最大购买量
				number: this.proInfo.MinBuyNum, //用户购买数量，当设有最少购买量时，初始化的数量等于最少购买量
				hasStockAllList: [],
				selectedSkuKey: {}, //带key的已选的sku
			}
		},
		watch: {
			h5Top(newVal) {
				if (newVal) {
					this.offsetTop = 44;
				} else {
					this.offsetTop = 0;
				}
			},
		},
		methods: {
			hide: function() {
				var canaddcar=this.valSubmit();
				this.$emit('hidePopup');
				this.$emit('getsku',this.number,this.SpecText,canaddcar,this.price,this.plusprice);
			},
			change: function(num) {
				this.number=num;
			},
			moveHandle() {},
			selectAllStock() {
				for (let i = 0; i < this.SpecList.length; i++) {
					if (this.SpecList[i].ProStock > 0) {
						this.hasStockAllList.push(this.SpecList[i]);
					}
				}
			},
			selectSku(key, index, index2, name, isHide, foreverHide, event) {
				if (isHide || foreverHide) {
					//一开始就不可以点击、跟有可能组合的导致不能点击的
					//如果为不可以点击
					// console.log("");
					event.preventDefault();
				} else {
					this.$set(this.activeArr, index, index2);
					this.$set(this.selectedSkuKey, key, name);
					this.$set(this.selectedSku, index, name);
					let selectedSkuKeyLen = 0;
					for (let key in this.selectedSkuKey) {
						if (this.selectedSkuKey[key]) {
							selectedSkuKeyLen++;
						}
					}
					this.selectedSkuLen = selectedSkuKeyLen;
					if (selectedSkuKeyLen === this.skuKey.length) {
						let selectedSpeList = this.selectedAllMateSku();
						this.stock = selectedSpeList.ProStock;
						if(this.isLimint==1){
							this.price = this.proInfo.TimePrice;
						}else{
							if(this.fromPinTuan){
								this.price=this.proInfo.FightingPrice;
							}else{
								this.price = selectedSpeList.PunitPrice;
								this.plusprice=selectedSpeList.PlusPrice;
							}
						}
						if (selectedSpeList.SpecImage) {
							this.ProductImg = selectedSpeList.SpecImage
						}

					}
					this.filterAttrs(key, name);
					this.SpecText=this.selectedSku.join("_");
				}
			},
			filterAttrs(curKey, curName) {
				//1、先把已选的selectedSkuKey拷贝一份用来之后使用
				//2、把当前已选的跟不是当前已选的已选的key的name值组合起来
				//3、把组合好的放到所有有库存中去检测，如果存在，则该key的name值是存在的（isHide:false）,否则不存在（isHide:true）
				for (let i = 0; i < this.specificationValue3.length; i++) {
					if (this.specificationValue3[i].keyName !== curKey) {
						for (let j = 0; j < this.specificationValue3[i].val.length; j++) {
							let mateArr = this.groupSelectedArr(this.specificationValue3[i].keyName, this.specificationValue3[i].val[j].name);
							if (this.mateHasStockList(mateArr)) {
								this.$set(this.specificationValue3[i].val[j], "isHide", false);
							} else {
								this.$set(this.specificationValue3[i].val[j], "isHide", true);
							}
						}
					}
				}
			},
			groupSelectedArr(mateKey, mateName) {
				let selectedArr = {};
				for (let key in this.selectedSkuKey) {
					this.$set(selectedArr, key, this.selectedSkuKey[key]);
				}
				this.$set(selectedArr, mateKey, mateName);
				return selectedArr;
			},
			mateHasStockList(mateArr) {
				let result = false;
				let mateArrLen = 0;
				for (let key in mateArr) {
					if (mateArr[key]) {
						mateArrLen++;
					}
				}
				for (let i = 0; i < this.hasStockAllList.length; i++) {
					let speVal = JSON.parse(this.hasStockAllList[i].SpecValue);
					let num = 0;
					for (let key in mateArr) {
						for (let key2 in speVal) {
							if (key === key2 && mateArr[key] === speVal[key2]) {
								num++;
							}
						}
					}
					if (num && num === mateArrLen) {
						if (this.hasStockAllList[i].ProStock > 0) {
							result = true;
						} else {
							result = false;
						}
					}
				}
				return result;
			},
			foreverDisabled(obj) {
				var hasDisabled = false;
				var num = 1;
				var noStockNum = 0;
				var objType;
				for (var key in obj) {
					objType = key;
				}
				var parentsType = this.specificationValue;
				for (var key in parentsType) {
					if (objType != key) {
						num = num * parentsType[key].length;
					}
				}
				for (var i = 0; i < this.SpecList.length; i++) {
					var objSku = JSON.parse(this.SpecList[i].SpecValue);
					for (var key in objSku) {
						if (key == objType && obj[objType] == objSku[key]) {
							if (this.SpecList[i].ProStock == 0) {
								noStockNum++;
							}
						}
					}
				}
				if (num == noStockNum) {
					hasDisabled = true;
				}
				return hasDisabled;
			},
			selectedAllMateSku() { //当选择完所有的时候
				var obj;
				for (let i = 0; i < this.SpecList.length; i++) {
					let speVal = JSON.parse(this.SpecList[i].SpecValue);
					let allNum = 0;
					for (let key in this.selectedSkuKey) {
						for (let key2 in speVal) {
							if (key === key2 && this.selectedSkuKey[key] === speVal[key2]) {
								allNum++;
							}
						}
					}
					if (allNum && allNum === this.skuKey.length) {
						obj = this.SpecList[i];
					}
				}
				return obj;
			},
			goodsDetail() {
				if(this.isLimint==1){
					this.price=this.proInfo.TimePrice;
					this.oprice=this.proInfo.ProductPrice;
				}else{
					if(this.fromPinTuan){
						this.price=this.proInfo.FightingPrice;
						this.oprice=this.proInfo.OriginalPrice;
					}else{
						this.price=this.proInfo.ProductPrice;
						this.oprice=this.proInfo.MarketPrice;
						this.plusprice=this.proInfo.PlusPrice;
					}
				}
				if (this.SpecList.length > 0) {
					this.specificationValue = JSON.parse(
						this.proInfo.SpecificationValue
					);
					for (let key in this.specificationValue) {
						this.skuKey.push(key);
						this.specificationValue2.push(this.specificationValue[key]);
					}
					for (let i = 0; i < this.specificationValue2.length; i++) {
						let bbJson = {};
						this.$set(bbJson, "keyName", this.skuKey[i]);
						this.$set(bbJson, "id", i);
						this.$set(bbJson, "val", []);
						for (let j = 0; j < this.specificationValue2[i].length; j++) {
							let obj = {};
							obj[this.skuKey[i]] = this.specificationValue2[i][j].name;
							let isHide = this.foreverDisabled(obj);
							this.$set(this.specificationValue2[i][j], "foreverHide", isHide);
							this.$set(this.specificationValue2[i][j], "isHide", false);
							// this.$set(this.specificationValue2[i][j],"isActive",false);
							this.$set(bbJson.val, j, this.specificationValue2[i][j]);

						}
						this.specificationValue3.push(bbJson);
					}
					this.hasSKU = true;
				} else {
					//如果没有含有sku，则只按照单价来计算商品价格
					this.hasSKU = false;
				}
			},
			//判断是否选择规格
			valSubmit() {
				let isSubmit = false;
				if (this.hasSKU) {
					if (this.selectedSkuLen=== this.skuKey.length&&this.number>0) {
						isSubmit = true;
					} else {
						isSubmit = false;
					}
				} else {
					isSubmit = true;
				}
				return isSubmit;
			},
			//购物车拼团选择SKU
			sureSku(){
				if(this.valSubmit()){
					if(this.fromcart){
						this.$emit('selectSku',this.SpecText);
						this.$emit('hidePopup');
					}
					if(this.fromPinTuan){
						this.$emit('getsku',this.number,this.SpecText,this.price);
						this.$emit('hidePopup');
					}
				}else{
					uni.showToast({
						title: "请选择完整规格！",
						icon: "none",
						duration: 1500
					});
				}
			},
			toAddcart(){
				if(toLogin(this.curPage)){
					if (this.valSubmit()) {
						this.addcart();
					}
				}
			},
			async addcart() {
				let result = await post("Cart/AddCart", {
					UserId: this.userId,
					Token: this.token,
					ProId: this.proId,
					Count: this.number,
					SpecText: this.SpecText,
					IsFlashSale: this.isLimint,
					ShareMemberId: this.ShareId
				});
				if (result.code === 0) {
					uni.showToast({
						title: "加入购物车成功！",
						duration: 2000
					});
					this.$emit('hidePopup');
				} else if (result.code === 2) {
					let _this =this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login?askUrl="+_this.curPage
								});
							} else if (res.cancel) {
							}
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			gouBuy(){
				if (toLogin(this.curPage)){
					if(this.valSubmit()){
						let money="";
						if(this.isPlus==1&&this.IsPlusPrice==1&&this.isLimint!=1){
							money=this.plusprice;
						}else{
							money=this.price;
						}
						uni.navigateTo({
							url: '/pages/submitOrder/submitOrder?proId='+this.proId+'&SpecText='+this.SpecText+'&number='+this.number+'&price='+money+'&orderSType=0'+'&isLimint='+this.isLimint+'&ShareMemberId='+this.ShareId,
						})
					}else{
						uni.showToast({
							title: "请选择商品规格！",
							icon:"none",
							duration: 2000
						});
					}
				}
			},
		}
	}
</script>
<style>
	.uni-mask {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .4);
	}

	.uni-popup {
		position: fixed;
		z-index: 999;
		background-color: #ffffff;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, .1);
		left: 0;
		bottom: 0;
		width: 100%;
		text-align: center;
		border-radius: 6px 6px 0 0;
	}

	.uni-close-btn {
		height: 60rpx;
		line-height: 60rpx;
		width: 60rpx;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 30rpx;
		color: #999;
	}

	.popup-ft {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 710rpx;
		padding: 20rpx;
		border-top: 1px solid #eee;
	}

	.bottom-btns {
		height: 80rpx;
		background: #f63517;
		font-size: 32rpx;
		color: #fff;
		border-radius: 40rpx;
		overflow: hidden;
	}

	.bottom-btns .btn {
		width: 50%;
		line-height: 80rpx;
		float: left;
	}

	.bottom-btns .btn.addcart {
		background: #fda33a;
	}

	.pop-product {
		margin-bottom: 20rpx;
	}

	.pop-product .image-view {
		margin: 0;
		height: 180rpx;
		width: 180rpx;
	}

	.pop-product .image-view .img {
		height: 100%;
		width: 100%;
		border-radius: 6px;
		background: #eef2f5;
	}

	.pop-product .txtbox {
		text-align: left;
		margin-left: 210rpx;
		padding-top: 10rpx;
	}

	.pop-product .saleprice {
		font-size: 36rpx;
		color: #f0370b;
	}

	.pop-product .oprice {
		font-size: 24rpx;
		color: #999;
		text-decoration: line-through;
		margin-left: 10rpx;
	}
	.pop-product .plusprice{
		margin-left: 10rpx;
	}
	.pop-product .plusprice .icon-plusprice {
		display: inline-block;
		vertical-align: middle;
		height: 16px;
		width: 33px;
		background: url(http://www.sc-mall.net/static/plus/plus_icon.png) right center no-repeat;
		background-size: 100%;
	}
	.pop-product .product-stock {
		font-size: 26rpx;
		color: #999;
	}

	.pop-product .product-selected {
		font-size: 28rpx;
		color: #333;
	}

	.skuBoxContent {
		max-height: 560rpx;
		overflow-y: auto;
		/* border-bottom: 1rpx solid #eee; */
		padding-bottom: 20rpx;
	}

	.skuBoxContent .skuCon {
		overflow: hidden;
	}

	.skuTitle {
		text-align: left;
		line-height: 70rpx;
		color: #333;
	}

	.skuList {
		font-size: 0;
		text-align: left;
		margin: 0 -10rpx;
	}

	.skuitem {
		display: inline-block;
		padding: 10rpx 20rpx;
		font-size: 26rpx;
		color: #333;
		background: #eef2f5;
		border-radius: 4px;
		margin: 0 10rpx 20rpx;
		border: 1px solid #eef2f5;
	}

	.skuitem.active {
		background: #fef8f2;
		color: #cba882;
		border: 1px solid #cba882;
	}

	.skuitem.disabled {
		background: #f6f6f6;
		color: #999;
		border: 1px dashed #eee;
	}

	.buyNum_skuBox {
		padding: 20rpx 0;
	}
</style>
