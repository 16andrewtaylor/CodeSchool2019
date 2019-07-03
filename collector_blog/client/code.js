

var app = new Vue ( {
    el: "#app",

    data: {
        page: "blog",
        drawer: false,
        categories: [
            "all",
            "clothing",
            "hunting",
            "books",
            "cards",
            "coins",
            "keychains",
            "comic books",
            "misc."
        ],
        selected_category: "all",
        posts: [ ],
        new_title: "",
        new_author: "",
        new_category: "all",
        new_image: "",
        new_text: "",
        edit_id: "",
        edit_title: "",
        edit_author: "",
        edit_category: "all",
        edit_image: "",
        edit_text: "",
        secret_keycode: "",
        username: "",
        password: "",
        // server_url: "https://collector-blog-2019.herokuapp.com",
        server_url: "http://localhost:3000",
    },

    created: function() {
        this.getPosts();
        window.addEventListener("keyup", this.keyEvents);
    },

    methods: {
        keyEvents: function(event) {
            // console.log(event.which);
            if (event.which == 68) {
                if (this.secret_keycode == "") {
                    this.secret_keycode = "D";
                } else {
                    this.secret_keycode = "";
                }
            } else if (event.which == 69) {
                if (this.secret_keycode == "D") {
                    this.secret_keycode = "DE";
                } else {
                    this.secret_keycode = "";
                }
            } else if (event.which == 76) {
                if (this.secret_keycode == "DE") {
                    this.secret_keycode = "DEL";
                } else {
                    this.secret_keycode = "";
                }
            } else {
                this.secret_keycode = "";
            }
            // console.log( this.secret_keycode );
        },
        getPosts: function() {
            fetch(this.server_url + "/posts", {
                credentials: "include"
            }).then(function(res) {
                res.json().then(function(data) {
                    app.posts = data.posts;
                });
            });
        },
        addPost: function() {
            var new_post = {
                title: this.new_title,
                author: this.new_author,
                category: this.new_category,
                date: new Date(),
                image: this.new_image,
                text: this.new_text,
            };
            fetch(this.server_url + "/posts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(new_post)
            }).then(function() {
                app.new_title = "";
                app.new_author = "";
                app.category = "all";
                app.new_image = "";
                app.new_text = "";
                app.page = "blog";
                app.getPosts();
            });
        },
        formatDate: function(post) {
            var date = new Date(post.date);
            return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        },
        selectCategory: function(category) {
            this.selected_category = category;
            this.drawer = false;
        },
        deletePost: function(post) {
            fetch(`${this.server_url}/posts/${post._id}`, {
                method: "DELETE"
            }).then(function(response) {
                if (response.status == 204) {
                    console.log("It worked");
                    app.getPosts();
                } else if (response.status == 400) {
                    response.json().then(function(data) {
                        alert(data.msg);
                    })
                }
            })
        },
        editPost: function(post) {
            // console.log(post._id);
            // go to edit page
            this.page = "edit";
            // fill out all fields with post info
            this.edit_id = post._id;
            this.edit_title = post.title;
            this.edit_author = post.author;
            this.edit_category = post.category;
            this.edit_image = post.image;
            this.edit_text = post.text;
        },
        updatePost: function() {
            // console.log("In progress");
            // this.page = "blog";
            var req_body = {
                title: this.edit_title,
                author: this.edit_author,
                category: this.edit_category,
                image: this.edit_image,
                text: this.edit_text
            };
            fetch(`${this.server_url}/posts/${this.edit_id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(req_body)
            }).then(function(response) {
                if (response.status == 400 || response.status == 404) {
                    response.json().then(function(data) {
                        alert(data.msg);
                    });
                } else if (response.status == 200) {
                    app.page = "blog";
                    app.getPosts();
                }
            });
        },
        login: function() {
            var req_body = {
                username: this.username,
                password: this.password,
            };
            fetch(`${this.server_url}/users/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(req_body)
            }).then(function(response) {
                if (response.status == 403) {
                    response.json().then(function(data) {
                        alert(data.msg);
                    })
                } else if (response.status == 200) {
                    alert("logged in");
                    app.page = "blog";
                    app.getPosts();
                }
            })
        },
        register: function() {
            var req_body = {
                username: this.username,
                password: this.password,
            };
            fetch(`${this.server_url}/users/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(req_body)
            }).then(function(response) {
                if (response.status == 422 || response.status == 400) {
                    response.json().then(function(data) {
                        alert(data.msg);
                    })
                } else if (response.status == 201) {
                    alert("registered");
                }
            })
        }
    },

    computed: {
        sorted_posts: function() {
            if (this.selected_category == "all") {
                return this.posts;
            } else {
                var sorted_posts = this.posts.filter(function(post) {
                    return post.category == app.selected_category;
                });
                return sorted_posts;
            }
        },
        show_delete: function() {
            return this.secret_keycode == "DEL";
        }
    }
} )