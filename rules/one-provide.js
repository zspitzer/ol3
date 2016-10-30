'use strict';

const util = require('./util');

exports.rule = {
  meta: {
    docs: {
      description: 'disallow multiple ol.provide() calls'
    }
  },

  create: function(context) {
    let hasProvide = false;

    return {
      ExpressionStatement: function(statement) {
        if (util.isProvideStatement(statement)) {
          if (hasProvide) {
            const name = statement.expression.arguments[0].value;
            context.report(statement, `Extra ol.provide('${name}')`);
          } else {
            hasProvide = true;
          }
        }
      }
    };
  }
};
