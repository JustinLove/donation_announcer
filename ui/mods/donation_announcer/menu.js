define(function() {
  var menu = {
    menu: [],
    menuMap: {},
    match: function(comment) {
      var codes = comment.replace(/x/i, ' ').match(menu.codes) || []
      return codes.map(function(s) {return s.toUpperCase()})
    },
    orders: function(codes) {
      return codes.map(function(c) {
        return JSON.parse(JSON.stringify(menu.menuMap[c]))
      }) || []
    },
    codes: /alsfjdlskfjlkdsjflksajf/
  }

  require(['sandbox_unit_menu/menu'], function(loadedMenu) {
    menu.menu = loadedMenu

    loadedMenu.forEach(function(item) {
      menu.menuMap[item.code] = item
    })

    var bits = Object.keys(menu.menuMap).map(function(code) {
      return "\\b"+code+"\\b"
    })
    menu.codes = new RegExp(bits.join('|') , 'gi')
  })

  return menu
})
