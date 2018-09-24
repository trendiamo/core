'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ALL_TYPES = exports.MUTATION_TYPES = exports.QUERY_TYPES = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _operationNames;

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _reactAdmin = require('react-admin');

var _buildApolloClient = require('./buildApolloClient');

var _buildApolloClient2 = _interopRequireDefault(_buildApolloClient);

var _constants = require('./constants');

var _introspection = require('./introspection');

var _introspection2 = _interopRequireDefault(_introspection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QUERY_TYPES = exports.QUERY_TYPES = _constants.QUERY_TYPES;
var MUTATION_TYPES = exports.MUTATION_TYPES = _constants.MUTATION_TYPES;
var ALL_TYPES = exports.ALL_TYPES = _constants.ALL_TYPES;

var defaultOptions = {
    resolveIntrospection: _introspection2.default,
    introspection: {
        operationNames: (_operationNames = {}, (0, _defineProperty3.default)(_operationNames, _reactAdmin.GET_LIST, function (resource) {
            return 'all' + (0, _pluralize2.default)(resource.name);
        }), (0, _defineProperty3.default)(_operationNames, _reactAdmin.GET_ONE, function (resource) {
            return '' + resource.name;
        }), (0, _defineProperty3.default)(_operationNames, _reactAdmin.GET_MANY, function (resource) {
            return 'all' + (0, _pluralize2.default)(resource.name);
        }), (0, _defineProperty3.default)(_operationNames, _reactAdmin.GET_MANY_REFERENCE, function (resource) {
            return 'all' + (0, _pluralize2.default)(resource.name);
        }), (0, _defineProperty3.default)(_operationNames, _reactAdmin.CREATE, function (resource) {
            return 'create' + resource.name;
        }), (0, _defineProperty3.default)(_operationNames, _reactAdmin.UPDATE, function (resource) {
            return 'update' + resource.name;
        }), (0, _defineProperty3.default)(_operationNames, _reactAdmin.DELETE, function (resource) {
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

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
        var _merge, clientObject, clientOptions, introspection, resolveIntrospection, buildQueryFactory, _merge$override, override, otherOptions, client, introspectionResults, buildQuery, raDataProvider;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _merge = (0, _merge3.default)({}, defaultOptions, options), clientObject = _merge.client, clientOptions = _merge.clientOptions, introspection = _merge.introspection, resolveIntrospection = _merge.resolveIntrospection, buildQueryFactory = _merge.buildQuery, _merge$override = _merge.override, override = _merge$override === undefined ? {} : _merge$override, otherOptions = (0, _objectWithoutProperties3.default)(_merge, ['client', 'clientOptions', 'introspection', 'resolveIntrospection', 'buildQuery', 'override']);


                        if (override && process.env.NODE_ENV === 'production') {
                            console.warn( // eslint-disable-line
                            'The override option is deprecated. You should instead wrap the buildQuery function provided by the dataProvider you use.');
                        }

                        client = clientObject || (0, _buildApolloClient2.default)(clientOptions);
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
                            var overridedbuildQuery = (0, _get2.default)(override, resource + '.' + aorFetchType);

                            var _ref2 = overridedbuildQuery ? (0, _extends3.default)({}, buildQuery(aorFetchType, resource, params), overridedbuildQuery(params)) : buildQuery(aorFetchType, resource, params),
                                parseResponse = _ref2.parseResponse,
                                query = (0, _objectWithoutProperties3.default)(_ref2, ['parseResponse']);

                            if (QUERY_TYPES.includes(aorFetchType)) {
                                var _apolloQuery = (0, _extends3.default)({}, query, {
                                    fetchPolicy: 'network-only'
                                }, getOptions(otherOptions.query, aorFetchType, resource));

                                return client.query(_apolloQuery).then(parseResponse);
                            }

                            var apolloQuery = (0, _extends3.default)({
                                mutation: query.query,
                                variables: query.variables
                            }, getOptions(otherOptions.mutation, aorFetchType, resource));

                            return client.mutate(apolloQuery).then(parseResponse);
                        };

                        raDataProvider.observeRequest = function (aorFetchType, resource, params) {
                            var _buildQuery = buildQuery(aorFetchType, resource, params),
                                parseResponse = _buildQuery.parseResponse,
                                query = (0, _objectWithoutProperties3.default)(_buildQuery, ['parseResponse']);

                            var apolloQuery = (0, _extends3.default)({}, query, getOptions(otherOptions.watchQuery, aorFetchType, resource));

                            return client.watchQuery(apolloQuery).then(parseResponse);
                        };

                        raDataProvider.saga = function () {};

                        return _context.abrupt('return', raDataProvider);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();