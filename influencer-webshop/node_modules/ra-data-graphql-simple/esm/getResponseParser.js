import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { TypeKind } from 'graphql';
import { GET_LIST, GET_MANY, GET_MANY_REFERENCE } from 'react-admin';
import getFinalType from './getFinalType';

var sanitizeResource = function sanitizeResource(introspectionResults, resource) {
    return function (data) {
        var result = Object.keys(data).reduce(function (acc, key) {
            if (key.startsWith('_')) {
                return acc;
            }

            var field = resource.type.fields.find(function (f) {
                return f.name === key;
            });
            var type = getFinalType(field.type);

            if (type.kind !== TypeKind.OBJECT) {
                return _extends({}, acc, _defineProperty({}, field.name, data[field.name]));
            }

            // FIXME: We might have to handle linked types which are not resources but will have to be careful about
            // endless circular dependencies
            var linkedResource = introspectionResults.resources.find(function (r) {
                return r.type.name === type.name;
            });

            if (linkedResource) {
                var _extends4;

                var linkedResourceData = data[field.name];

                if (Array.isArray(linkedResourceData)) {
                    var _extends3;

                    return _extends({}, acc, (_extends3 = {}, _defineProperty(_extends3, field.name, data[field.name].map(sanitizeResource(introspectionResults, linkedResource))), _defineProperty(_extends3, field.name + 'Ids', data[field.name].map(function (d) {
                        return d.id;
                    })), _extends3));
                }

                return _extends({}, acc, (_extends4 = {}, _defineProperty(_extends4, field.name + '.id', linkedResourceData ? data[field.name].id : undefined), _defineProperty(_extends4, field.name, linkedResourceData ? sanitizeResource(introspectionResults, linkedResource)(data[field.name]) : undefined), _extends4));
            }

            return _extends({}, acc, _defineProperty({}, field.name, data[field.name]));
        }, {});

        return result;
    };
};

export default (function (introspectionResults) {
    return function (aorFetchType, resource) {
        return function (response) {
            var sanitize = sanitizeResource(introspectionResults, resource);
            var data = response.data;

            if (aorFetchType === GET_LIST || aorFetchType === GET_MANY || aorFetchType === GET_MANY_REFERENCE) {
                return {
                    data: response.data.items.map(sanitize),
                    total: response.data.total.count
                };
            }

            return { data: sanitize(data.data) };
        };
    };
});