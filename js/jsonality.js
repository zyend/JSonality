(function ($) {
	$.fn.jsonality = function (option) {
		console.log('Quiz Ready');
		const $This = this,
			page = $This.data('quiz-set'),
			defaultSet = 'emotions',
			testSet = page ? page : defaultSet;
		let genericAnswer = [
			{ value: 6, label: 'Strongly agree' },
			{ value: 5, label: 'Agree' },
			{ value: 4, label: 'Agree a little' },
			{ value: 3, label: 'Disagree a little' },
			{ value: 2, label: 'Disagree' },
			{ value: 1, label: 'Strongly disagree' },
		];

		let quiz = {
			xmas: [
				{
					question: 'Which popular Christmas beverage is also called "milk punch?"',
					answer: [
						{value: 0, label: 'Coffee'},
						{value: 1, label: 'Eggnog'},
						{value: 0, label: 'Milk and Cookie'},
						{value: 0, label: 'Dr Christmas'}
					]
				},
				{
					question: 'Which reindeer isn&rsquo;t Santa&rsquo;s',
					answer: [
						{value: 0, label: 'Dasher'},
						{value: 0, label: 'Comet '},
						{value: 0, label: 'Dancer'},
						{value: 1, label: 'Snoopy'},
						{value: 0, label: 'Prancer'}
					]
				},
				{
					question: 'How many ghosts show up in <em>A Christmas Carol?</em>',
					answer: [
						{value: 0, label: '2'},
						{value: 0, label: '3'},
						{value: 1, label: '4'},
						{value: 0, label: '5'}
					]
				},
				{
					question: 'What are the other most popular names for Santa Claus?',
					answer: [
						{value: 0, label: 'Charlie Brown'},
						{value: 1, label: 'Kris Kringle'},
						{value: 1, label: 'Saint Nick'},
						{value: 0, label: 'Morgan Freeman'}
					]
				},
				{
					question: 'What do people traditionally put on top of a Christmas tree?',
					answer: [
						{value: 0, label: 'Snow Flak'},
						{value: 1, label: 'Angle'},
						{value: 0, label: 'Star'},
						{value: 0, label: 'Cross'}
					]
				},
				{
					question: 'Which country did eggnog come from?',
					answer: [
						{value: 0, label: 'American'},
						{value: 1, label: 'England'},
						{value: 0, label: 'Britain'},
						{value: 0, label: 'France'}
					]
				},
			],
		};

		let init = false,
			currentIndex = 0,
			qzHtml = [];

		const Quiz = {
			OutputCard(obj, index) {
				if (!obj || !obj.hasOwnProperty("question")) return;
				const uID = page +'-'+ index;
				let answer = obj.hasOwnProperty("answer") ? obj.answer : genericAnswer;
				let optionHtml = answer.map((a, i) =>{
					let label = $(`<p><label for="${uID+i}"> ${a.label} </label></p>`)
					let input = $(`<input type="radio" value="${a.value}" name="${uID}" id="${uID+i}">`).on("change", function () {
						$(this).parents('fieldset').find("button").prop("disabled", false);
					})
					return label.prepend(input);
				}
				);

				let btn = $("<button>Next</button>")
					.prop("disabled", true)
					.on('click', function(){ return Quiz.NextQuestion(index+1); });

				let html = $(
					`<fieldset id="${uID}">` +
						`<h3>${index + 1}. ${obj.question}</h3>` +
						`</fieldset>`
				)
					.append(optionHtml)
					.append(btn).slideUp();
				return html;
			},

			CreateQuiz() {
					qzHtml.push( Quiz.FirstFrame() );
				$.each(quiz[testSet], function (index, value) {
					qzHtml.push(Quiz.OutputCard(value, index));
				});
				$This.append(qzHtml[0].slideDown());
			},

			NextQuestion(index) {
				currentIndex = index + 1;
				console.log('currentIndex:', currentIndex, 'index:', index );
				if (index !== -1){
					$(qzHtml[index]).slideUp();
				}
				if (currentIndex >= qzHtml.length ){
					Quiz.Tally();
				} else {
					$This.append( qzHtml[currentIndex] );
					qzHtml[currentIndex].slideDown();
				};
			},

			FirstFrame(){
				let btn = $("<button>Go!</button>").on('click', function(){
						return Quiz.NextQuestion(0);
				});
				let html = $(`<div><h1>Ready?</h1></div>`).append(btn);
				return html;
			},

			Tally() {
				let answers = [];
				$This.find('input[type="radio"]:checked').each(function () {
					answers.push(parseInt($(this).val()));
				});
				const sum = answers.reduce((partial, a) => partial + a, 0);
				console.log('Answers:', answers, 'Sum:', sum);

				$This.append(`<h2>Right Answers: ${sum} / ${quiz[testSet].length}</h2>`);
			},
		};

		if (!init) {
			Quiz.CreateQuiz();
			init = true;
		}
		return this;
	};
})(jQuery);
