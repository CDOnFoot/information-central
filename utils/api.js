//20191014  界面api

export default {

  // 自定义布局信息
  
  loginIn: '/login',   //login登录

  getMenuInfo: '/visualizationLayout/getMenuInfo',   //获取菜单栏显示信息

  getTemplateInfo: '/visualizationLayout/getTemplateInfo',   //查看模版列表信息

  getContentInfo: '/visualizationLayout/getContentInfo',   //查看模块内容列表信息

  getUserVisualization: '/visualizationLayout/getUserVisualization',   //查看自动化布局信息
  
  updateUserContentInfo: '/visualizationLayout/updateUserContentInfo',   //修改自动化布局信息


  // 指标信息
  getEnergytopten: '/energy/topten',   //获取能耗排行数据信息

  energystructure:'/energy/structure', //获取能耗结构数据信息

  getStationCluster:'/other/stationcluster', //车站聚类

  getOntimeAndFullfillment:'/other/ontimeandfullfillment', //兑现率/正点率

  getODTopTen:'/passenger/odtopten', //OD排行

}
