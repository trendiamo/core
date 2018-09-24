import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import merge from 'lodash/merge';
import buildDataProvider from 'ra-data-graphql';
import { DELETE, DELETE_MANY, UPDATE, UPDATE_MANY } from 'react-admin';

import defaultBuildQuery from './buildQuery';
var defaultOptions = {
    buildQuery: defaultBuildQuery
};

export var buildQuery = defaultBuildQuery;

export default (function (options) {
    return buildDataProvider(merge({}, defaultOptions, options)).then(function (defaultDataProvider) {
        return function (fetchType, resource, params) {
            // This provider does not support multiple deletions so instead we send multiple DELETE requests
            // This can be optimized using the apollo-link-batch-http link
            if (fetchType === DELETE_MANY) {
                var ids = params.ids,
                    otherParams = _objectWithoutProperties(params, ['ids']);

                return Promise.all(params.ids.map(function (id) {
                    return defaultDataProvider(DELETE, resource, _extends({
                        id: id
                    }, otherParams));
                })).then(function (results) {
                    var data = results.reduce(function (acc, _ref) {
                        var data = _ref.data;
                        return [].concat(_toConsumableArray(acc), [data.id]);
                    }, []);

                    return { data: data };
                });
            }
            // This provider does not support multiple deletions so instead we send multiple UPDATE requests
            // This can be optimized using the apollo-link-batch-http link
            if (fetchType === UPDATE_MANY) {
                var _ids = params.ids,
                    _otherParams = _objectWithoutProperties(params, ['ids']);

                return Promise.all(params.ids.map(function (id) {
                    return defaultDataProvider(UPDATE, resource, _extends({
                        id: id
                    }, _otherParams));
                })).then(function (results) {
                    var data = results.reduce(function (acc, _ref2) {
                        var data = _ref2.data;
                        return [].concat(_toConsumableArray(acc), [data.id]);
                    }, []);

                    return { data: data };
                });
            }

            return defaultDataProvider(fetchType, resource, params);
        };
    });
});