var vue = new Vue({
	el:".container",
	data:{
		addressList:[],
		limitNum:3,
		currentIndex:0,
		delFlag:false,
		currentDel:'',
		shippingMethod:1
	},
	//computed 实时计算
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		getAddressList:function(){
			var _this = this;
			this.$http.get('js/address.json').then(function(res){
				_this.addressList = res.data.result;

			})
		},
		loadMore:function(){
			this.limitNum = this.addressList.length;
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(address,index){
				if(address.addressId == addressId){
					address.isDefault = true;
				}else{
					address.isDefault = false;
				}
			})
		},
		delConfirm:function(list){
			this.delFlag = true;
			this.currentDel = list
		},
		delAddress: function(){
			var _this = this;
			var index = this.addressList.indexOf(_this.currentDel);
			_this.addressList.splice(1,index);
			_this.delFlag = false;
		}
		 

	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
		})
	}
})