export default class BaseView{
	constructor(params){
		this.params= params;
	}

	setTitle(title){
		document.title= title
	}
	
	async getHTML(){
		return '';
	}
}