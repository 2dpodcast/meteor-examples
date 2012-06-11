Template.sidebarnav.events = {
  'click .nav-list .category': function(event) {
    var category = $(event.target).text().trim();
    console.log('selected category:', $(event.target).text().trim());

    Session.set('selected_category', category);

    var li = $(event.target).closest('li');
    li.closest('ul').find('li').removeClass('active');
    li.addClass('active');
  }
}

