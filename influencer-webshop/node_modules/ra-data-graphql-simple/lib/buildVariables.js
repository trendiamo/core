'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends13 = require('babel-runtime/helpers/extends');

var _extends14 = _interopRequireDefault(_extends13);

var _reactAdmin = require('react-admin');

var _getFinalType = require('./getFinalType');

var _getFinalType2 = _interopRequireDefault(_getFinalType);

var _isList = require('./isList');

var _isList2 = _interopRequireDefault(_isList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeValue = function sanitizeValue(type, value) {
    if (type.name === 'Int') {
        return parseInt(value);
    }

    if (type.name === 'Float') {
        return parseFloat(value);
    }

    return value;
};

var buildGetListVariables = function buildGetListVariables(introspectionResults) {
    return function (resource, aorFetchType, params) {
        var filter = Object.keys(params.filter).reduce(function (acc, key) {
            if (key === 'ids') {
                return (0, _extends14.default)({}, acc, { ids: params.filter[key] });
            }

            if ((0, _typeof3.default)(params.filter[key]) === 'object') {
                var type = introspectionResults.types.find(function (t) {
                    return t.name === resource.type.name + 'Filter';
                });
                var filterSome = type.inputFields.find(function (t) {
                    return t.name === key + '_some';
                });

                if (filterSome) {
                    var _filter = Object.keys(params.filter[key]).reduce(function (acc, k) {
                        return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, k + '_in', params.filter[key][k]));
                    }, {});
                    return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, key + '_some', _filter));
                }
            }

            var parts = key.split('.');

            if (parts.length > 1) {
                if (parts[1] == 'id') {
                    var _type2 = introspectionResults.types.find(function (t) {
                        return t.name === resource.type.name + 'Filter';
                    });
                    var _filterSome = _type2.inputFields.find(function (t) {
                        return t.name === parts[0] + '_some';
                    });

                    if (_filterSome) {
                        return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, parts[0] + '_some', { id: params.filter[key] }));
                    }

                    return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, parts[0], { id: params.filter[key] }));
                }

                var _resourceField = resource.type.fields.find(function (f) {
                    return f.name === parts[0];
                });
                var _type = (0, _getFinalType2.default)(_resourceField.type);
                return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, key, sanitizeValue(_type, params.filter[key])));
            }

            var resourceField = resource.type.fields.find(function (f) {
                return f.name === key;
            });

            if (resourceField) {
                var _type3 = (0, _getFinalType2.default)(resourceField.type);
                var isAList = (0, _isList2.default)(resourceField.type);

                if (isAList) {
                    return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, key, Array.isArray(params.filter[key]) ? params.filter[key].map(function (value) {
                        return sanitizeValue(_type3, value);
                    }) : sanitizeValue(_type3, [params.filter[key]])));
                }

                return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, key, sanitizeValue(_type3, params.filter[key])));
            }

            return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, key, params.filter[key]));
        }, {});

        return {
            page: parseInt(params.pagination.page) - 1,
            perPage: parseInt(params.pagination.perPage),
            sortField: params.sort.field,
            sortOrder: params.sort.order,
            filter: filter
        };
    };
};

var buildCreateUpdateVariables = function buildCreateUpdateVariables() {
    return function (resource, aorFetchType, params, queryType) {
        return Object.keys(params.data).reduce(function (acc, key) {
            if (Array.isArray(params.data[key])) {
                var arg = queryType.args.find(function (a) {
                    return a.name === key + 'Ids';
                });

                if (arg) {
                    return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, key + 'Ids', params.data[key].map(function (_ref) {
                        var id = _ref.id;
                        return id;
                    })));
                }
            }

            if ((0, _typeof3.default)(params.data[key]) === 'object') {
                var _arg = queryType.args.find(function (a) {
                    return a.name === key + 'Id';
                });

                if (_arg) {
                    return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, key + 'Id', params.data[key].id));
                }
            }

            return (0, _extends14.default)({}, acc, (0, _defineProperty3.default)({}, key, params.data[key]));
        }, {});
    };
};

exports.default = function (introspectionResults) {
    return function (resource, aorFetchType, params, queryType) {
        switch (aorFetchType) {
            case _reactAdmin.GET_LIST:
                {
                    return buildGetListVariables(introspectionResults)(resource, aorFetchType, params, queryType);
                }
            case _reactAdmin.GET_MANY:
                return {
                    filter: { ids: params.ids }
                };
            case _reactAdmin.GET_MANY_REFERENCE:
                {
                    var parts = params.target.split('.');

                    return {
                        filter: (0, _defineProperty3.default)({}, parts[0], { id: params.id })
                    };
                }
            case _reactAdmin.GET_ONE:
                return {
                    id: params.id
                };
            case _reactAdmin.UPDATE:
                {
                    return buildCreateUpdateVariables(introspectionResults)(resource, aorFetchType, params, queryType);
                }

            case _reactAdmin.CREATE:
                {
                    return buildCreateUpdateVariables(introspectionResults)(resource, aorFetchType, params, queryType);
                }

            case _reactAdmin.DELETE:
                return {
                    id: params.id
                };
        }
    };
};

module.exports = exports['default'];