class AppLogger {
  logger;
  constructor() {
    this.logger = console;
  }

  log(error: Error | any): void {
    console.log("LOGGING TO SENTRY");

    if (!__DEV__) {
      // Log to sentry
    } else {
      this.logger.table(error);
    }
  }
}

export default new AppLogger();
