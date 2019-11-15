
<template>
  <!--   昨日客流OD显示 模块内容一-->
  <div>
   <div class="main">
      <!-- <div class="borde">{{mcTitle}}</div> -->
      <!-- <div :id="mcId" class="main-id"></div> -->
      <div class="main-idea">

        <!-- 顶部指标数据 -->
        <div class="idea-top">
          <div class="idea-top-left">
            <div class="left-sub">
              <img src="../../../assets/img/idea-border-l.png" alt="" class="sub-bg">
              <div class="sub-content">
                <!--  AG图表故障分析-->
                <div class="borde">AG图表故障分析</div>
                <div class="contain-ag">
                  <div class="idea-ag" id="ag-main">
                  <div class="ag" v-for="(item,index) in agList" :key="index">
                    <div class="ag-item">
                      {{item.data}}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 仪表板数据 -->
          <div class="idea-top-middle">
            <div class="top-middle-l">
               <div class="top-middle-key">
                <img src="../../../assets/img/idea-bg.png" alt="" class="idea-img">
                <div class='gaugeDateTitle'>AG</div>
                <div class='gaugeDateLeft'>
                  <div class='gaugeDateLabel'>总数：<span class='gaugeDateNum'>1623</span></div>
                  <div class='gaugeDateLabel'>故障数量：<span class='gaugeDateNum'>1553</span></div>
                  <div class='gaugeDateLabel'>正常数量：<span class='gaugeDateNum'>0</span></div>
                  <div class='gaugeDateLabel'>失效数量：<span class='gaugeDateNum'>70</span></div>
                </div>
              </div>
              <div class="top-middle-picture">
                <div id="gaugeLeft" class='gaugeLeftClass'></div>
              </div>
            </div>
             <div class="top-middle-r">
               <div class="top-middle-key">
                <img src="../../../assets/img/idea-bg.png" alt="" class="idea-img">
                <div class='gaugeDateTitle'>TVM</div>
                <div class='gaugeDateLeft'>
                  <div class='gaugeDateLabel'>总数：<span class='gaugeDateNum'>1623</span></div>
                  <div class='gaugeDateLabel'>故障数量：<span class='gaugeDateNum'>1553</span></div>
                  <div class='gaugeDateLabel'>正常数量：<span class='gaugeDateNum'>0</span></div>
                  <div class='gaugeDateLabel'>失效数量：<span class='gaugeDateNum'>70</span></div>
                </div>
              </div>
              <div class="top-middle-picture">
                <div id="gaugeRight" class='gaugeRightClass'></div>
              </div>
            </div>
          </div>
          <div class="idea-top-right">
            <div class="left-sub">
              <img src="../../../assets/img/idea-border-r.png" alt="" class="sub-bg">
              <div class="sub-content">
                <!--  TVM图表故障分析-->
                <div class="borde">TVM图表故障分析</div>
                <div class="contain-tvm">
                   <div class="idea-tvm" id="tvm-main">
                    <div class="tvm" v-for="(item,index) in tvmList" :key="index">
                      <div class="tvm-item">
                        {{item.data}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 底部图表数据 -->
        <div class="idea-bottom">
          <div class="idea-bottom-left">
            <div class="left-sub">
              <img src="../../../assets/img/idea-border-bl.png" alt="" class="sub-bg">
              <div class="sub-content">
                <div class="borde">AG服务状态统计</div>
                <!--  AG-->
                <div class="AG">
                   <a-table :columns="columnsAg" :dataSource="dataAg" size="small" :pagination="false"/>
                </div>
              </div>
            </div>
          </div>
          <div class="idea-bottom-right">
            <div class="left-sub">
              <img src="../../../assets/img/idea-border-br.png" alt="" class="sub-bg">
              <div class="sub-content">
                <div class="borde">TVM服务状态统计</div>
                <!-- Tvm -->
                <div class="TVM">
                  <a-table :columns="columnsTvm" :dataSource="dataTvm" size="small" :pagination="false" />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import $ from 'jquery';
// import func from '../../../../vue-temp/vue-editor-bridge';
  const columnsAg = [
    {
      title: '车站名称',
      dataIndex: 'name',
    },
    {
      title: '设备总数',
      dataIndex: 'age',
    },
    {
      title: '正常服务',
      dataIndex: 'formal',
    },
    {
      title: '降级服务',
      dataIndex: 'down',
    },
    {
      title: '失效服务',
      dataIndex: 'dismiss',
    },
  ];
  const columnsTvm = [
    {
      title: '车站名称',
      dataIndex: 'name',
    },
    {
      title: '设备总数',
      dataIndex: 'age',
    },
    {
      title: '正常服务(单模式)',
      dataIndex: 'sub',
    },
     {
      title: '正常服务(双模式)',
      dataIndex: 'double',
    },
    {
      title: '降级服务',
      dataIndex: 'down',
    },
        {
      title: '失效服务',
      dataIndex: 'dismiss',
    },
     {
      title: '认证失败(智慧通)',
      dataIndex: 'ie',
    },
  {
      title: '认证失败(一票通)',
      dataIndex: 'once',
    },
  ];
export default {
  name: "MC16",
  data() {
    return {
      agList:[
        {data:'测试数据1：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据2：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据3：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据4：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据5：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据6：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据7：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据8：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据9：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据10：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据11：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据12：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据13：2019年09月20日07:02:37可乐村站A口02售票机故障'},
      ],
      tvmList:[
        {data:'测试数据1：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据2：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据3：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据4：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据5：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据6：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据7：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据8：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据9：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据10：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据11：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据12：2019年09月20日07:02:37可乐村站A口02售票机故障'},
        {data:'测试数据13：2019年09月20日07:02:37可乐村站A口02售票机故障'},
      ],
      dataRef:'',
      timerTvm:'',
      timerAg:'',

      leftGau:'',
      RightGau:'',
      dataAg:[{
        key: '1',
        name: '1',
        age: '大树营站 - 东华站',
        address: '87282',
      },
      {
        key: '2',
        name: '2',
        age: '可乐村站 - 东华站',
        address: '82999',
      },
      {
        key: '3',
        name: '3',
        age: '大树营站 - 昆明南站',
        address: '73299',
      },
          {
        key: '4',
        name: '4',
        age: '可乐村站 - 昆明南站',
        address: '73022',
      },
          {
        key: '5',
        name: '5',
        age: '大树营站 - 斗南站',
        address: '69364',
      },
          {
        key: '6',
        name: '6',
        age: '古城站 - 东华站',
        address: '67299',
      },
      {
        key: '7',
        name: '7',
        age: '大树营站 - 吴家营站',
        address: '60938',
      },
        {
        key: '8',
        name: '8',
        age: '大树营站 - 吴家营站',
        address: '60938',
      },
        {
        key: '9',
        name: '9',
        age: '大树营站 - 吴家营站',
        address: '60938',
      },
        {
        key: '10',
        name: '10',
        age: '大树营站 - 吴家营站',
        address: '60938',
      },
      ],
      dataTvm:[{
        key: '1',
        name: '1',
        age: '大树营站 - 东华站',
        address: '87282',
      },
      {
        key: '2',
        name: '2',
        age: '可乐村站 - 东华站',
        address: '82999',
      },
      {
        key: '3',
        name: '3',
        age: '大树营站 - 昆明南站',
        address: '73299',
      },
          {
        key: '4',
        name: '4',
        age: '可乐村站 - 昆明南站',
        address: '73022',
      },
          {
        key: '5',
        name: '5',
        age: '大树营站 - 斗南站',
        address: '69364',
      },
          {
        key: '6',
        name: '6',
        age: '古城站 - 东华站',
        address: '67299',
      },
      {
        key: '7',
        name: '7',
        age: '大树营站 - 吴家营站',
        address: '60938',
      },
        {
        key: '8',
        name: '8',
        age: '大树营站 - 吴家营站',
        address: '60938',
      },
        {
        key: '9',
        name: '9',
        age: '大树营站 - 吴家营站',
        address: '60938',
      },
        {
        key: '10',
        name: '10',
        age: '大树营站 - 吴家营站',
        address: '60938',
      },
      ],
      columnsTvm,
      columnsAg,

    };
  },
  props: ["mcStatus", "mcTitle", "mcId"],
  watch: {
    mcStatus: function(val) {
      this.mcStatus = val;
    },
    mcTitle: function(val) {
      this.mcTitle = val;
    },
    mcId: function(val) {
      this.mcId = val;
    }
  },
  mounted() {
    let self = this;
    // 初始化障碍信息
    this.initGetActionInfo();

    // 初始化仪表盘
    this.drawLineGauge();

    // 初始化统计表格
    this.initTableDisplay();

    // 初始化设备指标信息
    this.initServiceInfo();
  },
  created() {
  },
  methods: {
    // 初始化设备指标信息
    initServiceInfo:function(){
      let self = this;
      self.initService(function(data){
        self.serviceInfo(data);
      })
    },
    initService:function(callback){

    },
    serviceInfo:function(data){

    },
    // 初始化障碍信息
    initGetActionInfo:function(){
      let self = this;
      self.getActionInfo(function(data){
        self.actionInfo(data);
      })
    },
    getActionInfo:function(callback){

    },
    actionInfo:function(data){
  // 启动故障信息滚动
      this.actionInfoTvm();//Tvm
      this.actionInfoAg();///ag
    },
    // 初始化统计表格
    initTableDisplay:function(){
      let self = this;
      self.initTable(function(data){
        self.tableDisplay(data);
      })
    },

    initTable:function(callback){

      
    },
    tableDisplay:function(data){

    },
    // // 故障信息滚动效果
    scrollListTvm:function(obj) {
      var scrollHeight = $(".idea-tvm .tvm:first").height();
      $(".idea-tvm").stop().animate({marginTop:-scrollHeight},600,function () {
       $(".idea-tvm").css({marginTop:0}).find(".tvm:first").appendTo($(".idea-tvm"));
      });
    },
   scrollListAg:function(obj) {
      var scrollHeight = $(".idea-ag .ag:first").height();
      $(".idea-ag").stop().animate({marginTop:-scrollHeight},600,function () {
       $(".idea-ag").css({marginTop:0}).find(".ag:first").appendTo($(".idea-ag"));
      });
    },
    // 启动故障信息滚动
    actionInfoTvm:function(){
      let self = this;
      this.timerTvm = null;
      //触摸清空定时器
      $(".idea-tvm").hover(function () {
        clearInterval(self.timerTvm);
      },function () {//离开启动定时器
        self.timerTvm = setInterval(function () {
        self.scrollListTvm($(".idea-tvm"));
        },1000);
      }).trigger("mouseleave"); //自动触发触摸事件
      
     },
    actionInfoAg:function(){
      let self = this;
      this.timerAg = null;
      //触摸清空定时器
      $(".idea-ag").hover(function () {
        clearInterval(self.timerAg);
      },function () {//离开启动定时器
        self.timerAg = setInterval(function () {
        self.scrollListAg($(".idea-ag"));
        },1000);
      }).trigger("mouseleave"); //自动触发触摸事件
      
     },
    drawLineGauge(){
      let self = this;
      let optionLeft = null;
      let optionRight = null;
      let objLeft = document.getElementById('gaugeLeft');
      let objRight = document.getElementById('gaugeRight');
      self.leftGau = self.$echarts.init(objLeft);
      self.RightGau = self.$echarts.init(objRight);
      optionLeft = {
          tooltip: {
            formatter: "{a} <br/>{c} {b}"
          },
          series: [{
              name: "开机率",
              type: "gauge",
              z: 3,
              min: 0,
              max: 100,
              splitNumber: 10,
              center: ["55%", "50%"], // 默认全局居中
              radius: "75%",
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  width: 10
                }
              },
              axisTick: {
                // 坐标轴小标记
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: "auto"
                }
              },
              splitLine: {
                // 分隔线
                length: 20, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  color: "auto"
                }
              },
              pointer:{
                length:'50%',
                width: 5,
              },
              axisLabel: {
                backgroundColor: "auto",
                borderRadius: 2,
                color: "#eee",
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: "#222"
              },
              title: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 20,
                color: "#fff",
                offsetCenter: [0, "20px"]
                // fontStyle: 'italic'
              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  value = `${value}%`;
                  return value;
                },
                fontWeight: "bolder",
                fontSize:'30px',
                borderRadius: 3,
                backgroundColor: "#444",
                borderColor: "#aaa",
                shadowBlur: 5,
                shadowColor: "#333",
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                borderWidth: 2,
                textBorderColor: "#000",
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: "#fff",
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
               
                color: "#eee",
                rich: {},
                offsetCenter: [0, "100px"]
              },
              data: [{ value: 40, name: "开机率" }]
            },
            {
              name: "完好率",
              type: "gauge",
              center: ["18%", "55%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              endAngle: 18,
              splitNumber: 4,
              axisLine: {// 坐标轴线
                lineStyle: {// 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {// 坐标轴小标记
                length: 12, // 属性length控制线长
                lineStyle: {// 属性lineStyle控制线条样式
                  color: "auto"
                }
              },
              splitLine: {// 分隔线
                length: 20, // 属性length控制线长
                lineStyle: {// 属性lineStyle（详见lineStyle）控制线条样式
                  color: "auto"
                }
              },
              pointer: {
                width: 5
              },
              title: {
                fontWeight: "bolder",
                fontSize: 20,
                color: "#fff",
                offsetCenter: [0, "-30%"] // x, y，单位px
              },
              pointer:{
                length:'50%',
                width: 5,
              },
              detail: {// 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                // fontSize:'40px',
                offsetCenter:[0,'60px'],// 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  value = `${value}%`;
                  return value;
                }
              },
              data: [{ value: 1.5, name: "完好率" }]
            },
            {
              name: "连接状态",
              type: "gauge",
              center: ["85%", "50%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 135,
              endAngle: 45,
              splitNumber: 4,
              axisLine: {// 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {// 坐标轴小标记
                splitNumber: 5,
                length: 10, // 属性length控制线长
                lineStyle: {// 属性lineStyle控制线条样式
                  color: "auto"
                }
              },
              axisLabel: {
                formatter: function(v) {
                  switch (v + "") {
                    case "0":
                      return "E";
                    case "1":
                      return "Gas";
                    case "2":
                      return "F";
                  }
                }
              },
              splitLine: {// 分隔线
                length: 15, // 属性length控制线长
                lineStyle: {// 属性lineStyle（详见lineStyle）控制线条样式
                  color: "auto"
                }
              },
              pointer: {
                width: 2,
                length:'74%'
              },
              title: {
                fontWeight: "bolder",
                fontSize: 16,
                color: "red",
                offsetCenter: [0, "-50px"]
              },
              detail: {// 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: "12px",
                color: "#fff",
                offsetCenter: [0, "-30px"],
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  value = `${value}%`;
                  return value;
                }
              },
              data: [{ value: 100, name: "连接状态" }]
            },
            {
              name: "时钟正常",
              type: "gauge",
              center: ["85%", "50%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 315,
              endAngle: 225,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {
                // 坐标轴小标记
                show: false
              },
              axisLabel: {
                formatter: function(v) {
                  switch (v + "") {
                    case "0":
                      return "H";
                    case "1":
                      return "Water";
                    case "2":
                      return "C";
                  }
                }
              },
              splitLine: {
                // 分隔线
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  color: "auto"
                }
              },
              pointer: {
                width: 2
              },
              title: {
                fontWeight: "bolder",
                fontSize: 16,
                color: "red",
                offsetCenter: [0, "55px"]
              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: "12px",
                color: "#fff",
                offsetCenter: [0, "35px"],
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  value = `${value}%`;
                  return value;
                }
              },
              data: [{ value: 100, name: "时钟正常" }]
            }
          ]
        };
      
      optionRight = {
          tooltip: {
            formatter: "{a} <br/>{c} {b}"
          },
          
          series: [
            {
              name: "开机率",
              type: "gauge",
              z: 3,
              min: 0,
              max: 100,
              splitNumber: 10,
              center: ["55%", "50%"], // 默认全局居中
              radius: "75%",
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  width: 10
                }
              },
              axisTick: {
                // 坐标轴小标记
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: "auto"
                }
              },
              splitLine: {
                // 分隔线
                length: 20, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  color: "auto"
                }
              },
              pointer:{
                length:'50%',
                width: 5,
              },
              axisLabel: {
                backgroundColor: "auto",
                borderRadius: 2,
                color: "#eee",
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: "#222"
              },
              title: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 20,
                color: "#fff",
                offsetCenter: [0, "20px"]
                // fontStyle: 'italic'
              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  value = `${value}%`;
                  return value;
                },
                fontWeight: "bolder",
                fontSize:'30px',
                borderRadius: 3,
                backgroundColor: "#444",
                borderColor: "#aaa",
                shadowBlur: 5,
                shadowColor: "#333",
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                borderWidth: 2,
                textBorderColor: "#000",
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: "#fff",
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
               
                color: "#eee",
                rich: {},
                offsetCenter: [0, "100px"]
              },
              
              data: [{ value: 40, name: "开机率" }]
            },
            {
              name: "完好率",
              type: "gauge",
              center: ["18%", "55%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              endAngle: 18,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {
                // 坐标轴小标记
                length: 12, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: "auto"
                }
              },
              splitLine: {
                // 分隔线
                length: 20, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  color: "auto"
                }
              },
              pointer: {
                width: 5
              },
              title: {
                fontWeight: "bolder",
                fontSize: 20,
                color: "#fff",
                offsetCenter: [0, "-30%"] // x, y，单位px
              },
              pointer:{
                length:'50%',
                width: 5,
              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                // fontSize:'40px',
                offsetCenter:[0,'60px'],
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  value = `${value}%`;
                  return value;
                }
              },
              data: [{ value: 1.5, name: "完好率" }]
            },
            {
              name: "一票通",
              type: "gauge",
              center: ["85%", "50%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 135,
              endAngle: 45,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {
                // 坐标轴小标记
                splitNumber: 5,
                length: 10, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: "auto"
                }
              },
              axisLabel: {
                formatter: function(v) {
                  switch (v + "") {
                    case "0":
                      return "E";
                    case "1":
                      return "Gas";
                    case "2":
                      return "F";
                  }
                }
              },
              splitLine: {
                // 分隔线
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  color: "auto"
                }
              },
              pointer: {
                width: 2,
                length:'74%'
              },
              title: {
                fontWeight: "bolder",
                fontSize: 16,
                color: "red",
                offsetCenter: [0, "-50px"]
              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: "12px",
                color: "#fff",
                offsetCenter: [0, "-30px"],
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  value = `${value}%`;
                  return value;
                }
              },
              data: [{ value: 100, name: "一票通" }]
            },
            {
              name: "一卡通",
              type: "gauge",
              center: ["85%", "50%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 315,
              endAngle: 225,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {
                // 坐标轴小标记
                show: false
              },
              axisLabel: {
                formatter: function(v) {
                  switch (v + "") {
                    case "0":
                      return "H";
                    case "1":
                      return "Water";
                    case "2":
                      return "C";
                  }
                }
              },
              splitLine: {
                // 分隔线
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  color: "auto"
                }
              },
              pointer: {
                width: 2
              },
              title: {
                fontWeight: "bolder",
                fontSize: 16,
                color: "red",
                offsetCenter: [0, "55px"]
              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: "12px",
                color: "#fff",
                offsetCenter: [0, "35px"],
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  value = `${value}%`;
                  return value;
                }
              },
              data: [{ value: 100, name: "一卡通" }]
            }
          ]
        };
      
      self.leftGau.setOption(optionLeft,true);
      self.RightGau.setOption(optionRight,true);
    }
  }
};
</script>

