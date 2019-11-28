<template>
  <div>
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchFor">
        <a-form-item label="门禁卡编号">
          <a-input placeholder="门禁卡编号" v-model="badgeCode"></a-input>
        </a-form-item>
        <a-form-item label="设备">
          <a-input placeholder="设备"></a-input>
        </a-form-item>git
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
      width: 40
    },
    {
      title: '卡类型',
      dataIndex: 'Type',
      align: 'center',
      width: 40
    },
    {
      title: '持卡人',
      dataIndex: '',
      align: 'center',
      width: 40
    },
    {
      title: '控制器编号',
      dataIndex: '',
      align: 'center',
      width: 40
    },
    {
      title: '设备名称（门）',
      dataIndex: 'Channel',
      align: 'center',
      width: 40
    },
    {
      title: '安全级别',
      dataIndex: '',
      align: 'center',
      width: 40,
    },
    {
      title: '结果',
      dataIndex: 'Result',
      align: 'center',
      width: 40,
    }
  ];

  export default {
    name: "card-log-manage",
    components: {AFormItem},
    data() {
      return {
        badgeCode: '',
        starttime: '',
        endtime: '',
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
      }
    },

    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'advanced_search'});
    },

    created() {

    },

    beforeMount() {
git
    },

    mounted() {

    },

    methods: {

      searchFor(e) {
        const that = this;
        this.tableList = [];
        e.preventDefault();
        this.pagination.current = 1;
        this.loading = true;
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$http.get(that.$api.getCardLog).then(res => {
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
        this.$http.get(that.$api.getCardLog)
          .then((response) => {
            try {
              let index;
              let tableContainer = [];
              const table = response.data.value;
              for (let i = 0; i < parseInt(pageSize); i++) {
                // 以当前页码设置渲染列表数据的索引
                index = (page - 1) * parseInt(pageSize) + i;
                table[index].Time = that.$common.timestampToTime(table[index].Time);
                tableContainer.push(table[index]);
              }
              that.tableList = tableContainer;
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
