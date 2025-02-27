// If window.consoleMessages doesn't exist, create it. Otherwise, reuse it.
window.consoleMessages = window.consoleMessages || [];

// Wrap all custom console code in an IIFE
(function() {
  // Use var to avoid potential re-declaration errors in strict mode
  var consoleMessagesRef = window.consoleMessages;

  // Create a custom console object
  var customConsole = (function(oldConsole) {
    return {
      // Convert a single argument to a string, based on its type
      formatArgOutput: function(arg) {
        let outputArgMessage = "";
        switch (this.getType(arg)) {
          case "string":
            outputArgMessage = `"${arg}"`;
            break;
          case "object":
            outputArgMessage = `Object ${JSON.stringify(arg)}`;
            break;
          case "array":
            outputArgMessage = `Array ${JSON.stringify(arg)}`;
            break;
          default:
            outputArgMessage = arg;
            break;
        }
        return outputArgMessage;
      },

      // Determine the type of an argument
      getType: function(arg) {
        if (typeof arg === "string") return "string";
        if (typeof arg === "boolean") return "boolean";
        if (typeof arg === "function") return "function";
        if (typeof arg === "number") return "number";
        if (typeof arg === "undefined") return "undefined";
        if (typeof arg === "object" && !Array.isArray(arg)) return "object";
        if (typeof arg === "object" && Array.isArray(arg)) return "array";
        return "unknown";
      },

      // Handle multiple arguments to console.log
      logMultipleArguments: function(args) {
        let currentLog = "";

        // Build a string from all arguments
        args.forEach((arg) => {
          currentLog += this.formatArgOutput(arg) + " ";
        });

        // Use the original console to actually log them
        oldConsole.log.apply(oldConsole, args);

        // Store in consoleMessages array
        consoleMessagesRef.push({
          message: currentLog.trim(),
          class: "log log--default",
        });

        // Debug: show consoleMessages in the real console
        oldConsole.log(consoleMessagesRef);
      },

      // Handle a single argument to console.log
      logSingleArgument: function(logItem) {
        // Use the original console
        oldConsole.log(logItem);

        // Build a single message
        const messageText = this.formatArgOutput(logItem);

        // Add to consoleMessages
        consoleMessagesRef.push({
          message: messageText,
          class: `log log--${this.getType(logItem)}`,
        });

        // Debug
        oldConsole.log(consoleMessagesRef);
      },

      // Our custom log function
      log: function() {
        // Convert arguments to an array
        let argsArray = Array.from(arguments);

        // For debugging, show them in the real console
        oldConsole.log(argsArray);

        // If multiple arguments, use logMultipleArguments
        // Otherwise, use logSingleArgument
        return argsArray.length !== 1
          ? this.logMultipleArguments(argsArray)
          : this.logSingleArgument(argsArray[0]);
      },

      // Just pass info calls through to old console
      info: function(text) {
        oldConsole.info(text);
      },

      // Same for warnings
      warn: function(text) {
        oldConsole.warn(text);
      },

      // Custom error method
      error: function(err) {
        oldConsole.error(err);
        consoleMessagesRef.push({
          message: `${err.name}: ${err.message}`,
          class: "log log--error",
        });
      },
    };
  })(window.console);

  // Override window.console with our new custom console
  window.console = customConsole;
})();
