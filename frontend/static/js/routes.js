import Home from './views/Home.js';
import Product from './views/Product.js';
import About from './views/About.js';
import ProductItem from './views/ProductItem.js';

export const routes= [
	{ path: '/', view: Home	},
	{ path: '/about', view: About	},
	{ path:	'/product', view:	Product	},
	{ path:	'/product/:id', view:	ProductItem	},
]
