
/**let Vue = require('vue');
let VueResource = require('vue-resource');

Vue.use(VueResource);*/

console.log("Let's load Vue");

let app = new Vue({
	el: "#app",
	data: function(){
		var d = {"offering":{
			"coffee":{
				"roast": "",
				"size": "",
				"extras": "",
				"price": 0,
				"detailSize": 0,
				"detailExtra": 0
			},
			"menu":{
				"size":{},
				"extras":{
					"milk":[],
					"cream":[],
					"both":[]
				}
			},
			"order":[],
			"paid":[]
		}};
		this.$http.get('coffeeOffering.json').then(function(resp){
			console.log(resp.body);
			d.offering = resp.body;
		});
		return d;
	},

	computed: {

		price: function () {
			let size = this.offering.coffee.size;
			let extras = this.offering.coffee.extras;

			switch (size) {
				case "small":
					this.offering.coffee.detailSize = this.offering.menu.size.small;
					break;

				case "medium":
					this.offering.coffee.detailSize = this.offering.menu.size.medium;
					break;

				case "large":
					this.offering.coffee.detailSize = this.offering.menu.size.large;
					break;

				case "xlarge":
					this.offering.coffee.detailSize = this.offering.menu.size.xlarge;
					break;
			}


			if (extras === "milk") {

				if (size != "xlarge") {
					console.log(this.offering);
					this.offering.coffee.detailExtra = this.offering.menu.extras.milk[0];
				} else {
					this.offering.coffee.detailExtra = this.offering.menu.extras.milk[1];
				}

			} else if (extras === "cream") {

				if (size != "xlarge") {
					this.offering.coffee.detailExtra = this.offering.menu.extras.cream[0];
				} else {
					this.offering.coffee.detailExtra = this.offering.menu.extras.cream[1];
				}

			} else if (extras === "both") {

				if (size != "xlarge") {
					this.offering.coffee.detailExtra = this.offering.menu.extras.both[0];
				} else {
					this.offering.coffee.detailExtra = this.offering.menu.extras.milk[1];
				}

			}
			console.log("precio tamaño: " + this.offering.coffee.detailSize);
			console.log("precio extras: " + this.offering.coffee.detailExtra);
			let final = (this.offering.coffee.detailSize + this.offering.coffee.detailExtra).toFixed(2);
			this.offering.coffee.price = final;

			//ECMA6 template literals not working here. Used v-HTML to embed the result.
			return final;
		},

		totalPaid: function () {
			let final = 0;
			for (item of this.offering.paid) {
				final += parseFloat(item.price);
			}
			return final.toFixed(2);
		}
	},

	filters: {
		name: function (item) {
			if (item == 'xlarge') {
				return "Extra large";
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
			if (this.offering.status === true) {
				return this.offering.status = false;
			} else {
				return this.offering.status = true;
			}
		},

		newOrder: function () {
			this.offering.order.push(this.offering.coffee);
			this.offering.coffee = {
				roast: "",
				size: "",
				extras: "",
				price: 0.0,
				detailSize: 0.0,
				detailExtra: 0.0
			}
		},

		cancelOrder: function (item) {
			let position = this.offering.order.indexOf(coffee);
			this.offering.order.splice(position, 1);
		},

		payOrder: function () {
			for (item of this.offering.order) {
				this.offering.paid.push(item);
			}
			this.offering.order = [];
		}

	}
});