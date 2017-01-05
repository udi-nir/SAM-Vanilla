var App = App || {};
App.Sensor = {};

(function(){
	////////////// private ////////////
	var listeners = {};
	
	function _addListener(id, cbSave, cbDelete){
		listeners[id] = {
			"save": cbSave,
			"delete": cbDelete
		};
	}
	
	function _removeListener(id){
		delete listeners[id];
	}
	
	function _sendEvent(type, params){
		for (var i in listeners){
			var listener = listeners[i];
			listener[type](params);
		}
	}
	///////////////////////////////////	

	////////////// public /////////////
	App.Sensor.addListener = function(id, cbSave, cbDelete){
		_addListener(id, cbSave, cbDelete);
	};
	
	App.Sensor.removeListener = function(id) {
		_removeListener(id);
	};
	
	App.Sensor.tick = function(interval, toggle){ // simulate changes
		var me = this;
		
		_sendEvent("save", {
			id: 1,
			name: "Cornflakes",
			description: toggle ? 
				"Gluten free toasted corn flakes - coming form event" : 
				"Gluten free toasted corn flakes - coming form another event"
		});
		
		setTimeout(function(){
			me.tick(interval, !toggle);
		}, interval);
	};
	///////////////////////////////////
})();