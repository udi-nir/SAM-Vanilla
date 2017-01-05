var App = App || {};
App.Actions = {};

(function(){
	App.Actions.enterEditMode = function(data) {
	    App.Model.enterEditMode(data);
	};

	App.Actions.cancelEditMode = function(data) {
	    App.Model.cancelEditMode(data);
	};
	
	App.Actions.save = function(data) {
		App.Model.save(data);
	};
	
	App.Actions.delete = function(data) {
		App.Model.delete(data);
	};
	
	App.Actions.startEvents = function(){
		App.Sensor.addListener("1", this.save, this.delete);
	};
	
	App.Actions.stopEvents = function(){
		App.Sensor.removeListener("1");
	};
})();