
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
                  <div class='gaugeDateLabel'>总数：<span class='gaugeDateNum'>{{AGequipmenttotal}}</span></div>
                  <div class='gaugeDateLabel'>降级服务：<span class='gaugeDateNum'>{{AGdowngradeserver}}</span></div>
                  <div class='gaugeDateLabel'>正常服务：<span class='gaugeDateNum'>{{AGnormalsever}}</span></div>
                  <div class='gaugeDateLabel'>失效服务：<span class='gaugeDateNum'>{{AGinvalidsever}}</span></div>

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
                  <div class='gaugeDateLabel'>总数：<span class='gaugeDateNum'>{{TVMequipmenttotal}}</span></div>
                  <div class='gaugeDateLabel'>降级服务：<span class='gaugeDateNum'>{{TVMdowngradeserver}}</span></div>
                  <div class='gaugeDateLabel'>正常服务：<span class='gaugeDateNum'>{{TVMnormalsever}}</span></div>
                  <div class='gaugeDateLabel'>失效服务：<span class='gaugeDateNum'>{{TVMinvalidsever}}</span></div>
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
                   <a-table :columns="columnsAg" :dataSource="dataAg.slice((currentPageAg-1)*pagesizeAg,currentPageAg*pagesizeAg)" size="small" :pagination="false"/>
                </div>
              </div>
            </div>
          </div>
          <div class="idea-bottom-right">
            <div class="left-sub">
              <img src="../../../assets/img/idea-border-br.png" alt="" class="sub-bg">
              <div class="sub-content">
                <div class="borde flipInX">TVM服务状态统计</div>
                <!-- Tvm -->
                <div class="TVM">
                  <a-table :columns="columnsTvm" :dataSource="dataTvm.slice((currentPageTvm-1)*pagesizeTvm,currentPageTvm*pagesizeTvm)" size="small" :pagination="false" />
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
import Cookies from 'js-cookie';

// import func from '../../../../vue-temp/vue-editor-bridge';
  const columnsAg = [
    {
      title: '车站名称',
      dataIndex: 'name',
    },
    {
      title: '设备总数',
      dataIndex: 'total',
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
      dataIndex: 'total',
    },
    {
      title: '正常服务/单模式',
      dataIndex: 'sub',
    },
     {
      title: '正常服务/双模式',
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
      title: '认证失败/智慧通',
      dataIndex: 'ie',
    },
  {
      title: '认证失败/一票通',
      dataIndex: 'once',
    },
  ];
