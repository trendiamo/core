'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ALL_TYPES = exports.MUTATION_TYPES = exports.QUERY_TYPES = undefined;

var _reactAdmin = require('react-admin');

var QUERY_TYPES = exports.QUERY_TYPES = [_reactAdmin.GET_LIST, _reactAdmin.GET_MANY, _reactAdmin.GET_MANY_REFERENCE, _reactAdmin.GET_ONE];
var MUTATION_TYPES = exports.MUTATION_TYPES = [_reactAdmin.CREATE, _reactAdmin.UPDATE, _reactAdmin.DELETE, _reactAdmin.UPDATE_MANY, _reactAdmin.DELETE_MANY];
var ALL_TYPES = exports.ALL_TYPES = QUERY_TYPES.concat(MUTATION_TYPES);