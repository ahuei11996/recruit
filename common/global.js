/*
 * 定义路由跳转功能
 * */
const toPage = function(data) {

	let type = data.type || "navigate"
	let url = data.url || ""
	if (type == "redirect") {
		uni.redirectTo({
			animationType: 'pop-in',
			url: url
		});
	} else if (type == "switch") {
		uni.switchTab({
			animationType: 'pop-in',
			url: url
		});
	} else if (type == "launch") {
		uni.reLaunch({
			animationType: 'pop-in',
			url: url
		});
	} else if (type == "back") {
		uni.navigateBack({
			animationType: 'pop-out',
			delta: 1
		});
	} else {
		uni.navigateTo({
			animationType: 'pop-in',
			url: url
		});
	}
}

// #ifdef APP-PLUS
const beAppStatic = () => {
	if (plus.runtime.isApplicationExist({
			pname: 'com.tencent.mm',
			action: 'weixin://'
		})) {
		return true
	} else {
		return false
	}
}
// #endif

/**
 * 内容合法性验证插件
 * content：验证的内容，
 * isMsg：是否弹出默认提示，true：弹出，false：不弹出
 * */
// const censor = async (content,isMsg = true) => {
// 	let res = await $Request(Api.ServerApi.aiTextCensor,{text:content})
// 	if (res.conclusionType != 1) {
// 		let msg = '';
// 		res.data.forEach((item) => {
// 			msg = msg + item.msg + '['
// 			item.hits.forEach((subItem) => {
// 				msg += subItem.words
// 			})
// 			msg += ']'
// 		})
// 		if(isMsg){			
// 			uni.showModal({
// 				content: msg,
// 			});
// 		}
// 		return false
// 	} else {
// 		return true
// 	}
// }
/**
 * 上传采集信息方法
 * data：验证的内容，
 * isMsg：是否弹出默认提示，true：弹出，false：不弹出
 * */
// const pushData = async (type, desc, params, value) => {

// 	if (user_info()) {
// 		// 获取当前路由
// 		var pages = getCurrentPages();
// 		var page = (pages[pages.length - 1]).route;

// 		//时间戳
// 		let inDate = Math.round(new Date() / 1000)
// 		let pushObj

// 		// 系统信息
// 		pushObj = {
// 			desc: desc,
// 			params: params,
// 			value: value,
// 			user_id: user_info().user_id,
// 			type: type,
// 			path: page,
// 			inTime: inDate,
// 			system: getSystemInfo()
// 		}

// 		await $Request(Api.ServerApi.dataSpider, pushObj, 'POST')
// 	}
// 	// push对象

// }

/**
 * 打开链接插件
 * checkUrl：需验证的域名，符合条件则在应用内打开
 * url：需要检测的域名
 * */
const openUrl = (url) => {

	//
	let checkUrl = [
		"www.hainanplus.cn",
		"m.hainanplus.cn",
		"hainanplus.cn"
	]

	let arr = url.split("/")
	let goToLink = ""
	// if (arr[2] == "www.hainanplus.cn" || arr[2] == "hainanplus.cn" || arr[2] == "m.hainanplus.cn") {
	if(checkUrl.includes(arr[2] )){
		// 内链
		if (arr[2] == "m.hainanplus.cn") {
			// 移动端网站格式化
			goToLink = `/detail/${arr[3]}/index?id=${arr[4]}`
		} else {
			// 电脑端网址格式化
			goToLink = `/detail/${arr[3]}/index?id=${arr[5]}`
		}
		toPage({
			url: goToLink
		})
	} else {
		// 外链
		// #ifdef H5
		window.open(url)
		// #endif
		// #ifdef APP-PLUS
		plus.runtime.openURL(url)
		// #endif
		// #ifdef MP-WEIXIN
		// TODO
		console.log('no set')
		// #endif
	}

}

// /**
//  *  获取用户token
//  *  toLogin (false:直接返回false, true:跳转到用户登录界面）
//  * */
// const user_info = (toLogin = false) => {
// 	let base64 = new Base64()
// 	if (uni.getStorageSync('token')) {
// 		return JSON.parse(base64.decode(uni.getStorageSync('token')))
// 	} else {
// 		if (toLogin) {
// 			let param = "",
// 				curRoute, curParam, pi = true
// 			let routes = getCurrentPages()
// 			curRoute = routes[routes.length - 1].route
// 			curParam = routes[routes.length - 1].options
// 			for (let key in curParam) {
// 				if (pi) {
// 					param += '?' + key + '=' + curParam[key]
// 				} else {
// 					param += '&' + key + '=' + curParam[key]
// 				}
// 			}
// 			uni.setStorageSync("redirect_url", curRoute + param)
// 			uni.navigateTo({
// 				url: '/pages/user/login'
// 			})
// 		} else {
// 			return false
// 		}
// 	}
// }

const bdTogcj = (lat, lng) => {
	let x_pi = 3.14159265358979324 * 3000.0 / 180.0;

	let x = lng - 0.0065;

	let y = lat - 0.006;

	let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);

	let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);

	let g2_lnn = z * Math.cos(theta);

	let g2_lat = z * Math.sin(theta);

	return [g2_lat, g2_lnn]
}
/**
 * 默认弹窗
 * */
const message = (data) => {
	uni.showModal(data)
}

/**
 * 获取用户设备信息
 * */
const system = uni.getSystemInfoSync()

// 获取图片倍数
let ImageAddr, multiple
let pixelRatio = Number(system.pixelRatio)
// let ImgObj = new Image()
if (pixelRatio > 1 && pixelRatio <= 2) {
	multiple = '@2x'
} else if (pixelRatio > 2) {
	multiple = '@3x'
}

// #ifdef APP-PLUS
ImageAddr = '/static/plus/'
// #endif
// #ifndef APP-PLUS
ImageAddr = 'https://media.hainanplus.cn/plus/'
// #endif
const getImage = (filename) => {
	let site = filename.lastIndexOf("\.")
	return ImageAddr + filename.slice(0, site) + multiple + filename.slice(site)
}

/**
 * url: 链接地址，
 * data: 发送的数据，
 * type: 传输形式，GET，POST，DELETE，PUT
 * header: 发送的头文件，默认自带token
 * */
const request =	(url = '', date = {}, type = 'GET', header = {}) => {
		let token = uni.getStorageSync("token")
		if (token && !(header['token'] && header['token'] != '')) {
			header['token'] = token
		}
		return new Promise((resolve, reject) => {
			uni.request({
				method: type,
				url: url,
				data: date,
				header: header,
				dataType: 'json',
			}).then((response) => {
				setTimeout(function() {
					uni.hideLoading();
				}, 200);
				let [error, res] = response;
				resolve(res.data);
			}).catch(error => {
				let [err, res] = error;
				reject(err)
			})
		});

	}

export default {
	// Base64: new Base64(),
	toPage,
	message,
	// user_info,
	// bdTogcj,
	system,
	openUrl,
	// pushData,
	getImage,
	// #ifdef APP-PLUS
	beAppStatic,
	// #endif
}