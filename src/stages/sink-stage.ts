'use strict'

import { ILogEvent, LogLevel } from '../ilogger';
import { IPipelineStage } from "../logger-pipeline";

export abstract class SinkStage implements IPipelineStage {
    process(logEvent: ILogEvent): Promise<ILogEvent> {
        return this.write(logEvent).then(() => logEvent);
    }

    abstract write(event: ILogEvent): Promise<void>;
}

/**
 * Your straightforward "write stuff to the console" sink
 */
export class ConsoleSinkStage extends SinkStage {

    write(event: ILogEvent): Promise<void> {
        const writer = this.getWriter();

        switch(event.level()) {
            case LogLevel.DEBUG:
            writer.debug(event.message());
            break;

            case LogLevel.INFO:
            writer.log(event.message());
            break;

            case LogLevel.WARN:
            writer.warn(event.message());
            break;

            case LogLevel.ERROR:
            case LogLevel.FATAL:
            writer.error(event.message());
        }

        return Promise.resolve();
    }

    /**
     * Gets a "valid" console writer (with some fallback handling).
     */
    private getWriter(): Partial<Console> {
        const stub = (): void => {};
        return {
            log:   (!console ? stub : (console.log)),
            debug: (!console ? stub : (console.debug ? console.debug : console.log)),
            warn:  (!console ? stub : (console.warn ? console.warn : console.log)),
            error: (!console ? stub : (console.error ? console.error : console.log))
        };
    }

}