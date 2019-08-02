export default function (server) {
  server.route({
    path: '/api/indices_view/search/{userId}',
    method: 'GET',
    handler: async (_req) => {
        const params = {index: "diagram",
          type: "",
          body:  {
            "query":
                {
                  "match_phrase": {"name": _req.params.userId}
                }
          },
          size: 1000,
          from: 0,
          sort: ""
      };
      return await server.plugins.elasticsearch.getCluster('data').callWithRequest(_req, 'search', params);
    }
  });
}