<style scoped>
.main {
  color: #ffffff;
  position: relative;
  width: 100%;
  height: 100%;
}
.main-id{
  width: 100%;
  height: 100%;
  position: relative;
}
.idea-top-left{
  flex: 1;
  display: inline-flex;
  width: 100%;
  height: 100%;
}
.idea-top-middle{
  flex: 3;
  display: inline-flex;
  width: 100%;
  height: 100%;
  margin: 0.5%;
}
.idea-top-right{
  flex: 1;
  display: inline-flex;
  width: 100%;
  height: 100%;
}
.main-idea{
  width: 100%;
  height: 100%;
  position: relative;
}
.idea-top{
  position: relative;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
}
.idea-bottom{
  position: relative;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  padding-top: 1%;
}
.idea-bottom-left{
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  flex: 1;
  padding-right: 0.5%;
}
.idea-bottom-right{
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  flex: 1;
  padding-left: 0.5%;
}
.top-middle-l{
  display: inline-flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-flow: column;
}
.top-middle-r{
  display: inline-flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-flow: column;
}
.top-middle-key{
  position: relative;
  width: 100%;
  height: 30%;
}
.top-middle-picture{
  position: relative;
  width: 550px;
  height: 300px;
  /* background: #ffffff; */
  margin: 0 auto;
}
.idea-ag{
  width: 100%;
  height: 90%;
  padding: 0 6% 0 10%;
}
.idea-tvm{
  width: 100%;
  height: 90%;
  padding: 0 10% 0 6%;
    
}
.sub-content{
  overflow: hidden;
};
.tvm-item,.ag-item{
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 12px;
}
.gaugeLeftClass{
  width: 550px;
  height: 300px;
}
.gaugeRightClass{
  width: 550px;
  height: 300px;
}
.contain-tvm,.contain-ag{
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 80%;
  margin-top: 16%;
}
.gaugeDateLeft{
  width:50%;
  height:70%;
  
  position: absolute;
  top:25%;
  left:21%;
  display: flex;
  flex-wrap: wrap;
  margin-top:10px;
  font-weight: 900;
}
.gaugeDateLabel{
  width:50%;
  height:50%;
  
}
.gaugeDateNum{
  color:yellow;
}
.gaugeDateTitle{
  position:absolute;
  width:21%;
  height:89%;
  /* border:solid 1px #fff; */
  top:3%;
  left:1%;
  text-align: center;
  font-weight: 900;
  font-size: 30px;
  padding-top: 35px;
}
.AG{
  margin-top: 50px;
  width: 97%;
  margin-left: 18px;
}
.TVM{
   margin-top: 50px;
  width: 97%;
    margin-left: 8px;
}
</style>
