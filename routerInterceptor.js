const opt = []
/* [{
	type: 'befor',
	callback:(e)=>{
		return false
	}
}] */

var isInit = false

function addEvent (e){
	opt.push(e)
	if(!isInit){
		isInit = true
		// 添加拦截器
		uni.addInterceptor('navigateTo', {
		  invoke(e) {
		    // 在跳转前做一些事情
		    console.log('即将跳转', e);
			let events = opt.filter(val=> val.type==='befor')
			for (var i = 0; i < events.length; i++) {
				if(!events[i].callback(e)){
					e.callback.abort()
					return;
				}
				
			}
			e.callback.continue()
		  },
		  success(e) {
		    // 在跳转成功后做一些事情
		    let events = opt.filter(val=> val.type==='success')
		    for (var i = 0; i < events.length; i++) {
				events[i].callback(e)
		    }
		  },
		  fail(e) {
		    // 在跳转失败后做一些事情
			let events = opt.filter(val=> val.type==='fail')
			for (var i = 0; i < events.length; i++) {
				events[i].callback(e)
			}
		    console.log('跳转失败', e);
		  },
		  complete(e) {
		    // 在跳转结束后做一些事情
			let events = opt.filter(val=> val.type==='complete')
			for (var i = 0; i < events.length; i++) {
				events[i].callback(e)
			}
		    console.log('跳转结束', e);
		  }
		});
		
		uni.addInterceptor('navigateBack', {
		  invoke(e) {
		    // 在跳转前做一些事情
		    console.log('即将跳转', e);
		  	let events = opt.filter(val=> val.type==='befor')
		  	for (var i = 0; i < events.length; i++) {
		  		if(!events[i].callback(e)){
		  			e.callback.abort()
		  			return;
		  		}
		  		
		  	}
		  	e.callback.continue()
		  },
		  success(e) {
		    // 在跳转成功后做一些事情
		    let events = opt.filter(val=> val.type==='success')
		    for (var i = 0; i < events.length; i++) {
		  		events[i].callback(e)
		    }
		  },
		  fail(e) {
		    // 在跳转失败后做一些事情
		  	let events = opt.filter(val=> val.type==='fail')
		  	for (var i = 0; i < events.length; i++) {
		  		events[i].callback(e)
		  	}
		    console.log('跳转失败', e);
		  },
		  complete(e) {
		    // 在跳转结束后做一些事情
		  	let events = opt.filter(val=> val.type==='complete')
		  	for (var i = 0; i < events.length; i++) {
		  		events[i].callback(e)
		  	}
		    console.log('跳转结束', e);
		  }
		});
	}
}

export default {addEvent}
