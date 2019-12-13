<template>
  <div class="card-log-manage">
    <div class="search-condition">
      <a-form layout="inline" :form="form">
        <a-form-item label="门禁卡号">
          <a-input placeholder="门禁卡号" v-model="badgeCode"></a-input>
        </a-form-item>
        <a-form-item label="设备">
          <div>
            <a-select defaultValue style="width: 150px" @change="changeEquipment">
              <a-select-option value>全部</a-select-option>
              <a-select-option v-for="equipment in equipments" :key="equipment.EntityId">{{equipment.DisplayName}}
              </a-select-option>
            </a-select>
          </div>
        </a-form-item>
        <a-form-item label="开始时间">
          <!-- <a-range-picker
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            :placeholder="['开始时间', '结束时间']"
            @change="changeTime"
            @ok="onOk"
          />-->
          <a-date-picker showTime @change="changeStarttime"/>
        </a-form-item>
        <a-form-item label="结束时间">
          <a-date-picker showTime @change="changeEndtime"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="searchFor">搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="file">导出</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="table">
      <a-table :columns="columns" :dataSource="tableList" :pagination="pagination" :loading="loading"
               :defaultExpandAllRows="expandAllRows" size="small"></a-table>
    </div>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";

  const columns = [{
    title: "刷卡时间",
    dataIndex: "DisplayTime",
    align: "center",
    width: 40
  },
    {
      title: "卡号",
      dataIndex: "BadgeCode",
      align: "center",
      width: 20
    },
    {
      title: "卡类型",
      dataIndex: "Type",
      align: "center",
      width: 20
    },
    {
      title: "持卡人",
      dataIndex: "Cardholder",
      align: "center",
      width: 20
    },
    {
      title: "控制器编号",
      dataIndex: "EquipmentId",
      align: "center",
      width: 20
    },
    {
      title: "设备名称（门）",
      dataIndex: "Channel",
      align: "center",
      width: 20
    },
    {
      title: "安全级别",
      dataIndex: "Security",
      align: "center",
      width: 20
    },
    {
      title: "结果",
      dataIndex: "Result",
      align: "center",
      width: 20
    }
  ];

  const Equipments = [{
    EntityId: "0",
    Name: "0",
    DisplayName: "0",
    Code: "HVSG",
    Location: "高压开关柜室",
    Model: "35KV隔离开关",
    Description: "35KV 1#进线隔离开关",
    JsonCustomColumn: null,
    TechnicalAddress: "10.166.4.101:2404",
    TechnicalParameter: null,
    Manufacturer: null,
    ControlBoxSerial: "H11",
    CustomProperties: "",
    CheckPoint: false,
    Zones: [],
    Equipments: [],
    Definition: {
      EntityId: 103,
      Name: "HVSG",
      DisplayName: "35KV隔离开关",
      Type: "Default"
    }
  },
    {
      EntityId: "1449145424",
      Name: "1012",
      DisplayName: "1449145424",
      Code: "HVSG",
      Location: "高压开关柜室",
      Model: "35KV隔离开关",
      Description: "35KV 1#进线隔离开关",
      JsonCustomColumn: null,
      TechnicalAddress: "10.166.4.101:2404",
      TechnicalParameter: null,
      Manufacturer: null,
      ControlBoxSerial: "H11",
      CustomProperties: "",
      CheckPoint: false,
      Zones: [],
      Equipments: [],
      Definition: {
        EntityId: 103,
        Name: "HVSG",
        DisplayName: "35KV隔离开关",
        Type: "Default"
      }
    },
    {
      EntityId: "2307752550",
      Name: "1013",
      DisplayName: "2307752550",
      Code: "HVSG",
      Location: "高压开关柜室",
      Model: "35KV隔离开关",
      Description: "35KV 1#进线隔离开关",
      JsonCustomColumn: null,
      TechnicalAddress: "10.166.4.101:2404",
      TechnicalParameter: null,
      Manufacturer: null,
      ControlBoxSerial: "H11",
      CustomProperties: "",
      CheckPoint: false,
      Zones: [],
      Equipments: [],
      Definition: {
        EntityId: 103,
        Name: "HVSG",
        DisplayName: "35KV隔离开关",
        Type: "Default"
      }
    }
  ];

  export default {
    name: "card-log-manage",
    components: {
      AFormItem
    },
    data() {
      return {
        columns,
        expandAllRows: true,
        pagination: {
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 20,
          total: 0,
          size: 'large',
          // showQuickJumper: true,
          onChange: current => this.changePage(current)
        },
        loading: false,
        equipments: Equipments,
        badgeCode: "",
        equipmentId: "",
        starttime: null,
        endtime: null,
        tableData: [],
        tableList: []
      };
    },

    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: "advanced_search"
      });
    },

    created() {
    },

    beforeMount() {
    },

    mounted() {
      this.loading = true;
      this.$http.get(this.$api.getEquipments).then(res => {
        // console.log(res.data.value);
        // this.equipments = res.data.value;
        // this.equipments = Equipments;
        this.initTable();
      });
    },

    methods: {
      initTable() {
        let self = this;
        self.loading = true;
        self.form.validateFields((err, values) => {
          if (!err) {
            self.$http.get(self.$api.getTransactions).then(res => {
              self.tableData = res.data.value;
              self.tableData.forEach((value, index) => {
                let time = value.Time;
                value.DisplayTime = self.$common.timestampToTime(time);
                self.equipments.forEach((value2, index2) => {
                  if (value.BadgeCode == value2.EntityId) {
                    // ?
                    value.Security = value2.Code;
                  }
                });
                self.tableList.push(value);
              });
              self.pagination.total = self.tableList.length;
              self.changePage(self.pagination.current);
            });
          }
        });
      },

      searchFor() {
        let self = this;
        self.tableList = self.tableData;
        self.tableList = self.tableList.filter(
          item => (item.BadgeCode + "").indexOf(self.badgeCode) > -1
        );
        self.tableList = self.tableList.filter(
          item => (item.EquipmentId + "").indexOf(self.equipmentId) > -1
        );
        if (self.starttime != null && self.endtime != null) {
          self.tableList = self.tableList.filter(
            item =>
              new Date(item.Time).getTime() >
              new Date(self.starttime).getTime() &&
              new Date(item.Time).getTime() < new Date(self.endtime).getTime()
          );
        }
        self.pagination.total = self.tableList.length;
        self.pagination.current = 1;
        self.changePage(self.pagination.current);
      },

      changePage(page) {
        this.handleTableChange(page);
      },

      handleTableChange(page) {
        let self = this;
        // self.loading = true;
        let pageSize = self.pagination.defaultPageSize;
        let index;
        let array = [];
        for (let i = 0; i < parseInt(pageSize); i++) {
          index = (page - 1) * parseInt(pageSize) + i;
          if (self.tableList[index] && self.tableList[index].BadgeCode) {
            if (array.indexOf(self.tableList[index].BadgeCode) == -1) {
              array.push(self.tableList[index].BadgeCode);
            }
          }
        }
        if (array.length) {
          Promise.all([array.map(item => self.getCardholder(item))]).then(
            result1 => {
              Promise.all(result1[0]).then(result2 => {
                result2.map(function (item, _index) {
                  index = "";
                  for (let i = 0; i < parseInt(pageSize); i++) {
                    index = (page - 1) * parseInt(pageSize) + i;
                    if (
                      self.tableList[index] &&
                      self.tableList[index].BadgeCode == array[_index]
                    ) {
                      let Cardholder = item.data.value;
                      // Cardholder = "N/A";
                      self.$set(self.tableList[index], "Cardholder", Cardholder);
                    }
                  }
                });
                self.pagination.current = page;
                self.loading = false;
              });
            }
          );
        } else {
          self.pagination.current = page;
          self.loading = false;
        }
      },

      getCardholder(value) {
        let self = this;
        let promise = new Promise(function (resolve, reject) {
          self.$http
            .get(self.$api.getCardholder + "'" + value + "'")
            .then(res => {
              resolve(res);
            });
        });
        return promise;
      },

      changeEquipment(value) {
        this.equipmentId = value;
      },

      changeStarttime(value) {
        this.starttime = value;
      },

      changeEndtime(value) {
        this.endtime = value;
      }
    }
  };

</script>

<style scoped>
  .ant-form-item {
  }

  .modal-form {
    display: flex;
    flex-direction: row;
  }

  /*/deep/ .ant-table-body {*/
  /*font-size: .2em;*/
  /*}*/

  /deep/ .ant-form-item-label label {
    color: #ffffff;
  }

  /*/deep/ .ant-pagination {*/
  /*color: #ffffff;*/
  /*}*/

  /*/deep/ .ant-pagination-item a {*/
  /*color: #ffffff;*/
  /*}*/

  /*/deep/ .ant-pagination-item-active a {*/
  /*color: #000000;*/
  /*}*/

  /*/deep/ .ant-pagination-jump-prev, .ant-pagination-jump-next {*/
  /*color: #ffffff;*/
  /*}*/

  /*/deep/ .ant-pagination-prev a, /deep/ .ant-pagination-next a {*/
  /*color: #ffffff;*/
  /*}*/

  /deep/ .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, /deep/ .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: #ffffff;
  }

</style>
