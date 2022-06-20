
var cart = {
    speed : 300,    
    /**
     * The fake <select> has been clicked, show all the options
     * @param  {element} element - the fake <select>
     */
    showOptions : function(element){
        var cartObj = this;
        
        // Show the options
        $(element).children(".select-options").slideToggle(this.speed);

        this.setActive(element);
        this.watchOptions(element);
        this.watchForClickOutside(element);
      
    },
    /**
     * Watch to see if the user clicks outside the <select> 
     * this means we need to hide the optoins
     * @param  {element} element - the fake <select>
     */
    watchForClickOutside : function(element){
    	$(document).mouseup(function (e){
			if (!$(element).is(e.target) // if the target of the click isn't the container...
        		&& $(element).has(e.target).length === 0){ // ... nor a descendant of the container
    				$(element).children(".select-options").slideUp();
    		}
    	});	
	},
	/**
     * Watch to see if the user clicks one of the optoins. 
     * Hide the options
     * then update the hidden input
     * @param  {element} element - the fake <select>
     */
    watchOptions : function(element){
    	var cartObj = this;
    	$(element).find(".select-option").click(function(e){
    		// Stop the this click event propagating up the DOM chain
            e.stopPropagation();

            cartObj.hideOptions();
            cartObj.selectOption($(this));

            // Remove the click event watcher
            $(this).off("click");
        });
    },
    /**
     * Add the active class to the currently selected 'option'
     * @param  {element} element - the fake <select>
     */
    setActive : function(element){

        $(element).find(".select-option").each(function(){
           if($(this).attr("value") == $(element).find("input").val()){
                $(this).addClass("selected");   
           } else {
               $(this).removeClass("selected");   
           }
        });
    },
    /**
     * Hide the select options
     */
    hideOptions:  function(){
        $(".select-options").slideUp(this.speed);
    },
    /**
     * Select an option. 
     * 	- Hide all options
     * 	- Find the elements parent select
     * 	- Update the hidden inputs value with the value from the selected option
     * @param  {element} element - the fake <select>
     */
    selectOption : function(element){
        this.hideOptions();
        parent = element.closest(".select");
        parent.children("input").val(element.attr("value"));
        parent.children(".selected-option").html(element.html());
    }
};