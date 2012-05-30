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
  }
};
