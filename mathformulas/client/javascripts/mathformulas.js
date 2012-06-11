Template.mathformulas.mathformulas = function() {
  var query =  MathFormulas.find({
    category: Session.get('selected_category')
  });
  query.observe({
    added: function(mathformula) {
      window.setTimeout(function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, mathformula._id]);
      }, 1000);
    }
  });
  return query;
};
