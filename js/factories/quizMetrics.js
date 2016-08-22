(function () {
	angular.module("turtleFacts")
	.factory("quizMetrics", QuizMetrics);

	QuizMetrics.$inject = ['dataService'];

	function QuizMetrics(dataService) {
		 var quizObj = {
		 	quizActive: false,
		 	resultsActive: false,
		 	changeState: changeState,
		 	correctAnswers: [],
		 	markQuiz: markQuiz,
		 	numCorrect: 0
		 };

		 return quizObj;

		 function changeState(metric, state){
		 	if (metric === "quiz") {
		 		quizObj.quizActive = state;
		 	}
		 	else if(metric === "results"){
		 		quizObj.resultsActive = state;
		 	}
		 	else {
		 		return false;
		 	}
		 }

		 function markQuiz() {
		 	quizObj.correctAnswers = dataService.correctAnswers;
		 	for(var i = 0 ; i < dataService.quizQuestions.length; i++){
		 		if(dataService.quizQuestions[i].selected === dataService.correctAnswers[i]){
		 			dataService.quizQuestions[i].correct = true;
		 			quizObj.numCorrect++;
		 		} else {
		 			dataService.quizQuestions[i].correct = false;
		 		}
		 	}

		 }
	}

})();