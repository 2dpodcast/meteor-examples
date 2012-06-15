var Entries;

Entries = new Meteor.Collection("entries");

Template.raffle.entries = function() {
  return Entries.find();
};

Template.raffle.events = {
  'submit #new_entry': function(event) {
    event.preventDefault();
    Entries.insert({
      name: $('#new_entry_name').val()
    });
    return $('#new_entry_name').val('');
  },
  'click #draw': function() {
    var winner;
    winner = _.shuffle(Entries.find({
      winner: {
        $ne: true
      }
    }).fetch())[0];
    if (winner) {
      Entries.update({
        recent: true
      }, {
        $set: {
          recent: false
        }
      }, {
        multi: true
      });
      return Entries.update(winner._id, {
        $set: {
          winner: true,
          recent: true
        }
      });
    }
  }
};

Template.entry.winner_class = function() {
  if (this.recent) {
    return 'highlight';
  } else {
    return '';
  }
};
