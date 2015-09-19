define(function() {
  var menu = {
    menu: [],
    menuMap: {},
    codes: /alsfjdlskfjlkdsjflksajf/
  }

  require(['sandbox_unit_menu/menu'], function(loadedMenu) {
    menu.menu = loadedMenu

    loadedMenu.forEach(function(item) {
      menu.menuMap[item.code] = item
    })

    menu.codes = new RegExp(Object.keys(menu.menuMap).join('|'), 'gi')
  })

  return menu
})
