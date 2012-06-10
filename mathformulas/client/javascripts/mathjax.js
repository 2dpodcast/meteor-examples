Template.mathjax.events = {
  'click .save': saveFormula
}

function saveFormula(event) {
  var text = $('#text').val();
  if (text.trim() !== "") {
    var formula = {
      category: Session.get('selected_category'),
      text: text,
    };
    Formulas.insert(formula, function(err, id) {
      if (err)
        console.log(err);
    });
  } else {
    alert("Empty formula was not saved!");
  }
}
