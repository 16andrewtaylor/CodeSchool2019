

var app = new Vue ( {
	el: "#app",

	data: {
		greeting: "Hello world!",
		started: false,
		page: "yahtzee",

		yahtzee_rolls: [
			1, 2, 3, 4, 5
		],
		yahtzee: false,
		num_yahtzees: 0,
		num_rolls: 0,
		// least_num_rolls: 1000000,

		facts: [
			{
				text: "Pigs fly",
				value: true,
			},
			{
				text: "Cows moo",
				value: false,
			},
			{
				text: "Fish swim",
				value: true,
			},
		],
		current_fact: { },
		fact_guess: "",
		have_guessed_fact: false,
		correct_facts: 0,
		incorrect_facts: 0,
		fact_feedback: "Awaiting your guess...",

		question: {
			number1: 0,
			number2: 0,
			operator: "+",
			answer: 0,
		},
		guess: "",
		guessed: false,
		feedback: "Submit your answer...",
		correct: 0,
		incorrect: 0,
		rank: "Answer your first question to receive a rank.",
		time_start: new Date( ),
		time_end: new Date( ),
		time_taken: 0,
		speed: "fast",
		show_math: false,
	},

	created: function ( ) {
		this.getRandomFact( );
	},

	methods: {
		start: function ( ) {
			this.started = true;
			this.createRandomQuestion( );
			this.rollDice( );
		},

		rollDice: function ( ) {
			this.yahtzee = false;

			// var new_dice_rolls = [ ];
			// for ( var i = 0; i < 5; i++ ) {
			// 	var roll = Math.floor( Math.random( ) * 6 ) + 1;
			// 	new_dice_rolls.push( roll );
			// }
			// this.yahtzee_rolls = new_dice_rolls;
			// // this.yahtzee_rolls = [ 1, 1, 1, 1, 1 ]; // testing yahtzee
			// this.num_rolls += 1;
			
			fetch( "http://localhost:8080/yahtzee-roll" ).then( function ( response ) {
				response.json( ).then( function ( data ) {
					// console.log( data.rolls );
					app.yahtzee_rolls = data.rolls;
					app.num_rolls += 1;
					if ( app.yahtzee_rolls[ 0 ] == app.yahtzee_rolls[ 1 ] ) {
						if ( app.yahtzee_rolls[ 1 ] == app.yahtzee_rolls[ 2 ] ) {
							if ( app.yahtzee_rolls[ 2 ] == app.yahtzee_rolls[ 3 ] ) {
								if ( app.yahtzee_rolls[ 3 ] == app.yahtzee_rolls[ 4 ] ) {
									app.yahtzee = true;
									app.num_yahtzees += 1;
								}
							}
						}
					}
				});
			});
			
		},

		getRandomFact: function ( ) {
			var random_index = Math.floor( Math.random( ) * this.facts.length );
			this.current_fact = this.facts[ random_index ];
			this.have_guessed_fact = false;
			this.fact_guess = "";
			this.fact_feedback = "Awaiting your guess...";
		},
		factCheck: function ( guess ) {
			this.have_guessed_fact = true;
			if ( guess == this.current_fact.value ) {
				this.correct_facts += 1;
				this.fact_feedback = "Correct!";
			} else {
				this.incorrect_facts += 1;
				this.fact_feedback = "Incorrect!";
			}
		},

		createRandomQuestion: function ( ) {
			var num1 = Math.floor( Math.random( ) * 10 ) + 1;
			var num2 = Math.floor( Math.random( ) * 10 ) + 1;
			
			var operators = [ "+", "-", "*", "/" ];
			var random_index = Math.floor( Math.random( ) * operators.length );
			var operator = operators[ random_index ];

			var answer = 0;
			if ( operator == "+" ) {
				answer = num1 + num2;
			} else if ( operator == "-" ) {
				answer = num1 - num2;
			} else if ( operator == "*" ) {
				answer = num1 * num2;
			} else if ( operator == "/" ) {
				answer = num1 / num2;
				answer = answer.toFixed( 1 );
				answer = Number( answer );
			}

			var new_question = {
				number1: num1,
				number2: num2,
				operator: operator,
				answer: answer,
			};

			this.question = new_question;
		},
		checkAnswer: function ( ) {
			this.time_end = new Date( );
			this.guessed = true;
			if ( this.guess == this.question.answer ) {
				this.feedback = "Correct!";
				this.correct += 1;
			} else {
				this.feedback = "Incorrect.";
				this.incorrect += 1;
			}
			this.updateRank( );
			this.updateTimeTaken( );
		},
		nextQuestion: function ( ) {
			this.createRandomQuestion( );
			this.time_start = new Date( );
			this.guessed = false;
			this.feedback = "Submit an answer...";
			this.guess = "";
		},
		updateRank: function ( ) {
			var ratio = this.correct / ( this.correct + this.incorrect );

			if ( ratio < .25 ) {
				this.rank = "Beginner";
			} else if ( ratio < .5 ) {
				this.rank = "Below average";
			} else if ( ratio < .75 ) {
				this.rank = "Above average";
			} else {
				this.rank = "Master";
			}
		},
		updateTimeTaken: function ( ) {
			this.time_start = this.time_start.getTime( );
			this.time_end = this.time_end.getTime( );
			this.time_taken = this.time_end - this.time_start;
			this.time_taken /= 1000;

			if ( this.time_taken < 3 ) {
				this.speed = "fast";
			} else if ( this.time_taken < 6 ) {
				this.speed = "quick";
			} else if ( this.time_taken < 10 ) {
				this.speed = "average";
			} else {
				this.speed = "slow";
			}
		},
	},

	computed: {
		displayedAnswer: function ( ) {
			if ( this.guessed ) {
				return this.question.answer;
			} else {
				return "??";
			}
		},
	}
} );
