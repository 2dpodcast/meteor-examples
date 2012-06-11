Template.sidebarnav.categories = function() {
  var categories = MathFormulas.find().map(function(doc) {
    return doc.category;
  });
  return _.unique(categories);
};

Template.sidebarnav.events = {
  'click .nav-list .category': function(event) {
    var category = $(event.target).text().trim();
    console.log('selected category:', $(event.target).text().trim());

    Session.set('selected_category', category);

    var li = $(event.target).closest('li');
    var ul = li.closest('ul');
    ul.find('.category').removeClass('active');
    ul.find('input').css('background-color', 'white');
    li.addClass('active');
  },
  'keydown #new-category': function(event) {
    var esc = event.which == 27,
        enter = event.which == 13,
        tab = event.which == 9,
        element = $(event.target);
    if (esc) {
      element.blur();
    } else if (enter || tab) {
      event.preventDefault();
      // save category
      var category = element.val().trim();
      if (category !== '' && _.indexOf(Template.sidebarnav.categories(), category) < 0) {
        alert('Category named "' + category + '" was created');
        Session.set('selected_category', category);
        $('.category').removeClass('active');
        $('li input').css('background-color', '#5bc0de');
      } else {
        alert('Category name already taken or empty!');
      }
      element.blur();
    };
  }
}

