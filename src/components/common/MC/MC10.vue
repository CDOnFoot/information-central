
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div id="passenger" :style="{width: '470px', height: '240px',margin:'0px 10px'}"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC010",
  data() {
    return {
        mcList:'',
        mcId:'',
      };
    },
    props:['mcStatus','mcTitle'],
    watch: {
      mcStatus: function (val) {
        this.mcStatus = val;
      },
      mcTitle: function (val) {
        this.mcTitle = val;
      }
    },
  mounted() {
    var self = this;
    this.mcList = this.$common.mcList;
    console.log(this.mcStatus);
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;

    this.drawLine();
  },
  created() {},
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let passenger = this.$echarts.init(document.getElementById("passenger"));
      // 绘制图表
      passenger.setOption({
        title: {
          // subtext: "2019/9/28 10:00-10:15"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          textStyle: {
            //图例文字的样式
            color: "white"
          },
          data: ["进站人数", "出站人数"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            axisLine: {
            lineStyle: {
              color: "white"
            }
          },
            type: "category",
            data: [
              "金川路",
              "大河梗",
              "海屯路",
              "小屯",
              "金鼎山北路",
              "苏家塘",
              "小菜园",
              "火车北站",
              "白龙路",
              "大树营",
              "菊花村",
              "菊华",
              "和甸营",
              "牛街庄",
              "朱家村",
              "羊甫头",
              "玉缘路"
            ]
          }
        ],
        yAxis: [
          {
            axisLine: {
            lineStyle: {
              color: "white"
            }
          },
            type: "value"
          }
        ],
        series: [
          {
            name: "进站人数",
            type: "bar",
            data: [
              2,
              4,
              7,
              23,
              25,
              76,
              135,
              162,
              32,
              20,
              6,
              3,
              16,
              20,
              13,
              9,
              8
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "出站人数",
            type: "bar",
            data: [
              2,
              5,
              9,
              26,
              28,
              70,
              175,
              182,
              48,
              18,
              6,
              2,
              8,
              6,
              9,
              10,
              14
            ],
            markPoint: {
              data: [
                { name: "年最高", value: 182, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.main {
  /* background: rgba(78, 58, 58, 0.411); */
  color: #ffffff;
  padding: 10px;
}
.borde {
  font-weight: 700;
  color: #3467c5;
  border-left: #3467c5 solid 4px;
  padding-left: 10px;
  margin: 0px 0px 0px 30px;
}
</style>
