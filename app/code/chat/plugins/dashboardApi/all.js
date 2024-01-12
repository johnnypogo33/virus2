/**
 * Chat Dahsboard Api All plugin.
 */
class PluginChatDashboardApiAll {
  invoke(app, callback) {
    app.c('chat').message().find({})
      .then((messages) => {
        callback([
          new (app.class('dashboardApi/dashboardSingleNumber'))('Chat messages', messages.length),
        ]);
      });
  }
}

module.exports = new PluginChatDashboardApiAll();
