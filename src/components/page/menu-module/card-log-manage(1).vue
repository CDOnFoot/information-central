<template>
  <div>
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchFor">
        <a-form-item label="门禁卡编号">
          <a-input placeholder="门禁卡编号" v-model="badgeCode"></a-input>
        </a-form-item>
        <a-form-item label="设备">
          <div>
            <a-select :defaultValue="equipments[0].DisplayName" style="width: 120px" @change="">
              <a-select-option v-for="equipment in equipments" :key="equipment.EntityId">
                {{equipment.DisplayName}}
              </a-select-option>
            </a-select>
          </div>
        </a-form-item>
        <a-form-item label="开始时间">
          <a-time-picker use12Hours format="h:mm:ss A" @change="searchStarttime"/>
        </a-form-item>
        <a-form-item label="结束时间">
          <a-time-picker use12Hours format="h:mm:ss A" @change="searchEndtime"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" html-type="submit">搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="file" @click="">导出</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="table">
      <a-table :columns="columns"
               :dataSource="tableList"
               :pagination="pagination"
               :loading="loading"
               :defaultExpandAllRows="expandAllRows"
               size="small">
      </a-table>
    </div>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";

  const columns = [
    {
      title: '刷卡时间',
      dataIndex: 'Time',
      align: 'center',
      width: 40,
    },
    {
      title: '卡号',
      dataIndex: 'BadgeCode',
      align: 'center',
      width: 20
    },
    {
      title: '卡类型',
      dataIndex: 'Type',
      align: 'center',
      width: 20
    },
    {
      title: '持卡人',
      dataIndex: 'cardholder',
      align: 'center',
      width: 20
    },
    {
      title: '控制器编号',
      dataIndex: 'EquipmentId',
      align: 'center',
      width: 20
    },
    {
      title: '设备名称（门）',
      dataIndex: 'Channel',
      align: 'center',
      width: 20
    },
    {
      title: '安全级别',
      dataIndex: '',
      align: 'center',
      width: 20,
    },
    {
      title: '结果',
      dataIndex: 'Result',
      align: 'center',
      width: 20,
    }
  ];

  const Equipments = [
    {
      "EntityId": 760,
      "Name": "1011",
      "DisplayName": "1011",
      "Code": "HVSG",
      "Location": "高压开关柜室",
      "Model": "35KV隔离开关",
      "Description": "35KV 1#进线隔离开关",
      "JsonCustomColumn": null,
      "TechnicalAddress": "10.166.4.101:2404",
      "TechnicalParameter": null,
      "Manufacturer": null,
      "ControlBoxSerial": "H11",
      "CustomProperties": "",
      "CheckPoint": false,
      "Zones": [],
      "Equipments": [],
      "Definition": {
        "EntityId": 103,
        "Name": "HVSG",
        "DisplayName": "35KV隔离开关",
        "Type": "Default"
      }
    },
    {
      "EntityId": 860,
      "Name": "1012",
      "DisplayName": "1012",
      "Code": "HVSG",
      "Location": "高压开关柜室",
      "Model": "35KV隔离开关",
      "Description": "35KV 1#进线隔离开关",
      "JsonCustomColumn": null,
      "TechnicalAddress": "10.166.4.101:2404",
      "TechnicalParameter": null,
      "Manufacturer": null,
      "ControlBoxSerial": "H11",
      "CustomProperties": "",
      "CheckPoint": false,
      "Zones": [],
      "Equipments": [],
      "Definition": {
        "EntityId": 103,
        "Name": "HVSG",
        "DisplayName": "35KV隔离开关",
        "Type": "Default"
      }
    },
    {
      "EntityId": 960,
      "Name": "1013",
      "DisplayName": "1013",
      "Code": "HVSG",
      "Location": "高压开关柜室",
      "Model": "35KV隔离开关",
      "Description": "35KV 1#进线隔离开关",
      "JsonCustomColumn": null,
      "TechnicalAddress": "10.166.4.101:2404",
      "TechnicalParameter": null,
      "Manufacturer": null,
      "ControlBoxSerial": "H11",
      "CustomProperties": "",
      "CheckPoint": false,
      "Zones": [],
      "Equipments": [],
      "Definition": {
        "EntityId": 103,
        "Name": "HVSG",
        "DisplayName": "35KV隔离开关",
        "Type": "Default"
      }
    },
  ];

  export default {
    name: "card-log-manage",
    components: {AFormItem},
    data() {
      return {
        columns,
        expandAllRows: true,
        pagination: {
          current: 0,
          defaultCurrent: 1,
          defaultPageSize: 20,
          // total: 0,
          // showQuickJumper: true
          onChange: (current) => this.changePage(current)
        },
        loading: false,
        tableList: [],
        equipments: '',
        badgeCode: '',
        starttime: '',
        endtime: '',
      }
    },

    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'advanced_search'});
    },

    created() {
      this.searchFor();
    },

    beforeMount() {

    },

    mounted() {
      this.$http.get(this.$api.getEquipments).then(res => {
        // console.log(res.data.value );
        this.equipments = Equipments;
      })
    },

    methods: {
      searchFor(e) {
        const that = this;
        this.tableList = [];
        // e.preventDefault();
        this.pagination.current = 1;
        this.loading = true;
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$http.get(that.$api.getTransactions).then(res => {
              console.log(res);
              that.pagination.total = res.data.value.length;
              let table = res.data.value;
              table.forEach((value, index) => {
                value.Time = this.$common.timestampToTime(value.Time);
                that.tableList.push(value);
              });
              if (that.badgeCode !== '') {
                that.tableList = that.tableList.filter((item, index, arr) => item.BadgeCode == that.badgeCode);
              }
              that.loading = false;
            })
          }
        })
      },

      getCardholder(badgeCode) {
        const that = this;
        let promise = new Promise(function (resolve, reject) {
          that.$http.get(that.$api.getCardholder + '\'' + badgeCode + '\'').then(res => {
            resolve(res)
            // table[index].cardholder = res[0].Cardholder.LastName;
            // table[index].cardholder = 1111111111111;
            // tableContainer.push(table[index]);
          });
        });
        return promise;
      },

      searchStarttime(time, timeString) {
        console.log(time._d, timeString);
      },

      searchEndtime(time, timeString) {
        console.log(time, timeString);
      },

      changePage(page) {
        this.handleTableChange(page);
      },

      handleTableChange(page) {
        const that = this;
        const pageSize = this.pagination.defaultPageSize;
        this.loading = true;
        this.pagination.current = page;
        this.$http.get(that.$api.getTransactions)
          .then((response) => {
            try {
              let index;
              let tableContainer = [];
              const table = response.data.value;
              for (let i = 0; i < parseInt(pageSize); i++) {
                index = (page - 1) * parseInt(pageSize) + i;
                table[index].Time = that.$common.timestampToTime(table[index].Time);
                tableContainer.push(table[index]);
              }
              console.log(tableContainer);
              tableContainer['cardholder'] = '';

              Promise.all([tableContainer.map(item => that.getCardholder(item.BadgeCode))]).then(result1 => {
                Promise.all(result1[0]).then(result2 => {
                  result2.map(function (item, i) {
                    console.log(item.data.value);
                    tableContainer[i].cardholder = 1111111111111;
                  });
                  that.tableList = tableContainer;
                });
              });

              // that.tableList = tableContainer;
            } catch (e) {
              console.log('there are some data have "null":' + e);
            }
            that.loading = false;
          })
      },

    }
  }
</script>

<style scoped>
  .modal-form {
    display: flex;
    flex-direction: row;
  }
</style>
