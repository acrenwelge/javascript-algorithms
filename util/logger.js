// extending console object to enable logging levels
const LEVELS = {
  'OFF': 0,
  'ERROR': 1,
  'WARN': 2,
  'INFO': 3,
  'DEBUG': 4,
  'TRACE': 5,
  'ALL': 6
}
let logger = Object.create(console);
let doNothing = () => {}
logger.setLevel = (lvl) => {
  console.info(`SETTING LOG LEVEL TO ${lvl}`);
  logger.trace = LEVELS[lvl] >= 5 ? console.trace : doNothing;
  logger.debug = LEVELS[lvl] >= 4 ? console.debug : doNothing;
  logger.log   = LEVELS[lvl] >= 3 ? console.log : doNothing; // treat log same as info
  logger.info  = LEVELS[lvl] >= 3 ? console.info : doNothing;
  logger.warn  = LEVELS[lvl] >= 2 ? console.warn : doNothing;
  logger.error = LEVELS[lvl] >= 1 ? console.error : doNothing;
}
console.info('INITIALIZING LOGGER');
logger.setLevel('OFF'); // default value

module.exports = logger;
