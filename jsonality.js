(function ($) {
	$.fn.jsonality = function (option) {
		console.log('Quiz Ready');
		const $This = this,
			page = option;
		let answer = [
			{ value: 6, label: 'Strongly agree' },
			{ value: 5, label: 'Agree' },
			{ value: 4, label: 'Agree a little' },
			{ value: 3, label: 'Disagree a little' },
			{ value: 2, label: 'Disagree' },
			{ value: 1, label: 'Strongly disagree' },
		];

		let quiz = {
			fruit: [
				{
					question: 'An Apple a day ...',
				},
				{
					question: 'Grapes makes great wine',
				},
				{
					question: 'Tomato is a fruit',
				},
				{
					question: 'Pumpkin makes pie',
				},
				{
					question: 'Concentrated orange juice',
				},
				{
					question: 'Banana peels makes great slippers.',
				},
			],
		};

		let init = false,
			currentIndex = 0,
			qzHtml = [];

		const Quiz = {
			OutputCard(obj, index) {
				if (!obj || !obj.hasOwnProperty('question')) return;
				const uID = page + index;
				let optionHtml = answer.map((a) =>
					$(`<label><input type="radio" value="${a.value}" name="${uID}"> ${a.label} </label>`).on('change', function () {
						$(this).parent().find('button').prop('disabled', false);
					})
				);

				let btn = $('<button>Next</button>')
					.prop('disabled', true)
					.click(function () {
						return Quiz.NextQuestion(index);
					});
				// let className = index != 0 ? "hidden" : "";
				// class="${className}"
				let html = $(`<fieldset id="${uID}">` + `<h3>${index + 1}. ${obj.question}</h3>` + `</fieldset>`)
					.append(optionHtml)
					.append(btn)
					.slideUp();
				return html;
			},

			CreateQuiz() {
				$.each(quiz[page], function (index, value) {
					qzHtml.push(Quiz.OutputCard(value, index));
				});
				$This.append(qzHtml[currentIndex].slideDown());
			},

			NextQuestion(index) {
				currentIndex = index + 1;
				$(qzHtml[index]).slideUp();
				if (currentIndex == quiz[page].length) {
					Quiz.Tally();
				} else {
					$This.append(qzHtml[currentIndex]);
					qzHtml[currentIndex].slideDown();
				}
			},

			Tally() {
				let answers = [];
				$This.find('input[type="radio"]:checked').each(function () {
					answers.push(parseInt($(this).val()));
				});
				const sum = answers.reduce((partial, a) => partial + a, 0);
				console.log('Answers:', answers, 'Sum:', sum);

				$This.append(`<h2>Total: ${sum}</h2>`);
			},
		};

		if (!init) {
			Quiz.CreateQuiz();
			init = true;
		}
		return this;
	};
})(jQuery);
