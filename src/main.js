// import AMap from 'vue-amap';
// Vue.use(AMap);
// AMap.initAMapApiLoader({
//     key: "自己申请的key",
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//     // 默认高德 sdk 版本为 1.4.4
//     v: '1.4.4',  //这里是vue-amp 的版本号
// //这里是高德ui组件的版本号3
//     uiVersion: '1.0'  //添加 uiVersion 的脚本版本号  这个很重要!必须要引入
//
// });
//
//
// new Vue({
//     el: '#app',
//     router,
//     render: h => h(App),
//     created() {
//         if (_global_.UI) {
//             Vue.prototype.GLOBAL = _global_
//         } else {
//             Vue.prototype.GLOBAL = {
//                 UI: {}
//             }
//         }
//     },
// })


import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
