module.exports = function(mongoose) {
  var Message = mongoose.model('Message', {
    title: String,
    body: String
  });

  Message.schema.path('title').validate(function(value) {
    return value.toString().length < 10;
  }, 'Too long');

  return Message;
};
