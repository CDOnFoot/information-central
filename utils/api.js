//20191014  界面api

export default {

  // 自定义布局信息

  login: 'auth.crias.com/Authorization/api/Authentication/Login',   //login登录

  getMenuInfo: '/server-0.0.1-SNAPSHOT/visualizationLayout/getMenuInfo',   //获取菜单栏显示信息

  getTemplateInfo: '/server-0.0.1-SNAPSHOT/visualizationLayout/getTemplateInfo',   //查看模版列表信息

  getContentInfo: '/server-0.0.1-SNAPSHOT/visualizationLayout/getContentInfo',   //查看模块内容列表信息

  getUserVisualization: '/server-0.0.1-SNAPSHOT/visualizationLayout/getUserVisualization',   //查看自动化布局信息
  
  updateUserContentInfo: '/server-0.0.1-SNAPSHOT/visualizationLayout/updateUserContentInfo',   //修改自动化布局信息

  // 指标信息
  getEnergytopten: '/energy/energytopten',   //获取能耗排行数据信息

}
