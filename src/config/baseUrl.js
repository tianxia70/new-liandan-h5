import config from "./index";

export default (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") ? config.baseUrl.dev : config.baseUrl.pro;