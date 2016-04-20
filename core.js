'use strict';"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @module
 * @description
 * Starting point to import all public core APIs.
 */
__export(require('./src/core/metadata'));
__export(require('./src/core/util'));
__export(require('./src/core/prod_mode'));
__export(require('./src/core/di'));
__export(require('./src/facade/facade'));
var lang_1 = require('angular2/src/facade/lang');
exports.enableProdMode = lang_1.enableProdMode;
var application_ref_1 = require('./src/core/application_ref');
exports.platform = application_ref_1.platform;
exports.createNgZone = application_ref_1.createNgZone;
exports.PlatformRef = application_ref_1.PlatformRef;
exports.ApplicationRef = application_ref_1.ApplicationRef;
var application_tokens_1 = require('./src/core/application_tokens');
exports.APP_ID = application_tokens_1.APP_ID;
exports.APP_COMPONENT = application_tokens_1.APP_COMPONENT;
exports.APP_INITIALIZER = application_tokens_1.APP_INITIALIZER;
exports.PACKAGE_ROOT_URL = application_tokens_1.PACKAGE_ROOT_URL;
exports.PLATFORM_INITIALIZER = application_tokens_1.PLATFORM_INITIALIZER;
__export(require('./src/core/zone'));
__export(require('./src/core/render'));
__export(require('./src/core/linker'));
var debug_node_1 = require('./src/core/debug/debug_node');
exports.DebugElement = debug_node_1.DebugElement;
exports.DebugNode = debug_node_1.DebugNode;
exports.asNativeElements = debug_node_1.asNativeElements;
__export(require('./src/core/testability/testability'));
__export(require('./src/core/change_detection'));
__export(require('./src/core/platform_directives_and_pipes'));
__export(require('./src/core/platform_common_providers'));
__export(require('./src/core/application_common_providers'));
__export(require('./src/core/reflection/reflection'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtTUx0ODQ4M04udG1wL2FuZ3VsYXIyL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0dBSUc7QUFDSCxpQkFBYyxxQkFBcUIsQ0FBQyxFQUFBO0FBQ3BDLGlCQUFjLGlCQUFpQixDQUFDLEVBQUE7QUFDaEMsaUJBQWMsc0JBQXNCLENBQUMsRUFBQTtBQUNyQyxpQkFBYyxlQUFlLENBQUMsRUFBQTtBQUM5QixpQkFBYyxxQkFBcUIsQ0FBQyxFQUFBO0FBQ3BDLHFCQUE2QiwwQkFBMEIsQ0FBQztBQUFoRCwrQ0FBZ0Q7QUFDeEQsZ0NBQWtFLDRCQUE0QixDQUFDO0FBQXZGLDhDQUFRO0FBQUUsc0RBQVk7QUFBRSxvREFBVztBQUFFLDBEQUFrRDtBQUMvRixtQ0FNTywrQkFBK0IsQ0FBQztBQUxyQyw2Q0FBTTtBQUNOLDJEQUFhO0FBQ2IsK0RBQWU7QUFDZixpRUFBZ0I7QUFDaEIseUVBQ3FDO0FBQ3ZDLGlCQUFjLGlCQUFpQixDQUFDLEVBQUE7QUFDaEMsaUJBQWMsbUJBQW1CLENBQUMsRUFBQTtBQUNsQyxpQkFBYyxtQkFBbUIsQ0FBQyxFQUFBO0FBQ2xDLDJCQUF3RCw2QkFBNkIsQ0FBQztBQUE5RSxpREFBWTtBQUFFLDJDQUFTO0FBQUUseURBQXFEO0FBQ3RGLGlCQUFjLG9DQUFvQyxDQUFDLEVBQUE7QUFDbkQsaUJBQWMsNkJBQTZCLENBQUMsRUFBQTtBQUM1QyxpQkFBYywwQ0FBMEMsQ0FBQyxFQUFBO0FBQ3pELGlCQUFjLHNDQUFzQyxDQUFDLEVBQUE7QUFDckQsaUJBQWMseUNBQXlDLENBQUMsRUFBQTtBQUN4RCxpQkFBYyxrQ0FBa0MsQ0FBQyxFQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFN0YXJ0aW5nIHBvaW50IHRvIGltcG9ydCBhbGwgcHVibGljIGNvcmUgQVBJcy5cbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9tZXRhZGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3V0aWwnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9wcm9kX21vZGUnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9kaSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9mYWNhZGUvZmFjYWRlJztcbmV4cG9ydCB7ZW5hYmxlUHJvZE1vZGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5leHBvcnQge3BsYXRmb3JtLCBjcmVhdGVOZ1pvbmUsIFBsYXRmb3JtUmVmLCBBcHBsaWNhdGlvblJlZn0gZnJvbSAnLi9zcmMvY29yZS9hcHBsaWNhdGlvbl9yZWYnO1xuZXhwb3J0IHtcbiAgQVBQX0lELFxuICBBUFBfQ09NUE9ORU5ULFxuICBBUFBfSU5JVElBTElaRVIsXG4gIFBBQ0tBR0VfUk9PVF9VUkwsXG4gIFBMQVRGT1JNX0lOSVRJQUxJWkVSXG59IGZyb20gJy4vc3JjL2NvcmUvYXBwbGljYXRpb25fdG9rZW5zJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvem9uZSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3JlbmRlcic7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL2xpbmtlcic7XG5leHBvcnQge0RlYnVnRWxlbWVudCwgRGVidWdOb2RlLCBhc05hdGl2ZUVsZW1lbnRzfSBmcm9tICcuL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9wbGF0Zm9ybV9kaXJlY3RpdmVzX2FuZF9waXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb3JlL3BsYXRmb3JtX2NvbW1vbl9wcm92aWRlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9hcHBsaWNhdGlvbl9jb21tb25fcHJvdmlkZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcbiJdfQ==