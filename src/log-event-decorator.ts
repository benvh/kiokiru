'use strict';

import { ILogEvent, ILogEventData, LogLevel } from './ilogger';

export abstract class LogEventDecorator implements ILogEvent {
    protected event: ILogEvent;

    constructor(event: ILogEvent) {
        this.event = event;
    }

    timestamp(): number {
        return this.event.timestamp();
    }

    message(): string {
        return this.event.message();
    }

    level(): LogLevel {
        return this.event.level();
    }

    data(): ILogEventData {
        return this.event.data();
    }
}