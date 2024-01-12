// @ts-check
// The TypeScript engine will check all JavaScript in this file.

/**
 * Chat functionality.
 */
class Chat extends require('../component/index.js') {
  /**
   * @property {Function} init Initializes this object.
   * @returns Chat
   */
  async init(app)  {
    super.init(app);

    this.myMessage = app.component('./database/index.js').mongoose().model('Message', {
      name : String,
      message : String,
    });

    return this;
  }

  // https://github.com/jshint/jshint/issues/3361
  /* jshint ignore:start */
  myMessage;
  /* jshint ignore:end */

  /**
   * Returns the dependencies.
   * @returns {String[]}
   */
  dependencies() {
    return [
      './database/index.js',
      './bodyParser/index.js',
    ];
  }

  addHook(hook) {
    this._hooks = this.hooks();
    this._hooks.push(hook);
  }

  hooks() {
    if (typeof this._hooks === 'undefined') {
      this._hooks = [];
    }
    return this._hooks;
  }

  invoke(message) {
    for (const hook of this._hooks) {
      hook(message);
    }
  }

  addMessage(messageObject) {
    const message = this.message()(messageObject);
    message.save()
      .then(() => {
        this.invoke(messageObject);
      });
  }

  /**
   * Fetch the "Message" model.
   */
  message() {
    // Sample usage:
    // this.message().find({},(err, messages)=> {
    //   return messages;
    // });

    return this.myMessage;
  }

}

module.exports = new Chat();
