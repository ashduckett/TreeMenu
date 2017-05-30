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

TreeMenuItem.prototype.hasChildren = function() {
    return this.children.length > 0;
}

TreeMenuItem.prototype.getChildren = function() {
    return this.children;
};

var fullModel = [
    {
        caption: "Swift",
        link: "",
        subMenuItems: [
            {
                caption: "Loops",
                link: "submenu link",
                subMenuItems: []
            },
            {
                caption: "Functions",
                link: "submenu link",
                subMenuItems: []
            }
        ]
    }, {
        caption: "Core Data",
        link: "",
        subMenuItems: [
            {
                caption: "Loops",
                link: "submenu link",
                subMenuItems: []
            },
            {
                caption: "Functions",
                link: "submenu link",
                subMenuItems: []
            }
        ]
    },
    {
        caption: "Animation",
        link: "",
        subMenuItems: [
            {
                caption: "Loops",
                link: "submenu link",
                subMenuItems: []
            },
            {
                caption: "Functions",
                link: "submenu link",
                subMenuItems: []
            }
        ]
    }
];

(function($) {
    $.fn.sideMenu2 = function() {
        var dict = [];

        this.height(500);
        this.width(300);
        this.css('background-color', 'rgb(90, 95, 112)');
        this.css('color', 'white');

        var treeMenu = new TreeMenu();
        var menuItems = [];

        fullModel.forEach(function(element) {
            var menuItem = new TreeMenuItem(element.caption, element.link);

            element.subMenuItems.forEach(function(element) {
                menuItem.addChild(new TreeMenuItem(element.caption, element.link));
            });
            treeMenu.addMenuItem(menuItem);
        });

        var list = buildList(treeMenu.getMenuItems());

        this.append(list);

        function buildList(menuItemList) {
            
            // Initially we need a base ul
            var list = $(document.createElement('ul'));
            list.addClass('tree-menu-ul');
            
            menuItemList.forEach(function(element) {
                var listItem = $(document.createElement('li'));
                listItem.addClass('tree-menu-li');
                listItem.text(element.caption);

                if(element.parentId !== null) {
                    dict[element.parentId] = list;
                }

                listItem.click(function(e) {
                    if(this === e.target && dict[element.id]) {
                        dict[element.id].toggle();
                    }
                });

                if(element.hasChildren()) {
                    listItem.append(buildList(element.children));
                }
                
                list.append(listItem);
            });
            return list;
        }
    };
})(jQuery);