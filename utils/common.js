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
      title:"首页",
      key:"index",
      id:"CD01"
    },
    {
      title:"客流分析",
      key:"passenger",
      id:"CD02"
    },
    {
      title:"智能客流",
      key:"flow",
      id:"CD03",
    },
    {
      title:"安全防范",
      key:"safe",
      id:"CD04",
    },
    {
      title:"能耗分析",
      key:"energy",
      id:"CD05",
    },
    {
      title:"线路概况",
      key:"rail",
      id:"CD06",
    }
  ],
 
  //菜单list
  cdList:[
    {
      title:"首页",
      key:"index",
      id:"CD01"
    },
    {
      title:"客流分析",
      key:"passenger",
      id:"CD02"
    },
    {
      title:"智能客流",
      key:"flow",
      id:"CD03",
    },
    {
      title:"安全防范",
      key:"safe",
      id:"CD04",
    },
    {
      title:"能耗分析",
      key:"energy",
      id:"CD05",
    },
    {
      title:"线路概况",
      key:"rail",
      id:"CD06",
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
      templateName:"模版一",
      templateNum:"MB01",
      mk:[{mc:"",moduleName:"模块一",moduleNum:"MK01"},{mc:"",moduleName:"模块二",moduleNum:"MK02"},{mc:"",moduleName:"模块三",moduleNum:"MK03"},
      {mc:"",moduleName:"模块四",moduleNum:"MK04"},{mc:"",moduleName:"模块五",moduleNum:"MK05"},{mc:"",moduleName:"模块六",moduleNum:"MK06"},
      {mc:"",moduleName:"模块七",moduleNum:"MK07"}]}
    },
    {
      mb:{
        templateName:"模版二",
        templateNum:"MB02",
        mk:[{mc:"",moduleName:"模块一",moduleNum:"MK01"},{mc:"",moduleName:"模块二",moduleNum:"MK02"},{mc:"",moduleName:"模块三",moduleNum:"MK03"},
        {mc:"",moduleName:"模块四",moduleNum:"MK04"},{mc:"",moduleName:"模块五",moduleNum:"MK05"},{mc:"",moduleName:"模块六",moduleNum:"MK06"},
        {mc:"",moduleName:"模块七",moduleNum:"MK07"},{mc:"",moduleName:"模块八",moduleNum:"MK08"}]}
    },
    {
      mb:{
      templateName:"模版三",
      templateNum:"MB03",
      mk:[{mc:"",moduleName:"模块一",moduleNum:"MK01"}]}
    },
    {
      mb:{
      templateName:"模版四",
      templateNum:"MB04",
      mk:[{mc:"",moduleName:"模块一",moduleNum:"MK01"}]}
    },
  ],
  // 关键指标配置信息
  keyVisualList:[
    {templateNum:'MB01',templateName:'模版一',keyTemp:'MK04',keyIndex:'3'},
    {templateNum:'MB02',templateName:'模版二',keyTemp:'MK01',keyIndex:'0'},
  ],
  // 行车路线运行图 各点定位位置
  wayList: [        
    // 下行数据 运行图左侧
    {
      dotId: "1",
      title: "金川路站",
      status:'下行',
      dotType:'common',
      dot: ["4.3%", "14%"]
    },
    {
      dotId: "1",
      title: "金川路站-大河埂站",
      status:'下行',
      dotType:'middle',
      dot: ["5.7%", "13.6%"]
    },
    {
      dotId: "2",
      title: "大河埂站",
      status:'下行',
      dotType:'common',
      dot: ["7%", "13.2%"]
    },
    {
      dotId: "2",
      title: "大河埂站-海屯路站",
      status:'下行',
      dotType:'middle',
      dot: ["10%", "12.6%"]
    },
    {
      dotId: "3",
      title: "海屯路站",
      status:'下行',
      dotType:'common',
      dot: ["13%", "16.2%"]
    },
    {
      dotId: "3",
      title: "海屯路站-小屯站",
      status:'下行',
      dotType:'middle',
      dot: ["14.3%", "18.6%"]
    },

    {
      dotId: "4",
      title: "小屯站",
      status:'下行',
      dotType:'common',
      dot: ["15.6%", "20.4%"]
    },
    {
      dotId: "4",
      title: "小屯站-金鼎山北路站",
      status:'下行',
      dotType:'middle',
      dot: ["16.6%", "22.4%"]
    },
    
    {
      dotId: "5",
      title: "金鼎山北路站",
      status:'下行',
      dotType:'common',
      dot: ["17.7%", "24%"]
    },
    {
      dotId: "5",
      title: "金鼎山北路站-苏家塘站",
      status:'下行',
      dotType:'middle',
      dot: ["18%", "25.7%"]
    },
    {
      dotId: "6",
      title: "苏家塘站",
      status:'下行',
      dotType:'common',
      dot: ["18.2%", "27.2%"]
    },
    {
      dotId: "6",
      title: "苏家塘站-小菜园站",
      status:'下行',
      dotType:'middle',
      dot: ["18.5%", "30%"]
    },
    {
      dotId: "7",
      title: "小菜园站",
      status:'下行',
      dotType:'common',
      dot: ["19.3%", "32.6%"]
    },
    {
      dotId: "7",
      title: "小菜园站-火车北站",
      status:'下行',
      dotType:'middle',
      dot: ["20.3%", "34.8%"]
    },
    {
      dotId: "8",
      title: "火车北站",
      status:'下行',
      dotType:'common',
      dot: ["21%", "36.6%"]
    },
    {
      dotId: "8",
      title: "火车北站-白龙路站",
      status:'下行',
      dotType:'middle',
      dot: ["22%", "39.5%"]
    },
    {
      dotId: "9",
      title: "白龙路站",
      status:'下行',
      dotType:'common',
      dot: ["23.6%", "41.2%"]
    },
    {
      dotId: "9",
      title: "白龙路站-大村营站",
      status:'下行',
      dotType:'middle',
      dot: ["25.4%", "42.3%"]
    },
    {
      dotId: "10",
      title: "大树营站",
      status:'下行',
      dotType:'common',
      dot: ["27.5%", "42.7%"]
    },
    {
      dotId: "10",
      title: "大树营站-菊花村站",
      status:'下行',
      dotType:'middle',
      dot: ["28.7%", "43.5%"]
    },
    {
      dotId: "11",
      title: "菊花村站",
      status:'下行',
      dotType:'common',
      dot: ["30.1%", "44%"]
    },
    {
      dotId: "11",
      itle: "菊花村站-菊华站",
      status:'下行',
      dotType:'middle',
      dot: ["31.5%", "45.2%"]
    },
    {
      dotId: "12",
      title: "菊华站",
      status:'下行',
      dotType:'common',
      dot: ["32.7%", "46.5%"]
    },
    {
      dotId: "12",
      title: "菊华站-和甸营站",
      status:'下行',
      dotType:'middle',
      dot: ["35%", "48.5%"]
    },
    {
      dotId: "13",
      title: "和甸营站",
      status:'下行',
      dotType:'common',
      dot: ["36.2%", "51.3%"]
    },
    {
      dotId: "13",
      title: "和甸营站-牛街庄站",
      status:'下行',
      dotType:'middle',
      dot: ["38.5%", "54%"]
    },
    {
      dotId: "14",
      title: "牛街庄站",
      status:'下行',
      dotType:'common',
      dot: ["40.3%", "58.6%"]
    },
    {
      dotId: "14",
      title: "牛街庄站-朱家村站",
      status:'下行',
      dotType:'middle',
      dot: ["41.6%", "59%"]
    },
    {
      dotId: "15",
      title: "朱家村站",
      status:'下行',
      dotType:'common',
      dot: ["43%", "58%"]
    },
    {
      dotId: "15",
      title: "朱家村站-羊甫头站",
      status:'下行',
      dotType:'middle',
      dot: ["46%", "58%"]
    },
    {
      dotId: "16",
      title: "羊甫头站",
      status:'下行',
      dotType:'common',
      dot: ["49.3%", "59.5%"]
    },
    {
      dotId: "16",
      title: "羊甫头站-玉缘路站",
      status:'下行',
      dotType:'middle',
      dot: ["51.4%", "59.6%"]
    },
    {
      dotId: "17",
      title: "玉缘路站",
      status:'下行',
      dotType:'common',
      dot: ["53.7%", "59.2%"]
    },
    {
      dotId: "17",
      title: "玉缘路站-广卫站",
      status:'下行',
      dotType:'middle',
      dot: ["56.2%", "57.6%"]
    },
    {
      dotId: "18",
      title: "广卫站",
      status:'下行',
      dotType:'common',
      dot: ["59.7%", "58.4%"]
    },
    {
      dotId: "18",
      title: "广卫站-塔密站",
      status:'下行',
      dotType:'middle',
      dot: ["61.4%", "59.2%"]
    },
    {
      dotId: "19",
      title: "塔密站",
      status:'下行',
      dotType:'common',
      dot: ["64%", "59.3%"]
    },
    {
      dotId: "19",
      title: "塔密站-斗南站",
      status:'下行',
      dotType:'middle',
      dot: ["69.4%", "60.5%"]
    },
    {
      dotId: "20",
      title: "斗南站",
      status:'下行',
      dotType:'common',
      dot: ["75.2%", "60.8%"]
    },
    {
      dotId: "20",
      title: "斗南站-金桂街站",
      status:'下行',
      dotType:'middle',
      dot: ["76.4%", "60.9%"]
    },
    {
      dotId: "21",
      title: "金桂街站",
      status:'下行',
      dotType:'common',
      dot: ["77%", "60.1%"]
    },
    {
      dotId: "21",
      title: "金桂街站-梅子村站",
      status:'下行',
      dotType:'middle',
      dot: ["79%", "59%"]
    },
    {
      dotId: "22",
      title: "梅子村站",
      status:'下行',
      dotType:'common',
      dot: ["81.4%", "59.8%"]
    },
    {
      dotId: "22",
      title: "梅子村站-古城站",
      status:'下行',
      dotType:'middle',
      dot: ["82.9%", "61%"]
    },
    {
      dotId: "23",
      title: "古城站",
      status:'下行',
      dotType:'common',
      dot: ["84.8%", "61.9%"]
    },
    {
      dotId: "23",
      title: "古城站-可乐村站",
      status:'下行',
      dotType:'middle',
      dot: ["86.2%", "62.8%"]
    },
    {
      dotId: "24",
      title: "可乐村站",
      status:'下行',
      dotType:'common',
      dot: ["88.2%", "63.2%"]
    },
    {
      dotId: "24",
      title: "可乐村站-祥丰街站",
      status:'下行',
      dotType:'middle',
      dot: ["91%", "63.9%"]
    },
    {
      dotId: "25",
      title: "祥丰街站",
      status:'下行',
      dotType:'common',
      dot: ["94%", "64.8%"]
    },
    {
      dotId: "25",
      title: "祥丰街站-牛头山站",
      status:'下行',
      dotType:'middle',
      dot: ["96%", "69%"]
    },
    {
      dotId: "26",
      title: "牛头山站",
      status:'下行',
      dotType:'common',
      dot: ["95.6%", "71.8%"]
    },
    {
      dotId: "26",
      title: "牛头山站-联大街站",
      status:'下行',
      dotType:'middle',
      dot: ["94.8%", "74.6%"]
    },
    {
      dotId: "27",
      title: "联大街站",
      status:'下行',
      dotType:'common',
      dot: ["94%", "77%"]
    },
    {
      dotId: "27",
      title: "联大街站-吴家营站",
      status:'下行',
      dotType:'middle',
      dot: ["93%", "79.6%"]
    },
    {
      dotId: "28",
      title: "吴家营站",
      status:'下行',
      dotType:'common',
      dot: ["91.8%", "81.9%"]
    },
    {
      dotId: "28",
      title: "吴家营站-火车南站",
      status:'下行',
      dotType:'middle',
      dot: ["91%", "84%"]
    },
    {
      dotId: "29",
      title: "火车南站",
      status:'下行',
      dotType:'common',
      dot: ["89.6%", "86%"]
    },
    



    // 上行数据
    {
      dotId: "1",
      title: "金川路站",
      status:'上行',
      dotType:'common',
      dot: ["4.5%", "16%"]
    },
    {
      dotId: "2",
      title: "大河埂站-金川路站",
      status:'上行',
      dotType:'middle',
      dot: ["6%", "15.7%"]
    },
    {
      dotId: "2",
      title: "大河埂站",
      status:'上行',
      dotType:'common',
      dot: ["7.5%", "15.5%"]
    },
    {
      dotId: "3",
      title: "海屯路站-大河埂站",
      status:'上行',
      dotType:'middle',
      dot: ["10%", "14.5%"]
    },
    {
      dotId: "3",
      title: "海屯路站",
      status:'上行',
      dotType:'common',
      dot: ["11.2%", "17.2%"]
    },
    {
      dotId: "4",
      title: "小屯站-海屯路站",
      status:'上行',
      dotType:'middle',
      dot: ["12.5%", "19.4%"]
    },
    {
      dotId: "4",
      title: "小屯站",
      status:'上行',
      dotType:'common',
      dot: ["13.6%", "21.5%"]
    },
    {
      dotId: "5",
      title: "金鼎山北路站-小屯站",
      status:'上行',
      dotType:'middle',
      dot: ["14.6%", "23.4%"]
    },
    {
      dotId: "5",
      title: "金鼎山北路站",
      status:'上行',
      dotType:'common',
      dot: ["16%", "24.8%"]
    },
    {
      dotId: "6",
      title: "苏家塘站-金鼎山北路站",
      status:'上行',
      dotType:'middle',
      dot: ["16.2%", "26.2%"]
    },
    {
      dotId: "6",
      title: "苏家塘站站",
      status:'上行',
      dotType:'common',
      dot: ["16.2%", "27.6%"]
    },
    {
      dotId: "7",
      title: "小菜园站-苏家塘站",
      status:'上行',
      dotType:'middle',
      dot: ["16.7%", "30.5%"]
    },
    {
      dotId: "7",
      title: "小菜园站",
      status:'上行',
      dotType:'common',
      dot: ["17.4%", "33.3%"]
    },
    {
      dotId: "8",
      title: "火车北站-小菜园站",
      status:'上行',
      dotType:'middle',
      dot: ["18.4%", "35.6%"]
    },
    {
      dotId: "8",
      title: "火车北站",
      status:'上行',
      dotType:'common',
      dot: ["19%", "37.5%"]
    },
    {
      dotId: "9",
      title: "白龙路站-火车北站",
      status:'上行',
      dotType:'middle',
      dot: ["20.4%", "40.5%"]
    },
    {
      dotId: "9",
      title: "白龙路站",
      status:'上行',
      dotType:'common',
      dot: ["21.8%", "43%"]
    },
    {
      dotId: "10",
      title: "大树营站-白龙路站",
      status:'上行',
      dotType:'middle',
      dot: ["24.4%", "44.1%"]
    },
    {
      dotId: "10",
      title: "大树营站",
      status:'上行',
      dotType:'common',
      dot: ["26.9%", "44.9%"]
    },
    {
      dotId: "11",
      title: "菊花村站-大树营站",
      status:'上行',
      dotType:'middle',
      dot: ["28.3%", "45.4%"]
    },
    {
      dotId: "11",
      title: "菊花村站",
      status:'上行',
      dotType:'common',
      dot: ["29.2%", "46%"]
    },
    {
      dotId: "12",
      title: "菊华站-菊花村站",
      status:'上行',
      dotType:'middle',
      dot: ["30.4%", "46.8%"]
    },
    {
      dotId: "12",
      title: "菊华站",
      status:'上行',
      dotType:'common',
      dot: ["31%", "47.8%"]
    },
    {
      dotId: "13",
      title: "和甸营站-菊华站",
      status:'上行',
      dotType:'middle',
      dot: ["33.6%", "50%"]
    },
    {
      dotId: "13",
      title: "和甸营站",
      status:'上行',
      dotType:'common',
      dot: ["34%", "52%"]
    },
    {
      dotId: "14",
      title: "牛街庄站-和甸营站",
      status:'上行',
      dotType:'middle',
      dot: ["36.8%", "55%"]
    },
    {
      dotId: "14",
      title: "牛街庄站",
      status:'上行',
      dotType:'common',
      dot: ["38.5%", "59.5%"]
    },
    {
      dotId: "15",
      title: "朱家村站-牛街庄站",
      status:'上行',
      dotType:'middle',
      dot: ["40.6%", "61%"]
    },
    {
      dotId: "15",
      title: "朱家村站",
      status:'上行',
      dotType:'common',
      dot: ["43.4%", "60.2%"]
    },
    {
      dotId: "16",
      title: "羊甫头站-朱家村站",
      status:'上行',
      dotType:'middle',
      dot: ["46%", "60.2%"]
    },
    {
      dotId: "16",
      title: "羊甫头站",
      status:'上行',
      dotType:'common',
      dot: ["49.2%", "61.5%"]
    },
    {
      dotId: "17",
      title: "玉缘路站-羊甫头站",
      status:'上行',
      dotType:'middle',
      dot: ["51.6%", "61.6%"]
    },
    {
      dotId: "17",
      title: "玉缘路站",
      status:'上行',
      dotType:'common',
      dot: ["54.3%", "61.4%"]
    },
    {
      dotId: "18",
      title: "广卫站-玉缘路站",
      status:'上行',
      dotType:'middle',
      dot: ["56.4%", "59.8%"]
    },
    {
      dotId: "18",
      title: "广卫站",
      status:'上行',
      dotType:'common',
      dot: ["58.8%", "60.6%"]
    },
    {
      dotId: "19",
      title: "塔密站-广卫站",
      status:'上行',
      dotType:'middle',
      dot: ["61.4%", "61.4%"]
    },
    {
      dotId: "19",
      title: "塔密站",
      status:'上行',
      dotType:'common',
      dot: ["64.6%", "61.6%"]
    },
    {
      dotId: "20",
      title: "斗南站-塔密站",
      status:'上行',
      dotType:'middle',
      dot: ["69.4%", "62.5%"]
    },
    {
      dotId: "20",
      title: "斗南站",
      status:'上行',
      dotType:'common',
      dot: ["75.3%", "63.2%"]
    },
    {
      dotId: "21",
      title: "金桂街站-斗南站",
      status:'上行',
      dotType:'middle',
      dot: ["77%", "63%"]
    },
    {
      dotId: "21",
      title: "金桂街站",
      status:'上行',
      dotType:'common',
      dot: ["78.6%", "61%"]
    },
    {
      dotId: "21",
      title: "梅子村站-金桂街站",
      status:'上行',
      dotType:'middle',
      dot: ["79.5%", "61%"]
    },
    {
      dotId: "22",
      title: "梅子村站",
      status:'上行',
      dotType:'common',
      dot: ["80.4%", "61.6%"]
    },
    {
      dotId: "23",
      title: "古城站-梅子村站",
      status:'上行',
      dotType:'middle',
      dot: ["82.4%", "62.8%"]
    },
    {
      dotId: "23",
      title: "古城站",
      status:'上行',
      dotType:'common',
      dot: ["83.9%", "63.8%"]
    },
    {
      dotId: "24",
      title: "可乐村站-古城站",
      status:'上行',
      dotType:'middle',
      dot: ["86%", "64.6%"]
    },
    {
      dotId: "24",
      title: "可乐村站",
      status:'上行',
      dotType:'common',
      dot: ["87.8%", "65.5%"]
    },
    {
      dotId: "25",
      title: "祥丰街站-可乐村站",
      status:'上行',
      dotType:'middle',
      dot: ["90.6%", "66%"]
    },
    {
      dotId: "25",
      title: "祥丰街站",
      status:'上行',
      dotType:'common',
      dot: ["93.2%", "67%"]
    },
    {
      dotId: "26",
      title: "牛头山站-祥丰街站",
      status:'上行',
      dotType:'middle',
      dot: ["94%", "68.8%"]
    },
    {
      dotId: "26",
      title: "牛头山站",
      status:'上行',
      dotType:'common',
      dot: ["93.7%", "71.4%"]
    },
    {
      dotId: "27",
      title: "联大街站-牛头山站",
      status:'上行',
      dotType:'middle',
      dot: ["93%", "74%"]
    },
    {
      dotId: "27",
      title: "联大街站",
      status:'上行',
      dotType:'common',
      dot: ["91.8%", "76.4%"]
    },
    {
      dotId: "28",
      title: "吴家营站-联大街站",
      status:'上行',
      dotType:'middle',
      dot: ["91%", "79%"]
    },
    {
      dotId: "28",
      title: "吴家营站",
      status:'上行',
      dotType:'common',
      dot: ["89.7%", "81.2%"]
    },
    {
      dotId: "29",
      title: "火车南站-吴家营站",
      status:'上行',
      dotType:'middle',
      dot: ["88.9%", "83.2%"]
    },
    {
      dotId: "29",
      title: "火车南站",
      status:'上行',
      dotType:'common',
      dot: ["88%", "85.2%"]
    }
  ],


  // 行车负载情况
  hardList: [        
    {
      dotId: "1",
      title: "金川路站",
      status:'下行',
      dotType:'common',
      dot: ["4.4%", "14.5%"]
    },
    {
      dotId: "2",
      title: "大河埂站",
      status:'下行',
      dotType:'common',
      dot: ["7.2%", "14%"]
    },
    {
      dotId: "3",
      title: "海屯路站",
      status:'下行',
      dotType:'common',
      dot: ["12.2%", "16.3%"]
    },
    {
      dotId: "4",
      title: "小屯站",
      status:'下行',
      dotType:'common',
      dot: ["14.6%", "20.5%"]
    },    
    {
      dotId: "5",
      title: "金鼎山北路站",
      status:'下行',
      dotType:'common',
      dot: ["16.9%", "23.9%"]
    },
    {
      dotId: "6",
      title: "苏家塘站",
      status:'下行',
      dotType:'common',
      dot: ["17.2%", "26.9%"]
    },
    {
      dotId: "7",
      title: "小菜园站",
      status:'下行',
      dotType:'common',
      dot: ["18.5%", "32.3%"]
    },
    {
      dotId: "8",
      title: "火车北站",
      status:'下行',
      dotType:'common',
      dot: ["20.1%", "36.3%"]
    },
    {
      dotId: "9",
      title: "白龙路站",
      status:'下行',
      dotType:'common',
      dot: ["22.8%", "41.3%"]
    },
    {
      dotId: "10",
      title: "大树营站",
      status:'下行',
      dotType:'common',
      dot: ["27.2%", "43.1%"]
    },
    {
      dotId: "11",
      title: "菊花村站",
      status:'下行',
      dotType:'common',
      dot: ["29.7%", "44.2%"]
    },
    {
      dotId: "12",
      title: "菊华站",
      status:'下行',
      dotType:'common',
      dot: ["32%", "46.3%"]
    },
    {
      dotId: "13",
      title: "和甸营站",
      status:'下行',
      dotType:'common',
      dot: ["35.2%", "50.7%"]
    },
    {
      dotId: "14",
      title: "牛街庄站",
      status:'下行',
      dotType:'common',
      dot: ["39.4%", "58.1%"]
    },
    {
      dotId: "15",
      title: "朱家村站",
      status:'下行',
      dotType:'common',
      dot: ["43.3%", "58.1%"]
    },
    {
      dotId: "16",
      title: "羊甫头站",
      status:'下行',
      dotType:'common',
      dot: ["49.4%", "59.5%"]
    },
    {
      dotId: "17",
      title: "玉缘路站",
      status:'下行',
      dotType:'common',
      dot: ["54%", "59.2%"]
    },
    {
      dotId: "18",
      title: "广卫站",
      status:'下行',
      dotType:'common',
      dot: ["59.4%", "58.5%"]
    },
    {
      dotId: "19",
      title: "塔密站",
      status:'下行',
      dotType:'common',
      dot: ["64.4%", "59.3%"]
    },
    {
      dotId: "20",
      title: "斗南站",
      status:'下行',
      dotType:'common',
      dot: ["75.4%", "60.8%"]
    },
    {
      dotId: "21",
      title: "金桂街站",
      status:'下行',
      dotType:'common',
      dot: ["78%", "59.6%"]
    },
    {
      dotId: "22",
      title: "梅子村站",
      status:'下行',
      dotType:'common',
      dot: ["81%", "59.7%"]
    },
    {
      dotId: "23",
      title: "古城站",
      status:'下行',
      dotType:'common',
      dot: ["84.4%", "61.8%"]
    },
    {
      dotId: "24",
      title: "可乐村站",
      status:'下行',
      dotType:'common',
      dot: ["88.2%", "63.2%"]
    },
    {
      dotId: "25",
      title: "祥丰街站",
      status:'下行',
      dotType:'common',
      dot: ["93.8%", "64.6%"]
    },
    {
      dotId: "26",
      title: "牛头山站",
      status:'下行',
      dotType:'common',
      dot: ["94.8%", "70.3%"]
    },
    {
      dotId: "27",
      title: "联大街站",
      status:'下行',
      dotType:'common',
      dot: ["93.2%", "75.3%"]
    },
    {
      dotId: "28",
      title: "吴家营站",
      status:'下行',
      dotType:'common',
      dot: ["91%", "80.1%"]
    },
    {
      dotId: "29",
      title: "火车南站",
      status:'下行',
      dotType:'common',
      dot: ["89%", "84.2%"]
    }],
};
export default common;

