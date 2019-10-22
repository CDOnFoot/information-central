// 20191014
var common = {
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

  // 设置cookie
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
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + (date.getDate() ) + ' ': date.getDate()+ ' ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes()+ ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds(): date.getSeconds();
    return Y + M + D + h + m +s;
  },
  menuList:[
    {
      title:'首页',
      key:'index',
      id:'CD01',
      mb:{
        id:'MB01',
        title:'模版一',
        mk:[
          {
            id:'MK01',
            title:'模块一',
            mc:{
              id:'MC01',
              title:'能耗排行',
              type:'sub'
            }
          },
          {
            id:'MK02',
            title:'模块二',
            mc:{
              id:'MC02',
              title:'能耗结构',
              type:'sub'
            }
          },
          {
            id:'MK03',
            title:'模块三',
            mc:{
              id:'MC03',
              title:'客流走势/预测',
              type:'sub'
            }
          },{
            id:'MK04',
            title:'模块四',
            mc:{
              id:'MC04',
              title:'列车实时运行图',
               tyle:'main',
            }
          },{
            id:'MK05',
            title:'模块五',
            mc:{
              id:'MC05',
              title:'车站聚类',
              type:'sub'
            }
          },{
            id:'MK06',
            title:'模块六',
            mc:{
              id:'MC06',
              title:'昨日OD排行top10',
              type:'sub'

            }
          },{
            id:'MK07',
            title:'模块七',
            mc:{
              id:'MC07',
              title:'兑现率/正点率',
              type:'sub'

            }
          },
        ]
      }
    },
    {
      title:'客流分析',
      key:'passenger',
      id:'CD02',
      mb:{
        id:'MB02',
        title:'模版二',
        mk:[
          {
            id:'MK01',
            title:'模块八',
          },{
            id:'MK02',
            title:'模块九',
          },{
            id:'MK03',
            title:'模块十'
          },{
            id:'MK04',
            title:'模块十一'
          },{
            id:'MK05',
            title:'模块十二'
          },{
            id:'MK06',
            title:'模块十三'
          },{
            id:'MK07',
            title:'模块十四'
          },{
            id:'MK08',
            title:'模块十五'
          },
        ]
      }
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
  btnList:[
    {title:'添加'},
    {title:'替换'},
    {title:'移除'},

  ],
  mbList:[
    {
      id:'MB01',
      title:'模版一'
    },
    {
      id:'MB02',
      title:'模版二'
    },
    // {
    //   id:'MB03',
    //   title:'模版三'
    // },
    // {
    //   id:'MB04',
    //   title:'模版四'
    // },
    // {
    //   id:'MB05',
    //   title:'模版五'
    // },
  ],
  mcList:[
    {
      id:'MC01',
      title:'能耗排行',
      type:'sub'
    },
    {
      id:'MC02',
      title:'能耗结构',
      type:'sub'

    },
    {
      id:'MC03',
      title:'客流走势/预测',
      type:'sub'
    },
    {
      id:'MC04',
      title:'列车实时运行图',
       type:'main',
    },
    {
      id:'MC05',
      title:'车站聚类',
      type:'sub'

    },
    {
      id:'MC06',
      title:'昨日OD排行top10',
      type:'sub'

    },

    {
      id:'MC07',
      title:'兑现率/正点率',
      type:'sub'
    },
    
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
  
};
export default common;
