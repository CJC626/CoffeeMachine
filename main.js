let app = new Vue({
	el: "#app",
	data: {
		status: true,
		coffee: {
			"type": "",
			"size": "",
			"extras": "",
			"price": 0,
			"detailSize": 0,
			"detailExtra": 0
		},
		order: [],
		paid: [],
		menu: {},
		lblRoast: 'cm-opt-unselected',
		lblSize: 'cm-opt-unselected',
		lblExtra: 'cm-opt-unselected'
	},

	created:
	function () {
		let url = 'http://localhost:8626/data.json';
		this.$http.get(url).then(function (reponse) {
			app.menu = reponse.body;
			console.log(app.menu.size.small);
		})
	},

	computed: {
		price: function () {
			let size = this.coffee.size;
			let extras = this.coffee.extras;

			switch (size) {
				case "small":
					this.coffee.detailSize = this.menu.size.small;
					break;

				case "medium":
					this.coffee.detailSize = this.menu.size.medium;
					break;

				case "large":
					this.coffee.detailSize = this.menu.size.large;
					break;

				case "xlarge":
					this.coffee.detailSize = this.menu.size.xlarge;
					break;
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
		},

		roastSelected: function(){
			return this.coffee.type.length > 0 ? "cm-opt-selected" : "cm-opt-unselected";
		},

		sizeSelected: function(){
			return this.coffee.size.length > 0 ? "cm-opt-selected" : "cm-opt-unselected";
		},

		extraSelected: function(){
			return this.coffee.extras.length > 0 ? "cm-opt-selected" : "cm-opt-unselected";
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