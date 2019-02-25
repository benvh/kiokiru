# Kiokiru
Customizable Logger library for javascript

## API docs
See the ```docs``` directory or visit https://kiokiru.benvh.tech

## Quick start

Either install Kiokiru from the npm registry using your favorite package manager
or download one of the pre-built files available in ```build/debug``` or ```build/production```

### Basic usage
```typescript
import { Logger, ConsoleSinkStage }  from 'kiokiru';

const log = Logger.builder()
    .timestamp()
    .includeData()
    .sink(new ConsoleSinkStage())
    .build();

log.debug('A debug message with some data {someValue}', { someValue: 1337 });
log.info('An info message without data');
log.warn('A warning message without data');

try {
    // ...
} catch(e) {
    log.error('An error message with data that is not printed', { error: e });
}
```

### Filtering out messages
```typescript
import { LogLevel, Logger, PredicateFilterStage, ConsoleSinkStage }  from 'kiokiru';

const log = Logger.builder()
    .logLevel(LogLevel.ERROR)
    .filter((event: ILogEvent) => event.data().someProperty !== 'someValue')
    .sink(new ConsoleSinkStage())
    .build();

log.debug('a debug message that is filtered out because of the "logLevel" filter');
log.error('an error message that is filtered out because of the predicate filter', { someProperty: 'someValue' });
log.error('an error message that is not filtered out and written to the console');
log.fatal('a fatal message that is also not filtered out and written to the console');



```

### Combine multiple loggers
```typescript
import { Logger, ConsoleSinkStage }  from 'kiokiru';

const nonFilteringLogger = Logger.builder().sink(new ConsoleSinkStage()).build();
const filteringLogger = Logger.builder().logLevel(LogLevel.ERROR).sink(new ConsoleSinkStage()).build();

const combinedLogger = Logger.builder().addStage(filteringLogger).addStage(nonFilteringLogger).build();

// The ILogEvent will reach the nonFiltering logger and will be written to the console.
// Logger stages always propagate the original events they receive even though the
// stages in their internal pipeline might modify/decorate them...
combinedLogger.debug('this message is writting to the console!');

```


### Remote sinks

Kiokiru makes it super easy to implement a sink that posts log events to your remote server. It is not included as this would introduce unneeded
ajax dependencies that probably do not match your preferred one, let alone support all your use-cases. 

See below example to get you started.

```typescript
import axios from 'axios';
import { ILogEvent, SinkStage } from 'kiokiru';

export class AxiosSink extends SinkStage {

    private remoteUrl: string;

    constructor(remoteUrl: string)  {
        super();
        this.remoteUrl = remoteUrl;
    }

    write(event: ILogEvent): Promise<void> {
        return axios({
            method: 'post',
            url: this.remoteUrl,
            headers: { content-type: 'application/json' },
            data: JSON.stringify(event)
        })
        .then((resp) => {
            // ...
        }) 
        .catch((e) => {
            // not catching errors would reject the rest of the logging pipeline!
            // probably want to log that the logger has failed logging...? :)
            return null;
        });
    }

}

```