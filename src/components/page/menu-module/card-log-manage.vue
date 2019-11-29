<template>
  <div>
    <div class="search-condition">
      <a-form layout="inline" :form="form">
        <a-form-item label="门禁卡编号">
          <a-input placeholder="门禁卡编号" v-model="badgeCode"></a-input>
        </a-form-item>
        <a-form-item label="设备">
          <div>
            <a-select defaultValue="" style="width: 150px" @change="getequipments">
              <a-select-option value="">全部</a-select-option>
              <a-select-option v-for="equipment in equipments" :key="equipment.EntityId">
                {{equipment.DisplayName}}
              </a-select-option>
            </a-select>
          </div>
        </a-form-item>
        <a-form-item label="开始时间">
          <a-time-picker use12Hours format="h:mm:ss A" @change="getStarttime"/>
        </a-form-item>
        <a-form-item label="结束时间">
          <a-time-picker use12Hours format="h:mm:ss A" @change="getEndtime"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="initTable">搜索</a-button>
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
      "EntityId": 0,
      "Name": "0",
      "DisplayName": "0",
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
        // search
        equipments: Equipments,
        badgeCode: '',
        equipmentId: '',
        starttime: '',
        endtime: '',
        // table
        columns,
        expandAllRows: true,
        pagination: {
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 20,
          // total: 0,
          // showQuickJumper: true
          onChange: (current) => this.changePage(current)
        },
        loading: false,

        tableData: [],
        tableList: [],

      }
    },

    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'advanced_search'});
    },

    created() {
      this.$http.get(this.$api.getEquipments).then(res => {
        console.log(res.data.value);
        // this.equipments = res.data.value;
        // this.equipments = Equipments;
        this.initTable();
      });
    },

    beforeMount() {

    },

    mounted() {

    },

    methods: {

      initTable() {
        const that = this;
        that.loading = true;
        that.form.validateFields((err, values) => {
          if (!err) {
            that.$http.get(that.$api.getTransactions).then(response => {
              let temp = [];
              that.pagination.total = response.data.value.length;
              that.tableData = response.data.value;
              that.tableData.forEach((value, index) => {
                value.Time = this.$common.timestampToTime(value.Time);

                // if(that.badgeCode == value.BadgeCode){
                //     console.log(index)
                // }

                temp.push(value);
              });
              that.tableData = temp;

              // console.log(that.badgeCode);
              // console.log(that.equipmentId);
              // console.log(that.starttime);
              // console.log(that.endtime);

              temp = temp.filter(item => (item.BadgeCode + '').indexOf(that.badgeCode) > -1);

              temp = temp.filter(item => (item.EquipmentId + '').indexOf(that.equipmentId) > -1);

              if (that.starttime != '' && that.endtime != '') {
                temp = temp.filter(item => new Date(item.Time).getTime() > new Date(that.starttime).getTime() && new Date(item.Time).getTime() < new Date(that.endtime).getTime());
              }

              that.tableList = temp;
              console.log(that.tableList);
              that.handleTableChange(this.pagination.current);
            });
          }
        });
      },

      handleTableChange(page) {
        const that = this;
        that.loading = true;
        that.pagination.current = page;
        let pageSize = this.pagination.defaultPageSize;
        let index1;
        let BadgeCodeArray = [];

        for (let i = 0; i < parseInt(pageSize); i++) {
          index1 = (page - 1) * parseInt(pageSize) + i;

          if (that.tableList[index1] && that.tableList[index1].BadgeCode) {
            if (BadgeCodeArray.indexOf(that.tableList[index1].BadgeCode) == -1) {
              BadgeCodeArray.push(that.tableList[index1].BadgeCode);
            }
          }
        }

        console.log(BadgeCodeArray);

        if (BadgeCodeArray.length) {
          Promise.all([BadgeCodeArray.map(item => that.getCardholder(item))]).then(result1 => {
            Promise.all(result1[0]).then(result2 => {
              result2.map(function (item, _index) {
                console.log(item);
                let index2;

                for (let i = 0; i < parseInt(pageSize); i++) {
                  index2 = (page - 1) * parseInt(pageSize) + i;
                  if (that.tableList[index2] && that.tableList[index2].BadgeCode && that.tableList[index2].BadgeCode == BadgeCodeArray[_index]) {
                    that.tableList[index2].cardholder = 'cardholder';
                  }
                }

              });
              that.loading = false;
            });
          });
        } else {
          that.loading = false;
        }
      },

      changePage(page) {
        this.handleTableChange(page);
      },

      getCardholder(badgeCode) {
        const that = this;
        let promise = new Promise(function (resolve, reject) {
          that.$http.get(that.$api.getCardholder + '\'' + badgeCode + '\'').then(res => {
            resolve(res);
          });
        });
        return promise;
      },


      getequipments(value) {
        this.equipmentId = value;
      },

      getStarttime(time, timeString) {
        console.log(time, timeString);

        this.starttime = time._d;
      },

      getEndtime(time, timeString) {
        console.log(time, timeString);
        this.endtime = time._d;
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
