export const getParams= async (path) => {
	let paramsArr= [];
	const splitted=	path.split('/')
	await Promise.all(splitted.map( (item,index) => { 
		if(index>0){
			paramsArr.push(item);
		}			
	}))
	return paramsArr;
}