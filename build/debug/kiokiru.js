(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Kiokiru"] = factory();
	else
		root["Kiokiru"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/decorators/level-decorator.ts":
/*!*******************************************!*\
  !*** ./src/decorators/level-decorator.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var log_event_decorator_1 = __webpack_require__(/*! ../log-event-decorator */ "./src/log-event-decorator.ts");
/**
 * Overrides the ILogEvent's LogLevel
 */
var LevelOverrideDecorator = /** @class */ (function (_super) {
    __extends(LevelOverrideDecorator, _super);
    function LevelOverrideDecorator(event, level) {
        var _this = _super.call(this, event) || this;
        _this.levelOverride = level;
        return _this;
    }
    LevelOverrideDecorator.prototype.level = function () {
        return this.levelOverride;
    };
    return LevelOverrideDecorator;
}(log_event_decorator_1.LogEventDecorator));
exports.LevelOverrideDecorator = LevelOverrideDecorator;
/**
 * Conditionally overrides the ILogEvent's LogLevel
 */
var ConditionalLevelDecorator = /** @class */ (function (_super) {
    __extends(ConditionalLevelDecorator, _super);
    function ConditionalLevelDecorator(event, level, predicate) {
        var _this = _super.call(this, event) || this;
        _this.levelOverride = level;
        _this.overridePredicate = predicate;
        return _this;
    }
    ConditionalLevelDecorator.prototype.level = function () {
        if (this.overridePredicate(this.event))
            return this.levelOverride;
        return this.event.level();
    };
    return ConditionalLevelDecorator;
}(log_event_decorator_1.LogEventDecorator));
exports.ConditionalLevelDecorator = ConditionalLevelDecorator;


/***/ }),

/***/ "./src/decorators/message-decorator.ts":
/*!*********************************************!*\
  !*** ./src/decorators/message-decorator.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var log_event_decorator_1 = __webpack_require__(/*! ../log-event-decorator */ "./src/log-event-decorator.ts");
var MessagePrefixDecorator = /** @class */ (function (_super) {
    __extends(MessagePrefixDecorator, _super);
    function MessagePrefixDecorator(event, prefixProvider) {
        var _this = _super.call(this, event) || this;
        _this.prefixProvider = prefixProvider;
        return _this;
    }
    MessagePrefixDecorator.prototype.message = function () {
        return "" + this.prefixProvider() + this.event.message();
    };
    return MessagePrefixDecorator;
}(log_event_decorator_1.LogEventDecorator));
exports.MessagePrefixDecorator = MessagePrefixDecorator;
var MessageSuffixDecorator = /** @class */ (function (_super) {
    __extends(MessageSuffixDecorator, _super);
    function MessageSuffixDecorator(event, suffixProvider) {
        var _this = _super.call(this, event) || this;
        _this.suffixProvider = suffixProvider;
        return _this;
    }
    MessageSuffixDecorator.prototype.message = function () {
        return "" + this.event.message() + this.suffixProvider();
    };
    return MessageSuffixDecorator;
}(log_event_decorator_1.LogEventDecorator));
exports.MessageSuffixDecorator = MessageSuffixDecorator;
var MessageDataInjectorDecorator = /** @class */ (function (_super) {
    __extends(MessageDataInjectorDecorator, _super);
    function MessageDataInjectorDecorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageDataInjectorDecorator.prototype.message = function () {
        var eventData = this.event.data();
        var eventMessage = this.event.message();
        var outputMessage = eventMessage;
        var variableRegex = /\{([^}]+)\}/g;
        var match = null;
        while ((match = variableRegex.exec(eventMessage)) != null) {
            var propertyName = match[1].trim();
            if (eventData[propertyName] != null) {
                outputMessage = outputMessage.replace(match[0], eventData[propertyName]);
            }
        }
        return outputMessage;
    };
    return MessageDataInjectorDecorator;
}(log_event_decorator_1.LogEventDecorator));
exports.MessageDataInjectorDecorator = MessageDataInjectorDecorator;


/***/ }),

