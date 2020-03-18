<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">利用率排行</div>
      <div class="module-icon">
        <!--<img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
        <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">-->
        <span>{{this.$common.timestampToTime(new Date())}}</span>
      </div>
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-0"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MC02",
    data() {
      return {};
    },
    props: ["mcStatus", "mcTitle", "mcId"],
    watch: {
      mcStatus: function (val) {
        this.mcStatus = val;
      },
      mcTitle: function (val) {
        console.log(this.mcTitle);
        this.mcTitle = val;
      },
      mcId: function (val) {
        this.mcId = val;
      }
    },
    created() {
    },
    mounted() {
      this.initChart();
    },
    methods: {
      // 获取资源利用率
      getResourceUsage() {
        let res = [
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "eb5f1fba-6461-425a-af7b-e494100cb35d",
            "vm_monitor_name": "ec769a27-3d79-4194-ac74-1faa30cae26c",
            "value": 0.6,
            "name": "车公庄数据中心_redis-mysql_ec769a27-3d"
          },
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "0ad423fa-5938-4cb3-910d-4b11e4ed1624",
            "vm_monitor_name": "bdb4bd70-1bda-42b3-b14a-b3bb847ac8a7",
            "value": 0.6,
            "name": "车公庄数据中心_ActiveMQ-2_bdb4bd70-1b"
          },
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "6302e001-c167-47d3-b963-88b673a7c961",
            "vm_monitor_name": "6c117f22-dc0f-47cc-905b-eddea74ec39d",
            "value": 0.6,
            "name": "车公庄数据中心_ActiveMQ-1_6c117f22-dc"
          },
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "a7cdae96-01f9-4912-883d-de1c407423de",
            "vm_monitor_name": "45b25619-fec8-4ed8-9635-1780e17b1539",
            "value": 0.0,
            "name": "车公庄数据中心_redis-1_45b25619-fe"
          },
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "32820f58-9df7-4f59-8ed1-595b46a140b0",
            "vm_monitor_name": "766ad79f-355d-4924-9020-d7098ffec0e9",
            "value": 0.0,
            "name": "车公庄数据中心_Centos-1_766ad79f-35"
          },
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "0b763bff-fe42-4bbc-b7cc-04eef78a82ef",
            "vm_monitor_name": "9e6204dd-211f-4b71-b100-81bf85b5f4cc",
            "value": 0.0,
            "name": "车公庄数据中心_Centos-2_9e6204dd-21"
          },
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "1c4839f1-6c44-41f8-97b6-4a247b6a5d5e",
            "vm_monitor_name": "55ee6f9e-e509-438c-9bde-eca43d0b7184",
            "value": 0.0,
            "name": "车公庄数据中心_windows2012_55ee6f9e-e5"
          },
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "aeb1b950-1b69-48f9-a362-7eeb352e0ea5",
            "vm_monitor_name": "258492da-adf2-48d3-933e-127737c93664",
            "value": 0.0,
            "name": "车公庄数据中心_redis-2_258492da-ad"
          },
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "d9e28f22-6848-4428-97d9-099d16c8971c",
            "vm_monitor_name": "4cda3f90-1133-4ca5-abac-f5dd77bf626f",
            "value": 0.0,
            "name": "车公庄数据中心_DAQ-1_4cda3f90-11"
          },
          {
            "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
            "id": "364c433b-076a-4da7-966c-ca49e9a9d9f3",
            "vm_monitor_name": "0a275057-f5ef-4b44-a8e6-4b530c7fbf40",
            "value": 0.0,
            "name": "车公庄数据中心_base_0a275057-f5"
          }
        ]

        const that = this;
        let param = {
          counter: "",
          openstack_name: "",
          region_name: ""
        };
        this.$http.get(that.$api.checkResourceUsageRank, param).then(res => {
          if (res.status === 200) {
            if (res) {
              // 填充数据
            } else {
              // 当数据库里没有数据时的处理
            }
          }
        })
      },
      initChart() {

        let chartInit = this.$echarts.init(document.getElementById("chart-0"));

        app.config = {
          rotate: 90,
          align: "left",
          verticalAlign: "middle",
          position: "insideBottom",
          distance: 20,
          onChange: function () {
            let labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
                // label:{
                //   textStyle:{
                //     fontSize: 10,
                //   }
                // }
              }
            };
            chartInit.setOption({
              series: [
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                }
              ]
            });
          }
        };

        let labelOption = {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: '{c} %',
          fontSize: 8,
          rich: {
            name: {
              textBorderColor: "#fff"
            }
          }
        };

        let option = {
          // color: ['#ff9745', '#a859ff', '#34abff', '#6b89ff', '#006699'],
          color: ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#9287e7"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            // formatter: '{b}<br />{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%<br />{a3}: {c3}%<br />{a4}: {c4}%'
            formatter: function (params) {
              let result = '';
              params.forEach(function (item, i) {
                result += (i == 0 ? item.name + '</br>' : '') + " " + item.marker + " " + item.seriesName + " : " + item.value + "%</br>";
              });
              return result;
            }
          },
          legend: {
            x: "125px",
            y: "28px",
            textStyle: {
              color: "#ffffff",
              fontSize: 10
            },
            data: ["TOP1", "TOP2", "TOP3", "TOP4", "TOP5"]
          },
          toolbox: {
            show: false,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ["line", "bar", "stack", "tiled"]},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          grid: {
            left: '8%',
            right: '8%',
            top: '24%',
            bottom: '6%',
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              },
              data: [
                "云计算CPU利用率",
                "云计算内存利用率",
                "云计算存储利用率",
                "云桌面CPU利用率",
                "云桌面内存利用率",
                "云桌面存储利用率"
              ],
              axisLabel: {
                textStyle: {
                  fontSize: 10
                },
                interval: 0,
                formatter: function (value) {
                  let ret = "";
                  let maxLength = 3;
                  let rowNum = Math.ceil(value.length / maxLength);
                  if (rowNum > 1) {
                    for (let i = 0; i < 3; i++) {
                      let temp = "";
                      let start = i * maxLength;
                      let end = start + maxLength;
                      temp = value.substring(start, end) + (i == 0 ? '\n' : '');
                      ret += temp;
                    }
                    return ret;
                  } else {
                    return value;
                  }
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "利用率（%）",
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              },
            }
          ],
          series: [
            {
              name: "TOP1",
              type: "bar",
              barGap: 0,
              label: labelOption,
              data: [31, 22, 26, 23, 43, 21],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [10, 10, 0, 0],

                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                }
              },
            },
            {
              name: "TOP2",
              type: "bar",
              label: labelOption,
              data: [24, 20, 23, 21, 38, 17],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [10, 10, 0, 0],

                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                }
              },
            },
            {
              name: "TOP3",
              type: "bar",
              label: labelOption,
              data: [23, 17, 14, 17, 37, 8],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [10, 10, 0, 0],

                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                }
              },
            },
            {
              name: "TOP4",
              type: "bar",
              label: labelOption,
              data: [15, 14, 11, 9, 32, 7],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [10, 10, 0, 0],

                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                }
              },
            },
            {
              name: "TOP5",
              type: "bar",
              label: labelOption,
              data: [13, 7, 7, 12, 9, 5],
              itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                  barBorderRadius: [10, 10, 0, 0],
                },
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                  color: this.$echarts.graphic.LinearGradient(0, 0, 1, 1,
                    [
                      {
                        offset: 0,
                        color: '#207d98'
                      },
                      {
                        offset: 1,
                        color: '#40e6ec'
                      }
                    ]
                  ),
                }
              },
            }
          ]
        };

        chartInit.setOption(option);

        setTimeout(() => {
          const value = Math.random() * 100;
          chartInit.clear();
          chartInit.setOption(option);
        }, 1000);
      }
    }
  };
</script>

<style scoped>
  .main {
    color: #ffffff;
    padding: 1%;
    position: relative;
    width: 102.3%;
    height: 100.7%;
  }

  .main-id {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .none-data {
    font-size: 14px;
    text-align: center;
    padding-top: 20px;
    width: 100%;
    height: 100%;
  }
</style>
