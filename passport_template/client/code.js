const url = "http://localhost:3000";

var app = new Vue ( {
	el: "#app",

	data: {
		greeting: "Hello world!",
		register_username: "",
		register_password: "",
		login_username: "",
		login_password: "",
	},

	methods: {
		register: function() {
			fetch(`${url}/users/register`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					username: this.register_username,
					password: this.register_password
				})
			}).then(function(response) {
				if (response.status == 422 || response.status == 400) {
					response.json().then(function(data) {
						alert(data.msg);
					})
				} else if (response.status == 201) {
					console.log("It worked");
				}
			});
		},
		login: function() {
			fetch(`${url}/users/login`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					username: this.login_username,
					password: this.login_password
				})
			}).then(function(response) {
				if (response.status == 200 || response.status == 403) {
					response.json().then(function(data) {
						alert(data.msg);
					})
				}
			});
		},
		checkAuthentication: function() {
			fetch(`${url}/`, {
				credentials: "include",
			}).then(function(response) {
				response.json().then(function(data) {
					alert(data.msg);
				});
			});
		}
	},

	computed: {
		
	}
} );