/***/ "./src/ilogger.ts":
/*!************************!*\
  !*** ./src/ilogger.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 4] = "FATAL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./ilogger */ "./src/ilogger.ts"));
__export(__webpack_require__(/*! ./logger-pipeline */ "./src/logger-pipeline.ts"));
__export(__webpack_require__(/*! ./logger */ "./src/logger.ts"));
__export(__webpack_require__(/*! ./stages/sink-stage */ "./src/stages/sink-stage.ts"));
__export(__webpack_require__(/*! ./stages/message-formatter-stage */ "./src/stages/message-formatter-stage.ts"));
__export(__webpack_require__(/*! ./stages/filter-stage */ "./src/stages/filter-stage.ts"));
__export(__webpack_require__(/*! ./decorators/message-decorator */ "./src/decorators/message-decorator.ts"));
__export(__webpack_require__(/*! ./decorators/level-decorator */ "./src/decorators/level-decorator.ts"));


/***/ }),

/***/ "./src/log-event-decorator.ts":
/*!************************************!*\
  !*** ./src/log-event-decorator.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LogEventDecorator = /** @class */ (function () {
    function LogEventDecorator(event) {
        this.event = event;
    }
    LogEventDecorator.prototype.timestamp = function () {
        return this.event.timestamp();
    };
    LogEventDecorator.prototype.message = function () {
        return this.event.message();
    };
    LogEventDecorator.prototype.level = function () {
        return this.event.level();
    };
    LogEventDecorator.prototype.data = function () {
        return this.event.data();
    };
    return LogEventDecorator;
}());
exports.LogEventDecorator = LogEventDecorator;


/***/ }),

/***/ "./src/logger-pipeline.ts":
/*!********************************!*\
  !*** ./src/logger-pipeline.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LoggerPipeline = /** @class */ (function () {
    function LoggerPipeline() {
        this.stages = [];
    }
    LoggerPipeline.prototype.addStage = function (stage) {
        this.stages.push(stage);
    };
    LoggerPipeline.prototype.process = function (logEvent) {
        return this.stages.reduce(function (acc, nextStage) {
            return acc.then(function (nextEvent) {
                if (nextEvent != null)
                    return nextStage.process(nextEvent);
                return null;
            });
        }, Promise.resolve(logEvent));
    };
    return LoggerPipeline;
}());
exports.LoggerPipeline = LoggerPipeline;


/***/ }),

/***/ "./src/logger.ts":
/*!***********************!*\
  !*** ./src/logger.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ilogger_1 = __webpack_require__(/*! ./ilogger */ "./src/ilogger.ts");
var logger_pipeline_1 = __webpack_require__(/*! ./logger-pipeline */ "./src/logger-pipeline.ts");
var message_formatter_stage_1 = __webpack_require__(/*! ./stages/message-formatter-stage */ "./src/stages/message-formatter-stage.ts");
var filter_stage_1 = __webpack_require__(/*! ./stages/filter-stage */ "./src/stages/filter-stage.ts");
/**
 * Base ILogEvent implementation.
 */
var LogEvent = /** @class */ (function () {
    function LogEvent(timestamp, message, level, data) {
        this._timestamp = timestamp;
        this._message = message;
        this._level = level;
        this._data = data;
    }
    LogEvent.prototype.timestamp = function () {
        return this._timestamp;
    };
    LogEvent.prototype.message = function () {
        return this._message;
    };
    LogEvent.prototype.level = function () {
        return this._level;
    };
    LogEvent.prototype.data = function () {
        return this._data;
    };
    return LogEvent;
}());
exports.LogEvent = LogEvent;
/**
 * Pipeline based ILogger implementation. Every logged message passes through a pipeline of IPipelineStage stages.
 * Each stage passes the event along (or null to filter it out). IPipelineStages are allowed modify / decorate the ILogEvents
 * before returning them.
 *
 * All Logger instances are IPipelineStages as well. Note that they will always return the original ILogEvent when they have finished processing it.
 */
