if (Meteor.is_client) {
  Template.color_list.colors = [
    {name: "red"}, {name: "green"}, {name: "blue"}
  ];

  Template.color_list.what = function() {
    console.log('this:', this);
  };
}
