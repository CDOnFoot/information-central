<template>
  <div class="card-log-manage">
    <div class="search-condition">
      <a-form layout="inline" :form="form">
        <a-form-item label="门禁卡号">
          <a-input placeholder="门禁卡号" v-model="badgeCode"></a-input>
        </a-form-item>
        <a-form-item label="设备名称">
          <div>
            <a-select defaultValue style="width: 150px" @change="changeEquipment">
              <a-select-option value>
                全部
              </a-select-option>
              <a-select-option v-for="equipment in equipments" :key="equipment.EntityId">
                {{equipment.DisplayName}}
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
      <a-table
        :columns="columns"
        :dataSource="filterList"
        :pagination="pagination"
        :loading="loading"
        :defaultExpandAllRows="expandAllRows"
        size="small"
      >
      </a-table>
    </div>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";

  const columns = [
    {
      title: "刷卡时间",
      dataIndex: "DisplayTime",
      align: "center",
      width: 40
    },
    {
      title: "门禁卡号",
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
      dataIndex: "Equipment",
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
          size: "large",
          // showQuickJumper: true,
          onChange: current => this.changePage(current)
        },
        loading: false,
        equipments: [],
        tableData: [],
        tableList: [],
        filterList: [],
        badgeCode: "",
        equipmentId: "",
        starttime: null,
        endtime: null,
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
        console.log(res.data.value);
        this.equipments = res.data.value;
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
              if (self.tableData.length == 0) {

              }
              console.log(self.tableData);

              for (let i = 0; i < self.tableData.length; i++) {
                let item = self.tableData[i];

                let time = item.Time;
                let displayTime = self.$common.timestampToTime(time);
                let badgeCode = item.BadgeCode;
                let type = item.Type;
                let cardholder = item.Cardholder;
                let equipmentId = item.EquipmentId;
                let equipmentName = "";
                let security = "";
                let result = item.Result;

                // item.DisplayTime = self.$common.timestampToTime(item.Time);

                for (let j = 0; j < self.equipments.length; j++) {
                  let item2 = self.equipments[j];
                  if (item.EquipmentId == item2.EntityId) {
                    equipmentName = item2.Name;
                    security = item2.JsonCustomColumn;
                  }
                }

                let bean = {
                  Time: time,
                  DisplayTime: displayTime,
                  BadgeCode: badgeCode,
                  Type: type,
                  Cardholder: cardholder,
                  EquipmentId: equipmentId,
                  EquipmentName: equipmentName,
                  Security: security,
                  Result: result,
                };

                self.tableList.push(bean);
              }

              self.filterList = self.tableList;

              self.pagination.total = self.filterList.length;
              self.changePage(self.pagination.current);
            });
          }
        });
      },

      searchFor() {
        let self = this;
        self.filterList = self.tableList;
        self.filterList = self.filterList.filter(
          item => (item.BadgeCode + "").indexOf(self.badgeCode) > -1
        );
        self.filterList = self.filterList.filter(
          item => (item.EquipmentId + "").indexOf(self.equipmentId) > -1
        );
        if (self.starttime != null && self.endtime != null) {
          self.filterList = self.filterList.filter(
            item =>
              new Date(item.Time).getTime() >
              new Date(self.starttime).getTime() &&
              new Date(item.Time).getTime() < new Date(self.endtime).getTime()
          );
        }
        self.pagination.total = self.filterList.length;
        self.pagination.current = 1;
        self.changePage(self.pagination.current);
      },

      changePage(page) {
        let self = this;
        self.handleTableChange(page);
      },

      handleTableChange(page) {
        let self = this;
        // self.loading = true;
        let pageSize = self.pagination.defaultPageSize;
        let index;
        let array = [];
        for (let i = 0; i < parseInt(pageSize); i++) {
          index = (page - 1) * parseInt(pageSize) + i;
          if (self.filterList[index] && self.filterList[index].BadgeCode) {
            if (array.indexOf(self.filterList[index].BadgeCode) == -1) {
              array.push(self.filterList[index].BadgeCode);
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
                      self.filterList[index] &&
                      self.filterList[index].BadgeCode == array[_index]
                    ) {
                      let Cardholder = item.data.value;
                      self.$set(self.filterList[index], "Cardholder", Cardholder);
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
        let self = this;
        self.equipmentId = value;
      },

      changeStarttime(value) {
        let self = this;
        self.starttime = value;
      },

      changeEndtime(value) {
        let self = this;
        self.endtime = value;
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
