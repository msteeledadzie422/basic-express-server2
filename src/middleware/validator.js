'use strict';

const validator = (req, res, next) => {
  req.query.name ? next() : next('Name required when looking for a person.');
};

module.exports = validator;