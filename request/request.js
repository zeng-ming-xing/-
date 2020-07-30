export function request(params){
	return new Promise((resolve,reject)=>{
		...params,
		success(res){
			resolve(res)			
		},
		fail(err){
			reject(err)			
		}
	})
}
