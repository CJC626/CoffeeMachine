let app = new Vue({
	el: "#app",
	data: jsonData,

	computed: {
		price: function () {
			let size = this.coffee.size;
			let extras = this.coffee.extras;

			if (size === "small") {
				this.coffee.detailSize = this.menu.size.small;
			} else if (size === "medium") {
				this.coffee.detailSize = this.menu.size.medium;
			} else if (size === "large") {
				this.coffee.detailSize = this.menu.size.large;
			} else if (size === "xlarge") {
				this.coffee.detailSize = this.menu.size.xlarge;
			}


			if (extras === "milk") {

				if (size != "xlarge") {
					this.coffee.detailExtra = this.menu.extras.milk[0];
				} else {
					this.coffee.detailExtra = this.menu.extras.milk[1];
				}

			} else if (extras === "cream") {

				if (size != "xlarge") {
					this.coffee.detailExtra = this.menu.extras.cream[0];
				} else {
					this.coffee.detailExtra = this.menu.extras.cream[1];
				}

			} else if (extras === "both") {

				if (size != "xlarge") {
					this.coffee.detailExtra = this.menu.extras.both[0];
				} else {
					this.coffee.detailExtra = this.menu.extras.milk[1];
				}

			}
			console.log("precio tamaño: " + this.coffee.detailSize);
			console.log("precio extras: " + this.coffee.detailExtra);
			let final = (this.coffee.detailSize + this.coffee.detailExtra).toFixed(2);
			this.coffee.price = final;

			//ECMA6 template literals not working here. Used v-HTML to embed the result.
			return final;
		},

		totalPaid: function () {
			let final = 0;
			for (item of this.paid) {
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
		 	return price.toFixed(2);
		}//,
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