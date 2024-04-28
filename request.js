class Request {
	uniapi(function_name, obj) {
		return new Promise((resole, reject)=>{
				uni[function_name]({
					...obj,
					success: res => resole(res),
					fail:res=>reject(res)
				})
			})
	}
	
	request(params){
		return new Promise((resolve,reject)=>{
			this.unirequest(params).then((res)=>{
				resolve(res);
			}).catch(e=>{
				reject(e)
			})
		})
	}
	
	
	netWorkStatus(){
		return new Promise((resolve,reject)=>{
			this.uniapi("getNetworkType").then(res=>{
				if(res.networkType=="none"){
					uni.showToast({
						title: '当前无网络，请稍候再试',
						icon:'none'
					});
					reject('当前无网络，请稍候再试')
				}else{
					resolve()
				}
			})
		})
	}
	
	
	unirequest(params){
		return new Promise((resolve,reject)=>{
			this.netWorkStatus().then(()=>{
				this.uniapi("request",{
					...params,
					url:golobalConfig.baseUrl+params.url,
					method:params.method?params.method:'POST',
					header:{
						token:uni.getStorageSync('token'), //token值
						// 'device':'WEIXIN'
					}
				}).then(res=>{
					resolve(res.data);
				}).catch(e=>{
					reject(e)
				});
			})
		});
					
	}
}

export default new Request()
