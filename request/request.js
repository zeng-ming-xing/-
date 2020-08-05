
export function request(params){
	const d_url='https://api.ynblog.cn';
	uni.showLoading({
		mask:true,
		title:"加载中"
	})
	return new Promise((resolve,reject)=>{
		uni.request({
			url:d_url+params.url,
			method:params.method,
			data:params.data,
			timeout:10000,
			success(res) {
				resolve(res)
				uni.hideLoading()
			},
			fail(err) {
				reject(err)
				
			}
		})
	})
}
