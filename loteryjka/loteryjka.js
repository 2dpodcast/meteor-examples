Participants = new Meteor.Collection('participants');

if (Meteor.is_client) {

  // 1. Lista uczestników. Dodajemy kilku na konsoli.
  Template.entries.participants = function() {
    return Participants.find({}, {sort: {name: 1}});
  };

  Template.entries.maybe_winner = function() {
    var attrs = [];
    if (this.winner) attrs.push("winner");
    if (this.recent) attrs.push("highlight");
    var attr = attrs.join(" ");
    if (attr) {
      return '<span class="' + attr + '">WINNER</span>';
    };
  };

  // 2. Dodawanie nowego uczestnika.
  Template.new_entry.events = {
    'click button': function(event) {
      var entryName = $('#new_entry_name').val();
      console.log('new entry:', entryName);

      Participants.insert({name: entryName});
      $('#new_entry_name').val('');
    }
  };

  // 3. Losowanie zwycięzcy.
  Template.draw_winner.events = {
    'click button': function(event) {
      // Możemy losować wielokrotnie. Losujemy tylko z jeszcze
      // niewylosowanych uczestników.
      winner = _.shuffle(Participants.find({ winner: {$ne: true} }).fetch())[0];
      if (winner) {
        console.log('winner:', winner.name);
        // 5. Wyróżnianie aktualnie wylosowanego uczestnika.
        Participants.update({recent: true}, {$set: {recent:false}}, {multi: true})
        Participants.update({_id: winner._id}, {$set: {recent: true, winner: true}});
        // 4.
        // Participants.update({_id: winner._id}, {$set: {winner: true}});
      } else {
        console.log('everyone is a winner');
      }
    }
  };

}
