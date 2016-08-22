[$(function(){
	angular.module("turtleFacts")
	.controller("quizCntrl", QuizController);


    QuizController.$inject = ['quizMetrics', 'dataService'];


	function QuizController(quizMetrics, dataService) {
		var vm = this;
		vm.quizMetrics = quizMetrics;
		vm.dataService = dataService;
		vm.questionAnswered = QuestionAnswered;
		vm.setActiveQuestion = setActiveQuestion;
		vm.selectAnswer = SelectAnswer;
		vm.finalizeAnswers = finalizeAnswers;
		vm.activeQuestion = 0;
		vm.error = false;
		vm.finalize = false;
		

		var numQuestionsAnswered = 0;

		function setActiveQuestion (index) {
			if (index === undefined) {
				var breakOut = false;
			var quizLength = dataService.quizQuestions.length - 1;

			while(!breakOut) {
				vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

				if (vm.activeQuestion === 0) {
					vm.error = true;
				}

				if(dataService.quizQuestions[vm.activeQuestion].selected === null) {
					breakOut = true;
				}

			}
		}
			else {
				vm.activeQuestion = index;
			}
			
		}

		function QuestionAnswered() {

			var quizLength = dataService.quizQuestions.length;

			if(dataService.quizQuestions[vm.activeQuestion].selected !== null) {
				numQuestionsAnswered ++;
				if(numQuestionsAnswered >= quizLength) {
					// finalize the quiz
					for(var i=0;i<quizLength;i++) {
						if (dataService.quizQuestions[i].selected === null) {
					setActiveQuestion(i);	
					return;	
						}
					}
					vm.error = false;
					vm.finalize = true;
					return;

				}
			}
			vm.setActiveQuestion();
		}

		function SelectAnswer (index) {
			dataService.quizQuestions[vm.activeQuestion].selected = index;
		}

		function finalizeAnswers(){
			vm.finalize = false;
			numQuestionsAnswered = 0;
			vm.activeQuestion = 0;
			quizMetrics.markQuiz();
			quizMetrics.changeState("quiz", false);
			quizMetrics.changeState("results", true);

		}
	}







})();