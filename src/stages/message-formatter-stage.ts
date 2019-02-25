'use strict';

import { ILogEvent } from '../ilogger';
import { IPipelineStage } from "../logger-pipeline";
import { TimeFormatter } from '../time-formatter';
import { StringProvider, MessagePrefixDecorator, MessageSuffixDecorator, MessageDataInjectorDecorator } from '../decorators/message-decorator';


/**
 * Prefixes the ILogEvent message with the configured string/StringProvider output
 */
export class MessagePrefixStage implements IPipelineStage {

    private prefix: StringProvider;

    constructor(prefix: string|StringProvider) {
        this.prefix = (typeof prefix === 'string') ? () => prefix : prefix;
    }

    process(logEvent: ILogEvent): Promise<ILogEvent> {
        return Promise.resolve(new MessagePrefixDecorator(logEvent, this.prefix));
    }

}

/**
 * Suffixes the ILogEventt message with the configured string/StringProvider output
 */
export class MessageSuffixStage implements IPipelineStage {

    private suffix: StringProvider;

    constructor(suffix: string|StringProvider) {
        this.suffix = (typeof suffix === 'string') ? () => suffix : suffix;
    }

    process(logEvent: ILogEvent): Promise<ILogEvent> {
        return Promise.resolve(new MessageSuffixDecorator(logEvent, this.suffix));
    }

}

/**
 * Prefixes the ILogEvent message with its timestamp using {TimeFormatter}. The format defaults to '%H:%M:%S'
 */
export class TimestampPrefixStage implements IPipelineStage {

    private format: string;

    constructor(format: string = '%H:%M:%S') {
        this.format = format;
    }

    process(logEvent: ILogEvent): Promise<ILogEvent> {
        const timestampPrefixProvider = (): string => {
            const eventDate = new Date(logEvent.timestamp() * 1000);
            return TimeFormatter.format(eventDate, this.format) + ' ';
        };
        return Promise.resolve( new MessagePrefixDecorator(logEvent, timestampPrefixProvider) );
    }

}

/**
 * Replaces all {key} occurences within the ILogEvent message with its ILogEvent.data()[key] values.
 * If the key is not present in the ILogEvent data the occurence will not be replaced
 */
export class DataInjectorStage implements IPipelineStage {

    process(logEvent: ILogEvent): Promise<ILogEvent> {
        return Promise.resolve(new MessageDataInjectorDecorator(logEvent));
    }

}