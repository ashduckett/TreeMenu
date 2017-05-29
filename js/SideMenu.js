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
var TreeMenuItem = function(caption, url) {
    this.caption = caption;
    this.url = url;
    this.children = [];
    this.id = currentId++;
};

TreeMenuItem.prototype.addChild = function(childMenuItem) {
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
        var treeMenuItem1 = new TreeMenuItem("Caption 1", "https://www.ashducket.com");
        
        var subItem1 = new TreeMenuItem("SubItem1", "https://www.ashducket.com");
        treeMenuItem1.addChild(subItem1);


        var treeMenuItem2 = new TreeMenuItem("Caption 2", "https://www.ashducket.com");
        var treeMenuItem3 = new TreeMenuItem("Caption 3", "https://www.ashducket.com");

        treeMenu.addMenuItem(treeMenuItem1);
        treeMenu.addMenuItem(treeMenuItem2);
        treeMenu.addMenuItem(treeMenuItem3);

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
                if(this === e.target && dict[element.id]) {
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
                    dict[element.parentId] = subList;
                });
            }
            list.append(listItem);
        }, this);
        this.append(list);
    };
})(jQuery);