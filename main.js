let app = new Vue({
	el: "#app",
	data: {
		status: false,
		coffee: {
			type: "",
			size: "",
			extras: "",
			price: 0,
			detailSize: 0,
			detailExtra: 0,
		},

		order: [],
		paid: [],
	},

	computed: {
		price: function () {
			let size = this.coffee.size;
			let extras = this.coffee.extras;

			if (size === "small") {
				this.coffee.detailSize = 1.5;
			} else if (size === "medium") {
				this.coffee.detailSize = 1.7;
			} else if (size === "large") {
				this.coffee.detailSize = 1.9;
			} else if (size === "xlarge") {
				this.coffee.detailSize = 2.1;
			}


			if (extras === "milk") {

				if (size != "xlarge") {
					this.coffee.detailExtra = 0.05;
				} else {
					this.coffee.detailExtra = 0.1;
				}

			} else if (extras === "cream") {

				if (size != "xlarge") {
					this.coffee.detailExtra = 0.15;
				} else {
					this.coffee.detailExtra = 0.2;
				}

			} else if (extras === "both") {

				if (size != "xlarge") {
					this.coffee.detailExtra = 0.1;
				} else {
					this.coffee.detailExtra = 0.15;
				}

			}
			console.log("precio tamaño: " + this.coffee.detailSize);
			console.log("precio extras: " + this.coffee.detailExtra);
			let final = (this.coffee.detailSize + this.coffee.detailExtra).toFixed(2);
			this.coffee.price = final;

			//ECMA6 template literals not working here. Used v-HTML to embed the result.
			return `<p><span class="subt">Price:</span> ${final}€</p>
			<p><span class="subt" style="text-decoration: underline;">Detail:</span></p>
	  	<span class="subt">Coffee:</span> ${this.coffee.detailSize.toFixed(2)}€ <span class="subt">Extras:</span> ${this.coffee.detailExtra.toFixed(2)}€`;
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
		},

		showPrice: function (item) {
			switch (item) {
				case "small":
					return `Small: 1.50€`;
					break;

				case "mediumsz":
					return `Medium: 1.70€`;
					break;

				case "large":
					return `Large: 1.90€`;
					break;

				case "xlarge":
					return `Extra Large: 2.10€`;
					break;
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