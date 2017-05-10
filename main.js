
/**let Vue = require('vue');
let VueResource = require('vue-resource');

Vue.use(VueResource);*/

console.log("Let's load Vue");

let app = new Vue({
	el: "#app",
	data: function(){
		var d = {
			"machine":{
				"menu":{"roasts":["light"],"sizes":[],"extras":[]},
				"chosenCoffee":{
					"roast":"",
					"size":"",
					"extra":"",
					"detailSize":0.0,
					"detailExtra":0.0,
					"price":0.0
				},
				"order":[],
				"paid":[],
				"status":false
			}
		};
		return d;
	},

	created: function(){
		this.$http.get('coffeeMenu.json').then(function(resp){
			console.log(resp.body);
			 this.machine = resp.body;
		});
	},

	computed: {

		price: function () {
			let size = this.machine.chosenCoffee.size;
			let extra = this.machine.chosenCoffee.extra;

			this.machine.chosenCoffee.detailSize = this.machine.menu.sizes.find(function(e){
				return e.name==size;
			}).price;

			let matchingSize = this.machine.menu.extras.find(function(e){
				return e.name==extra;
			});
			this.machine.chosenCoffee.detailExtra = size=="xlarge" ? matchingSize.xlPrice : matchingSize.price;


		
			let final = (this.machine.chosenCoffee.detailSize + this.machine.chosenCoffee.detailExtra).toFixed(2);
			this.machine.chosenCoffee.price = final;

			//ECMA6 template literals not working here. Used v-HTML to embed the result.
			return final;
		},

		totalPaid: function () {
			let final = 0;
			console.log(this);
			for (item of this.machine.paid) {
				final += parseFloat(item.price);
			}
			return final.toFixed(2);
		}
	},

	filters: {
		name: function (item) {
			if (item == 'xlarge') {
				return "Extra Large";
			} else {
				return item.charAt(0).toUpperCase() + item.substring(1, item.length);
			}
		},

		withCents: function (price) {
			return price.toFixed(2)
		}
	},

	methods: {

		turnOn: function () {
			if (this.machine.status === true) {
				return this.machine.status = false;
			} else {
				return this.machine.status = true;
			}
		},

		newOrder: function () {
			this.machine.order.push(this.machine.chosenCoffee);
			this.machine.chosenCoffee = {
				roast: "",
				size: "",
				extras: "",
				price: 0.0,
				detailSize: 0.0,
				detailExtra: 0.0
			}
		},

		cancelOrder: function (item) {
			let position = this.machine.order.indexOf(item);
			this.machine.order.splice(position, 1);
		},

		payOrder: function () {
			for (item of this.machine.order) {
				this.machine.paid.push(item);
			}
			this.machine.order = [];
		}

	}
});