var Logger = /** @class */ (function () {
    function Logger(pipeline) {
        this.pipeline = pipeline;
    }
    Logger.prototype.process = function (logEvent) {
        return this.pipeline.process(logEvent).then(function () { return logEvent; });
    };
    Logger.prototype.debug = function (message, data) {
        if (data === void 0) { data = {}; }
        this.process(new LogEvent(Math.round((new Date()).getTime() / 1000.0), message, ilogger_1.LogLevel.DEBUG, data));
    };
    Logger.prototype.info = function (message, data) {
        if (data === void 0) { data = {}; }
        this.process(new LogEvent(Math.round((new Date()).getTime() / 1000.0), message, ilogger_1.LogLevel.INFO, data));
    };
    Logger.prototype.warn = function (message, data) {
        if (data === void 0) { data = {}; }
        this.process(new LogEvent(Math.round((new Date()).getTime() / 1000.0), message, ilogger_1.LogLevel.WARN, data));
    };
    Logger.prototype.error = function (message, data) {
        if (data === void 0) { data = {}; }
        this.process(new LogEvent(Math.round((new Date()).getTime() / 1000.0), message, ilogger_1.LogLevel.ERROR, data));
    };
    Logger.prototype.fatal = function (message, data) {
        if (data === void 0) { data = {}; }
        this.process(new LogEvent(Math.round((new Date()).getTime() / 1000.0), message, ilogger_1.LogLevel.FATAL, data));
    };
    /**
     * Utility method that creates an empty LoggerBuilder
     */
    Logger.builder = function () {
        return new LoggerBuilder();
    };
    /**
     * Utility method that creates a LoggerBuilder that has a pre-configured MessagePrefixStage that prefixes all messages with the provided type's name
     * @param type the type that which name needs to be prefixed
     */
    Logger["for"] = function (type) {
        var builder = new LoggerBuilder();
        builder.prefix("[" + type.name + "] - ");
        return builder;
    };
    return Logger;
}());
exports.Logger = Logger;
var LoggerBuilder = /** @class */ (function () {
    function LoggerBuilder() {
        this.pipeline = new logger_pipeline_1.LoggerPipeline();
    }
    /**
     * Adds a stage to the pipeline
     * @param stage
     */
    LoggerBuilder.prototype.addStage = function (stage) {
        this.pipeline.addStage(stage);
        return this;
    };
    /**
     * Adds a {TimestampFormatterStage} to the pipeline for the logger that's being built.
     */
    LoggerBuilder.prototype.timestamp = function () {
        return this.addStage(new message_formatter_stage_1.TimestampPrefixStage());
    };
    /**
     * Adds a {MessagePrefixStage} that adds the provided prefix ({string} or {StringProvider}) to the pipeline for the logger that's being built.
     * @param prefix
     */
    LoggerBuilder.prototype.prefix = function (prefix) {
        return this.addStage(new message_formatter_stage_1.MessagePrefixStage(prefix));
    };
    /**
     * Adds an {PredicateFilterStage} with the provided predicate to the pipeline for the logger that's being built.
     * @param predicate
     */
    LoggerBuilder.prototype.filter = function (predicate) {
        return this.addStage(new filter_stage_1.PredicateFilterStage(predicate));
    };
    /**
     * Adds a {SinkStage} to the pipeline for the logger that's being built.
     * @param sink
     */
    LoggerBuilder.prototype.sink = function (sinkStage) {
        return this.addStage(sinkStage);
    };
    /**
     * Adds a {LogLevelFilterStage} to the pipeline for the logger that's being built.
     * This will filter out all ILogEvents that have a {LogLevel} lower than the provided one.
     * @param minimumLogLevel
     */
    LoggerBuilder.prototype.logLevel = function (minimumLogLevel) {
        return this.addStage(new filter_stage_1.LogLevelFilterStage(minimumLogLevel));
    };
    /**
     * Adds a {DataFormatterStage} which will try to replace "{...}" sequences with values from the ILogEventData dictionary
     */
    LoggerBuilder.prototype.includeData = function () {
        return this.addStage(new message_formatter_stage_1.DataInjectorStage());
    };
    /**
     * Builds the logger with the configured pipeline
     */
    LoggerBuilder.prototype.build = function () {
        return new Logger(this.pipeline);
    };
    return LoggerBuilder;
}());
exports.LoggerBuilder = LoggerBuilder;


