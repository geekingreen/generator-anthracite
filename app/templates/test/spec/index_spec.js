module("Index", {
  setup: function () {
    <%= _.classify(appname) %>.reset();
  }
});

test("First H1 contains <%= _.classify(appname) %>", function () {
  visit('/').then(function () {
    equal($('#ember h1').html(), '<%= _.classify(appname) %>', 'Title is <%= _.classify(appname) %>');
  });
});

