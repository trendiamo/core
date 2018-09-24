import _regeneratorRuntime from 'babel-runtime/regenerator';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _taggedTemplateLiteral from 'babel-runtime/helpers/taggedTemplateLiteral';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

var _templateObject = _taggedTemplateLiteral(['\n                      ', '\n                  '], ['\n                      ', '\n                  ']);

import { introspectionQuery } from 'graphql';
import gql from 'graphql-tag';
import { GET_LIST, GET_ONE } from 'react-admin';

import { ALL_TYPES } from './constants';

export var filterTypesByIncludeExclude = function filterTypesByIncludeExclude(_ref) {
    var include = _ref.include,
        exclude = _ref.exclude;

    if (Array.isArray(include)) {
        return function (type) {
            return include.includes(type.name);
        };
    }

    if (typeof include === 'function') {
        return function (type) {
            return include(type);
        };
    }

    if (Array.isArray(exclude)) {
        return function (type) {
            return !exclude.includes(type.name);
        };
    }

    if (typeof exclude === 'function') {
        return function (type) {
            return !exclude(type);
        };
    }

    return function () {
        return true;
    };
};

/**
 * @param {ApolloClient} client The Apollo client
 * @param {Object} options The introspection options
 */
export default (function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(client, options) {
        var schema, queries, types, isResource, buildResource, potentialResources, filteredResources, resources;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!options.schema) {
                            _context.next = 4;
                            break;
                        }

                        _context.t0 = options.schema;
                        _context.next = 7;
                        break;

                    case 4:
                        _context.next = 6;
                        return client.query({
                            query: gql(_templateObject, introspectionQuery)
                        }).then(function (_ref3) {
                            var __schema = _ref3.data.__schema;
                            return __schema;
                        });

                    case 6:
                        _context.t0 = _context.sent;

                    case 7:
                        schema = _context.t0;
                        queries = schema.types.reduce(function (acc, type) {
                            if (type.name !== 'Query' && type.name !== 'Mutation') return acc;

                            return [].concat(_toConsumableArray(acc), _toConsumableArray(type.fields));
                        }, []);
                        types = schema.types.filter(function (type) {
                            return type.name !== 'Query' && type.name !== 'Mutation';
                        });

                        isResource = function isResource(type) {
                            return queries.some(function (query) {
                                return query.name === options.operationNames[GET_LIST](type);
                            }) && queries.some(function (query) {
                                return query.name === options.operationNames[GET_ONE](type);
                            });
                        };

                        buildResource = function buildResource(type) {
                            return ALL_TYPES.reduce(function (acc, aorFetchType) {
                                return _extends({}, acc, _defineProperty({}, aorFetchType, queries.find(function (query) {
                                    return options.operationNames[aorFetchType] && query.name == options.operationNames[aorFetchType](type);
                                })));
                            }, { type: type });
                        };

                        potentialResources = types.filter(isResource);
                        filteredResources = potentialResources.filter(filterTypesByIncludeExclude(options));
                        resources = filteredResources.map(buildResource);
                        return _context.abrupt('return', {
                            types: types,
                            queries: queries,
                            resources: resources,
                            schema: schema
                        });

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function (_x, _x2) {
        return _ref2.apply(this, arguments);
    };
})();