/***/ }),

/***/ "./src/stages/filter-stage.ts":
/*!************************************!*\
  !*** ./src/stages/filter-stage.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/**
 * Filters out ILogEvents from the pipeline
 */
var FilterStage = /** @class */ (function () {
    function FilterStage() {
    }
    FilterStage.prototype.process = function (logEvent) {
        if (!this.filter(logEvent))
            return Promise.resolve(null);
        return Promise.resolve(logEvent);
    };
    return FilterStage;
}());
exports.FilterStage = FilterStage;
/**
 * Filters out ILogEvents that  do not match the configured predicate.
 */
var PredicateFilterStage = /** @class */ (function (_super) {
    __extends(PredicateFilterStage, _super);
    function PredicateFilterStage(predicate) {
        var _this = _super.call(this) || this;
        _this.predicate = predicate;
        return _this;
    }
    PredicateFilterStage.prototype.filter = function (event) {
        return this.predicate(event);
    };
    return PredicateFilterStage;
}(FilterStage));
exports.PredicateFilterStage = PredicateFilterStage;
/**
 * Filters out ILogEvents with a LogLevel lower than its configured level
 * e.g. when minLogLevel is configured to ERROR messages with level DEBUG, INFO and WARN are filtered out and only ERROR and FATAL are passed along
 */
var LogLevelFilterStage = /** @class */ (function (_super) {
    __extends(LogLevelFilterStage, _super);
    function LogLevelFilterStage(minimumLogLevel) {
        var _this = _super.call(this) || this;
        _this.minLogLevel = minimumLogLevel;
        return _this;
    }
    LogLevelFilterStage.prototype.filter = function (event) {
        return event.level() >= this.minLogLevel;
    };
    return LogLevelFilterStage;
}(FilterStage));
exports.LogLevelFilterStage = LogLevelFilterStage;


/***/ }),

/***/ "./src/stages/message-formatter-stage.ts":
/*!***********************************************!*\
  !*** ./src/stages/message-formatter-stage.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var time_formatter_1 = __webpack_require__(/*! ../time-formatter */ "./src/time-formatter.ts");
var message_decorator_1 = __webpack_require__(/*! ../decorators/message-decorator */ "./src/decorators/message-decorator.ts");
/**
 * Prefixes the ILogEvent message with the configured string/StringProvider output
 */
var MessagePrefixStage = /** @class */ (function () {
    function MessagePrefixStage(prefix) {
        this.prefix = (typeof prefix === 'string') ? function () { return prefix; } : prefix;
    }
    MessagePrefixStage.prototype.process = function (logEvent) {
        return Promise.resolve(new message_decorator_1.MessagePrefixDecorator(logEvent, this.prefix));
    };
    return MessagePrefixStage;
}());
exports.MessagePrefixStage = MessagePrefixStage;
/**
 * Suffixes the ILogEventt message with the configured string/StringProvider output
 */
var MessageSuffixStage = /** @class */ (function () {
    function MessageSuffixStage(suffix) {
        this.suffix = (typeof suffix === 'string') ? function () { return suffix; } : suffix;
    }
    MessageSuffixStage.prototype.process = function (logEvent) {
        return Promise.resolve(new message_decorator_1.MessageSuffixDecorator(logEvent, this.suffix));
    };
    return MessageSuffixStage;
}());
exports.MessageSuffixStage = MessageSuffixStage;
/**
 * Prefixes the ILogEvent message with its timestamp using {TimeFormatter}. The format defaults to '%H:%M:%S'
 */
