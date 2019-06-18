var data = {
    yahtzee_roll: [
        1, 2, 3, 4, 5
    ],
    facts: [
        {
            text: "Pigs fly",
            value: true
        },
        {
            text: "Cows moo",
            value: false
        }
    ],
    currect_fact: { },
    math_problem: {
        num1: 0,
        num2: 0,
        operator: "+",
        answer: 0
    }
};

var methods = {
    factCheck: function ( guess ) {
        if ( guess == this.current_fact.value ) {
            this.num_correct_facts += 1;
        } else {
            this.num_incorrect_facts += 1;
        }
    }
}
