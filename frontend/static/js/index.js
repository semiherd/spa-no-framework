import { routes } from './routes.js';
import { getParams } from './utils/pathRegex.js';

const navigate= (url) => {
	history.pushState(null,null,url);
	router();
}

const checkPattern= async (patternList,path) => {
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

const router= async () => {	
	const defaultPath= '/';

	const possibleRoutes= await Promise.all(routes.map( async  r => {
		const routeParams= await getParams(r.path);
		return {
			route: r,
			params:	routeParams
		}
	}))
	const activeRoute= await checkPattern(possibleRoutes,location.pathname)
	
	if(!activeRoute){
		const def= routes.find( r => r.path	===	defaultPath)
		return { 
			route: def.route,
			params: await getParams(defaultPath)
		}
	}

	const view= new activeRoute.pattern[0].route.view(activeRoute.params);
	document.querySelector('#app').innerHTML= await view.getHtml()
};

document.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded",() => {
	document.addEventListener("click", (e) => {
		if(e.target.matches("[data-nav-route")){
			e.preventDefault();
			navigate(e.target.href);
		}
	})
	router();
})