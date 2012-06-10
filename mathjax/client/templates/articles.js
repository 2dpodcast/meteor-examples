Template.articles.articles = function() {
  var query =  Formulas.find({
    category: Session.get('selected_category')
  });
  query.observe({
    added: function(formula) {
      window.setTimeout(function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, formula._id]);
      }, 1000);
    }
  });
  return query;
};

Template.articles.rerender_formulas = function() {
  Meteor.setTimeout(function() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }, 2000);
};

Template.newformula.events = {
  'keyup #text': makePreview,
  'click .save': saveFormula,
  'click .bury': hidePreview,
  'click .clear': clearPreview
};

function makePreview(event) {
  $('#tex').html($(event.target).val());
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "tex"]);
}

function hidePreview(event) {
  $('#live-preview').hide();
}

function clearPreview(event) {
  console.log('clear formula');
  $('#tex').empty();
  $('#text').text("<h3>Title</h3>");
}

function saveFormula(event) {
  var category = Session.get('selected_category') || "Misc";
  var text = $('#text').val();
  // var tex = $('#tex').html();
  var tex = "";
  console.log('formula:', text.trim());
  // console.log(tex);
  if (text.trim() !== "") {
    // save typeset both
    var formula = {
      category: category,
      text: text,
      tex: tex
    };
    Formulas.insert(formula, function(err, id) {
      if (err)
        console.log(err);
    });
  } else {
    alert("Can not save an empty formula")
  }
}
