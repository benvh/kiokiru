'use strict';

import { ILogEvent } from './ilogger';

/**
 * A Pipelinestage's task is to "process" ILogEvents (printing it, sending it to a server, modifying its conent, ...) and return an ILogEvent for the next stage
 */
export interface IPipelineStage {
    process(logEvent:  ILogEvent): Promise<ILogEvent>
}

/**
 * LoggerPipeline defines an ordered list of stages. The pipeline itself also implements IPipelineStage and can be used as such.
 * 
 * Whenever an ILogEvent is processed by a LoggerPipeline it will pass through all stages in the order they were registered.
 * If any of the stages returns "null" all remaining stages from that point on will be skipped (useful for filtering out events)''
 */
export class LoggerPipeline implements IPipelineStage {
    private stages: IPipelineStage[] = [];

    /**
     * Add a stage to the end of the pipeline
     * @param stage
     */
    addStage(stage: IPipelineStage): void {
        this.stages.push(stage);
    }

    process(logEvent: ILogEvent): Promise<ILogEvent> {
        return this.stages.reduce(
            function(acc, nextStage) {
                return acc.then((nextEvent) => {
                    if (nextEvent != null) return nextStage.process(nextEvent);
                    return null;
                });
            },
            Promise.resolve(logEvent)
        );
    }
}
