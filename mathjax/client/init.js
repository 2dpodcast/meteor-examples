// db.formulas.distinct("category");

Session.set('selected_category', null);

Template.sidebar.categories = function() {
  var categories = Formulas.find().map(function(doc) {
    return doc.category;
  });
  return _.unique(categories);
};

Template.articles.articles = function() {
  return Formulas.find({
    category: Session.get('selected_category')
  });
};

Template.articles.rerender_formulas = function() {
  Meteor.setTimeout(function() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }, 2000);
};

Template.sidebar.events = {
  'click .nav-list': function(event) {
    Session.set('selected_category', $(event.target).text());

    var li = $(event.target).closest('li');
    li.closest('ul').find('li').removeClass('selected')
    li.addClass('selected');
  },
  'keydown #add-category': function(event) {
    var escape = event.which == 27,
        enter = event.which == 13;
    // console.log(event.which);
    if (enter) {
      event.preventDefault();
      // console.log(event.target);
      var category = $(event.target).text().trim();
      if (_.indexOf(Template.sidebar.categories(), category) < 0 && category !== 'New Category') {
        Session.set('selected_category', category);
      } else {
        alert('Name already taken!');
      }
    };
  }
};
