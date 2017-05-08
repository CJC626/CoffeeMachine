let app = new Vue({
	el: "#app",
	data: {
		status: false,
		coffee: {
			type: "",
			size: "",
			extras: "",
			price: ""
		},
		order: [],
		paid: [],
	},

	computed: {
		price: function () {
			let priceCoffee = 0;
			let priceExtras = 0;
			let size = this.coffee.size;
			let extras = this.coffee.extras;

			if (size === "small") {
				priceCoffee = 1.5;
			} else if (size === "medium") {
				priceCoffee = 1.7;
			} else if (size === "large") {
				priceCoffee = 1.9;
			} else if (size === "xlarge") {
				priceCoffee = 2.1;
			}


			if (extras === "milk") {

				if (size != "xlarge") {
					priceExtras = 0.05;
				} else {
					priceExtras = 0.1;
				}

			} else if (extras === "cream") {

				if (size != "xlarge") {
					priceExtras = 0.15;
				} else {
					priceExtras = 0.2;
				}

			} else if (extras === "both") {

				if (size != "xlarge") {
					priceExtras = 0.1;
				} else {
					priceExtras = 0.15;
				}

			}
			console.log("precio tamaño: " + priceCoffee);
			console.log("precio extras: " + priceExtras);
			let final = (priceCoffee + priceExtras).toFixed(2);
			this.coffee.price = final;

			//ECMA6 template literals not working here. Used v-HTML to embed the result.
			return `<p><span class="subt">Price:</span> ${final}€</p>
			<p><span class="subt" style="text-decoration: underline;">Detail:</span></p>
	  	<p><span class="subt">Coffee:</span> ${priceCoffee.toFixed(2)}€</p>
	  	<p><span class="subt">Extras:</span> ${priceExtras.toFixed(2)}€</p>`;
		},

		totalPaid: function () {
			let final = 0;
			for (item of this.paid) {
				final += parseFloat(item.price);
			}
			return final;
		}
	},

	filters: {
		name: function (item) {
			if (item == 'xlarge') {
				return "Extra large";
			} else {
				return item.charAt(0).toUpperCase() + item.substring(1, item.length);
			}
		}
	},

	methods: {
		turnOn: function () {
			if (this.status === true) {
				return this.status = false;
			} else {
				return this.status = true;
			}
		},

		newOrder: function () {
			this.order.push(this.coffee);
			this.coffee = coffee = {
				type: "",
				size: "",
				extras: "",
			}
		},

		cancelOrder: function (item) {
			let position = this.order.indexOf(coffee);
			this.order.splice(position, 1);
		},

		payOrder: function () {
			for (item of this.order) {
				this.paid.push(item);
			}
			this.order = [];
		}

	}
})