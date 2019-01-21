var vm = new Vue({
	el:"#app",
	data:{
		productList:[],
		totalMoney:0,
		checkAllFlag:false,
		delFlag:false,
		curProduct:''
	},
	methods:{
		cartView:function(){
			var _this = this;
			this.$http.get('js/cartList.json').then(function (res){
				_this.productList = res.data.result.list;
			})
		},
		changeMoney:function(product,way){
			if(way==1){
				product.productQuentity++
			}if(way==2){
				product.productQuentity--
				if(product.productQuentity<1){
					product.productQuentity = 1;
				}
			}
			this.calcTotalPrice();
		},
		selectedProduct:function(list){
			if(typeof list.checked == 'undefined'){
				Vue.set(list,"checked",true);
				// this.$set(item,"checked",true);
			}else{
				list.checked = !list.checked;
			}
			this.calcTotalPrice();
		},
		checkAll:function(flag){
			this.checkAllFlag=flag;
			var _this = this;
			this.productList.forEach(function(list,index){
				if(typeof list.checked == 'undefined'){
					Vue.set(list,"checked",_this.checkAllFlag);
					// this.$set(item,"checked",true);
				}else{
					list.checked = _this.checkAllFlag;
				}
			})
			this.calcTotalPrice();
		},
		calcTotalPrice: function(){
			var _this = this;
			this.totalMoney=0;
			this.productList.forEach(function(list,index){
				if(list.checked){
					_this.totalMoney += list.productPrice*list.productQuentity;
				}
			})
		},
		delConfirm: function(list){
			this.delFlag = true;
			this.curProduct = list;
		},
		delProduct: function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;	
			this.calcTotalPrice();	
		}


	},
	//局部的过滤器，当前实例调用
	filters:{
		formatMoney: function(value){
			return '￥'+value.toFixed(2);
		}
	},
	mounted:function(){
		this.cartView();
	}
});
//全局过滤器 单独放在一个filter.js文件里
Vue.filter('money',function(value,type){
	return '￥'+value.toFixed(2)+type;
})