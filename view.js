var App = App || {};
App.View = {};

(function(){
	// Initial State
	App.View.init = function(model) {
	    return this.ready(model) ;
	} ;
	
	// State representation of the ready state
	App.View.ready = function(model) { 
	    model.lastEdited = model.lastEdited || {} ;
	    var nameValue = model.lastEdited.name || "Name" ;
	    var descriptionValue = model.lastEdited.description || "Description" ;
	    var id = model.lastEdited.id || "" ;
	    var cancelButton = "<button id='cancel' onclick='App.Actions.cancelEditMode();'>Cancel</button> " ;
	    var valAttr = "value" ;
	    var actionLabel = "Save" ;
	    var idElement = ", \"id\":"+id ;
	    if (id.length === 0) { 
	    	cancelButton = "" ; 
	    	valAttr = "placeholder"; 
	    	idElement = "" ; 
	    	actionLabel = "Add";
	    }

	    var output = [
			"<button onclick='App.Actions.startEvents()'>Start events</button> ",
			"<button onclick='App.Actions.stopEvents()'>Stop events</button>",
			"<br><hr>",
			"<div>",
				model.items.map(function(e){
					var itemHtm = [
						"<div>",
							"<div class='itemTextPart'>",
								"<b class='title' id='"+ e.id +"' onclick='App.Actions.enterEditMode({",
									"name:\""+e.name+"\", description:\""+e.description+"\", id:"+e.id+"});'>"+e.name+"</b>",
								"<br>" + e.description + "<br>",
							"</div>",
							"<button class='itemButtonPart' onclick='App.Actions.delete({id:"+e.id+"});'>Delete</button>",
						"</div>",
						"<hr>"
					];
					return itemHtm.join("");
				}).join(""),
			"</div> ",
			"<div> ",
				"<input id='name' type='text' "+valAttr+"='"+nameValue+"'> ",
				"<input id='description' type='text' "+valAttr+"='"+descriptionValue+"'> ",
				"<button id='save' onclick='App.Actions.save({",
					"name:document.getElementById(\"name\").value,",
					"description: document.getElementById(\"description\").value",
					idElement+"});'>"+actionLabel+"</button> ",
				cancelButton,
			"</div>"
		];
	    return output.join("");
	} ;
	
	// added this to allow post-paint actions.
	App.View._postDisplay = function(model) {
		setTimeout(function(){
			if (model && model.lastAdded) {
				var item = document.getElementById(model.lastAdded);
				if (item) {
					item.scrollIntoView();
				}
			}			
		}, 0);
	};
	
	// display the state representation
	// I added the model param, to check if an element was added: 
	// in that case we want to scroll it into the viewport.
	App.View.display = function(representation, model) {
	    var stateRepresentation = document.getElementById("representation");
	    stateRepresentation.innerHTML = representation;
		
		this._postDisplay(model);
	} ;
})();