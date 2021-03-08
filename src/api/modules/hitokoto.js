import http from "../http";

import { createApiModule } from "../utils";

const baseUrl = `/hitokoto-api`;

export default createApiModule({
  name: `一言相关api`,
  moduleName: `hitokoto`,
  baseUrl: [baseUrl],
  random: () => http.get(`${baseUrl}`),
});
