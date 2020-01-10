//20191014  界面api

export default {

  // 自定义布局信息

  // loginIn: '/login',   //login登录
  /**
   * @variation new API
   */
  // loginIn: ':81/Authorization/api/Authentication/LoginForWeb', // development API
  loginIn: ':81/Authorization/api/Authentication/Login', // production server API

  getUsers: "/config/Users?$filter=status ne 'Disable'",

  addUsers: '/config/Users/UpdateUser',

  updateUsers: '/config/Users/UpdateUser',

  deleteUser: '/config/Users/DeleteUser',

  lockUser: '/config/Users/LockUser',

  restartUser: '/config/Users/ReStartUser',

  getAlarm: '/alarm/alarmRealTimeInfos',

  getAlarmForPagination: '/alarm/alarmRealTimeInfos?$expand=AlarmLevel&$filter=SubsystemId eq 4&$orderby=AlarmDateTime desc',

  getAlarmHistory: '/Alarm/AlarmHistoryInfos?$expand=AlarmLevel&$filter=SubsystemId eq 4&$orderby=AlarmDateTime desc',

  confirmAlarm: '/alarm/api/AlarmStatus',

  alarmRules: '/Alarm/AlarmRules',

  allEquipmentPoint: '/config/pointinformations',

  allPointStatus: '/Point/api/GetPoint/GetPointValues',

  /**
   * @variation old API
   */

  loginOut: '/logout',   //login登出

  getMenuInfo: '/visualizationLayout/getMenuInfo',   //获取菜单栏显示信息

  getTemplateInfo: '/visualizationLayout/getTemplateInfo',   //查看模版列表信息

  getContentInfo: '/visualizationLayout/getContentInfo',   //查看模块内容列表信息

  getUserVisualization: '/visualizationLayout/getUserVisualization',   //查看自动化布局信息

  updateUserContentInfo: '/visualizationLayout/updateUserContentInfo',   //修改自动化布局信息

  layoutRestoreDefaults: '/visualizationLayout/layoutRestoreDefaults',   //恢复默认自动化布局信息

  monitorEquipments: '/config/Equipments',

  getCards: '/ACS/Cardholders?$expand=role,department,badges($filter=Enable eq true)',

  addCardholder: '/ACS/Cardholders?$expand=role,department,badges($filter=Enable eq true)',

  addCard: '/ACS/badges',

  updateCard: '/ACS/badges',

  deleteCard: '',

  getTransactions: '/ACS/Transactions',

  getCardholder: '/ACS/Badges?$expand=Cardholder&$filter=encoded eq ',

  getEquipments: '/config/equipments?$expand=Zones($filter=Type eq \'ACS_Zones\')&$filter=Zones/any(d:d/Type eq \'ACS_Zones\')',


  // 指标信息
  getEnergytopten: '/energy/topten',   //获取能耗排行数据信息

  energystructure: '/energy/structure', //获取能耗结构数据信息

  getStationCluster: '/other/stationcluster', //车站聚类

  getOntimeAndFullfillment: '/other/ontimeandfullfillment', //兑现率/正点率

  getODTopTen: '/passenger/odtopten', //OD排行

  getPassenger: '/passenger/passengerforecast',//查询客流走势/客流预测

  getRailInfo: '/passenger/getrailinfo',//查询列车实时运行图

  passengerEntryExitTopTen: '/passenger/passengerEntryExitTopTen',  //昨日进出站客流量排行

  energyVehicleTimes: '/energy/energyVehicleTimes',   //能耗车辆次

  passengerflowaccumulated: '/passenger/passengerflowaccumulated',  //当日累计进出站人数

  getpassengerflowrealtime: '/passenger/getpassengerflowrealtime',   //   各站实时客流

  passengerLoadHotspots: '/passenger/passengerLoadHotspots',   //   列车负载信息

  // 设备信息
  getAgServerDate: "/equipment/getAgServerDate",//Ag服务状态统计

  getAgServerDateTotal: "/equipment/getAgServerDateTotal",//Ag服务状态统计总数

  getTvmServerDate: "/equipment/getTvmServerDate",//tvm服务状态统计

  getTvmServerDateTotal: "/equipment/getTvmServerDateTotal",//tvm服务状态统计总数

  // getServerRateDate:"/equipment/getServerRateDate",//设备信息占比
  getServerRateDate: '/equipment/getServerRateDate?type=',  //设备信息占比 仪表盘数据  type=1（1为AG，2为TVM）
}
