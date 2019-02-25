import { ILogEvent } from '../ilogger';
import { IPipelineStage } from "../logger-pipeline";
export declare abstract class SinkStage implements IPipelineStage {
    process(logEvent: ILogEvent): Promise<ILogEvent>;
    abstract write(event: ILogEvent): Promise<void>;
}
/**
 * Your straightforward "write stuff to the console" sink
 */
export declare class ConsoleSinkStage extends SinkStage {
    write(event: ILogEvent): Promise<void>;
    /**
     * Gets a "valid" console writer (with some fallback handling).
     */
    private getWriter;
}
/**
 * A generic "POST logging messages to a remote server" sink
 */
export declare class RestSinkStage extends SinkStage {
    write(event: ILogEvent): Promise<void>;
}
