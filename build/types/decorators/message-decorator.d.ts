import { LogEventDecorator } from "../log-event-decorator";
import { ILogEvent } from "../ilogger";
export interface StringProvider {
    (): string;
}
export declare class MessagePrefixDecorator extends LogEventDecorator {
    private prefixProvider;
    constructor(event: ILogEvent, prefixProvider: StringProvider);
    message(): string;
}
export declare class MessageSuffixDecorator extends LogEventDecorator {
    private suffixProvider;
    constructor(event: ILogEvent, suffixProvider: StringProvider);
    message(): string;
}
export declare class MessageDataInjectorDecorator extends LogEventDecorator {
    message(): string;
}
