var currentId = 0;

var TreeMenu = function() {
    this.menuItems = [];
};

TreeMenu.prototype.addMenuItem = function(treeMenuItem) {
    this.menuItems.push(treeMenuItem);
};

TreeMenu.prototype.getMenuItems = function() {
    return this.menuItems;
};

/* This constructor function is used for creating both sub-menu items and root menu items */
var TreeMenuItem = function(caption, url, parentId, isRoot) {
    this.caption = caption;
    this.url = url;
    //this.parentId = parentId;
    this.children = [];

    this.id = currentId++;
    
    // This isn't part of the model. Can it go here?
    this.childDOMUL = [];
};

TreeMenuItem.prototype.addChild = function(childMenuItem) {
    // This is where the id should be set on THIS object.

    // You can know if you're adding to the root


    // You should be able to set the parent id here.
    childMenuItem.parentId = this.id;
    this.children.push(childMenuItem);
};

TreeMenuItem.prototype.getChildren = function() {
    return this.children;
};

/* Items are fixed, they don't need to come from the server */

var model = [
    {
        caption: "Swift",
        subMenuItems: ["Types & Variables", "Loops"],
        subMenuDOMElement: []
    },
    {
        caption: "Core Data",
        subMenuItems: ["The Basic Way", "Subclassing NSManagedObject"],
        subMenuDOMElement: []
    }
];

(function($) {


    // Do you even need a parent id? Could you use a parent id to somehow know what to do on clicking?
    $.fn.sideMenu2 = function() {
        var dict = [];

        // Working
        this.height(500);
        this.width(300);
        this.css('background-color', 'rgb(90, 95, 112)');
        this.css('color', 'white');

        var treeMenu = new TreeMenu();
        var treeMenuItem1 = new TreeMenuItem("Caption 1", "https://www.ashducket.com", null, true);
        
        var subItem1 = new TreeMenuItem("SubItem1", "https://www.ashducket.com", null);
        treeMenuItem1.addChild(subItem1);


        var treeMenuItem2 = new TreeMenuItem("Caption 2", "https://www.ashducket.com", null, true);
        var treeMenuItem3 = new TreeMenuItem("Caption 3", "https://www.ashducket.com", null, true);

        treeMenu.addMenuItem(treeMenuItem1);
        treeMenu.addMenuItem(treeMenuItem2);
        treeMenu.addMenuItem(treeMenuItem3);

        console.log(treeMenu);

        var list = $(document.createElement('ul'));
        list.css('list-style', 'none');
        list.css('padding', '0');
        list.css('margin', '0');
        list.css('margin-left', '40px');

        treeMenu.getMenuItems().forEach(function(element) {

            var listItem = $(document.createElement('li'));
            listItem.css('font-family', 'Lato');
            listItem.css('text-transform', 'uppercase');
            listItem.css('padding-top', '25px');
            listItem.text(element.caption);
            listItem.css('cursor', 'pointer');
            
            // These are the initial list items.
            listItem.click(function(e) {
                // This would be prettier with a function hasChildDOMUL, but maybe there's a better way to store elements of the view anyway.
                if(this === e.target && element.childDOMUL.length > 0) {
                    dict[element.id].toggle();
                }
            });

            if(element.getChildren().length > 0) {
                var subList = $(document.createElement('ul'));
                subList.hide();
                subList.css('list-style', 'none');
                subList.css('padding', '0');
                subList.css('margin', '0');
                subList.css('margin-left', '40px');
                                
                element.getChildren().forEach(function(element) {
                    var subItem = $(document.createElement('li'));

                    subItem.text(element.caption);
                    subList.append(subItem);
                   
                    listItem.append(subList);
                
                    console.log('start');
                    dict[element.parentId] = subList;
                    console.log(dict);
                    console.log('end');
                });
      
                // If not in the object where should this be stored?
                // Should it even be stored?
                // What's the best way of accessing the UL
                
                // What is element here?
                element.childDOMUL = subList;
                
                console.log(dict);
                // We want to place the UL elements into a dictionary
                // where we use ?? as the key. The parent id!
        
            }
            list.append(listItem);
        }, this);
        this.append(list);
    };
})(jQuery);