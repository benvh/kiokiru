import { ILogEvent } from './ilogger';
export interface IPipelineStage {
    process(logEvent: ILogEvent): Promise<ILogEvent>;
}
export declare class LoggerPipeline implements IPipelineStage {
    private stages;
    addStage(stage: IPipelineStage): void;
    process(logEvent: ILogEvent): Promise<ILogEvent>;
}
