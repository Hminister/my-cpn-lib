#!/usr/bin/env node
const pkg = require('../package.json')
const path = require('path')
const fs = require("fs")
const { exec } = require('child_process')
let argv = process.argv

console.log(argv)
const file2obj = (filePath) => {
  filePath = path.resolve(__dirname, filePath)
  return JSON.parse(fs.readFileSync(filePath).toString())
}
// 对象转⽂件
const obj2file = (dataObj) => {
  fs.writeFileSync(
    path.resolve(__dirname, './data.json'),
    JSON.stringify(dataObj, null, 2)
  )
}
const dataObj = file2obj('./data.json')


if (argv.indexOf('-v') != -1) {
  console.log(`${pkg.name} v${pkg.version}`)
} else if (argv.indexOf('ls') != -1) {
  dataObj.data.forEach(item => {
    for (key in item) {
      console.log(`${key} => ${item[key]}`)
    }
  });
} else if (argv.indexOf('add') != -1) {
  //读取 add命令的位置
  let index = argv.indexOf('add')
  // 读取要添加的key
  let key = argv[index + 1]
  // 读取要添加的value
  let value = argv[index + 2]
  // 将其封装到对象中
  let item = {}
  item[key] = value
  // 追加到当前数组的最后
  dataObj.data.push(item)
  // 将对象持久化到本地⽂件
  obj2file(dataObj)
  // 输出成功数据
  console.log('success added registry')
} else if (argv.indexOf('del') != -1) {
  //读取del命令的位置
  let index = argv.indexOf('del')
  // 读取要添加的key
  let key = argv[index + 1]
  // 通过filter过滤掉不要的key
  dataObj.data = dataObj.data.filter(item => !item[key])
  // 将对象持久化到本地⽂件
  obj2file(dataObj)
  // 输出成功数据
  console.log('success deleted registry')
} else if (argv.indexOf('use') != -1) {
  // 获取use命令的位置
  let index = process.argv.indexOf('use')
  // 获取key
  let key = process.argv[index + 1]
  // 过滤找到要设置的registry
  let res = dataObj.data.filter(item => item[key])
  if (res.length > 0) {
    exec(`npm config set registry ${res[0][key]}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`set registry success:${res[0][key]}`);
    })
  } else {
    console.log(`${key} is not in p-nrm list`)
  }
} else if (process.argv.indexOf('-h') != -1) {
  console.log(`
  add:p-nrm add key value can add registry address to list
  del:p-nrm del key can delete key of list
  ls:p-nrm ls can show all list
  clear:p-nrm clear can clear list
  -v:p-nrm -v can show version
  `)
}