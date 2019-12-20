<template>
  <div class="alarm-history">
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchForAlarmHistory">
        <a-form-item label="报警名称：">
          <a-input placeholder="报警名称" v-model="historyName"></a-input>
        </a-form-item>
        <!--<a-form-item label="报警">
          <a-input placeholder="报警级别" v-model="searchAlarmLevel"></a-input>
        </a-form-item>-->
        <a-form-item>
          <a-button type="primary" icon="search" html-type="submit">搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="form" @click="exportAlarmHistory">导出</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="table">
      <a-table :columns="column"
               :loading="loading"
               :pagination="pagination"
               :dataSource="tableList"
               size="small">
        <template slot="operation" slot-scope="text, record">
          <!--<a-button type="primary" @click="sureAlarm(record)">确认报警</a-button>-->
          <!--<a-button type="primary" @click="editUser(record)">编辑</a-button>-->
          <!--<a-button type="primary" @click="deleteUser(record)">删除</a-button>-->
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    export default {
        name: "alarm-history",
      components: {AFormItem},
      data () {
          return {
            /**
             * @description 这里不再使用 ant 官方 API 创建 form 校验，直接绑定两个 state 来判断是否有查询条件
             */
            historyName: '',
            searchAlarmLevel: '',
            loading: false,
            tableListContainer: [],
            pagination: {
              current: 1,
              defaultCurrent: 1,
              defaultPageSize: 25,
              total: 0,
              size: 'large',
              onChange: (current) => this.handlePageHistory(current)
            },
            column: [
              {
                title: '报警名称',
                dataIndex: 'AlarmName',
                align: 'center',
                // sorter: true,
                width: '16%',
                // scopedSlots: { customRender: 'name' }
              },
              /*{
                title: '报警级别',
                dataIndex: 'AlarmLevel',
                align: 'center',
                width: '10%'
              },*/
              {
                title: '报警类型',
                dataIndex: 'AlarmType',
                align: 'center',
                width: '10%'
              },
              {
                title: '报警详情',
                dataIndex: 'AlarmDescription',
                align: 'center',
                width: '18%'
              },
              {
                title: '报警时间',
                dataIndex: 'AlarmDateTime',
                align: 'center',
                width: '18%'
              },
              {
                title: '设备标识',
                dataIndex: 'EquipmentId',
                align: 'center',
                width: '10%'
              },
              {
                title: '报警点标识',
                dataIndex: 'PointId',
                align: 'center',
                width: '10%'
              },
              {
                title: '报警状态',
                dataIndex: 'AlarmStatus',
                align: 'center',
                // width: '10%'
              },
              /*{
                title: '操 作',
                // dataIndex: 'tel',
                align: 'center',
                width: 40,
                scopedSlots: { customRender: 'operation' }
              }*/
            ],
            tableList: []
          }
      },

      /**
       * @default 这个生命周期钩子不再使用
       */
      beforeCreate () {
        this.form = this.$form.createForm(this, { name: 'advanced_search' });
      },

      mounted () {
          this.initTableList();
      },

      methods: {
          initTableList () {
            const that = this;
            this.loading = true;
            this.pagination.current = 1;
            try {
              this.$http.get(that.$api.getAlarmHistory).then(res => {
                let table = [];
                let tableContainer = res.data.value;
                // const length = that.pagination.defaultPageSize;
                tableContainer.forEach((value, index) => {
                  value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                  value.AlarmStatus = value.AlarmStatus === '"Unprocessed"' ? '处理中' : '未处理';
                  // value.AlarmLevel = value.AlarmLevel.Name;
                  table.push(value);
                });
                that.tableList = table;
                that.pagination.total = that.tableList.length;
                that.loading = false;
              })
            } catch (e) {
              console.log(e);
              that.loading = false;
            }
          },

        searchForAlarmHistory () {
          const that = this;
          // e.preventDefault();
          this.tableList = [];
          this.tableListContainer = [];
          // 每次查询回到第一页
          this.pagination.current = 1;
          this.loading = true;
          // 使用当前绑定状态进行校验
          this.$http.get(that.$api.getAlarmHistory).then(res => {
            if (res.status === 200) {
              // let index = {};
              let table = [];
              let tableContainer = res.data.value;
              // const length = that.pagination.defaultPageSize;
              // that.pagination.total = tableContainer.length;
              tableContainer.forEach((value, index) => {
                value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                value.AlarmStatus = value.AlarmStatus === 'Unprocessed' ? '未处理' : '处理中';
                // 历史接口暂时没有报警级别
                // value.AlarmLevel = value.AlarmLevel.Name;
                if (that.historyName !== '') {
                  if (value.AlarmName.includes(that.historyName)) {
                    that.tableList.push(value);
                    table.push(value);
                    // 额外的缓存
                    // that.tableListContainer = table;
                  }
                } else {
                  that.tableList.push(value);
                }
              });
              that.pagination.total = that.tableList.length;
            }
            this.loading = false;
          })
        },

        exportAlarmHistory () {},

        handlePageHistory (page) {
            this.pagination.current = page;
          const that = this;
          /*if (that.searchAlarmLevel !== '') {
            this.handlePageForHistory(page);
          } else {
            this.callbackPageHistory(page);
          }*/
        },
        handlePageForHistory (page) {
          const that = this;
          this.loading = true;
          // this.tableList = [];
          this.$http.get(that.$api.getAlarmHistory).then(res => {
            if (res.status === 200) {
              let table = [];
              let tableContainer = res.data.value;
              // const length = that.pagination.defaultPageSize;
              // that.pagination.total = tableContainer.length;
              tableContainer.forEach((value, index) => {
                value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                value.AlarmStatus = value.AlarmStatus === 'Unprocessed' ? '未处理' : '处理中';
                // 只获取一个 Name 字段
                // value.AlarmLevel = value.AlarmLevel.Name;
                if (
                  /*value.AlarmName === that.searchAlarmName*/
                /* || value.AlarmLevel.Name === that.searchAlarmLevel*/
                  value.AlarmName.includes(that.historyName) /*|| value.AlarmLevel.Name.includes(that.searchAlarmLevel)*/
                ) {
                  // that.tableList.push(value);
                  table.push(value);
                }
              });
              that.tableList = table;
            }
          });
          this.loading = false;
        },

        callbackPageHistory (page) {
          const that = this;
          this.loading = true;
          this.tableList = [];
          this.pagination.current = page;
          const pageSize = this.pagination.defaultPageSize;
          const length = this.tableList.length;
          this.$http.get(that.$api.getAlarmHistory + '&$top=' + that.pagination.defaultPageSize + '&$skip=' + (page - 1) * that.pagination.defaultPageSize)
            .then(res => {
              if (res.status === 200) {
                let table = [];
                const tableContainer = res.data.value;
                that.tableList = res.data.value;
                tableContainer.forEach((value, index) => {
                  value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                  value.AlarmStatus = value.AlarmStatus === "Unprocessed" ? '未处理' : '处理中';
                  // value.AlarmLevel = value.AlarmLevel.Name;
                  table.push(value);
                });
                that.tableList = table;
              }
              this.loading = false;
            })
        }
      }
    }
</script>

<style scoped>

</style>
