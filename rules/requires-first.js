'use strict';

const util = require('./util');

exports.rule = {
  meta: {
    docs: {
      description: 'require that all ol.require() precede other statements (except ol.provide())'
    }
  },

  create: function(context) {
    return {
      Program: function(program) {
        let otherSeen = false;

        program.body.forEach(statement => {
          if (util.isRequireStatement(statement)) {
            if (otherSeen) {
              return context.report(statement, 'Expected ol.require() to precede other statements');
            }
          } else if (!util.isProvideStatement(statement)) {
            otherSeen = true;
          }
        });

      }
    };
  }
};
