import Button from './src/main';
// import vue from 'vue'
// console.log(vue)

Button.install = function(Vue) {
  Vue.component(Button.name, Button);
};

export default Button;