var TimestampPrefixStage = /** @class */ (function () {
    function TimestampPrefixStage(format) {
        if (format === void 0) { format = '%H:%M:%S'; }
        this.format = format;
    }
    TimestampPrefixStage.prototype.process = function (logEvent) {
        var _this = this;
        var timestampPrefixProvider = function () {
            var eventDate = new Date(logEvent.timestamp() * 1000);
            return time_formatter_1.TimeFormatter.format(eventDate, _this.format) + ' ';
        };
        return Promise.resolve(new message_decorator_1.MessagePrefixDecorator(logEvent, timestampPrefixProvider));
    };
    return TimestampPrefixStage;
}());
exports.TimestampPrefixStage = TimestampPrefixStage;
/**
 * Replaces all {key} occurences within the ILogEvent message with its ILogEvent.data()[key] values.
 * If the key is not present in the ILogEvent data the occurence will not be replaced
 */
var DataInjectorStage = /** @class */ (function () {
    function DataInjectorStage() {
    }
    DataInjectorStage.prototype.process = function (logEvent) {
        return Promise.resolve(new message_decorator_1.MessageDataInjectorDecorator(logEvent));
    };
    return DataInjectorStage;
}());
exports.DataInjectorStage = DataInjectorStage;


/***/ }),

/***/ "./src/stages/sink-stage.ts":
/*!**********************************!*\
  !*** ./src/stages/sink-stage.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ilogger_1 = __webpack_require__(/*! ../ilogger */ "./src/ilogger.ts");
var SinkStage = /** @class */ (function () {
    function SinkStage() {
    }
    SinkStage.prototype.process = function (logEvent) {
        return this.write(logEvent).then(function () { return logEvent; });
    };
    return SinkStage;
}());
exports.SinkStage = SinkStage;
/**
 * Your straightforward "write stuff to the console" sink
 */
var ConsoleSinkStage = /** @class */ (function (_super) {
    __extends(ConsoleSinkStage, _super);
    function ConsoleSinkStage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConsoleSinkStage.prototype.write = function (event) {
        var writer = this.getWriter();
        switch (event.level()) {
            case ilogger_1.LogLevel.DEBUG:
                writer.debug(event.message());
                break;
            case ilogger_1.LogLevel.INFO:
                writer.log(event.message());
                break;
            case ilogger_1.LogLevel.WARN:
                writer.warn(event.message());
                break;
            case ilogger_1.LogLevel.ERROR:
            case ilogger_1.LogLevel.FATAL:
                writer.error(event.message());
        }
        return Promise.resolve();
    };
    /**
     * Gets a "valid" console writer (with some fallback handling).
     */
    ConsoleSinkStage.prototype.getWriter = function () {
        var stub = function () { };
        return {
            log: (!console ? stub : (console.log)),
            debug: (!console ? stub : (console.debug ? console.debug : console.log)),
            warn: (!console ? stub : (console.warn ? console.warn : console.log)),
            error: (!console ? stub : (console.error ? console.error : console.log))
        };
    };
    return ConsoleSinkStage;
}(SinkStage));
exports.ConsoleSinkStage = ConsoleSinkStage;
/**
 * A generic "POST logging messages to a remote server" sink
 */
var RestSinkStage = /** @class */ (function (_super) {
    __extends(RestSinkStage, _super);
    function RestSinkStage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RestSinkStage.prototype.write = function (event) {
        // TODO: Implement this...
        throw new Error("Method not implemented.");
    };
    return RestSinkStage;
}(SinkStage));
exports.RestSinkStage = RestSinkStage;


/***/ }),

/***/ "./src/time-formatter.ts":
/*!*******************************!*\
  !*** ./src/time-formatter.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Simple default TimeFormatter used in the interal TimestampPrefixDecorator
 */
