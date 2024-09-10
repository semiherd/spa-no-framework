import BaseView from './Base.js';

export default class Product extends BaseView{
	constructor(params){
		super()
		this.params= params;
		this.title='Product';
		this.setTitle('Product');	
	}
	async getHtml(){
		 return `
		 	<h1>Viewing ${this.title} Content</h1>
		 `
	}
}