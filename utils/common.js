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
  // setCookie: function(c_name,value,expirem){
  //   var exdate = new Date(expirem);
  //   exdate.setTime(exdate.getTime());
  //   document.cookie= c_name + "=" + escape(value)+((expirem==null) ? "" : ";expires="+exdate.toGMTString());
  // },

  setCookie: function(c_name,value,expiremMinutes){
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
    document.cookie= c_name + "=" + escape(value)+((expiremMinutes==null) ? "" : ";expires="+exdate.toGMTString());
  },
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
    // 下行数据
    {
      dotId: "1",
      title: "金川路",
      status:'下行',
      dotType:'common',
      dot: ["3%", "14%"]
    },
    {
      dotId: "1",
      title: "金川路-大河埂",
      status:'下行',
      dotType:'middle',
      dot: ["5.5%", "14.5%"]
    },
    {
      dotId: "2",
      title: "大河埂",
      status:'下行',
      dotType:'common',
      dot: ["7%", "13.5%"]
    },
    {
      dotId: "2",
      title: "大河埂-海屯路",
      status:'下行',
      dotType:'middle',
      dot: ["10%", "13.5%"]
    },
    {
      dotId: "3",
      title: "海屯路",
      status:'下行',
      dotType:'common',
      dot: ["13.5%", "16.5%"]
    },
    {
      dotId: "3",
      title: "海屯路-小屯",
      status:'下行',
      dotType:'middle',
      dot: ["14%", "19%"]
    },

    {
      dotId: "4",
      title: "小屯",
      status:'下行',
      dotType:'common',
      dot: ["16%", "21%"]
    },
    {
      dotId: "4",
      title: "小屯-金鼎山北路",
      status:'下行',
      dotType:'middle',
      dot: ["16%", "23%"]
    },
    
    {
      dotId: "5",
      title: "金鼎山北路",
      status:'下行',
      dotType:'common',
      dot: ["18.5%", "24.5%"]
    },
    {
      dotId: "5",
      title: "金鼎山北路-苏家塘",
      status:'下行',
      dotType:'middle',
      dot: ["18%", "26.3%"]
    },
    {
      dotId: "6",
      title: "苏家塘",
      status:'下行',
      dotType:'common',
      dot: ["19%", "27.8%"]
    },
    {
      dotId: "6",
      title: "苏家塘-小菜园",
      status:'下行',
      dotType:'middle',
      dot: ["18.5%", "30.5%"]
    },
    {
      dotId: "7",
      title: "小菜园",
      status:'下行',
      dotType:'common',
      dot: ["19.8%", "33%"]
    },
    {
      dotId: "7",
      title: "小菜园-火车北",
      status:'下行',
      dotType:'middle',
      dot: ["20%", "35%"]
    },
    {
      dotId: "8",
      title: "火车北",
      status:'下行',
      dotType:'common',
      dot: ["21.3%", "37.2%"]
    },
    {
      dotId: "8",
      title: "火车北-白龙路",
      status:'下行',
      dotType:'middle',
      dot: ["22%", "39.5%"]
    },
    {
      dotId: "9",
      title: "白龙路",
      status:'下行',
      dotType:'common',
      dot: ["24%", "41.5%"]
    },
    {
      dotId: "9",
      title: "白龙路-大村营",
      status:'下行',
      dotType:'middle',
      dot: ["25.4%", "42.5%"]
    },
    {
      dotId: "10",
      title: "大树营",
      status:'下行',
      dotType:'common',
      dot: ["27.6%", "42.5%"]
    },
    {
      dotId: "10",
      title: "大树营站-菊花村",
      status:'下行',
      dotType:'middle',
      dot: ["29%", "43.5%"]
    },
    {
      dotId: "11",
      title: "菊花村",
      status:'下行',
      dotType:'common',
      dot: ["30.5%", "44%"]
    },
    {
      dotId: "11",
      itle: "菊花村-菊华",
      status:'下行',
      dotType:'middle',
      dot: ["31.8%", "45.5%"]
    },
    {
      dotId: "12",
      title: "菊华",
      status:'下行',
      dotType:'common',
      dot: ["33%", "46.5%"]
    },
    {
      dotId: "12",
      title: "菊华-和甸营",
      status:'下行',
      dotType:'middle',
      dot: ["35%", "48.5%"]
    },
    {
      dotId: "13",
      title: "和甸营",
      status:'下行',
      dotType:'common',
      dot: ["36.2%", "51%"]
    },
    {
      dotId: "13",
      title: "和甸营-麻苴",
      status:'下行',
      dotType:'middle',
      dot: ["38.5%", "55%"]
    },
    {
      dotId: "14",
      title: "麻苴",
      status:'下行',
      dotType:'common',
      dot: ["40%", "58%"]
    },
    {
      dotId: "14",
      title: "麻苴-牛街庄",
      status:'下行',
      dotType:'middle',
      dot: ["41.6%", "59%"]
    },
    {
      dotId: "15",
      title: "牛街庄",
      status:'下行',
      dotType:'common',
      dot: ["43%", "58%"]
    },
    {
      dotId: "15",
      title: "牛街庄-朱家村",
      status:'下行',
      dotType:'middle',
      dot: ["46%", "58.5%"]
    },
    {
      dotId: "16",
      title: "朱家村",
      status:'下行',
      dotType:'common',
      dot: ["48.8%", "59.5%"]
    },
    {
      dotId: "16",
      title: "朱家村-玉缘路",
      status:'下行',
      dotType:'middle',
      dot: ["50.8%", "59.8%"]
    },
    {
      dotId: "17",
      title: "玉缘路",
      status:'下行',
      dotType:'common',
      dot: ["52.8%", "58.8%"]
    },
    {
      dotId: "17",
      title: "玉缘路-广卫",
      status:'下行',
      dotType:'middle',
      dot: ["55.8%", "57.8%"]
    },
    {
      dotId: "18",
      title: "广卫",
      status:'下行',
      dotType:'common',
      dot: ["59.8%", "58.3%"]
    },
    {
      dotId: "18",
      title: "广卫-塔密",
      status:'下行',
      dotType:'middle',
      dot: ["61.4%", "59.8%"]
    },
    {
      dotId: "19",
      title: "塔密",
      status:'下行',
      dotType:'common',
      dot: ["63.4%", "59.3%"]
    },
    {
      dotId: "19",
      title: "塔密-斗南",
      status:'下行',
      dotType:'middle',
      dot: ["68.4%", "60.8%"]
    },
    {
      dotId: "20",
      title: "斗南",
      status:'下行',
      dotType:'common',
      dot: ["74.4%", "60.8%"]
    },
    {
      dotId: "20",
      title: "斗南-金桂街",
      status:'下行',
      dotType:'middle',
      dot: ["75.8%", "61.8%"]
    },
    {
      dotId: "21",
      title: "金桂街",
      status:'下行',
      dotType:'common',
      dot: ["75.8%", "59.8%"]
    },
    {
      dotId: "21",
      title: "金桂街-梅子村",
      status:'下行',
      dotType:'middle',
      dot: ["78.3%", "59.2%"]
    },
    {
      dotId: "22",
      title: "梅子村",
      status:'下行',
      dotType:'common',
      dot: ["81.2%", "59.6%"]
    },
    {
      dotId: "22",
      title: "梅子村-古城",
      status:'下行',
      dotType:'middle',
      dot: ["82.6%", "61%"]
    },
    {
      dotId: "23",
      title: "古城",
      status:'下行',
      dotType:'common',
      dot: ["84%", "61.5%"]
    },
    {
      dotId: "23",
      title: "古城-可乐村",
      status:'下行',
      dotType:'middle',
      dot: ["85.6%", "63%"]
    },
    {
      dotId: "24",
      title: "可乐村",
      status:'下行',
      dotType:'common',
      dot: ["87.6%", "63%"]
    },
    {
      dotId: "24",
      title: "可乐村-祥丰街",
      status:'下行',
      dotType:'middle',
      dot: ["90%", "64.4%"]
    },
    {
      dotId: "25",
      title: "祥丰街",
      status:'下行',
      dotType:'common',
      dot: ["93.4%", "64.3%"]
    },
    {
      dotId: "25",
      title: "祥丰街-牛头山",
      status:'下行',
      dotType:'middle',
      dot: ["95%", "68.3%"]
    },
    {
      dotId: "26",
      title: "牛头山",
      status:'下行',
      dotType:'common',
      dot: ["95%", "72%"]
    },
    {
      dotId: "26",
      title: "牛头山-联大街",
      status:'下行',
      dotType:'middle',
      dot: ["94.2%", "75%"]
    },
    {
      dotId: "27",
      title: "联大街",
      status:'下行',
      dotType:'common',
      dot: ["93.8%", "77.4%"]
    },
    {
      dotId: "27",
      title: "联大街-吴家营",
      status:'下行',
      dotType:'middle',
      dot: ["92%", "80%"]
    },
    {
      dotId: "28",
      title: "吴家营",
      status:'下行',
      dotType:'common',
      dot: ["91.6%", "82.6%"]
    },
    {
      dotId: "28",
      title: "吴家营-昆明南",
      status:'下行',
      dotType:'middle',
      dot: ["89.2%", "84.6%"]
    },
    {
      dotId: "29",
      title: "昆明南",
      status:'下行',
      dotType:'common',
      dot: ["89.6%", "87.6%"]
    },
    



    // 上行数据
    {
      dotId: "1",
      title: "金川路站",
      status:'上行',
      dotType:'common',
      dot: ["2%", "16%"]
    },
    {
      dotId: "2",
      title: "大河埂-金川路",
      status:'上行',
      dotType:'middle',
      dot: ["6.2%", "16.5%"]
    },
    {
      dotId: "2",
      title: "大河埂站",
      status:'上行',
      dotType:'common',
      dot: ["8%", "16.5%"]
    },
    {
      dotId: "3",
      title: "海屯路站-大河埂",
      status:'上行',
      dotType:'middle',
      dot: ["10%", "15.5%"]
    },
    {
      dotId: "3",
      title: "海屯路",
      status:'上行',
      dotType:'common',
      dot: ["11%", "18.5%"]
    },
    {
      dotId: "4",
      title: "小屯-海屯路",
      status:'上行',
      dotType:'middle',
      dot: ["13%", "20%"]
    },
    {
      dotId: "4",
      title: "小屯",
      status:'上行',
      dotType:'common',
      dot: ["13%", "22.5%"]
    },
    {
      dotId: "5",
      title: "金鼎山北路-小屯",
      status:'上行',
      dotType:'middle',
      dot: ["15%", "23.8%"]
    },
    {
      dotId: "5",
      title: "金鼎山北路",
      status:'上行',
      dotType:'common',
      dot: ["15.5%", "25.5%"]
    },
    {
      dotId: "6",
      title: "苏家塘-金鼎山北路",
      status:'上行',
      dotType:'middle',
      dot: ["16.4%", "26.8%"]
    },
    {
      dotId: "6",
      title: "苏家塘站",
      status:'上行',
      dotType:'common',
      dot: ["16%", "28.3%"]
    },
    {
      dotId: "7",
      title: "小菜园-苏家塘",
      status:'上行',
      dotType:'middle',
      dot: ["16.5%", "31%"]
    },
    {
      dotId: "7",
      title: "小菜园",
      status:'上行',
      dotType:'common',
      dot: ["17%", "34%"]
    },
    {
      dotId: "8",
      title: "火车北-小菜园",
      status:'上行',
      dotType:'middle',
      dot: ["18.6%", "36%"]
    },
    {
      dotId: "8",
      title: "火车北",
      status:'上行',
      dotType:'common',
      dot: ["19%", "38.2%"]
    },
    {
      dotId: "9",
      title: "白龙路-火车北",
      status:'上行',
      dotType:'middle',
      dot: ["20.4%", "40.5%"]
    },
    {
      dotId: "9",
      title: "白龙路",
      status:'上行',
      dotType:'common',
      dot: ["21.8%", "43.8%"]
    },
    {
      dotId: "10",
      title: "大树营-白龙路",
      status:'上行',
      dotType:'middle',
      dot: ["24.4%", "44.5%"]
    },
    {
      dotId: "10",
      title: "大树营",
      status:'上行',
      dotType:'common',
      dot: ["26.6%", "45.5%"]
    },
    {
      dotId: "11",
      title: "菊花村-大树营",
      status:'上行',
      dotType:'middle',
      dot: ["28%", "46%"]
    },
    {
      dotId: "11",
      title: "菊花村",
      status:'上行',
      dotType:'common',
      dot: ["28.8%", "47%"]
    },
    {
      dotId: "12",
      title: "菊华-菊花村",
      status:'上行',
      dotType:'middle',
      dot: ["30%", "47.5%"]
    },
    {
      dotId: "12",
      title: "菊华",
      status:'上行',
      dotType:'common',
      dot: ["31%", "48.5%"]
    },
    {
      dotId: "13",
      title: "和甸营-菊华",
      status:'上行',
      dotType:'middle',
      dot: ["33%", "50%"]
    },
    {
      dotId: "13",
      title: "和甸营",
      status:'上行',
      dotType:'common',
      dot: ["33.4%", "53%"]
    },
    {
      dotId: "14",
      title: "麻苴-和甸营",
      status:'上行',
      dotType:'middle',
      dot: ["36.5%", "55%"]
    },
    {
      dotId: "14",
      title: "麻苴",
      status:'上行',
      dotType:'common',
      dot: ["38%", "60%"]
    },
    {
      dotId: "15",
      title: "牛街庄-麻苴",
      status:'上行',
      dotType:'middle',
      dot: ["40.6%", "61%"]
    },
    {
      dotId: "15",
      title: "牛街庄",
      status:'上行',
      dotType:'common',
      dot: ["43.2%", "61%"]
    },
    {
      dotId: "16",
      title: "朱家村-牛街庄",
      status:'上行',
      dotType:'middle',
      dot: ["46%", "60.5%"]
    },
    {
      dotId: "16",
      title: "朱家村",
      status:'上行',
      dotType:'common',
      dot: ["49%", "62.5%"]
    },
    {
      dotId: "17",
      title: "玉缘路-朱家村",
      status:'上行',
      dotType:'middle',
      dot: ["51.6%", "61.8%"]
    },
    {
      dotId: "17",
      title: "玉缘路",
      status:'上行',
      dotType:'common',
      dot: ["54%", "62.4%"]
    },
    {
      dotId: "18",
      title: "广卫-玉缘路",
      status:'上行',
      dotType:'middle',
      dot: ["55.8%", "59.8%"]
    },
    {
      dotId: "18",
      title: "广卫",
      status:'上行',
      dotType:'common',
      dot: ["58.2%", "61.3%"]
    },
    {
      dotId: "19",
      title: "塔密-广卫",
      status:'上行',
      dotType:'middle',
      dot: ["61.4%", "61.8%"]
    },
    {
      dotId: "19",
      title: "塔密",
      status:'上行',
      dotType:'common',
      dot: ["64%", "62.3%"]
    },
    {
      dotId: "20",
      title: "斗南-塔密",
      status:'上行',
      dotType:'middle',
      dot: ["68.4%", "62.8%"]
    },
    {
      dotId: "20",
      title: "斗南",
      status:'上行',
      dotType:'common',
      dot: ["74.8%", "63.8%"]
    },
    {
      dotId: "21",
      title: "金桂街-斗南",
      status:'上行',
      dotType:'middle',
      dot: ["76.6%", "63%"]
    },
    {
      dotId: "21",
      title: "金桂街",
      status:'上行',
      dotType:'common',
      dot: ["78.1%", "61.8%"]
    },
    {
      dotId: "21",
      title: "梅子村-金桂街",
      status:'上行',
      dotType:'middle',
      dot: ["79.3%", "61.2%"]
    },
    {
      dotId: "22",
      title: "梅子村",
      status:'上行',
      dotType:'common',
      dot: ["80%", "62.6%"]
    },
    {
      dotId: "23",
      title: "古城-梅子村",
      status:'上行',
      dotType:'middle',
      dot: ["81.6%", "63%"]
    },
    {
      dotId: "23",
      title: "古城",
      status:'上行',
      dotType:'common',
      dot: ["82.8%", "65%"]
    },
    {
      dotId: "24",
      title: "可乐村-古城",
      status:'上行',
      dotType:'middle',
      dot: ["85.2%", "65.5%"]
    },
    {
      dotId: "24",
      title: "可乐村",
      status:'上行',
      dotType:'common',
      dot: ["87%", "66.3%"]
    },
    {
      dotId: "25",
      title: "祥丰街-可乐村",
      status:'上行',
      dotType:'middle',
      dot: ["90%", "64.4%"]
    },
    {
      dotId: "25",
      title: "祥丰街",
      status:'上行',
      dotType:'common',
      dot: ["92.6%", "67.4%"]
    },
    {
      dotId: "26",
      title: "牛头山-祥丰街",
      status:'上行',
      dotType:'middle',
      dot: ["93.5%", "69.3%"]
    },
    {
      dotId: "26",
      title: "牛头山",
      status:'上行',
      dotType:'common',
      dot: ["92.2%", "71.2%"]
    },
    {
      dotId: "27",
      title: "联大街-牛头山",
      status:'上行',
      dotType:'middle',
      dot: ["92.2%", "74%"]
    },
    {
      dotId: "27",
      title: "联大街",
      status:'上行',
      dotType:'common',
      dot: ["90.8%", "76.4%"]
    },
    {
      dotId: "28",
      title: "吴家营-联大街",
      status:'上行',
      dotType:'middle',
      dot: ["90%", "79%"]
    },
    {
      dotId: "28",
      title: "吴家营",
      status:'上行',
      dotType:'common',
      dot: ["88.6%", "81.2%"]
    },
    {
      dotId: "29",
      title: "昆明南-吴家营",
      status:'上行',
      dotType:'middle',
      dot: ["88.2%", "83.6%"]
    },
    {
      dotId: "29",
      title: "昆明南",
      status:'上行',
      dotType:'common',
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