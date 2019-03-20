
// BUDGET CONTROLLER
var dataController = (function(){

    // Create Function constructor
    var Item = function(id, description) {
        this.id = id;
        this.description = description;
    };

    var data = {
        allItems: []
    };

    return {
        addItem: function(description) {
            // Create new ID
            if(data.allItems.length > 0) {
                var ID = data.allItems[data.allItems.length - 1].id + 1;
            } else {
                var ID = 0;
            }


            // Create new Item
            var newItem = new Item(ID, description);

            // Push into data structure
            data.allItems.push(newItem);

            // Return the new element
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };

})();




// UI CONTROLLER
var UIController = (function(){


    // 4. addListItem

    // clearFields

    return {
       getInput: function() {
           return {
               item: document.querySelector('.add-description').value
           }

       },
       addListItem: function(object){
           // Create HTML string with placeholder text-align
           var element = '.js-container'
           var html = '<div class="item clearfix" id="item-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'


           // Replace placeholder text with some actual data
           var newHtml = html.replace('%id%', object.id);
           newHtml = newHtml.replace('%description%', object.description);

           // Insert the HTML into the DOM
           document.querySelector(element).insertAdjacentHTML('beforeend', newHtml )
       }
    };

})();


// APP CONTROLLER
var appController = (function(dataCtrl, UICtrl){
    // Setup Event Listeners

    var setUpEventListeners = function() {
        document.querySelector('.addButton').addEventListener('click', ctrlAddItem);

        document.querySelector('input').addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };

    // Create ctrlAddItem function
    var ctrlAddItem = function() {
        // 1. getInput Values
        var input = UICtrl.getInput()
        console.log(input);

        // 2. Add the item to the budget controller
        var newItem = dataCtrl.addItem(input.item);
        //console.log(newItem)

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem);

    };

    return {
        init: function() {
            console.log('application has started')
            setUpEventListeners();
        }
    }
})(dataController, UIController);

appController.init();
