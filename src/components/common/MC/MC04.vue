

<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div id="stations">
        <div class="subwa"></div>

          <div
            v-for="(item,index) in list"
            :title="item.title"
            :style="{position:'absolute',top:item.dot[0],left:item.dot[1],width: '10px', height: '10px',background: 'red','border-radius':'5px'}"
            :key="index"
          ></div>

      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC04",
  data() {
    return {
      mcList: "",
      mcId: "",
      n: 0,
      list: [
        {
          dotId: "CZ01",
          title: "金川路站",
          dot: ["3%", "14%"]
        },
        {
          dotId: "CZ02",
          title: "金-大",
          dot: ["5.5%", "14.5%"]
        },
        {
          dotId: "CZ03",
          title: "大河埂站",
          dot: ["7%", "13.5%"]
        },
        {
          dotId: "CZ04",
          title: "大-海",
          dot: ["10%", "13.5%"]
        },
        {
          dotId: "CZ05",
          title: "海屯路站",
          dot: ["13.5%", "16.5%"]
        },
        {
          dotId: "CZ06",
          title: "海-小",
          dot: ["14%", "19%"]
        },
        {
          dotId: "CZ07",
          title: "小屯站",
          dot: ["16%", "21%"]
        },
        {
          dotId: "CZ08",
          title: "小-金",
          dot: ["16%", "23%"]
        },
        {
          dotId: "CZ09",
          title: "金鼎山北路站",
          dot: ["18.5%", "24.5%"]
        },
        {
          dotId: "CZ010",
          title: "金-苏",
          dot: ["18%", "26.3%"]
        },
        {
          dotId: "CZ011",
          title: "苏家塘站",
          dot: ["19%", "27.8%"]
        },
        {
          dotId: "CZ012",
          title: "苏-小",
          dot: ["18.5%", "30.5%"]
        },
        {
          dotId: "CZ013",
          title: "小菜园站",
          dot: ["19.8%", "33%"]
        },
        {
          dotId: "CZ014",
          title: "小-火",
          dot: ["20%", "35%"]
        },
        {
          dotId: "CZ015",
          title: "火车北站",
          dot: ["21.3%", "37.2%"]
        },
        {
          dotId: "CZ016",
          title: "火-白",
          dot: ["22%", "39.5%"]
        },
        {
          dotId: "CZ017",
          title: "白龙路站",
          dot: ["24%", "41.5%"]
        },
        {
          dotId: "CZ018",
          title: "白-大",
          dot: ["25.4%", "42.5%"]
        },
        {
          dotId: "CZ019",
          title: "大树营站",
          dot: ["27.6%", "42.5%"]
        },
        {
          dotId: "CZ020",
          title: "大-菊",
          dot: ["29%", "43.5%"]
        },
        {
          dotId: "CZ021",
          title: "菊花村站",
          dot: ["30.5%", "44%"]
        },
        {
          dotId: "CZ022",
          title: "菊-华",
          dot: ["31.8%", "45.5%"]
        },
        {
          dotId: "CZ023",
          title: "菊华站",
          dot: ["33%", "46.5%"]
        },
        {
          dotId: "CZ024",
          title: "菊-和",
          dot: ["35%", "48.5%"]
        },
        {
          dotId: "CZ025",
          title: "和甸营站",
          dot: ["36.2%", "51%"]
        },
        {
          dotId: "CZ026",
          title: "和-牛",
          dot: ["38.5%", "55%"]
        },
        {
          dotId: "CZ027",
          title: "牛街庄站",
          dot: ["40%", "58%"]
        },
        {
          dotId: "CZ028",
          title: "牛-朱",
          dot: ["41.6%", "59%"]
        },
        {
          dotId: "CZ029",
          title: "朱家村站",
          dot: ["43%", "58%"]
        },
        {
          dotId: "CZ030",
          title: "朱-羊",
          dot: ["46%", "58.5%"]
        },
        {
          dotId: "CZ031",
          title: "羊甫头站",
          dot: ["48.8%", "59.5%"]
        },
        {
          dotId: "CZ032",
          title: "羊-玉",
          dot: ["50.8%", "59.8%"]
        },
        {
          dotId: "CZ033",
          title: "玉缘路站",
          dot: ["52.8%", "58.8%"]
        },
        {
          dotId: "CZ034",
          title: "玉-广",
          dot: ["55.8%", "57.8%"]
        },
        {
          dotId: "CZ035",
          title: "广卫站",
          dot: ["59.8%", "58.3%"]
        },
        {
          dotId: "CZ036",
          title: "广-塔",
          dot: ["61.4%", "59.8%"]
        },
        {
          dotId: "CZ037",
          title: "塔密站",
          dot: ["63.4%", "59.3%"]
        },
        {
          dotId: "CZ038",
          title: "塔-斗",
          dot: ["68.4%", "60.8%"]
        },
        {
          dotId: "CZ039",
          title: "斗南站",
          dot: ["74.4%", "60.8%"]
        },
        {
          dotId: "CZ040",
          title: "斗-金",
          dot: ["75.8%", "61.8%"]
        },
        {
          dotId: "CZ041",
          title: "金桂街站",
          dot: ["75.8%", "59.8%"]
        },
        {
          dotId: "CZ042",
          title: "金-梅",
          dot: ["78.3%", "59.2%"]
        },
        {
          dotId: "CZ043",
          title: "梅子村站",
          dot: ["81.2%", "59.6%"]
        },
        {
          dotId: "CZ044",
          title: "梅-古",
          dot: ["82.6%", "61%"]
        },
        {
          dotId: "CZ045",
          title: "古城站",
          dot: ["84%", "61.5%"]
        },
        {
          dotId: "CZ046",
          title: "古-可",
          dot: ["85.6%", "63%"]
        },
        {
          dotId: "CZ047",
          title: "可乐村站",
          dot: ["87.6%", "63%"]
        },
        {
          dotId: "CZ048",
          title: "可-祥",
          dot: ["90%", "64.4%"]
        },
        {
          dotId: "CZ049",
          title: "祥丰街站",
          dot: ["93.4%", "64.3%"]
        },
        {
          dotId: "CZ050",
          title: "祥-牛",
          dot: ["95%", "68.3%"]
        },
        {
          dotId: "CZ051",
          title: "牛头山站",
          dot: ["95%", "72%"]
        },
        {
          dotId: "CZ052",
          title: "牛-联",
          dot: ["94.2%", "75%"]
        },
        {
          dotId: "CZ053",
          title: "联大街站",
          dot: ["93.8%", "77.4%"]
        },
        {
          dotId: "CZ054",
          title: "联-吴",
          dot: ["92%", "80%"]
        },
        {
          dotId: "CZ055",
          title: "吴家营站",
          dot: ["91.6%", "82.6%"]
        },
        {
          dotId: "CZ056",
          title: "吴-火",
          dot: ["89.2%", "84.6%"]
        },
        {
          dotId: "CZ057",
          title: "火车南站",
          dot: ["89.6%", "87.6%"]
        },

        {
          dotId: "CZ01",
          title: "金川路站",
          dot: ["4%", "17%"]
        },
        {
          dotId: "CZ02",
          title: "金-大",
          dot: ["6.2%", "16.5%"]
        },
        {
          dotId: "CZ03",
          title: "大河埂站",
          dot: ["8%", "16.5%"]
        },
        {
          dotId: "CZ04",
          title: "大-海",
          dot: ["10%", "15.5%"]
        },
        {
          dotId: "CZ05",
          title: "海屯路站",
          dot: ["11%", "18.5%"]
        },
        {
          dotId: "CZ06",
          title: "海-小",
          dot: ["13%", "20%"]
        },
        {
          dotId: "CZ07",
          title: "小屯站",
          dot: ["13%", "22.5%"]
        },
        {
          dotId: "CZ08",
          title: "小-金",
          dot: ["15%", "23.8%"]
        },
        {
          dotId: "CZ09",
          title: "金鼎山北路站",
          dot: ["15.5%", "25.5%"]
        },
        {
          dotId: "CZ010",
          title: "金-苏",
          dot: ["16.4%", "26.8%"]
        },
        {
          dotId: "CZ011",
          title: "苏家塘站",
          dot: ["16%", "28.3%"]
        },
        {
          dotId: "CZ012",
          title: "苏-小",
          dot: ["16.5%", "31%"]
        },
        {
          dotId: "CZ013",
          title: "小菜园站",
          dot: ["17%", "34%"]
        },
        {
          dotId: "CZ014",
          title: "小-火",
          dot: ["18.6%", "36%"]
        },
        {
          dotId: "CZ015",
          title: "火车北站",
          dot: ["19%", "38.2%"]
        },
        {
          dotId: "CZ016",
          title: "火-白",
          dot: ["20.4%", "40.5%"]
        },
        {
          dotId: "CZ017",
          title: "白龙路站",
          dot: ["21.8%", "43.8%"]
        },
        {
          dotId: "CZ018",
          title: "白-大",
          dot: ["24.4%", "44.5%"]
        },
        {
          dotId: "CZ019",
          title: "大树营站",
          dot: ["26.6%", "45.5%"]
        },
        {
          dotId: "CZ020",
          title: "大-菊",
          dot: ["28%", "46%"]
        },
        {
          dotId: "CZ021",
          title: "菊花村站",
          dot: ["28.8%", "47%"]
        },
        {
          dotId: "CZ022",
          title: "菊-华",
          dot: ["30%", "47.5%"]
        },
        {
          dotId: "CZ023",
          title: "菊华站",
          dot: ["31%", "48.5%"]
        },
        {
          dotId: "CZ024",
          title: "菊-和",
          dot: ["33%", "50%"]
        },
        {
          dotId: "CZ025",
          title: "和甸营站",
          dot: ["33.4%", "53%"]
        },
        {
          dotId: "CZ026",
          title: "和-牛",
          dot: ["36.5%", "55%"]
        },
        {
          dotId: "CZ027",
          title: "牛街庄站",
          dot: ["38%", "60%"]
        },
        {
          dotId: "CZ028",
          title: "牛-朱",
          dot: ["40.6%", "61%"]
        },
        {
          dotId: "CZ029",
          title: "朱家村站",
          dot: ["43.2%", "61%"]
        },
        {
          dotId: "CZ030",
          title: "朱-羊",
          dot: ["46%", "60.5%"]
        },
        {
          dotId: "CZ031",
          title: "羊甫头站",
          dot: ["49%", "62.5%"]
        },
        {
          dotId: "CZ032",
          title: "羊-玉",
          dot: ["51.6%", "61.8%"]
        },
        {
          dotId: "CZ033",
          title: "玉缘路站",
          dot: ["54%", "62.4%"]
        },
        {
          dotId: "CZ034",
          title: "玉-广",
          dot: ["55.8%", "59.8%"]
        },
        {
          dotId: "CZ035",
          title: "广卫站",
          dot: ["58.2%", "61.3%"]
        },
        {
          dotId: "CZ036",
          title: "广-塔",
          dot: ["61.4%", "61.8%"]
        },
        {
          dotId: "CZ037",
          title: "塔密站",
          dot: ["64%", "62.3%"]
        },
        {
          dotId: "CZ038",
          title: "塔-斗",
          dot: ["68.4%", "62.8%"]
        },
        {
          dotId: "CZ039",
          title: "斗南站",
          dot: ["74.8%", "63.8%"]
        },
        {
          dotId: "CZ040",
          title: "斗-金",
          dot: ["76.6%", "63%"]
        },
        {
          dotId: "CZ041",
          title: "金桂街站",
          dot: ["78.1%", "61.8%"]
        },
        {
          dotId: "CZ042",
          title: "金-梅",
          dot: ["79.3%", "61.2%"]
        },
        {
          dotId: "CZ043",
          title: "梅子村站",
          dot: ["80%", "62.6%"]
        },
        {
          dotId: "CZ044",
          title: "梅-古",
          dot: ["81.6%", "63%"]
        },
        {
          dotId: "CZ045",
          title: "古城站",
          dot: ["82.8%", "65%"]
        },
        {
          dotId: "CZ046",
          title: "古-可",
          dot: ["85.2%", "65.5%"]
        },
        {
          dotId: "CZ047",
          title: "可乐村站",
          dot: ["87%", "66.3%"]
        },
        {
          dotId: "CZ048",
          title: "可-祥",
          dot: ["90%", "64.4%"]
        },
        {
          dotId: "CZ049",
          title: "祥丰街站",
          dot: ["92.6%", "67.4%"]
        },
        {
          dotId: "CZ050",
          title: "祥-牛",
          dot: ["93.5%", "69.3%"]
        },
        {
          dotId: "CZ051",
          title: "牛头山站",
          dot: ["92.2%", "71.2%"]
        },
        {
          dotId: "CZ052",
          title: "牛-联",
          dot: ["92.2%", "74%"]
        },
        {
          dotId: "CZ053",
          title: "联大街站",
          dot: ["90.8%", "76.4%"]
        },
        {
          dotId: "CZ054",
          title: "联-吴",
          dot: ["90%", "79%"]
        },
        {
          dotId: "CZ055",
          title: "吴家营站",
          dot: ["88.6%", "81.2%"]
        },
        {
          dotId: "CZ056",
          title: "吴-火",
          dot: ["88.2%", "83.6%"]
        },
        {
          dotId: "CZ057",
          title: "火车南站",
          dot: ["86.6%", "86%"]
        }
      ]
    };
  },
  props: ["mcStatus", "mcTitle"],
  watch: {
    mcStatus: function(val) {
      this.mcStatus = val;
    },
    mcTitle: function(val) {
      this.mcTitle = val;
    }
  },
  mounted() {
    var self = this;
    this.mcList = this.$common.mcList;
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;
    //    this.drawLine();
  },
  created() {},
  methods: {}
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
.borde {
  font-weight: 700;
  color: #3467c5;
  border-left: #3467c5 solid 4px;
  position: absolute;
  top: 4%;
  left: 6%;
  padding-left: 3%;
}
#stations{
  width: 100%;
  height: 100%;

}
.subwa {
  height: 99.2%;
  width: 98%;
  background: url("../../../assets/img/列车实时运营图.png");
  margin-top: 0.8%;
  margin-left: -.3%;
}

</style>
