import { routes } from './routes.js';
import { getParams } from './utils/getParams.js';
import { checkPattern } from './utils/checkPattern.js';

const navigate= (url) => {
	history.pushState(null,null,url);
	router();
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