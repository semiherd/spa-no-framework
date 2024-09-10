import BaseView from './Base.js';

export default class About extends BaseView{
	constructor(params){
		super()
		this.title='About';
		this.params= params;
		this.setTitle('About');	
	}
	async getHtml(){
		 return `
		 	<h1>Viewing ${this.title} Content</h1>
		 `
	}
}