export default {
  name: "MC16",
  data() {
    return {
      agList:[],
      tvmList:[],

      dataRef:'',
      timerTvm:'',
      timerAg:'',

      leftGau:'',
      RightGau:'',
      dataAg:[],
      dataTvm:[],

      columnsTvm,
      columnsAg,
      AGequipmenttotal:'', //AG总数
      AGinvalidsever:'',  //AG失效服务
      AGnormalsever:'',   //AG正常服务
      AGdowngradeserver:'', //AG降级服务
      TVMequipmenttotal:'', //AG总数
      TVMinvalidsever:'',  //AG失效服务
      TVMnormalsever:'',   //AG正常服务
      TVMdowngradeserver:'', //AG降级服务

      currentPageAg:1,
      pagesizeAg:10,

      currentPageTvm:1,
      pagesizeTvm:10,
      dataRef:'',

      userId:Cookies.get("dvptId"),
      customToken:Cookies.get("dvptToken"),
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
   destroyed: function() {
    //页面销毁时关闭
    window.clearInterval(this.dataRef);

    this.websocketclose();
  },
  mounted() {
    let self = this;
    // 初始化障碍信息
    this.initGetActionInfo();
    // 初始化仪表盘
    this.getGau();
    // 指标统计
    this.getTotal();
    // 初始化统计表格AG
    this.initTableDisplayAg();
    // 初始化统计表格TVM
    this.initTableDisplayTvm();

    window.clearInterval(this.dataRef)

    $(".idea-ag").stop();
    $(".idea-tvm").stop();

    var timeStamp=1573056120000;  //11月6日凌晨d点02分的毫秒数
    var dayMins = 900000;   //15分钟
    var setIntervalMins = 1000*30  //30秒
    self.dataRef = setInterval(()=>{
      // console.log(new Date())
      let currwntTime = Date.now();
      let minsMore = (currwntTime-timeStamp)%dayMins
      if(minsMore>0 && minsMore<=setIntervalMins){  //(当前时间-固定时间)对每日毫秒数 取余
        // console.log("15分钟定点刷新")

        // 初始化仪表盘
        self.getGau();
        // 指标统计
        self.getTotal();
        // 初始化统计表格AG
        self.initTableDisplayAg();
        // 初始化统计表格TVM
        self.initTableDisplayTvm();

      }
    },setIntervalMins)


   //页面刚进入时开启长连接
    if ('WebSocket' in window) {
      this.initWebSocket();
    } else {
       this.$info({
          title: '提示',
          content: '当前界面不支持websocket的使用',
        });
    }
  },
  created() {
  },
  methods: {
// 初始化websocket连接数据
    initWebSocket:function(){
      const wsuri = this.$http.websocketService+this.userId+"/"+this.customToken;//ws地址
      console.log(wsuri);
      this.websocket = new WebSocket(wsuri);
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) { 
      //错误
      console.log("WebSocket连接发生错误:");
      console.log(e);

    },
    websocketonmessage(e){ //数据接收
      console.log("WebSocket连接数据接收中:");
      if(e.data){
        // 捕捉异常
        try{
          const redata = JSON.parse(e.data);
          this.showData(redata.data)
        }catch(e){
          console.log(e);
        }
      }
    },
    websocketsend(agentData){
      //数据发送
      // console.log("WebSocket数据发送消息中:");
      this.websocket.send(agentData);
    },
    websocketclose(e){  
      //关闭
      this.websocket.close();
    },
    showData(redata){
        let self = this;
        console.log(redata);
        if(redata.type==="1" && redata.name==="AG"){
          this.tvmList.push({
            data:redata.msg
          });
        }else if(redata.type==="2" && redata.name==='TVM'){
          this.agList.push({
            data:redata.msg
          }); 
        }
    },
    // 初始化障碍信息
    initGetActionInfo:function(){
      this.actionInfoTvm();//Tvm
      this.actionInfoAg();///ag
    },
    // 初始化统计表格Ag
    initTableDisplayAg:function(){
      let self = this;
      self.initTableAg(function(data){
        self.tableDisplayAg(data);
      })
    },

    initTableAg:function(callback){
        let self = this;
        let param={
          };
        this.$http.get(self.$api.getAgServerDate, param).then(res =>{
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              callback(res.data.data)
            }else{
              console.log(res.data.msg);
            }
          }
        });
      
    },
    tableDisplayAg:function(data){
      let arr = JSON.parse(JSON.stringify(data));
      let self = this;
      self.dataAg =[];
      arr.map((item,index)=>{
        self.dataAg.push({
          key: (index).toString(),
          name:item.stationName,
          total:item.equipmentTotal,
          formal:item.normalSever,
          down:item.downgradeServer,
          dismiss:item.invalidSever,           
        });
      });
    },
  // 初始化统计表格Tvm
    initTableDisplayTvm:function(){
      let self = this;
      self.initTableTvm(function(data){
        self.tableDisplayTvm(data);
      })
    },
    initTableTvm:function(callback){
      let self = this;
      let param={
        };
      this.$http.get(self.$api.getTvmServerDate, param).then(res =>{
        //调取数据成功
        if(res.data){
          if (res.data.code === "0") {
            callback(res.data.data)
          }else{
            console.log(res.data.msg);
          }
        }
      });
      
    },
    tableDisplayTvm:function(data){
      let arr = JSON.parse(JSON.stringify(data));
      let self = this;
      self.dataTvm =[];
      arr.map((item,index)=>{
        self.dataTvm.push({
          key: (index).toString(),
          name:item.stationName,
          total:item.equipmentTotal,
          down:item.normalSeverSingle,
          sub:item.normalSeverSingle,
          double:item.downgradeServer,
          dismiss:item.invalidSever,           
          ie:item.authInvalidIntelligent,     
          once:item.authInvalidTicket,           

        });
      });
    },
    // // 故障信息滚动效果
    scrollListTvm:function(obj) {

      var scrollHeight = $(".idea-tvm .tvm:first").height();
      if(this.tvmList.length>6){
         $(".idea-tvm").stop().animate({marginTop:-scrollHeight},600,function () {
        $(".idea-tvm").css({marginTop:0}).find(".tvm:first").appendTo($(".idea-tvm"));
        });
      }
     
    },
   scrollListAg:function(obj) {
      var scrollHeight = $(".idea-ag .ag:first").height();
      if(this.agList.length>6){
          $(".idea-ag").stop().animate({marginTop:-scrollHeight},600,function () {
          $(".idea-ag").css({marginTop:0}).find(".ag:first").appendTo($(".idea-ag"));
          });
      }
   
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
     getTotal(){
      let self = this;
        let param={};
        //AG服务数
      self.$http.get(self.$api.getAgServerDateTotal, param).then(res =>{
          if(res.data){
            if (res.data.code === "0") {
              self.AGequipmenttotal = res.data.data[0].equipmenttotal;
              self.AGdowngradeserver = res.data.data[0].downgradeserver;
              self.AGnormalsever = res.data.data[0].normalsever;
              self.AGinvalidsever = res.data.data[0].invalidsever;
            }else{
              this.$message.error(res.data.msg);
            }
          }
        });
        //TVM服务数
      self.$http.get(self.$api.getTvmServerDateTotal, param).then(res =>{
          if(res.data){
            if (res.data.code === "0") {
              self.TVMequipmenttotal = res.data.data[0].equipmenttotal;
              self.TVMdowngradeserver = res.data.data[0].downgradeserver;
              self.TVMnormalsever = res.data.data[0].normalsever;
              self.TVMinvalidsever = res.data.data[0].invalidsever;
            }else{
              this.$message.error(res.data.msg);
            }
          }
        });
    },
   getGau(){
       let self = this;
       //AG仪表盘
      self.$http.get(`${self.$api.getServerRateDate}1`).then(res =>{
          if(res.data){
            if (res.data.code === "0") {
              // console.log(res.data.data)
              self.drawLineGaugeAG(res.data.data)
            }else{
              this.$message.error(res.data.msg);
            }
          }
        });
        //TVM仪表盘
      self.$http.get(`${self.$api.getServerRateDate}2`).then(res =>{
          if(res.data){
            if (res.data.code === "0") {
              // console.log(res.data.data)
              self.drawLineGaugeTVM(res.data.data)
            }else{
              this.$message.error(res.data.msg);
            }
          }
        });
     },
    drawLineGaugeAG(params){
      let self = this;
      let optionLeft = null;
      
      let objLeft = document.getElementById('gaugeLeft');
      
      self.leftGau = self.$echarts.init(objLeft);
      
      optionLeft = {
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
              center: ["50%", "50.8%"], // 默认全局居中
              radius: "75%",
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [ [0.29, '#5dff5d'],//表盘最大值的20%部分刻度显示的颜色 
                  [0.86, '#1e90ff'],//表盘最大值的20%到80%部分刻度显示的颜色 
                  [1, '#ff4500'],//表盘最大值的80%到100%部分刻度显示的颜色 
                  ], 
                  width: 8, shadowColor: '#fff', shadowBlur: 6

                }
              },
              axisTick: {
                // 坐标轴小标记
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: "auto",
                  shadowColor: '#fff', //默认透明
                            shadowBlur: 6
                }
              },
             splitLine: {
                // 分隔线
                length: 20, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 3, color: '#fff', 
                  shadowColor: '#fff', //默认透明 
                  shadowBlur: 6
                }
              },
              pointer:{
                shadowColor: '#fff', //默认透明
                        shadowBlur: 15,
                length:'50%',
                width: 5,
              },
               axisLabel: {

                textStyle: { //控制刻度文本样式
                            fontWeight: 'bolder',//刻度加粗
                            color: '#fff',//刻度颜色
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 6
                        },

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
                offsetCenter: [0, "20px"],
                // fontStyle: 'italic'

                textStyle: { fontWeight: 'bolder', fontSize: 20, fontStyle: 'italic', color: '#fff', shadowColor: '#fff', //默认透明 
                shadowBlur: 6 }


              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  if(Number(value)==100){
                    return `${Number(value)}%`;
                  }else{
                    return `${Number(value).toFixed(1)}%`;
                  }
                },
                backgroundColor: 'rgba(30,144,255,0.8)', 
                borderColor: '#fff', 
                shadowColor: '#fff', //默认透明 
                textStyle: { fontWeight: 'bolder', color: '#fff', fontSize:24 },
                fontWeight: "bolder",
                fontSize:'30px',
                borderRadius: 3,
                shadowBlur: 5,
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
              center: ["20%", "51%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 235,
              endAngle: 45,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [ [0.29, '#5dff5d'],//表盘最大值的20%部分刻度显示的颜色 
                  [0.86, '#1e90ff'],//表盘最大值的20%到80%部分刻度显示的颜色 
                  [1, '#ff4500'],//表盘最大值的80%到100%部分刻度显示的颜色 
                  ], 
                  width: 3, shadowColor: '#fff', shadowBlur: 2

                }
              },
              axisTick: {// 坐标轴小标记
                length: 12, // 属性length控制线长
                lineStyle: {// 属性lineStyle控制线条样式
                  color: "auto",
                  shadowColor: '#fff', //默认透明
                            shadowBlur: 2
                }
              },
              splitLine: {
                // 分隔线
                length: 20, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 3, color: '#fff', 
                  shadowColor: '#fff', //默认透明 
                  shadowBlur: 2
                }
              },
              pointer:{
                shadowColor: '#fff', //默认透明
                        shadowBlur: 2,
                length:'50%',
                width: 5,
              },
                 title: {
                fontWeight: "bolder",
                fontSize: 20,
                color: "#fff",
                offsetCenter: [0, "20px"],
                // fontStyle: 'italic'

                textStyle: { fontWeight: 'bolder', fontSize: 20, fontStyle: 'italic', color: '#fff', shadowColor: '#fff', //默认透明 
                shadowBlur: 2 }


              },
              pointer:{
                length:'50%',
                width: 5,
              },
              detail: {

              backgroundColor: 'rgba(30,144,255,0.8)', 
                borderColor: '#fff', 
                shadowColor: '#fff', //默认透明 
                textStyle: { fontWeight: 'bolder', color: '#fff', fontSize:24 },
                fontWeight: "bolder",
                fontSize:'30px',
                borderRadius: 3,
                shadowBlur: 3,
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
                offsetCenter: [0, "100px"],
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  if(Number(value)==100){
                    return `${Number(value)}%`;
                  }else{
                    return `${Number(value).toFixed(1)}%`;
                  }
                }
              },
              data: [{ value: 1.5, name: "完好率" }]
            },
            {
              name: "连接状态",
             type: "gauge",
              center: ["80%", "50%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 135,
              endAngle: 45,
              splitNumber: 4,
              axisLine: {// 坐标轴线
                lineStyle: { color: [ [0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500'] ], width: 2, shadowColor: '#fff', shadowBlur: 2 }

              },
              axisTick: {// 坐标轴小标记
                splitNumber: 5,
                length: 10, // 属性length控制线长
                lineStyle: {// 属性lineStyle控制线条样式
                  color: "auto"
                }
              },
              axisLabel: {
                textStyle: { fontWeight: 'bolder', color: '#fff', shadowColor: '#fff', shadowBlur: 2 },

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
                  width: 3, color: '#fff', shadowColor: '#fff', shadowBlur: 2
                }
              },
               pointer: {
                width: 2,
                length:'74%',
                shadowColor: '#fff', 
                        shadowBlur: 2
              },
              title: {
                fontWeight: "bolder",
                fontSize: 16,
                color: "#fff",
                offsetCenter: [0, "-50px"]
              },
              detail: {
                fontWeight: "bolder",
                fontSize: "12px",
                color: "#fff",
                offsetCenter: [0, "-30px"],
                formatter: function(value) {
                  if(Number(value)==100){
                    return `${Number(value)}%`;
                  }else{
                    return `${Number(value).toFixed(1)}%`;
                  }
                }
              },
              data: [{ value: 100, name: "连接状态" }]
            },
            {
              name: "时钟正常",
              type: "gauge",
              center: ["80%", "50%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 315,
              endAngle: 225,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  color: [ [0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500'] ], width: 2, shadowColor: '#fff', shadowBlur: 2
                }
              },
                axisTick: {
                // 坐标轴小标记
                show: false
              },
              axisLabel: {
                textStyle: { fontWeight: 'bolder', color: '#fff', shadowColor: '#fff', shadowBlur: 2 },

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
               lineStyle: { width: 3, 
               color: '#fff', 
               shadowColor: '#fff', 
               shadowBlur: 2 }
              },
              pointer: {
                width: 2,
                shadowColor: '#fff', 
                shadowBlur: 2
              },
              title: {
                fontWeight: "bolder",
                fontSize: 16,
                color: "#fff",
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
                  if(Number(value)==100){
                    return `${Number(value)}%`;
                  }else{
                    return `${Number(value).toFixed(1)}%`;
                  }
                }
              },
              data: [{ value: 100, name: "时钟正常" }]
            }
          ]
        };
      
      
      // console.log(params)
      optionLeft.series[0].data[0].value=params.powerOnRate;
      optionLeft.series[1].data[0].value=params.intactRate;
      optionLeft.series[2].data[0].value=params.linkStatus;
      optionLeft.series[3].data[0].value=params.ntpStatus;

      self.leftGau.setOption(optionLeft,true);
      
      
    },
    drawLineGaugeTVM(params){
      let self = this;
      let optionRight = null;
      let objRight = document.getElementById('gaugeRight');
      self.RightGau = self.$echarts.init(objRight);
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
              center: ["50%", "50.8%"], // 默认全局居中
              radius: "75%",
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [ [0.29, '#5dff5d'],//表盘最大值的20%部分刻度显示的颜色 
                  [0.86, '#1e90ff'],//表盘最大值的20%到80%部分刻度显示的颜色 
                  [1, '#ff4500'],//表盘最大值的80%到100%部分刻度显示的颜色 
                  ], 
                  width: 8, shadowColor: '#fff', shadowBlur: 6

                }
              },
              axisTick: {
                // 坐标轴小标记
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: "auto",
                  shadowColor: '#fff', //默认透明
                            shadowBlur: 6
                }
              },
             splitLine: {
                // 分隔线
                length: 20, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 3, color: '#fff', 
                  shadowColor: '#fff', //默认透明 
                  shadowBlur: 6
                }
              },
              pointer:{
                shadowColor: '#fff', //默认透明
                        shadowBlur: 15,
                length:'50%',
                width: 5,
              },
               axisLabel: {

                textStyle: { //控制刻度文本样式
                            fontWeight: 'bolder',//刻度加粗
                            color: '#fff',//刻度颜色
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 6
                        },

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
                offsetCenter: [0, "20px"],
                // fontStyle: 'italic'

                textStyle: { fontWeight: 'bolder', fontSize: 20, fontStyle: 'italic', color: '#fff', shadowColor: '#fff', //默认透明 
                shadowBlur: 6 }


              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  if(Number(value)==100){
                    return `${Number(value)}%`;
                  }else{
                    return `${Number(value).toFixed(1)}%`;
                  }
                },
                backgroundColor: 'rgba(30,144,255,0.8)', 
                borderColor: '#fff', 
                shadowColor: '#fff', //默认透明 
                textStyle: { fontWeight: 'bolder', color: '#fff', fontSize:24 },
                fontWeight: "bolder",
                fontSize:'30px',
                borderRadius: 3,
                shadowBlur: 5,
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
              center: ["20%", "51%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 235,
              endAngle: 45,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [ [0.29, '#5dff5d'],//表盘最大值的20%部分刻度显示的颜色 
                  [0.86, '#1e90ff'],//表盘最大值的20%到80%部分刻度显示的颜色 
                  [1, '#ff4500'],//表盘最大值的80%到100%部分刻度显示的颜色 
                  ], 
                  width: 3, shadowColor: '#fff', shadowBlur: 2

                }
              },
              axisTick: {// 坐标轴小标记
                length: 12, // 属性length控制线长
                lineStyle: {// 属性lineStyle控制线条样式
                  color: "auto",
                  shadowColor: '#fff', //默认透明
                            shadowBlur: 2
                }
              },
              splitLine: {
                // 分隔线
                length: 20, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 3, color: '#fff', 
                  shadowColor: '#fff', //默认透明 
                  shadowBlur: 2
                }
              },
              pointer:{
                shadowColor: '#fff', //默认透明
                        shadowBlur: 2,
                length:'50%',
                width: 5,
              },
                 title: {
                fontWeight: "bolder",
                fontSize: 20,
                color: "#fff",
                offsetCenter: [0, "20px"],
                // fontStyle: 'italic'

                textStyle: { fontWeight: 'bolder', fontSize: 20, fontStyle: 'italic', color: '#fff', shadowColor: '#fff', //默认透明 
                shadowBlur: 2 }


              },
              pointer:{
                length:'50%',
                width: 5,
              },
              detail: {

              backgroundColor: 'rgba(30,144,255,0.8)', 
                borderColor: '#fff', 
                shadowColor: '#fff', //默认透明 
                textStyle: { fontWeight: 'bolder', color: '#fff', fontSize:24 },
                fontWeight: "bolder",
                fontSize:'30px',
                borderRadius: 3,
                shadowBlur: 3,
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
                offsetCenter: [0, "100px"],
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function(value) {
                  if(Number(value)==100){
                    return `${Number(value)}%`;
                  }else{
                    return `${Number(value).toFixed(1)}%`;
                  }
                }
              },
              data: [{ value: 1.5, name: "完好率" }]
            },
            {
              name: "连接状态",
             type: "gauge",
              center: ["80%", "50%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 135,
              endAngle: 45,
              splitNumber: 4,
              axisLine: {// 坐标轴线
                lineStyle: { color: [ [0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500'] ], width: 2, shadowColor: '#fff', shadowBlur: 2 }

              },
              axisTick: {// 坐标轴小标记
                splitNumber: 5,
                length: 10, // 属性length控制线长
                lineStyle: {// 属性lineStyle控制线条样式
                  color: "auto"
                }
              },
              axisLabel: {
                textStyle: { fontWeight: 'bolder', color: '#fff', shadowColor: '#fff', shadowBlur: 2 },

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
                  width: 3, color: '#fff', shadowColor: '#fff', shadowBlur: 2
                }
              },
               pointer: {
                width: 2,
                length:'74%',
                shadowColor: '#fff', 
                        shadowBlur: 2
              },
              title: {
                fontWeight: "bolder",
                fontSize: 16,
                color: "#fff",
                offsetCenter: [0, "-50px"]
              },
              detail: {
                fontWeight: "bolder",
                fontSize: "12px",
                color: "#fff",
                offsetCenter: [0, "-30px"],
                formatter: function(value) {
                  if(Number(value)==100){
                    return `${Number(value)}%`;
                  }else{
                    return `${Number(value).toFixed(1)}%`;
                  }
                }
              },
              data: [{ value: 100, name: "智慧通" }]
            },
            {
              name: "时钟正常",
              type: "gauge",
              center: ["80%", "50%"], // 默认全局居中
              radius: "60%",
              min: 0,
              max: 100,
              startAngle: 315,
              endAngle: 225,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  color: [ [0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500'] ], width: 2, shadowColor: '#fff', shadowBlur: 2
                }
              },
                axisTick: {
                // 坐标轴小标记
                show: false
              },
              axisLabel: {
                textStyle: { fontWeight: 'bolder', color: '#fff', shadowColor: '#fff', shadowBlur: 2 },

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
               lineStyle: { width: 3, 
               color: '#fff', 
               shadowColor: '#fff', 
               shadowBlur: 2 }
              },
              pointer: {
                width: 2,
                shadowColor: '#fff', 
                shadowBlur: 2
              },
              title: {
                fontWeight: "bolder",
                fontSize: 16,
                color: "#fff",
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
                  if(Number(value)==100){
                    return `${Number(value)}%`;
                  }else{
                    return `${Number(value).toFixed(1)}%`;
                  }
                }
              },
              data: [{ value: 100, name: "一票通" }]
            }
          ]
        };
          
      optionRight.series[0].data[0].value=params.powerOnRate;
      optionRight.series[1].data[0].value=params.intactRate;
      optionRight.series[2].data[0].value=params.intelligentPass;
      optionRight.series[3].data[0].value=params.ticketPass;
      self.RightGau.setOption(optionRight,true);
    }, 
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
  width:70%;
  height:70%;
  
  position: absolute;
  top:25%;
  left:23%;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  margin-top:10px;
  font-weight: 900;
  margin-left: 36px;
}
.gaugeDateLabel{
  width:50%;
  height:50%;
  font-size: 18px;
  
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
.tvm,.ag{
  height: 50px;
   /* margin-bottom: 12px; */
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
  @keyframes flipInX {
    from {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }
  
    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      animation-timing-function: ease-in;
    }
  
    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }
  
    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
  
    to {
      transform: perspective(400px);
    }
  }
  
  .flipInX {
    backface-visibility: visible !important;
    animation-name: flipInX;
  }
</style>
