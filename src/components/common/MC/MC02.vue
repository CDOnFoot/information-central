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
      return {
        counter: {
          cpu_busy: 'cpu.busy', //cpu利用率
          mem_memused_percent: 'mem.memused.percent', //内存使用率
          df_total_used_percent: 'df.total.used.percent', //存储使用率
        }
      };
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
      // let p1 = this.checkResourceUsageRank(this.counter.cpu_busy);
      // let p2 = this.checkResourceUsageRank(this.counter.mem_memused_percent);
      // let p3 = this.checkResourceUsageRank(this.counter.df_total_used_percent);
      // let p4 = this.checkResourceUsageLink(this.counter.cpu_busy);
      // let p5 = this.checkResourceUsageLink(this.counter.mem_memused_percent);
      // let p6 = this.checkResourceUsageLink(this.counter.df_total_used_percent);

      /*Promise.all([p1, p2, p3, p4, p5, p6]).then((result) => {
        // console.log(result);
        let res0 = (result[0] == undefined) ? [] : result[0];
        let res1 = (result[1] == undefined) ? [] : result[1];
        let res2 = (result[2] == undefined) ? [] : result[2];
        let res3 = (result[3] == undefined) ? [] : result[3];
        let res4 = (result[4] == undefined) ? [] : result[4];
        let res5 = (result[5] == undefined) ? [] : result[5];

        this.initData([res0, res1, res2, res3, res4, res5]);

      }).catch((error) => {
        console.log(error);
      });*/

      // this.initData([[20, 37], [48, 39], [59, 40], [50, 33], [29, 40], [50, 30]]);
      this.initChart([[20, 37, 49, 30, 30, 50], [48, 39, 40, 37, 59, 48], [59, 40, 30, 50, 69, 50],
        [50, 33, 30, 50, 47, 50], [29, 40, 40, 60, 38, 49], [50, 30, 40, 58, 38, 60]]);
    },
    methods: {
      // 物理机资源利用率
      checkResourceUsageRank(counter) {
        const that = this;
        let param = {
          counter: counter,
          openstack_name: "车公庄数据中心",
          region_name: "RegionOne"
        };
        this.$http.get(that.$api.checkResourceUsageRank, param).then(res => {
          if (res.status === 200) {
            if (res) {
              // 填充数据
              return res;
            } else {
              // 当数据库里没有数据时的处理
              return [
                {
                  "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
                  "name": "10.0.10.20-t2-com20",
                  "ip": "10.0.10.20",
                  "value": 31.558935,
                  "service_role": [
                    "计算节点"
                  ],
                  "monitor_name": "t2-com20-10.0.10.20",
                  "id": "83549408-9bc1-4e66-8da6-d9ac9f4d2fa7"
                },
                {
                  "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
                  "name": "10.0.10.18-t2-com18",
                  "ip": "10.0.10.18",
                  "value": 30.982368,
                  "service_role": [
                    "计算节点"
                  ],
                  "monitor_name": "t2-com18-10.0.10.18",
                  "id": "6cefe5fb-b1af-4b15-986a-f92dd76a849c"
                },
                {
                  "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
                  "name": "10.0.10.17-t2-ctl17",
                  "ip": "10.0.10.17",
                  "value": 15.710723,
                  "service_role": [
                    "计算节点",
                    "控制节点"
                  ],
                  "monitor_name": "t2-ctl17-10.0.10.17",
                  "id": "8a66523f-6efb-4103-baec-1ac9646e763d"
                },
                {
                  "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
                  "name": "10.0.10.11-t2-ctl11 ",
                  "ip": "10.0.10.11",
                  "value": 13.325031,
                  "service_role": [
                    "计算节点",
                    "控制节点"
                  ],
                  "monitor_name": "t2-ctl11-10.0.10.11",
                  "id": "afd37811-3372-4128-afe7-30b276353a0e"
                },
                {
                  "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
                  "name": "10.0.10.23-t2-ctl23",
                  "ip": "10.0.10.23",
                  "value": 12.262958,
                  "service_role": [
                    "计算节点",
                    "控制节点"
                  ],
                  "monitor_name": "t2-ctl23-10.0.10.23",
                  "id": "84c82ea5-2c54-4ce0-aa26-013c9e09ab77"
                }
              ];
            }
          }
        });
      },
      // 虚拟机资源利用率
      checkResourceUsageLink(counter) {
        const that = this;
        let param = {
          counter: counter,
          openstack_name: "车公庄数据中心",
          region_name: "RegionOne"
        };
        this.$http.get(that.$api.checkResourceUsageLink, param).then(res => {
          if (res.status === 200) {
            if (res) {
              // 填充数据
              return res;
            } else {
              // 当数据库里没有数据时的处理
              return [
                {
                  "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
                  "id": "d9e28f22-6848-4428-97d9-099d16c8971c",
                  "vm_monitor_name": "4cda3f90-1133-4ca5-abac-f5dd77bf626f",
                  "value": 51.0,
                  "name": "车公庄数据中心_DAQ-1_4cda3f90-11"
                },
                {
                  "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
                  "id": "65e5bb04-9385-472c-a98e-cdfcb29ab63b",
                  "vm_monitor_name": "74685e04-2e01-4dce-9bf8-a7e3ebb43c45",
                  "value": 45.0,
                  "name": "车公庄数据中心_SQL-1_74685e04-2e"
                },
                {
                  "proxy_id": "422122A3-290A-1FE6-FEC5-6408C3652E24",
                  "id": "18386d3c-923f-4d60-86d8-e834ef5ea0e7",
                  "vm_monitor_name": "820c8fdb-90c3-4026-821f-126299a5c87c",
                  "value": 5.0,
                  "name": "车公庄数据中心_IIS-DC-DNS_820c8fdb-90"
                },
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
                }
              ];
            }
          }
        });
      },
      initData(data) {
        let arr = [];
        let datas = data;
        datas.forEach((data, index) => {
          arr.push([]);
          data.forEach((item) => {
            console.log(item);
            arr[index].push(item.value);
          });
        });

        console.log(arr);
        arr.forEach((item, index) => {
          item = item.sort(this.sortNumber);
        });

        let sortArr = [[], [], [], [], [], []];
        sortArr.forEach((item, index) => {
          arr.forEach((item2, index2) => {
            item.push(item2[index]);
          });
        });

        this.initChart(sortArr);

      },

      sortNumber(a, b) {
        return b - a
      },

      initChart(data) {
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
              // data: [31, 22, 26, 23, 43, 21],
              data: data[0],
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
              // data: [24, 20, 23, 21, 38, 17],
              data: data[1],
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
              // data: [23, 17, 14, 17, 37, 8],
              data: data[2],
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
              // data: [15, 14, 11, 9, 32, 7],
              data: data[3],
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
              // data: [13, 7, 7, 12, 9, 5],
              data: data[4],
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
