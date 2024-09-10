import BaseView from './Base.js';

export default class ProductItem extends BaseView{
	constructor(params){
		super(params);
		this.params= params;
		this.setTitle('Product-Item');	
	}
	async getHtml(){
		return `
			<h1>Viewing product with id ${this.params.id}</h1>
		`
	}
}