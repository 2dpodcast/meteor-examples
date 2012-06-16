Things = new Meteor.Collection('things');

if (Meteor.is_client) {
  Template.things_list.things = function () {
    return Things.find({}, {sort: {likes: -1, name: 1}});
  };

  Template.things_list.maybe_selected = function() {
    return Session.equals('selected_thing', this._id) ? "class=selected" : "";
  };

  Template.things_list.how_many = function() {
    if (!this.likes) return "no";
    if (this.likes < 5) return "a few";
    if (this.likes < 20) return "some";
    return "a lot of";
  };

  Template.things_list.events = {
    'click p': function() {
      console.log('item clicked:', this.name);
      Session.set('selected_thing', this._id);
    },
    'click button': function() {
      Things.update(Session.get('selected_thing'), {$inc: {likes: 1}});
    }
  };
}
