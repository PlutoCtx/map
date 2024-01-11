<template>
    <div class="box">
        <h3>高德地图</h3>
    </div>
    <div id="container">
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import {shallowRef, onMounted, ref, watch, onUnmounted} from 'vue'
import {$get} from '../utils/request.js'

export default {
    data() {
        return {
            map: null,
            //标记点的位置信息
            mapData: [
                {
                    name: '佳林羽毛球馆',
                    longitude: 114.344706,
                    latitude: 38.051262,
                    content:'室内羽毛球馆，全新地皮，干净整洁',
                    img:'https://n.sinaimg.cn/spider20220702/290/w1080h810/20220702/bdee-24bda60bf8b6cf30b658f25de78e12de.jpg'
                },
                {
                    name: '牛春花板面',
                    longitude: 114.343524,
                    latitude: 38.049604,
                    content:'好吃是好吃，吃完必上火，把子肉嘎嘎香',
                    img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F25fac10a-1e66-4a6d-a4a1-4bf07d2666a1%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690684148&t=c2560eb44f5348fc210f74ccd4552555'
                }
            ],
            // infoWindow: {}
        }
    },


    mounted() {
        this.initMap()
        this.markPoints()
    },

    methods: {
        initMap() {
            AMapLoader.load({
                key: "d09336596eb4b793f08c9805003af069", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.Scale', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
                .then((AMap) => {
                    currentMap = AMap
                    map.value = new AMap.Map("container", {
                        // 设置地图容器id
                        viewMode: "3D", // 是否为3D地图模式
                        zoom: 11, // 初始化地图级别
                        center: [116.397428, 39.90923], // 初始化地图中心点位置
                    });


                    // 添加比例尺，左下角
                    map.value.addControl(new AMap.Scale())

                    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                    map.value.addControl(new AMap.ToolBar({
                        position: {
                            right: '20px',
                            top: '150px'
                        }
                    }));



                    map.value.addControl(AMap.Marker({
                        content: content, //自定义点标记覆盖物内容
                        position: [116.397428, 39.90923], //基点位置
                        offset: new AMap.Pixel(-13, -30), //相对于基点的偏移位置
                    }));


                    marker = new AMap.Marker({
                        content: content, //自定义点标记覆盖物内容
                        position: [116.397428, 39.90923], //基点位置
                        offset: new AMap.Pixel(-13, -30), //相对于基点的偏移位置
                    });
                    map.value.add(marker)



                })
                .catch((e) => {
                    console.log(e);
                })
        },

        //遍历显示标记点
        markPoints() {
            // this.mapData.forEach(item => {
                // 创建一个 Marker 实例：
                const marker = new AMap.Marker({
                    position: new AMap.LngLat(111, 22),   // 经纬度对象，也可以是经纬度构成的一维数组[lng, lat]
                });
                // 将创建的点标记添加到已有的地图实例：
                this.map.value.add(marker);

                //给标记点添加事件
                // marker.on('click', (e) => {
                //     this.setInfoWindows(e, item)
                // })
            // });
        },
        //显示的弹出框组件
        // setInfoWindows(e, item) {
        //     console.log(item)
        //     // 信息窗体的内容
        //
        //     let content = [
        //         // e.pos[0],e.pos[1],
        //         `<div style='\'padding:0px' 0px = '' 4px; \'=''><b>${item.name}</b>`,
        //         `详情 ：${item.content}`,
        //         "电话 : 010-84107000   邮编 : 100102",
        //         "地址 : XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div></div>",
        //         `<img src=${item.img} alt="" style="width: 100px;height: 100px">`
        //     ];
        //     // 创建 infoWindow 实例
        //     let infoWindow = new AMap.InfoWindow({
        //         content: content.join("<br>")  //传入 dom 对象，或者 html 字符串
        //     });
        //     // 打开信息窗体
        //     let dd = this.map.getCenter()
        //     // dd.pos = [e.pos[0], e.pos[1]]
        //     dd.lat = item.latitude
        //     dd.lng = item.longitude
        //     console.log(dd)
        //     infoWindow.open(this.map, dd);
        // }


    }




}



    let currentMap = null
    const map = shallowRef(null);
    let marker = null;


    // // 初始化地图界面，添加部分组件
    // const initMap = () =>{
    //
    // }



    // 添加标记点
    // const addPoints = async ()=>{
    //
    //     const marker = new currentMap.Marker({
    //         // 点坐标
    //         // position: [116.397428, 39.90923]
    //         position: new AMap.LngLat(116.39, 39.9),
    //
    //     });
    //     map.value.add(marker);
    //
    // }

    onMounted(() => {
        this.initMap();
        this.markPoints();
    });
    //
    // onUnmounted(() => {
    //     map?.destroy();
    // });



</script>

<style scoped>
.box{
    border: 1px solid #ccc;
    padding: 5px;
    margin: 5px;
    color: #333;
}
#container{
    padding:0px;
    margin: 5px 5px 0 5px;
    box-sizing: border-box;
    height: 670px;
}
</style>