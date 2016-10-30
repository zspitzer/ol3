'use strict';

const util = require('./util');

exports.rule = {
  meta: {
    docs: {
      description: 'require that all ol.require() have a valid arg and appear at the top level'
    }
  },

  create: function(context) {
    return {
      CallExpression: function(expression) {
        if (util.isRequireExpression(expression)) {
          const parent = expression.parent;
          if (parent.type !== 'ExpressionStatement') {
            return context.report(expression, 'Expected ol.require() to be in an expression statement');
          }

          if (parent.parent.type !== 'Program') {
            return context.report(expression, 'Expected ol.require() to be at the top level');
          }

          if (expression.arguments.length !== 1) {
            return context.report(expression, 'Expected one argument for ol.require()');
          }

          const arg = expression.arguments[0];
          if (arg.type !== 'Literal' || !arg.value || typeof arg.value !== 'string') {
            return context.report(expression, 'Expected ol.require() to be called with a string');
          }
        }
      }
    };
  }
};
