// db.formulas.distinct("category");

Template.sidebar.categories = function() {
  var f = Formulas.find().fetch();
  return _.chain(f).map(function(o) { return o.category; }).uniq().value();
};

Template.articles.articles = function() {
  return Formulas.find({}, {sort: {category: 1}});
};

Template.articles.rerender_formulas = function() {
  Meteor.setTimeout(function() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }, 2000);
};
