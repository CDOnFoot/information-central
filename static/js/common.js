// 20191014
var common = {
  a:1,
  imToken: function () {
    return sessionStorage.getItem('imToken');
  },

  pin:function(){
    return sessionStorage.getItem('pin');
  },

  keysort:function (key,desc) {
    return function(a,b){
      return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
  },
  setAccount:function(account){
    sessionStorage.setItem('accountInfo',account)
  },
  getAccount:function () {
    return sessionStorage.getItem('accountInfo');
  },

  // 设置cookie 后台传入过期时间
  setCookie: function(c_name,value,expirem){
    var exdate = new Date(expirem);
    exdate.setTime(exdate.getTime());
    document.cookie= c_name + "=" + escape(value)+((expirem==null) ? "" : ";expires="+exdate.toGMTString());
  },

  // setCookie: function(c_name,value,expiremMinutes){
  //   var exdate = new Date();
  //   exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
  //   document.cookie= c_name + "=" + escape(value)+((expiremMinutes==null) ? "" : ";expires="+exdate.toGMTString());
  // },
// 读取cookie
  getCookie: function(c_name){
    if (document.cookie.length>0)
    {
      var c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1)
      {
        c_start=c_start + c_name.length+1;
        var c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1)
          c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  },

// 删除cookie
  delCookie: function(c_name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(c_name);
    if(cval!=null){
      document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  },
  timestampToTime:function (timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '年';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    var D = date.getDate() < 10 ? '0' + (date.getDate() ) + '日 ': date.getDate()+ '日 ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes()+ ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds(): date.getSeconds();
    return Y + M + D + h + m +s;
  },
  btnList:[
    {title:'添加'},
    {title:'替换'},
    {title:'移除'},
  ],
  menuList:[
    {
      title:'首页',
      key:'index',
      id:'CD01'
    },
    {
      title:'客流分析',
      key:'passenger',
      id:'CD02'
    },
    {
      title:'能耗分析',
      key:'energy',
      id:'CD03',
    },
    {
      title:'线路概况',
      key:'rail',
      id:'CD04',
    }
  ],
 
  //菜单list
  cdList:[
    {
      title:'首页',
      key:'index',
      id:'CD01',
    },
    {
      title:'客流分析',
      key:'passenger',
      id:'CD02',
    },
    {
      title:'能耗分析',
      key:'energy',
      id:'CD03',
    },
    {
      title:'线路概况',
      key:'rail',
      id:'CD04',
    }

  ],
  runList:[
    {
      runId: "XC01",
      dotId: "CZ012",
      dotName: "苏-小",
      dot: ["18.5%", "30.5%"]
    },
    {
      runId: "XC02",
      dotId: "CZ029",
      dotName: "朱家村站",
      dot: ["43%", "58%"]
    },
  ],
  visualList:[{
      mb:{
      templateName:'模版一',
      templateNum:'MB01',
      mk:[{mc:'',moduleName:'模块一',moduleNum:'MK01'},{mc:'',moduleName:'模块二',moduleNum:'MK02'},{mc:'',moduleName:'模块三',moduleNum:'MK03'},
      {mc:'',moduleName:'模块四',moduleNum:'MK04'},{mc:'',moduleName:'模块五',moduleNum:'MK05'},{mc:'',moduleName:'模块六',moduleNum:'MK06'},
      {mc:'',moduleName:'模块七',moduleNum:'MK07'}]}
    },
    {
      mb:{
      templateName:'模版二',
      templateNum:'MB02',
      mk:[{mc:'',moduleName:'模块一',moduleNum:'MK01'},{mc:'',moduleName:'模块二',moduleNum:'MK02'},{mc:'',moduleName:'模块三',moduleNum:'MK03'},
      {mc:'',moduleName:'模块四',moduleNum:'MK04'},{mc:'',moduleName:'模块五',moduleNum:'MK05'},{mc:'',moduleName:'模块六',moduleNum:'MK06'},
      {mc:'',moduleName:'模块七',moduleNum:'MK07'},{mc:'',moduleName:'模块八',moduleNum:'MK08'}]}
    },
  
  ],
  // 关键指标配置信息
  keyVisualList:[
    {templateNum:'MB01',templateName:'模版一',keyTemp:'MK04',keyIndex:'3'},
    {templateNum:'MB02',templateName:'模版二',keyTemp:'MK04',keyIndex:'3'},

  ],
  // 行车路线运行图 各点定位位置
  wayList: [
    {
      dotId: "CZ01",
      title: "金川路站",
      dot: ["3%", "14%"]
    },
    {
      dotId: "CZ02",
      title: "金-大",
      dot: ["5.5%", "14.5%"]
    },
    {
      dotId: "CZ03",
      title: "大河埂站",
      dot: ["7%", "13.5%"]
    },
    {
      dotId: "CZ04",
      title: "大-海",
      dot: ["10%", "13.5%"]
    },
    {
      dotId: "CZ05",
      title: "海屯路站",
      dot: ["13.5%", "16.5%"]
    },
    {
      dotId: "CZ06",
      title: "海-小",
      dot: ["14%", "19%"]
    },
    {
      dotId: "CZ07",
      title: "小屯站",
      dot: ["16%", "21%"]
    },
    {
      dotId: "CZ08",
      title: "小-金",
      dot: ["16%", "23%"]
    },
    {
      dotId: "CZ09",
      title: "金鼎山北路站",
      dot: ["18.5%", "24.5%"]
    },
    {
      dotId: "CZ010",
      title: "金-苏",
      dot: ["18%", "26.3%"]
    },
    {
      dotId: "CZ011",
      title: "苏家塘站",
      dot: ["19%", "27.8%"]
    },
    {
      dotId: "CZ012",
      title: "苏-小",
      dot: ["18.5%", "30.5%"]
    },
    {
      dotId: "CZ013",
      title: "小菜园站",
      dot: ["19.8%", "33%"]
    },
    {
      dotId: "CZ014",
      title: "小-火",
      dot: ["20%", "35%"]
    },
    {
      dotId: "CZ015",
      title: "火车北站",
      dot: ["21.3%", "37.2%"]
    },
    {
      dotId: "CZ016",
      title: "火-白",
      dot: ["22%", "39.5%"]
    },
    {
      dotId: "CZ017",
      title: "白龙路站",
      dot: ["24%", "41.5%"]
    },
    {
      dotId: "CZ018",
      title: "白-大",
      dot: ["25.4%", "42.5%"]
    },
    {
      dotId: "CZ019",
      title: "大树营站",
      dot: ["27.6%", "42.5%"]
    },
    {
      dotId: "CZ020",
      title: "大-菊",
      dot: ["29%", "43.5%"]
    },
    {
      dotId: "CZ021",
      title: "菊花村站",
      dot: ["30.5%", "44%"]
    },
    {
      dotId: "CZ022",
      title: "菊-华",
      dot: ["31.8%", "45.5%"]
    },
    {
      dotId: "CZ023",
      title: "菊华站",
      dot: ["33%", "46.5%"]
    },
    {
      dotId: "CZ024",
      title: "菊-和",
      dot: ["35%", "48.5%"]
    },
    {
      dotId: "CZ025",
      title: "和甸营站",
      dot: ["36.2%", "51%"]
    },
    {
      dotId: "CZ026",
      title: "和-牛",
      dot: ["38.5%", "55%"]
    },
    {
      dotId: "CZ027",
      title: "牛街庄站",
      dot: ["40%", "58%"]
    },
    {
      dotId: "CZ028",
      title: "牛-朱",
      dot: ["41.6%", "59%"]
    },
    {
      dotId: "CZ029",
      title: "朱家村站",
      dot: ["43%", "58%"]
    },
    {
      dotId: "CZ030",
      title: "朱-羊",
      dot: ["46%", "58.5%"]
    },
    {
      dotId: "CZ031",
      title: "羊甫头站",
      dot: ["48.8%", "59.5%"]
    },
    {
      dotId: "CZ032",
      title: "羊-玉",
      dot: ["50.8%", "59.8%"]
    },
    {
      dotId: "CZ033",
      title: "玉缘路站",
      dot: ["52.8%", "58.8%"]
    },
    {
      dotId: "CZ034",
      title: "玉-广",
      dot: ["55.8%", "57.8%"]
    },
    {
      dotId: "CZ035",
      title: "广卫站",
      dot: ["59.8%", "58.3%"]
    },
    {
      dotId: "CZ036",
      title: "广-塔",
      dot: ["61.4%", "59.8%"]
    },
    {
      dotId: "CZ037",
      title: "塔密站",
      dot: ["63.4%", "59.3%"]
    },
    {
      dotId: "CZ038",
      title: "塔-斗",
      dot: ["68.4%", "60.8%"]
    },
    {
      dotId: "CZ039",
      title: "斗南站",
      dot: ["74.4%", "60.8%"]
    },
    {
      dotId: "CZ040",
      title: "斗-金",
      dot: ["75.8%", "61.8%"]
    },
    {
      dotId: "CZ041",
      title: "金桂街站",
      dot: ["75.8%", "59.8%"]
    },
    {
      dotId: "CZ042",
      title: "金-梅",
      dot: ["78.3%", "59.2%"]
    },
    {
      dotId: "CZ043",
      title: "梅子村站",
      dot: ["81.2%", "59.6%"]
    },
    {
      dotId: "CZ044",
      title: "梅-古",
      dot: ["82.6%", "61%"]
    },
    {
      dotId: "CZ045",
      title: "古城站",
      dot: ["84%", "61.5%"]
    },
    {
      dotId: "CZ046",
      title: "古-可",
      dot: ["85.6%", "63%"]
    },
    {
      dotId: "CZ047",
      title: "可乐村站",
      dot: ["87.6%", "63%"]
    },
    {
      dotId: "CZ048",
      title: "可-祥",
      dot: ["90%", "64.4%"]
    },
    {
      dotId: "CZ049",
      title: "祥丰街站",
      dot: ["93.4%", "64.3%"]
    },
    {
      dotId: "CZ050",
      title: "祥-牛",
      dot: ["95%", "68.3%"]
    },
    {
      dotId: "CZ051",
      title: "牛头山站",
      dot: ["95%", "72%"]
    },
    {
      dotId: "CZ052",
      title: "牛-联",
      dot: ["94.2%", "75%"]
    },
    {
      dotId: "CZ053",
      title: "联大街站",
      dot: ["93.8%", "77.4%"]
    },
    {
      dotId: "CZ054",
      title: "联-吴",
      dot: ["92%", "80%"]
    },
    {
      dotId: "CZ055",
      title: "吴家营站",
      dot: ["91.6%", "82.6%"]
    },
    {
      dotId: "CZ056",
      title: "吴-火",
      dot: ["89.2%", "84.6%"]
    },
    {
      dotId: "CZ057",
      title: "火车南站",
      dot: ["89.6%", "87.6%"]
    },

    {
      dotId: "CZ01",
      title: "金川路站",
      dot: ["4%", "17%"]
    },
    {
      dotId: "CZ02",
      title: "金-大",
      dot: ["6.2%", "16.5%"]
    },
    {
      dotId: "CZ03",
      title: "大河埂站",
      dot: ["8%", "16.5%"]
    },
    {
      dotId: "CZ04",
      title: "大-海",
      dot: ["10%", "15.5%"]
    },
    {
      dotId: "CZ05",
      title: "海屯路站",
      dot: ["11%", "18.5%"]
    },
    {
      dotId: "CZ06",
      title: "海-小",
      dot: ["13%", "20%"]
    },
    {
      dotId: "CZ07",
      title: "小屯站",
      dot: ["13%", "22.5%"]
    },
    {
      dotId: "CZ08",
      title: "小-金",
      dot: ["15%", "23.8%"]
    },
    {
      dotId: "CZ09",
      title: "金鼎山北路站",
      dot: ["15.5%", "25.5%"]
    },
    {
      dotId: "CZ010",
      title: "金-苏",
      dot: ["16.4%", "26.8%"]
    },
    {
      dotId: "CZ011",
      title: "苏家塘站",
      dot: ["16%", "28.3%"]
    },
    {
      dotId: "CZ012",
      title: "苏-小",
      dot: ["16.5%", "31%"]
    },
    {
      dotId: "CZ013",
      title: "小菜园站",
      dot: ["17%", "34%"]
    },
    {
      dotId: "CZ014",
      title: "小-火",
      dot: ["18.6%", "36%"]
    },
    {
      dotId: "CZ015",
      title: "火车北站",
      dot: ["19%", "38.2%"]
    },
    {
      dotId: "CZ016",
      title: "火-白",
      dot: ["20.4%", "40.5%"]
    },
    {
      dotId: "CZ017",
      title: "白龙路站",
      dot: ["21.8%", "43.8%"]
    },
    {
      dotId: "CZ018",
      title: "白-大",
      dot: ["24.4%", "44.5%"]
    },
    {
      dotId: "CZ019",
      title: "大树营站",
      dot: ["26.6%", "45.5%"]
    },
    {
      dotId: "CZ020",
      title: "大-菊",
      dot: ["28%", "46%"]
    },
    {
      dotId: "CZ021",
      title: "菊花村站",
      dot: ["28.8%", "47%"]
    },
    {
      dotId: "CZ022",
      title: "菊-华",
      dot: ["30%", "47.5%"]
    },
    {
      dotId: "CZ023",
      title: "菊华站",
      dot: ["31%", "48.5%"]
    },
    {
      dotId: "CZ024",
      title: "菊-和",
      dot: ["33%", "50%"]
    },
    {
      dotId: "CZ025",
      title: "和甸营站",
      dot: ["33.4%", "53%"]
    },
    {
      dotId: "CZ026",
      title: "和-牛",
      dot: ["36.5%", "55%"]
    },
    {
      dotId: "CZ027",
      title: "牛街庄站",
      dot: ["38%", "60%"]
    },
    {
      dotId: "CZ028",
      title: "牛-朱",
      dot: ["40.6%", "61%"]
    },
    {
      dotId: "CZ029",
      title: "朱家村站",
      dot: ["43.2%", "61%"]
    },
    {
      dotId: "CZ030",
      title: "朱-羊",
      dot: ["46%", "60.5%"]
    },
    {
      dotId: "CZ031",
      title: "羊甫头站",
      dot: ["49%", "62.5%"]
    },
    {
      dotId: "CZ032",
      title: "羊-玉",
      dot: ["51.6%", "61.8%"]
    },
    {
      dotId: "CZ033",
      title: "玉缘路站",
      dot: ["54%", "62.4%"]
    },
    {
      dotId: "CZ034",
      title: "玉-广",
      dot: ["55.8%", "59.8%"]
    },
    {
      dotId: "CZ035",
      title: "广卫站",
      dot: ["58.2%", "61.3%"]
    },
    {
      dotId: "CZ036",
      title: "广-塔",
      dot: ["61.4%", "61.8%"]
    },
    {
      dotId: "CZ037",
      title: "塔密站",
      dot: ["64%", "62.3%"]
    },
    {
      dotId: "CZ038",
      title: "塔-斗",
      dot: ["68.4%", "62.8%"]
    },
    {
      dotId: "CZ039",
      title: "斗南站",
      dot: ["74.8%", "63.8%"]
    },
    {
      dotId: "CZ040",
      title: "斗-金",
      dot: ["76.6%", "63%"]
    },
    {
      dotId: "CZ041",
      title: "金桂街站",
      dot: ["78.1%", "61.8%"]
    },
    {
      dotId: "CZ042",
      title: "金-梅",
      dot: ["79.3%", "61.2%"]
    },
    {
      dotId: "CZ043",
      title: "梅子村站",
      dot: ["80%", "62.6%"]
    },
    {
      dotId: "CZ044",
      title: "梅-古",
      dot: ["81.6%", "63%"]
    },
    {
      dotId: "CZ045",
      title: "古城站",
      dot: ["82.8%", "65%"]
    },
    {
      dotId: "CZ046",
      title: "古-可",
      dot: ["85.2%", "65.5%"]
    },
    {
      dotId: "CZ047",
      title: "可乐村站",
      dot: ["87%", "66.3%"]
    },
    {
      dotId: "CZ048",
      title: "可-祥",
      dot: ["90%", "64.4%"]
    },
    {
      dotId: "CZ049",
      title: "祥丰街站",
      dot: ["92.6%", "67.4%"]
    },
    {
      dotId: "CZ050",
      title: "祥-牛",
      dot: ["93.5%", "69.3%"]
    },
    {
      dotId: "CZ051",
      title: "牛头山站",
      dot: ["92.2%", "71.2%"]
    },
    {
      dotId: "CZ052",
      title: "牛-联",
      dot: ["92.2%", "74%"]
    },
    {
      dotId: "CZ053",
      title: "联大街站",
      dot: ["90.8%", "76.4%"]
    },
    {
      dotId: "CZ054",
      title: "联-吴",
      dot: ["90%", "79%"]
    },
    {
      dotId: "CZ055",
      title: "吴家营站",
      dot: ["88.6%", "81.2%"]
    },
    {
      dotId: "CZ056",
      title: "吴-火",
      dot: ["88.2%", "83.6%"]
    },
    {
      dotId: "CZ057",
      title: "火车南站",
      dot: ["86.6%", "86%"]
    }
  ],
};
export default common;
 // menuList:[
  //   {
  //     title:'首页',
  //     key:'index',
  //     id:'CD01',
  //     mb:{
  //       id:'MB01',
  //       title:'模版一',
  //       mk:[
  //         {
  //           id:'MK01',
  //           title:'模块一',
  //           mc:{
  //             id:'MC01',
  //             title:'能耗排行',
  //             type:'sub'
  //           }
  //         },
  //         {
  //           id:'MK02',
  //           title:'模块二',
  //           mc:{
  //             id:'MC02',
  //             title:'能耗结构',
  //             type:'sub'
  //           }
  //         },
  //         {
  //           id:'MK03',
  //           title:'模块三',
  //           mc:{
  //             id:'MC03',
  //             title:'客流走势/预测',
  //             type:'sub'
  //           }
  //         },{
  //           id:'MK04',
  //           title:'模块四',
  //           mc:{
  //             id:'MC04',
  //             title:'列车实时运行图',
  //              tyle:'main',
  //           }
  //         },{
  //           id:'MK05',
  //           title:'模块五',
  //           mc:{
  //             id:'MC05',
  //             title:'车站聚类',
  //             type:'sub'
  //           }
  //         },{
  //           id:'MK06',
  //           title:'模块六',
  //           mc:{
  //             id:'MC06',
  //             title:'昨日OD排行top10',
  //             type:'sub'

  //           }
  //         },{
  //           id:'MK07',
  //           title:'模块七',
  //           mc:{
  //             id:'MC07',
  //             title:'兑现率/正点率',
  //             type:'sub'

  //           }
  //         },
  //       ]
  //     }
  //   },
  //   {
  //     title:'客流分析',
  //     key:'passenger',
  //     id:'CD02',
  //     mb:{
  //       id:'MB02',
  //       title:'模版二',
  //       mk:[
  //         {
  //           id:'MK01',
  //           title:'模块八',
  //         },{
  //           id:'MK02',
  //           title:'模块九',
  //         },{
  //           id:'MK03',
  //           title:'模块十'
  //         },{
  //           id:'MK04',
  //           title:'模块十一'
  //         },{
  //           id:'MK05',
  //           title:'模块十二'
  //         },{
  //           id:'MK06',
  //           title:'模块十三'
  //         },{
  //           id:'MK07',
  //           title:'模块十四'
  //         },{
  //           id:'MK08',
  //           title:'模块十五'
  //         },
  //       ]
  //     }
  //   },
  //   {
  //     title:'能耗分析',
  //     key:'energy',
  //     id:'CD03',
  //   },
  //   {
  //     title:'线路概况',
  //     key:'rail',
  //     id:'CD04',
  //   }
  // ],

  // mbList:[
  //   {
  //     id:'MB01',
  //     title:'模版一'
  //   },
  //   {
  //     id:'MB02',
  //     title:'模版二'
  //   },
  // ],
  // mcList:[
  //   {
  //     id:'MC01',
  //     title:'能耗排行',
  //     type:'sub'
  //   },
  //   {
  //     id:'MC02',
  //     title:'能耗结构',
  //     type:'sub'

  //   },
  //   {
  //     id:'MC03',
  //     title:'客流走势/预测',
  //     type:'sub'
  //   },
  //   {
  //     id:'MC04',
  //     title:'列车实时运行图',
  //      type:'main',
  //   },
  //   {
  //     id:'MC05',
  //     title:'车站聚类',
  //     type:'sub'

  //   },
  //   {
  //     id:'MC06',
  //     title:'昨日OD排行top10',
  //     type:'sub'

  //   },

  //   {
  //     id:'MC07',
  //     title:'兑现率/正点率',
  //     type:'sub'
  //   },
    
  // ],