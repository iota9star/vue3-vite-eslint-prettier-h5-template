import http from "../http";

import { createApiModule } from "../utils";

const baseUrl = `/konachan-api`;

export default createApiModule({
  name: `konachan相关api`,
  moduleName: `konachan`,
  baseUrl: [baseUrl],
  list: (page) => http.get(`${baseUrl}`, { page, limit: 8 }),
});
