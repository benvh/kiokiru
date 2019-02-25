'use strict';

import { ILogEvent } from './ilogger';

export interface IPipelineStage {
     process(logEvent:  ILogEvent): Promise<ILogEvent>
}

export class LoggerPipeline implements IPipelineStage {
    private stages: IPipelineStage[] = [];

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