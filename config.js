const merge = require("lodash/merge");

const config = {
  all: {
    isDev: process.env.NODE_ENV !== 'production',
    DEV_URL: process.env.DEV_URL || "development",
    PROD_URL: process.env.PROD_URL || "production",
  }
}

module.exports = merge(config.all, config[config.all.env])