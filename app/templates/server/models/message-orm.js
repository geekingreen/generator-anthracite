module.exports = function (orm, db) {
  return db.define('message', {
    title: String,
    body: {
      type: 'text',
      size: 10
    }
  }, {
    validations: {
      title: orm.validators.rangeLength(0, 3, 'Too long'),
      body: orm.validators.rangeLength(0, 10, 'Too long')
    }
  });
};
