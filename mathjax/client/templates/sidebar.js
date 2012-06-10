Template.sidebar.categories = function() {
  var categories = Formulas.find().map(function(doc) {
    return doc.category;
  });
  return _.unique(categories);
};

Template.sidebar.events = {
  'click .nav-list': function(event) {
    Session.set('selected_category', $(event.target).text().trim());

    var li = $(event.target).closest('li');
    li.closest('ul').find('li').removeClass('selected')
    li.addClass('selected');
  },
  'focus .nav li[contenteditable]': function(event) {
    console.log('.nav li[contenteditable] get focus');
    $(event.target).empty().html(' ');
  },
  'keydown #add-category': function(event) {
    var esc = event.which == 27,
        enter = event.which == 13,
        tab = event.which == 9,
    element = event.target;
    if (esc) {
      element.blur();
    } else if (enter || tab) {
      event.preventDefault();
      // save category
      var category = $(event.target).text().replace(' ', '').trim();
      if (_.indexOf(Template.sidebar.categories(), category) < 0) {
        Session.set('selected_category', category);
      } else {
        alert('Name already taken.');
      }
      element.blur();
    };
  }
};
