'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildApolloArgs = exports.buildArgs = exports.getArgType = exports.buildFields = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _reactAdmin = require('react-admin');

var _raDataGraphql = require('ra-data-graphql');

var _graphql = require('graphql');

var _graphqlAstTypes = require('graphql-ast-types');

var gqlTypes = _interopRequireWildcard(_graphqlAstTypes);

var _getFinalType = require('./getFinalType');

var _getFinalType2 = _interopRequireDefault(_getFinalType);

var _isList = require('./isList');

var _isList2 = _interopRequireDefault(_isList);

var _isRequired = require('./isRequired');

var _isRequired2 = _interopRequireDefault(_isRequired);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildFields = exports.buildFields = function buildFields(introspectionResults) {
    return function (fields) {
        return fields.reduce(function (acc, field) {
            var type = (0, _getFinalType2.default)(field.type);

            if (type.name.startsWith('_')) {
                return acc;
            }

            if (type.kind !== _graphql.TypeKind.OBJECT) {
                return [].concat((0, _toConsumableArray3.default)(acc), [gqlTypes.field(gqlTypes.name(field.name))]);
            }

            var linkedResource = introspectionResults.resources.find(function (r) {
                return r.type.name === type.name;
            });

            if (linkedResource) {
                return [].concat((0, _toConsumableArray3.default)(acc), [gqlTypes.field(gqlTypes.name(field.name), null, null, null, gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('id'))]))]);
            }

            var linkedType = introspectionResults.types.find(function (t) {
                return t.name === type.name;
            });

            if (linkedType) {
                return [].concat((0, _toConsumableArray3.default)(acc), [gqlTypes.field(gqlTypes.name(field.name), null, null, null, gqlTypes.selectionSet(buildFields(introspectionResults)(linkedType.fields)))]);
            }

            // NOTE: We might have to handle linked types which are not resources but will have to be careful about
            // ending with endless circular dependencies
            return acc;
        }, []);
    };
};

var getArgType = exports.getArgType = function getArgType(arg) {
    var type = (0, _getFinalType2.default)(arg.type);
    var required = (0, _isRequired2.default)(arg.type);
    var list = (0, _isList2.default)(arg.type);

    if (list) {
        if (required) {
            return gqlTypes.listType(gqlTypes.nonNullType(gqlTypes.namedType(gqlTypes.name(type.name))));
        }
        return gqlTypes.listType(gqlTypes.namedType(gqlTypes.name(type.name)));
    }

    if (required) {
        return gqlTypes.nonNullType(gqlTypes.namedType(gqlTypes.name(type.name)));
    }

    return gqlTypes.namedType(gqlTypes.name(type.name));
};

var buildArgs = exports.buildArgs = function buildArgs(query, variables) {
    if (query.args.length === 0) {
        return [];
    }

    var validVariables = Object.keys(variables).filter(function (k) {
        return typeof variables[k] !== 'undefined';
    });
    var args = query.args.filter(function (a) {
        return validVariables.includes(a.name);
    }).reduce(function (acc, arg) {
        return [].concat((0, _toConsumableArray3.default)(acc), [gqlTypes.argument(gqlTypes.name(arg.name), gqlTypes.variable(gqlTypes.name(arg.name)))]);
    }, []);

    return args;
};

var buildApolloArgs = exports.buildApolloArgs = function buildApolloArgs(query, variables) {
    if (query.args.length === 0) {
        return [];
    }

    var validVariables = Object.keys(variables).filter(function (k) {
        return typeof variables[k] !== 'undefined';
    });

    var args = query.args.filter(function (a) {
        return validVariables.includes(a.name);
    }).reduce(function (acc, arg) {
        return [].concat((0, _toConsumableArray3.default)(acc), [gqlTypes.variableDefinition(gqlTypes.variable(gqlTypes.name(arg.name)), getArgType(arg))]);
    }, []);

    return args;
};

exports.default = function (introspectionResults) {
    return function (resource, aorFetchType, queryType, variables) {
        var sortField = variables.sortField,
            sortOrder = variables.sortOrder,
            metaVariables = (0, _objectWithoutProperties3.default)(variables, ['sortField', 'sortOrder']);

        var apolloArgs = buildApolloArgs(queryType, variables);
        var args = buildArgs(queryType, variables);
        var metaArgs = buildArgs(queryType, metaVariables);
        var fields = buildFields(introspectionResults)(resource.type.fields);
        if (aorFetchType === _reactAdmin.GET_LIST || aorFetchType === _reactAdmin.GET_MANY || aorFetchType === _reactAdmin.GET_MANY_REFERENCE) {
            return gqlTypes.document([gqlTypes.operationDefinition('query', gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name(queryType.name), gqlTypes.name('items'), args, null, gqlTypes.selectionSet(fields)), gqlTypes.field(gqlTypes.name('_' + queryType.name + 'Meta'), gqlTypes.name('total'), metaArgs, null, gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('count'))]))]), gqlTypes.name(queryType.name), apolloArgs)]);
        }

        if (aorFetchType === _reactAdmin.DELETE) {
            return gqlTypes.document([gqlTypes.operationDefinition('mutation', gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name(queryType.name), gqlTypes.name('data'), args, null, gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('id'))]))]), gqlTypes.name(queryType.name), apolloArgs)]);
        }

        return gqlTypes.document([gqlTypes.operationDefinition(_raDataGraphql.QUERY_TYPES.includes(aorFetchType) ? 'query' : 'mutation', gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name(queryType.name), gqlTypes.name('data'), args, null, gqlTypes.selectionSet(fields))]), gqlTypes.name(queryType.name), apolloArgs)]);
    };
};