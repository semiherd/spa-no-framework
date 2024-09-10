export const checkPattern= async (patternList,path) => {
	let matchedPattern= [];
	let params={};
	await Promise.all(patternList.map( async p => {
		const patternParams= p?.params
		const constantParams= [];
		await Promise.all(patternParams.map( (pat,pos) => {
			if(pat.charAt(0)!==':'){
				constantParams.push({
					index: pos, value: pat
				})
			}
		}));
		let count=0;
		if(patternParams){
			const pathParams= await getParams(path);
			const stringParams= constantParams.map( (v,i) => pathParams[i]===v.value);
			if(stringParams.filter(i=> i===true).length){
				if(pathParams.length===patternParams.length){
					pathParams.map((val,ord) => {
						if(!constantParams.map(c => c.index).includes(ord)){
							const paramKey= patternParams[ord].split(':')
							if(paramKey.length>0){
								params[paramKey[1]]=val
								count++
							}
						}
					});
					if(count===pathParams.length-constantParams.length)
						matchedPattern.push(p)
				}
			}		
		}
	}))
	return {
		pattern: matchedPattern,
		params
	}
}