var TimeFormatter = /** @class */ (function () {
    function TimeFormatter(fmt) {
        this.fmt = fmt;
    }
    TimeFormatter.prototype.format = function (date) {
        var outputString = this.fmt;
        // month names short/long
        outputString = outputString.replace('%b', this.formatShortMonth(date));
        outputString = outputString.replace('%B', this.formatLongMonth(date));
        // day of week names short/long
        outputString = outputString.replace('%a', this.formatShortWeekday(date));
        outputString = outputString.replace('%A', this.formatLongWeekday(date));
        // full year
        outputString = outputString.replace('%Y', this.formatFullYear(date));
        // month 01..12 only zero/non-zero padded
        outputString = outputString.replace('%m', this.formatMonth(date));
        outputString = outputString.replace('%_m', this.formatMonth(date, false));
        // day of month 1..28/30/31 zero/non-zero padded
        outputString = outputString.replace('%d', this.formatDayOfMonth(date));
        outputString = outputString.replace('%_d', this.formatDayOfMonth(date, false));
        // hours zero/non-zero padded
        outputString = outputString.replace('%H', this.formatHour24(date));
        outputString = outputString.replace('%_H', this.formatHour24(date, false));
        outputString = outputString.replace('%I', this.formatHour12(date));
        outputString = outputString.replace('%_I', this.formatHour12(date, false));
        // minutes zero/non-zero padded
        outputString = outputString.replace('%M', this.formatMinute(date));
        outputString = outputString.replace('%_M', this.formatMinute(date, false));
        // seconds zero/non-zero padded
        outputString = outputString.replace('%S', this.formatSecond(date));
        outputString = outputString.replace('%_S', this.formatSecond(date, false));
        return outputString;
    };
    TimeFormatter.prototype.formatShortWeekday = function (date) {
        return TimeFormatter.DAYS_SHORT[date.getDay()];
    };
    TimeFormatter.prototype.formatLongWeekday = function (date) {
        return TimeFormatter.DAYS[date.getDay()];
    };
    TimeFormatter.prototype.formatShortMonth = function (date) {
        return TimeFormatter.MONTHS_SHORT[date.getMonth()];
    };
    TimeFormatter.prototype.formatLongMonth = function (date) {
        return TimeFormatter.MONTHS[date.getMonth()];
    };
    TimeFormatter.prototype.formatFullYear = function (date) {
        return "" + date.getFullYear();
    };
    TimeFormatter.prototype.formatMonth = function (date, zeroPad) {
        if (zeroPad === void 0) { zeroPad = true; }
        var month = date.getMonth() + 1;
        return (zeroPad && month < 10) ? "0" + month : "" + month;
    };
    TimeFormatter.prototype.formatDayOfMonth = function (date, zeroPad) {
        if (zeroPad === void 0) { zeroPad = true; }
        var dayOfMonth = date.getDate();
        return (zeroPad && dayOfMonth < 10) ? "0" + dayOfMonth : "" + dayOfMonth;
    };
    TimeFormatter.prototype.formatHour24 = function (date, zeroPad) {
        if (zeroPad === void 0) { zeroPad = true; }
        var hour = date.getHours();
        return (zeroPad && hour < 10) ? "0" + hour : "" + hour;
    };
    TimeFormatter.prototype.formatHour12 = function (date, zeroPad) {
        if (zeroPad === void 0) { zeroPad = true; }
        var hour = Math.floor(date.getHours() / 12);
        return (zeroPad && hour < 10) ? "0" + hour : "" + hour;
    };
    TimeFormatter.prototype.formatMinute = function (date, zeroPad) {
        if (zeroPad === void 0) { zeroPad = true; }
        var minute = date.getMinutes();
        return (zeroPad && minute < 10) ? "0" + minute : "" + minute;
    };
    TimeFormatter.prototype.formatSecond = function (date, zeroPad) {
        if (zeroPad === void 0) { zeroPad = true; }
        var second = date.getSeconds();
        return (zeroPad && second < 10) ? "0" + second : "" + second;
    };
    TimeFormatter.format = function (date, fmt) {
        var formatter = new TimeFormatter(fmt);
        return formatter.format(date);
    };
    TimeFormatter.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'];
    TimeFormatter.MONTHS_SHORT = TimeFormatter.MONTHS.map(function (month) { return month.substr(0, 3); });
    TimeFormatter.DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursay', 'Friday', 'Saturday'];
    TimeFormatter.DAYS_SHORT = TimeFormatter.DAYS.map(function (day) { return day.substr(0, 3); });
    return TimeFormatter;
}());
exports.TimeFormatter = TimeFormatter;


/***/ })

/******/ });
});
//# sourceMappingURL=kiokiru.js.map