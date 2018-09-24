'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _apolloClient = require('apollo-client');

var _apolloClientPreset = require('apollo-client-preset');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
    if (!options) {
        return new _apolloClient.ApolloClient();
    }

    var cache = options.cache,
        link = options.link,
        uri = options.uri,
        otherOptions = (0, _objectWithoutProperties3.default)(options, ['cache', 'link', 'uri']);

    var finalLink = link;
    var finalCache = cache;

    if (!link && uri) {
        finalLink = new _apolloClientPreset.HttpLink({ uri: uri });
    }

    if (!cache) {
        finalCache = new _apolloClientPreset.InMemoryCache().restore({});
    }

    return new _apolloClient.ApolloClient((0, _extends3.default)({
        link: finalLink,
        cache: finalCache
    }, otherOptions));
};

module.exports = exports['default'];