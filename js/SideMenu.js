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
    this.parentId = null;
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
        subMenuItems: ["Types & Variables", "Loops"]
    },
    {
        caption: "Core Data",
        subMenuItems: ["The Basic Way", "Subclassing NSManagedObject"]
    }
];

(function($) {
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
        var subItem2 = new TreeMenuItem("SubItem2", "https://www.ashducket.com");
        treeMenuItem1.addChild(subItem1);
        treeMenuItem1.addChild(subItem2);


        var treeMenuItem2 = new TreeMenuItem("Caption 2", "https://www.ashducket.com");
        var treeMenuItem3 = new TreeMenuItem("Caption 3", "https://www.ashducket.com");

        treeMenu.addMenuItem(treeMenuItem1);
        treeMenu.addMenuItem(treeMenuItem2);
        treeMenu.addMenuItem(treeMenuItem3);

        var list = buildList(treeMenu.getMenuItems());

        this.append(list);

        function buildList(menuItemList) {
            
            // Initially we need a base ul
            var list = $(document.createElement('ul'));
            list.css('list-style', 'none');
            list.css('padding', '0');
            list.css('margin', '0');
            list.css('margin-left', '40px');

            menuItemList.forEach(function(element) {
                var listItem = $(document.createElement('li'));
                listItem.css('font-family', 'Lato');
                listItem.css('text-transform', 'uppercase');
                listItem.css('padding-top', '25px');
                listItem.text(element.caption);
                listItem.css('cursor', 'pointer');

                if(element.parentId !== null) {
                    dict[element.parentId] = list;
                }

                listItem.click(function(e) {
                    if(this === e.target && dict[element.id]) {
                        dict[element.id].toggle();
                    }
                });

                if(element.children.length > 0) {
                    listItem.append(buildList(element.children));
                }
                
                list.append(listItem);
            });
            return list;
        }
    };
})(jQuery);
