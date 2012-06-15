Things = new Meteor.Collection('things');

if (Meteor.is_client) {
  Template.thing_list.things = function () {
    return Things.find({}, {sort: {likes: -1, name: 1}});
  };

  Template.thing_list.maybe_selected = function() {
    return Session.equals('selected_thing', this._id) ? "class=selected" : "";
  };

  Template.thing_list.thing_we_like = function() {
    var likes = "like " + this.name;
    if (this.likes)
      likes = "(" + this.likes + ") " + likes;
    return likes;
  }

  Template.thing_list.how_many = function() {
    if (!this.likes) return "no people";
    if (this.likes < 5) return "a few people";
    if (this.likes < 20) return "some people";
    return "a lot of people";
  };

  Template.thing_list.events = {
    'click p': function() {
      console.log('item clicked:', this.name);
      Session.set('selected_thing', this._id);
    },
    'click button': function() {
      Things.update(Session.get('selected_thing'), {$inc: {likes: 1}});
    }
  };
}
