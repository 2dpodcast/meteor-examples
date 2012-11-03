> Life — the only one you get — consists of what you pay attention to.
> There is literally nothing else.

## Node.js modules

Instalacja:

    npm install -g serve connect express
    npm install -g coffee-script
    npm install -g meteorite
    npm install -g colors


## Meteor

Instalacja:

    curl https://install.meteor.com | sh
    meteor create --example leaderboard
    meteor create ~/hello_world

## How do we use node modules via NPM with meteor?

Na przykład [tak](http://stackoverflow.com/questions/10165978/how-do-we-or-can-we-use-node-modules-via-npm-with-meteor):

    cd hello_world
    npm install colors
    mkdir server
    cat > server/info.js
    var require = __meteor_bootstrap__.require;
    require("colors"),
      info = "Meteor 0.5.0 application starting in development on http://0.0.0.0:3000";
    console.log(info.green);

## How do we insert documents into collections from mongo console?

* [update() broken when working with preexisting mongodb records using ObjectId()](https://github.com/meteor/meteor/issues/61)

Obejście: zamienić `ObjectID(".. id ...")` na `".. id .."`:

    db.players.find().forEach(function(app) {
      db.players.remove({_id: app._id});
      app._id = app._id.toString();
      db.players.insert(app);
    });


## Atmosphere

* [Atmosphere Beer. Wings.](https://atmosphere.meteor.com/) – smart packages


## Git

Pushing local branch *implicit-loop* to remote:

    git checkout implicit-loop
    git push origin implicit-loop

Removing remote *implicit-loop* branch:

    git push origin :implicit-loop


## Misc commands

    netstat -tapn


## Linux

Zobacz [EMFILE error when too many files in /public](https://github.com/meteor/meteor/issues/102):

    sudo sh -c 'echo 8192 > /proc/sys/fs/inotify/max_user_instances'

Domyślnie na Fedorze jest 128.


## Tutorials

* [Creating a document sharing site with Meteor.js](http://www.skalb.com/2012/04/16/creating-a-document-sharing-site-with-meteor-js/) – coffeescript + variation on leaderboard example


## Misc stuff

* [How can I listen to when a template is rendered in Meteor?](http://stackoverflow.com/questions/10259879/how-can-i-listen-to-when-a-template-is-rendered-in-meteor)
* [Callback after the DOM was updated in Meteor.js](http://stackoverflow.com/questions/10109788/callback-after-the-dom-was-updated-in-meteor-js)
* CSS [contenteditable](http://jsbin.com/owavu3) attribute example
* CSS [Placeholder in contenteditable - focus event issue](http://stackoverflow.com/questions/9093424/placeholder-in-contenteditable-focus-event-issue)


## Sample apps

* [code_buddy](https://github.com/jfahrenkrug/code_buddy) –
  share live code snippets across multiple browsers; with syntax highlighting
* [chat](https://vimeo.com/40300075) (screencast)
