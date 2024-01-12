<template>
    <div class="box">
        <h3>高德地图</h3>
    </div>
    <div id="container">
    </div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef, onMounted, ref, watch } from 'vue'
import {$get} from '../utils/request.js'

// 备份AMap对象
let currentAMap = null
// 定义一个map对象
let map = shallowRef(null);

// 初始化地图方法
const initMap = ()=>{
    AMapLoader.load({
        key:"d09336596eb4b793f08c9805003af069",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:['AMap.Scale', 'AMap.ToolBar',
            'AMap.MapType', 'AMap.HawkEye',
            'AMap.DistrictSearch', 'AMap.Marker',
            'AMap.Driving', 'AMap.Polyline',
        'AMap.DragRoute'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
        currentAMap = AMap
        map.value = new AMap.Map("container",{  //设置地图容器id
            viewMode:"2D",    //是否为3D地图模式
            pitch: 45,
            zoom:5,           //初始化地图级别
            center:[105.602725,37.076636], //初始化地图中心点位置
        });
        /**
         * 添加常用控件，比例尺、放大缩小工具条...
         */
        // 添加比例尺插件
        map.value.addControl(new AMap.Scale());
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.value.addControl(new AMap.ToolBar({
            position: {
                right: '20px',
                top: '150px'
            }
        }));


        const path = [
            new AMap.LngLat(117.28, 37.1),
            new AMap.LngLat(120, 35.6),
            new AMap.LngLat(115.6, 28.7),
            new AMap.LngLat(110.39, 30.9),
            new AMap.LngLat(116.379028, 39.865042),
            new AMap.LngLat(116.427281, 39.903719),
        ];


        /**
         * 标记点
         * @type {Property.Marker} 标记点
         */
        //创建一个 Marker 实例：
        const marker = new AMap.Marker({
            position: path[0], //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        const marker01 = new AMap.Marker({
            position: path[1], //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        const marker02 = new AMap.Marker({
            position: path[2], //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        const marker03 = new AMap.Marker({
            position: path[3], //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        const point01 = new AMap.Marker({
            position: path[4]
        });
        const point02 = new AMap.Marker({
            position: path[5]
        });

        // 创建Marker列表
        const markerList = [marker, marker01, marker02, marker03, point01, point02];

        //将创建的点标记添加到已有的地图实例：
        map.value.add(markerList);
        // 鼠标点击事件
        function clickPoint (e) {
            var infoWindow = new currentAMap.InfoWindow({
                content: "此处的经纬度为：" + e.target.getPosition(),
                offset: new AMap.Pixel(0, -30)
            });
            infoWindow.open(map.value, e.target.getPosition());
        }

        // 循环遍历markerList中的点，并添加点击事件
        markerList.forEach(function (mark) {
            mark.on('click', clickPoint)
        })

        function specialClickPoint(e) {
            var infoWindow = new currentAMap.InfoWindow({
                content: "此处的经纬度为：" + e.target.getPosition() + "测试测试测试测<br>试测<br>试测<br>试测试测试测试测试",
                offset: new AMap.Pixel(0, -30)
            });
            infoWindow.open(map.value, e.target.getPosition());
        }



        markerList[2].on('click', specialClickPoint)


        const polyline = new AMap.Polyline({
            path: path,
            borderWeight: 3, // 线条宽度，默认为 1
            strokeColor: 'red', // 线条颜色
            strokeWeight: 5,   //宽度
            strokeStyle: 'solid',   //实线
            lineJoin: 'round' // 折线拐点连接处样式
        });
        map.value.add(polyline)

    }).catch(e=>{
        console.log(e);
    })
}



// 页面挂载完成
onMounted(()=>{
    // 调用initMap()方法
    initMap()
    // setMarker([117, 37])
})
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
    height: 735px;
}
</style>