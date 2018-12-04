const { resolveApp, resolveModule } = require('../utils/resolve');

/**
 * @param {(Object|String)} [paths]
 * @param {String} [paths.config]
 * @param {String} [paths.main]
 * @param {String} [paths.template]
 * @param {String} [paths.entry]
 */
function parsePaths(paths) {
  const {
    config, main, template, entry,
  } = typeof paths === 'string' ? { pages: paths } : paths;

  return {
    // 页面配置文件
    config: resolveApp(config || './src/app.json'),
    // 主入口文件，作为模板
    main: resolveApp(main || './src/main.js'),
    // 入口模板文件，优先级较高
    template: resolveApp(template || main || './src/main.js'),
    // 项目构建目录
    dist: resolveApp('./dist'),
    // 入口文件目录
    entry: entry ? resolveApp(entry) : resolveModule('./dist'),
  };
}

module.exports = parsePaths;