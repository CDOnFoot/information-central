<template>
  <div>
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchFor">
        <a-form-item label="门禁卡编号">
          <a-input placeholder="门禁卡编号" v-model="searchCardNum"></a-input>
        </a-form-item>
        <a-form-item label="设备">
          <a-input placeholder="设备" v-model="searchDevName"></a-input>
        </a-form-item>
        <a-form-item label="开始时间">
          <a-time-picker use12Hours format="h:mm:ss A" @change="starttime"/>
        </a-form-item>
        <a-form-item label="结束时间">
          <a-time-picker use12Hours format="h:mm:ss A" @change="endtime"/>
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
      <a-table :columns="column"
               :dataSource="tableList"
               :pagination="pagination"
               :loading="loading"
               :defaultExpandAllRows="expandAllRows"
               size="small">
        <!--<template slot="operation" slot-scope="text, record">-->
        <!--<a-button type="primary" @click="checkCard(record)">查看</a-button>-->
        <!--<a-button type="primary" @click="editCard(record)">编辑</a-button>-->
        <!--<a-button type="primary" @click="deleteCard(record)">删除</a-button>-->
        <!--</template>-->
      </a-table>
    </div>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";

  const column = [
    {
      title: '刷卡时间',
      dataIndex: 'cardTime',
      align: 'center',
      width: 40,
    },
    {
      title: '卡号',
      dataIndex: 'cardNumber',
      align: 'center',
      width: 20
    },
    {
      title: '卡类型',
      dataIndex: 'cardType',
      align: 'center',
      width: 20
    },
    {
      title: '持卡人',
      dataIndex: 'cardUser',
      align: 'center',
      width: 20
    },
    {
      title: '控制器编号',
      dataIndex: 'controllerNumber',
      align: 'center',
      width: 30
    },
    {
      title: '设备名称（门）',
      dataIndex: 'devName',
      align: 'center',
      width: 30
    },
    {
      title: '安全级别',
      dataIndex: 'security',
      align: 'center',
      width: 30,
    },
    {
      title: '结果',
      dataIndex: 'result',
      align: 'center',
      width: 30,
    }
  ];

  export default {
    name: "card-log-manage",
    components: {AFormItem},
    data() {
      return {
        searchCardNum: '',
        searchDevName: '',
        searchStarttime: '',
        searchEndtime: '',
        column,
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
      }
    },

    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'advanced_search'});
    },

    created() {

    },

    beforeMount() {

    },

    mounted() {
      // this.searchFor();
    },

    methods: {

      searchFor(e) {
        const that = this;
        this.tableList = [];
        // 附带 searchName 为参数发起 HTTP 请求
        e.preventDefault();
        this.pagination.current = 1;
        this.loading = true;
        // 使用当前绑定状态进行校验
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$http.get(that.$api.getCardLog).then(res => {
              console.log(res);
              let tableContainer = [];
              // this.tableList = res.data.value;
              // this.pagination.total = this.tableList.length;

              // let tableContainer = [];
              // that.pagination.total = res.data.value.length;
              // const table = res.data.value;
              // table.forEach((value, index) => {
              //   value.Created = this.$common.timestampToTime(value.Created);
              //   value.Updated = this.$common.timestampToTime(value.Updated);
              //   value.Expired = this.$common.timestampToTime(value.Expired);
              //   value.Status = value.Status === 'Enable' ? '启用' : '停用';
              //   if (that.searchName !== '') {
              //     if (value.Name === that.searchName) {
              //       // that.tableList.push(value);
              //       tableContainer.splice(0, 1, value);
              //       that.tableList = tableContainer;
              //     }
              //   } else {
              //     that.tableList.push(value);
              //   }
              //   // that.tableList = table;
              //   // this.handleTableList(table)
              // });
              //
              // that.loading = false;
            })
          }

        })
      },

      starttime(time, timeString) {
        console.log(time, timeString);
      },

      endtime(time, timeString) {
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
        this.$http.get(that.$api.getUsers)
          .then((response) => {
            try {
              let index;
              let tableContainer = [];
              const table = response.data.value;
              for (let i = 0; i < parseInt(pageSize); i++) {
                // 以当前页码设置渲染列表数据的索引
                index = (page - 1) * parseInt(pageSize) + i;
                table[index].Created = that.$common.timestampToTime(table[index].Created);
                table[index].Updated = that.$common.timestampToTime(table[index].Updated);
                table[index].Expired = that.$common.timestampToTime(table[index].Expired);
                table[index].Status = table[index].Status === 'Enable' ? '启用' : '未启用';
                tableContainer.push(table[index]);
              }
              that.tableList = tableContainer;
            } catch (e) {
              console.log('there are some data have "null":' + e);
            }

            /*that.pagination.defaultCurrent = parseInt(page);
            const length = table.length;
            for (let i=0;i<17;i++) {
              let index = i + (page - 1) * parseInt(that.pagination.defaultPageSize);
              that.tableList.push(table[index]);
              that.tableList[index].Created = that.$common.timestampToTime(that.tableList[index].Created);
              that.tableList[index].Updated = that.$common.timestampToTime(that.tableList[index].Updated);
              that.tableList[index].Expired = that.$common.timestampToTime(that.tableList[index].Expired);
              that.tableList[index].Status = that.tableList[index].Status === 'Enable' ? '启用' : '未启用';
            }*/
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
