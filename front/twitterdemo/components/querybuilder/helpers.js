import React from 'react';
import _ from 'lodash';
import Not from './not';
import Exact from './exact';
import Term from './term';
import Mention from './mention';
import Negative from './negative';
import Positive from './positive';

export const joinTerms = qexpr => {
  if (_.isNil(qexpr)) return '';
  else if (_.isString(qexpr)) return qexpr;
  else if (_.isArray(qexpr.$and)) return qexpr.$and.map(joinTerms).join('');
  else if (_.isArray(qexpr.$or)) return qexpr.$or.map(joinTerms).join('');
  else if (qexpr.$not) return joinTerms(qexpr.$not);
  else if (qexpr.$exact) return joinTerms(qexpr.$exact);
  else if (qexpr.$to) return joinTerms(qexpr.$to);
  else if (qexpr.$from) return joinTerms(qexpr.$from);
  else if (qexpr.$pos) return joinTerms(qexpr.$pos);
  else if (qexpr.$neg) return joinTerms(qexpr.$neg);
  else if (qexpr.$q) return joinTerms(qexpr.$q);
  else if (qexpr.$mention) return joinTerms(qexpr.$mention);
  else return '';
};

const buildExpr = (type, value) => {
  if (type === 'not') {
    return { $not: value };
  } else if (type === 'exact') {
    return { $exact: value };
  } else if (type === 'mention') {
    return { $mention: value };
  } else if (type === 'neg') {
    return { $neg: value };
  } else if (type === 'pos') {
    return { $pos: value };
  } else {
    return value;
  }
};

const addNode = fn => ({ type, value }) => fn({ type, value: buildExpr(type, value) });

const propagateExpression = (type, { onUpdateExpression, onChange, ...props }) => {
  return {
    onUpdateExpression: ({ type: t, value }) => {
      if (t === null) {
        return onUpdateExpression({ t, value });
      } else {
        return addNode(onUpdateExpression)({ type, value });
      }
    },
    onChange: (e, orKey, andKey) => {
      const newE = { target: { value: buildExpr(type, e.target.value) } };
      onChange(newE, orKey, andKey);
    },
    ...props,
  };
};

export const renderExpression = (props, value, depth = 0) => {
  const { onUpdateExpression, ...termProps } = props;
  const selectorProps = {
    mb: 1,
    hideRemove: depth === 0,
    value,
    onRemoveClick: onUpdateExpression,
    onAddClick: addNode(onUpdateExpression),
  };
  if (_.isString(value)) {
    return <Term {...selectorProps} {...termProps} />;
  } else if (_.isObject(value) && value.$not !== undefined) {
    return <Not {...selectorProps}>{renderExpression(propagateExpression('not', props), value.$not, depth + 1)}</Not>;
  } else if (_.isObject(value) && value.$exact !== undefined) {
    return <Exact {...selectorProps}>{renderExpression(propagateExpression('exact', props), value.$exact, depth + 1)}</Exact>;
  } else if (_.isObject(value) && value.$mention !== undefined) {
    return <Mention {...selectorProps}> {renderExpression(propagateExpression('mention', props), value.$mention, depth + 1)}</Mention>;
  } else if (_.isObject(value) && value.$neg !== undefined) {
    return <Negative {...selectorProps}>{renderExpression(propagateExpression('neg', props), value.$neg, depth + 1)}</Negative>;
  } else if (_.isObject(value) && value.$pos !== undefined) {
    return <Positive {...selectorProps}>{renderExpression(propagateExpression('pos', props), value.$pos, depth + 1)}</Positive>;
  } else {
    throw new Error('unknown render expression');
  }
};

export default {
  joinTerms,
  renderExpression,
};
