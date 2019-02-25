'use strict';

import { LogEventDecorator } from "../log-event-decorator";
import { ILogEvent } from "../ilogger";

export interface StringProvider {
    (): string;
}


export class MessagePrefixDecorator extends LogEventDecorator {

    private prefixProvider: StringProvider;

    constructor(event: ILogEvent, prefixProvider: StringProvider) {
        super(event);
        this.prefixProvider = prefixProvider;
    }

    message(): string {
        return `${this.prefixProvider()}${this.event.message()}`;
    }
}


export class MessageSuffixDecorator extends LogEventDecorator {

    private suffixProvider: StringProvider;

    constructor(event: ILogEvent, suffixProvider: StringProvider) {
        super(event);
        this.suffixProvider = suffixProvider;
    }

    message(): string {
        return `${this.event.message()}${this.suffixProvider()}`;
    }

}

export class MessageDataInjectorDecorator extends LogEventDecorator {

    message(): string {
        const eventData = this.event.data();
        const eventMessage = this.event.message();
        let outputMessage = eventMessage;

        const variableRegex = /\{([^}]+)\}/g;
        let match: RegExpExecArray = null;

        while((match = variableRegex.exec(eventMessage)) != null) {
            const propertyName = match[1].trim();
            if (eventData[propertyName] != null) {
                outputMessage = outputMessage.replace(match[0], eventData[propertyName]);
            }
        }

        return outputMessage;
    }

}