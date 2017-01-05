var App = App || {};
App.State =  {} ;

(function(){
	// Derive the state representation as a function of the systen
	// control state
	App.State.representation = function(model) {
	    var representation = "";
	
	    if (this.ready(model)) {
	        representation = App.View.ready(model);
	    }
	    else {
	    	representation = "oops... something went wrong, the system is in an invalid state" ;
	    }
	    
	    App.View.display(representation, model) ;
	};
	
	// Derive the current state of the system
	App.State.ready = function(model) {
		return true ;
	};
	
	// Next action predicate, derives whether
	// the system is in a (control) state where
	// a new (next) action needs to be invoked
	App.State.nextAction = function(model) {
		var items = model.items;
		var iceCreamFound = false;
		var chocolateSyrupFound = false;
		
		items.forEach(function(item){
			if (item.name === "Ice Cream") {
				iceCreamFound = true;
			}
			
			if (item.name === "Chocolate Syrup") {
				chocolateSyrupFound = true;
			}
		});
		
		if (iceCreamFound && !chocolateSyrupFound) {
			setTimeout(function(){
				App.Actions.save({
					name: "Chocolate Syrup",
					description: "Dark chocolate flavor syrup"
				});
			}, 1000);
		}
	} ;
	
	App.State.render = function(model) {
	    this.representation(model);
	    this.nextAction(model);
	} ;
})();