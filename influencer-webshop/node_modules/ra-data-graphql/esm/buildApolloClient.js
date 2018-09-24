import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';

export default (function (options) {
    if (!options) {
        return new ApolloClient();
    }

    var cache = options.cache,
        link = options.link,
        uri = options.uri,
        otherOptions = _objectWithoutProperties(options, ['cache', 'link', 'uri']);

    var finalLink = link;
    var finalCache = cache;

    if (!link && uri) {
        finalLink = new HttpLink({ uri: uri });
    }

    if (!cache) {
        finalCache = new InMemoryCache().restore({});
    }

    return new ApolloClient(_extends({
        link: finalLink,
        cache: finalCache
    }, otherOptions));
});