const install = (app) => {
  console.log(app)
}
export default {
  install,
  version: require('../package.json').version,
  name: require('../package.json').name
}