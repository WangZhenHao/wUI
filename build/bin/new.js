// 创建新的组件执行命令
"node build/bin/new.js checkbox"


process.on('exit', (e) => {
  console.log();
})

//node new.js button

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name')
  process.exit(1)
}

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const chineseName = process.argv[3] || componentname;
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, '../../packages', componentname);
const Files = [
  //创建js文件
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './src/main';

${ComponentName}.install = function(Vue) {
	Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
  },
  //创建vue文件
  {
    filename: 'src/main.vue',
    content: `<template>
  <div class="w-${componentname}"></div>
</template>

<script>
	export default {
		name: 'w${ComponentName}'
	};
</script>`
  },
  // 创建scss
  {
    filename: path.join('../../packages/theme-chalk/src', `${componentname}.scss`),
    content: `@import "mixins/mixins";
@import "common/var";

`
    // @include b(${componentname}) {

    // }
  }
]

// 添加到components.json
const componentsFile = require('../../components.json');
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在`);
  process.exit(1)
}

componentsFile[componentname] = `./packages/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

// 创建package
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
})

// 添加index.scss
const sassPath = path.join(__dirname, '../../packages/theme-chalk/src/index.scss');
// 先读取之前的scss内容，然后做拼接
const sassImportText = `${fs.readFileSync(sassPath)} @import "./${componentname}.scss"`;

fileSave(sassPath)
  .write(sassImportText, 'utf8')
  .end('\n');

console.log('创建文件成功！')













