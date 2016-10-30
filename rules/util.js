'use strict';

function isOLCallExpression(node, name) {
  const callee = node.callee;
  return callee && callee.type === 'MemberExpression' &&
      callee.object.type === 'Identifier' && callee.object.name === 'ol' &&
      callee.property.type === 'Identifier' && !callee.property.computed &&
      callee.property.name === name;
}

function isOLStatement(node, name) {
  return node.expression && node.expression.type === 'CallExpression' &&
    isOLCallExpression(node.expression, name);
}

exports.isProvideExpression = function(node) {
  return isOLCallExpression(node, 'provide');
};

exports.isProvideStatement = function(node) {
  return isOLStatement(node, 'provide');
};

exports.isRequireExpression = function(node) {
  return isOLCallExpression(node, 'require');
};

exports.isRequireStatement = function(node) {
  return isOLStatement(node, 'require');
};

var getName = exports.getName = function(node) {
  if (node.type !== 'MemberExpression') {
    return;
  }
  if (node.property.type !== 'Identifier' || node.property.computed) {
    return;
  }
  let objectName;
  if (node.object.type === 'Identifier' && !node.object.computed) {
    objectName = node.object.name;
  } else if (node.object.type === 'MemberExpression' && !node.object.computed) {
    objectName = getName(node.object);
  }
  if (!objectName) {
    return;
  }
  return `${objectName}.${node.property.name}`;
};
