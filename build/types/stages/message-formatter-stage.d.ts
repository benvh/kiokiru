import { ILogEvent } from '../ilogger';
import { IPipelineStage } from "../logger-pipeline";
import { StringProvider } from '../decorators/message-decorator';
/**
 * Prefixes the ILogEvent message with the configured string/StringProvider output
 */
export declare class MessagePrefixStage implements IPipelineStage {
    private prefix;
    constructor(prefix: string | StringProvider);
    process(logEvent: ILogEvent): Promise<ILogEvent>;
}
/**
 * Suffixes the ILogEventt message with the configured string/StringProvider output
 */
export declare class MessageSuffixStage implements IPipelineStage {
    private suffix;
    constructor(suffix: string | StringProvider);
    process(logEvent: ILogEvent): Promise<ILogEvent>;
}
/**
 * Prefixes the ILogEvent message with its timestamp using {TimeFormatter}. The format defaults to '%H:%M:%S'
 */
export declare class TimestampPrefixStage implements IPipelineStage {
    private format;
    constructor(format?: string);
    process(logEvent: ILogEvent): Promise<ILogEvent>;
}
/**
 * Replaces all {key} occurences within the ILogEvent message with its ILogEvent.data()[key] values.
 * If the key is not present in the ILogEvent data the occurence will not be replaced
 */
export declare class DataInjectorStage implements IPipelineStage {
    process(logEvent: ILogEvent): Promise<ILogEvent>;
}
