 (function(){

angular.module("turtleFacts")
.controller("listCntrl", ListController);

ListController.$inject = ['quizMetrics', 'dataService'];


function ListController(quizMetrics, dataService){
  //$scope.dummyData = "Hi there";
  var vm = this;

  vm.quizMetrics = quizMetrics;
  //vm.data = turtlesData;
  vm.data = dataService.turtlesData;
  vm.activeTurtle = {};
  vm.changeActiveTurtle = changeActiveTurtle;
  vm.activateQuiz = activateQuiz;
  vm.search = "";

  function changeActiveTurtle(index) {
  	vm.activeTurtle = index;
  }

  function activateQuiz() {
    quizMetrics.changeState("quiz", true);
  }
}


})();