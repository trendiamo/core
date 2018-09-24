import _regeneratorRuntime from 'babel-runtime/regenerator';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _defineProperty from 'babel-runtime/helpers/defineProperty';

var _operationNames,
    _this = this;

import merge from 'lodash/merge';
import get from 'lodash/get';
import pluralize from 'pluralize';
import { GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, DELETE } from 'react-admin';

import buildApolloClient from './buildApolloClient';
import { QUERY_TYPES as INNER_QUERY_TYPES, MUTATION_TYPES as INNER_MUTATION_TYPES, ALL_TYPES as INNER_ALL_TYPES } from './constants';
import defaultResolveIntrospection from './introspection';
export var QUERY_TYPES = INNER_QUERY_TYPES;
export var MUTATION_TYPES = INNER_MUTATION_TYPES;
export var ALL_TYPES = INNER_ALL_TYPES;

var defaultOptions = {
    resolveIntrospection: defaultResolveIntrospection,
    introspection: {
        operationNames: (_operationNames = {}, _defineProperty(_operationNames, GET_LIST, function (resource) {
            return 'all' + pluralize(resource.name);
        }), _defineProperty(_operationNames, GET_ONE, function (resource) {
            return '' + resource.name;
        }), _defineProperty(_operationNames, GET_MANY, function (resource) {
            return 'all' + pluralize(resource.name);
        }), _defineProperty(_operationNames, GET_MANY_REFERENCE, function (resource) {
            return 'all' + pluralize(resource.name);
        }), _defineProperty(_operationNames, CREATE, function (resource) {
            return 'create' + resource.name;
        }), _defineProperty(_operationNames, UPDATE, function (resource) {
            return 'update' + resource.name;
        }), _defineProperty(_operationNames, DELETE, function (resource) {
            return 'delete' + resource.name;
        }), _operationNames),
        exclude: undefined,
        include: undefined
    }
};

var getOptions = function getOptions(options, aorFetchType, resource) {
    if (typeof options === 'function') {
        return options(resource, aorFetchType);
    }

    return options;
};

export default (function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(options) {
        var _merge, clientObject, clientOptions, introspection, resolveIntrospection, buildQueryFactory, _merge$override, override, otherOptions, client, introspectionResults, buildQuery, raDataProvider;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _merge = merge({}, defaultOptions, options), clientObject = _merge.client, clientOptions = _merge.clientOptions, introspection = _merge.introspection, resolveIntrospection = _merge.resolveIntrospection, buildQueryFactory = _merge.buildQuery, _merge$override = _merge.override, override = _merge$override === undefined ? {} : _merge$override, otherOptions = _objectWithoutProperties(_merge, ['client', 'clientOptions', 'introspection', 'resolveIntrospection', 'buildQuery', 'override']);


                        if (override && process.env.NODE_ENV === 'production') {
                            console.warn( // eslint-disable-line
                            'The override option is deprecated. You should instead wrap the buildQuery function provided by the dataProvider you use.');
                        }

                        client = clientObject || buildApolloClient(clientOptions);
                        introspectionResults = void 0;

                        if (!introspection) {
                            _context.next = 8;
                            break;
                        }

                        _context.next = 7;
                        return resolveIntrospection(client, introspection);

                    case 7:
                        introspectionResults = _context.sent;

                    case 8:
                        buildQuery = buildQueryFactory(introspectionResults, otherOptions);

                        raDataProvider = function raDataProvider(aorFetchType, resource, params) {
                            var overridedbuildQuery = get(override, resource + '.' + aorFetchType);

                            var _ref2 = overridedbuildQuery ? _extends({}, buildQuery(aorFetchType, resource, params), overridedbuildQuery(params)) : buildQuery(aorFetchType, resource, params),
                                parseResponse = _ref2.parseResponse,
                                query = _objectWithoutProperties(_ref2, ['parseResponse']);

                            if (QUERY_TYPES.includes(aorFetchType)) {
                                var _apolloQuery = _extends({}, query, {
                                    fetchPolicy: 'network-only'
                                }, getOptions(otherOptions.query, aorFetchType, resource));

                                return client.query(_apolloQuery).then(parseResponse);
                            }

                            var apolloQuery = _extends({
                                mutation: query.query,
                                variables: query.variables
                            }, getOptions(otherOptions.mutation, aorFetchType, resource));

                            return client.mutate(apolloQuery).then(parseResponse);
                        };

                        raDataProvider.observeRequest = function (aorFetchType, resource, params) {
                            var _buildQuery = buildQuery(aorFetchType, resource, params),
                                parseResponse = _buildQuery.parseResponse,
                                query = _objectWithoutProperties(_buildQuery, ['parseResponse']);

                            var apolloQuery = _extends({}, query, getOptions(otherOptions.watchQuery, aorFetchType, resource));

                            return client.watchQuery(apolloQuery).then(parseResponse);
                        };

                        raDataProvider.saga = function () {};

                        return _context.abrupt('return', raDataProvider);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
})();