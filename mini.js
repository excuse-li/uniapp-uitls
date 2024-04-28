// #ifdef APP-PLUS
const mp = uni.requireNativePlugin('uniMP');

const events={}

function downLoadUniMP(url,callback,fail){
	uni.downloadFile({
		url,
		success(res) {
			callback(res)
		},
		fail:fail
	})
}

function installUniMP(appid,filePath,success,error,extraData){
	mp.installUniMP({
	 appid,
	 wgtFile: filePath
	}, (ret)=>{
		if(ret.code===0){
			openUniMP(appid,success,extraData,error)
		}else{
			error(ret)
		}
	});
}

function openUniMP(appid,success,extraData,error){
	mp.openUniMP({
	 appid,
	 extraData
	}, (ret)=>{
		if(ret.code===0){
			success(ret)
		}else{
			error(ret)
		}
	});
}


/**
 * 打开小程序
 * @param {String} appid 小程序appid
 * @param {String} netFilePath 小程序网络地址
 * @param {Object} extraData 传递给小程序的参数
 * @param {Function} success 成功回调
 * @param {Function} onerror 异常回调
  */

function openUniMiniProgram(appid, netFilePath,extraData,success,onerror){
	// let key = uni.getStorageSync(netFilePath)
	downLoadUniMP(netFilePath,(res)=>{
		installUniMP(appid,res.tempFilePath,success,onerror,extraData)
	},onerror)
}

/**
 * 向小程序发送事件
 * @param {String} appid 小程序appid
 * @param {String} event 事件名称，需要小程序监听
 * @param {Object|String} data 事件携带参数
 * @param {Function} callback 事件发送后回调
 */

function sendEvent(appid,event,data,callback){
	mp.sendUniMPEvent(appid, event, data, callback);
}

/**
 * 关闭小程序
 * @param {String} appid 小程序appid
 * @param {Function} callback 关闭后回调
 */

function closeUniMinProgram(appid,callback){
	mp.closeUniMP(appid,callback)
}

/**
 * 隐藏/后台运行小程序
 * @param {String} appid 小程序appid
 * @param {Function} callback 隐藏后回调
 */

function hideUniMP(appid,callback){
	mp.hideUniMP(appid, callback);
}

/**
 * 显示运行中小程序
 * @param {String} appid 小程序appid
 * @param {Function} callback 显示后回调
 */
function showUniMP(appid,callback){
	mp.showUniMP(appid, callback);
}

/**
 * 添加监听事件
 * @param {String} event 事件名称
 * @param {Function} callback 事件触发后回调
 * 注意：相同事件会覆盖旧事件
 */
function addEvent(event,callback){
	events[event]=callback
}

mp.onUniMPEventReceive(ret=>{
	if(events[ret.event]){
		events[ret.event](ret)
	}
 });
/**
 * 设置小程序胶囊按钮及事件
 * @param {Array} list 
 * list: [
	 {
		 id: 按钮id,
		 title: 按钮标题,
		 event: 点击事件触发回调
	 }
 ]
 */
function setActionSheet(list){
	mp.setDefaultMenuItems({
		items: list
	},(ret)=>{
		for (var i = 0; i < list.length; i++) {
			const d = list[i]
			if(ret.id===d.id){
				d.event(ret)
			}
		}
	})
}

export default {openUniMiniProgram,sendEvent,closeUniMinProgram,hideUniMP,showUniMP,addEvent,setActionSheet}
// #endif

// #ifndef APP-PLUS
export default {openUniMiniProgram:()=>{
	alert('仅APP支持')
},sendEvent:()=>{
	alert('仅APP支持')
},sendEvent:()=>{
	alert('仅APP支持')
},closeUniMinProgram:()=>{
	alert('仅APP支持')
},hideUniMP:()=>{
	alert('仅APP支持')
},showUniMP:()=>{
	alert('仅APP支持')
},addEvent:()=>{
	alert('仅APP支持')
},setActionSheet:()=>{
	alert('仅APP支持')
}}
// #endif
