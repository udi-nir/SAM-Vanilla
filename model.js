var App = App || {};
App.Model = {};

(function(){
	App.Model.items = [
		{
			id: 1,
			name: "Cornflakes",
			description: "Gluten free toasted corn flakes"
		},
		{
			id: 2,
			name: "Baileys",
			description: "The original Irish Cream"
		}
	];
	App.Model.itemId = 3;
	App.Model.lastAdded = null;
	App.Model.lastEdited = null;
	
	App.Model._clearData = function(){
		this.lastAdded = null;
		this.lastEdited = null;
	};
	
	App.Model.save = function(data){
		this._clearData();
		
        if (data.id) {
            // has been edited
            var me = this;
            this.items.forEach(function(el,index) {
                if (el.id !== undefined) {
                    if (el.id === data.id) {
                        me.items[index] = data ;       
                    }
                }
            });
        } 
        else {
            // new item
            data.id = this.itemId++ ;
            this.items.push(data);
			this.lastAdded = data.id;
        }
        
        App.State.render(this);
	};
	
	App.Model.enterEditMode = function(data) {
		this._clearData();
		this.lastEdited = data;
		
		App.State.render(this);
	};
	
	App.Model.cancelEditMode = function() {
		this._clearData();
		App.State.render(this);
	};
	
	App.Model.delete = function(data) {
		this._clearData();

        var d = -1 ;
        this.items.forEach(function(el,index) {
            if (el.id !== undefined) {
                if (el.id === data.id) {
                    d = index ;       
                }
            }
        });
        if (d>=0) {
            this.items.splice(d,1);
        }
		
		App.State.render(this);
	};
})();