# Kiokiru
Customizable Logger library for javascript

## API docs
See the ```docs``` directory

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

// The ILogEvent will reach the nonFiltering logger an be written to the console.
// Logger stages always propagate the original events they receive even though the
// stages in their internal pipeline might decorate them...
combinedLogger.debug('this message is writting to the console!');

```
