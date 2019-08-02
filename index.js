import serverRoute from './server/routes/serverRoute';
export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'indices_view',
    uiExports: {
      app: {
        title: 'Sequence Diagram',
        description: 'Kibana plugin for view logs as sequence diagram',
        main: 'plugins/indices_view/app',
        icon: 'plugins/indices_view/icon.svg',
        styleSheetPath: require('path').resolve(__dirname, 'public/app.scss'),
      },
      injectDefaultVars: function (server) {
        const config = server.config();
        return {
        };
      }
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true)
      }).default();
    },

    init(server, options) {
      serverRoute(server);
    }

  });
}
