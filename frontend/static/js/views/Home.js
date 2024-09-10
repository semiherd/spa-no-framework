import BaseView from './Base.js';

export default class Home extends BaseView{
	constructor(params){
		super(params)
		this.params= params;
		this.title='Home';
		this.setTitle('Home');	
	}
	async getHtml(){
		 return `
		 	<h1>Viewing ${this.title} Content</h1>
		 `
	}
}