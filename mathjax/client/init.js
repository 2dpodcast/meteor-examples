// db.formulas.distinct("category");

Session.set('selected_category', null);

Template.sidebar.categories = function() {
  var f = Formulas.find().fetch();
  return _.chain(f).map(function(o) { return o.category; }).uniq().value();
};

Template.articles.articles = function() {
  return Formulas.find({category: Session.get('selected_category')}, {sort: {category: 1}});
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
