webpackJsonp([2],{"X6/e":function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=[{title:"DisplayName",dataIndex:"DisplayName",align:"center",width:"50%"},{title:"Desc",dataIndex:"Desc",align:"center",width:"50%"}],s={name:"info",data:function(){return{data:[],equipment:this.Equipment,pointInfo:this.PointInfo,pointVal:this.PointVal,imgUrl:n("dxoW"),columns:a,loading:!1}},props:["Equipment","PointInfo","PointVal"],watch:{Equipment:function(t){this.equipment=t,console.log(this.equipment)},PointInfo:function(t){this.pointInfo=t,console.log(this.pointInfo)},PointVal:function(t){this.pointVal=t,console.log(this.pointVal),this.init()}},mounted:function(){console.log(1)},methods:{init:function(){for(var t=[],i=0;i<this.pointInfo.length;i++){var n=this.pointInfo[i].DisplayName;if(-1==n.indexOf("只读")&&-1==n.indexOf("读构建")){var a=void 0,s=this.pointVal[i].t;"String"==s?a=this.pointVal[i].s:"Long"==s&&(a=this.pointVal[i].l),t.push({DisplayName:n,Desc:a})}}this.data=t}}},o={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"content"},[i("div",{staticClass:"mk"},[i("div",{staticClass:"mk-container"},[i("div",{staticClass:"mk-pic"},[i("img",{attrs:{src:this.imgUrl,alt:""}})])])]),this._v(" "),i("div",{staticClass:"mk"},[i("div",{staticClass:"mk-container"},[i("div",{staticClass:"pointStatusTime"}),this._v(" "),i("div",{staticClass:"mk-list"},[i("a-table",{attrs:{rowKey:"0",columns:this.columns,dataSource:this.data,showHeader:!1,pagination:!1,loading:this.loading}})],1)])])])},staticRenderFns:[]};var e=n("VU/8")(s,o,!1,function(t){n("m+m3")},"data-v-afc1874a",null);i.default=e.exports},"m+m3":function(t,i){}});
//# sourceMappingURL=2.1e32480c3409e69893ec.js.map