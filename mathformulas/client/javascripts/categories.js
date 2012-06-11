Template.categories.categories = function() {
  var categories = MathFormulas.find().map(function(doc) {
    var active = doc.category === 'Miscellaneous' ? ' active' : '';
    return  '<li class="category' + active + '"><a href="#">' + doc.category + '</a></li>';
  });
  return _.unique(categories);
};
