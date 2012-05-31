// db.formulas.distinct("category");

Session.set('selected_category', null);

Template.sidebar.categories = function() {
  var categories = Formulas.find().map(function(doc) {
    return doc.category;
  });
  return _.unique(categories);
};

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

Template.sidebar.events = {
  'click .nav-list': function(event) {
    Session.set('selected_category', $(event.target).text().replace(/◀/,"").trim());

    var li = $(event.target).closest('li');
    li.closest('ul').find('li').removeClass('selected')
    li.addClass('selected');
  },
  'keydown #add-category': function(event) {
    var escape = event.which == 27,
        tab = event.which == 9,
        enter = event.which == 13;
    // console.log(event.which);
    if (enter) {
      event.preventDefault();
      // console.log(event.target);
      var category = $(event.target).text().replace(/◀/,"").trim();
      if (_.indexOf(Template.sidebar.categories(), category) < 0 && category !== 'New Category' && category !== "") {
        alert('New category "'+ category + '" was created.');
        Session.set('selected_category', category);
      } else {
        alert('Name already taken.');
      }
    };
  }
};

Template.newformula.events = {
  'keyup #input-math': makePreview,
  'click .save': saveFormula,
  'keydown #new-formula h3': addDescription
};

function addDescription(event) {
  var enter = event.which == 13;
  if (enter) {
    event.preventDefault();
  }
}

function makePreview(event) {
  $('#live-preview').html($(event.target).val());
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "live-preview"]);
}

function saveFormula(event) {
  var category = Session.get('selected_category');
  var header = $('#new-formula [contenteditable]').text().replace(/Header\s+▶/,"").trim();
  console.log("header: ", header);
  if (header !== "" && category !== null && category !== "") {
    var description = $('#input-math').val(); //.replace(/\\/g, "\\\\");
    var formula = {
      category: category,
      header: header,
      description: description
    };
    Formulas.insert(formula, function(err, id) { if (err) console.log(err); });
  } else if (header == "") {
    event.preventDefault();
    alert('Please input header.');
  } else {
    alert('Please click OK and select category to write to.');
  }
}
