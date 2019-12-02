<template>
  <div class="alarm-history">
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchForAlarmHistory">
        <a-form-item label="报警名称：">
          <a-input placeholder="报警名称" v-model="searchAlarmName"></a-input>
        </a-form-item>
        <a-form-item label="报警">
          <a-input placeholder="报警级别" v-model="searchAlarmLevel"></a-input>
        </a-form-item>
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
            searchAlarmName: '',
            searchAlarmLevel: '',
            loading: false,
            pagination: {
              current: 1,
              defaultCurrent: 1,
              defaultPageSize: 20,
              total: 0,
              onchange: (current) => {
                this.handlePageChange(current);
              }
            },
            column: [
              {
                title: '报警名称',
                dataIndex: 'AlarmName',
                align: 'center',
                // sorter: true,
                width: '10%',
                // scopedSlots: { customRender: 'name' }
              },
              {
                title: '报警级别',
                dataIndex: 'AlarmLevel',
                align: 'center',
                width: '10%'
              },
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
                width: '10%'
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
            // 不需要再判断返回码了，全局配置已经配置了
            this.$http.get(that.$api.getAlarmForPagination).then(res => {
              let table = [];
              let tableContainer = res.data.value;
              // const length = that.pagination.defaultPageSize;
              that.pagination.total = tableContainer.length;
              tableContainer.forEach((value, index) => {
                value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                value.AlarmStatus = value.AlarmStatus === '"Unprocessed"' ? '处理中' : '未处理';
                value.AlarmLevel = value.AlarmLevel.Name;
                table.push(value);
              });
              that.tableList = table;
              that.loading = false;
            })
          },

        searchForAlarmHistory () {
          const that = this;
          this.loading = true;
          this.pagination.current = 1;
          if (this.tableList.length !== 0) {
            for (let i=0;i<=this.tableList.length;i++) {
              this.tableList.pop();
            }
          }
          // 不需要再判断返回码了，全局配置已经配置了
          this.$http.get(that.$api.getAlarmForPagination).then(res => {
            let table = [];
            let tableContainer = res.data.value;
            // const length = that.pagination.defaultPageSize;
            // that.pagination.total = tableContainer.length;
            tableContainer.forEach((value, index) => {
              value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
              value.AlarmStatus = value.AlarmStatus === '"Unprocessed"' ? '处理中' : '未处理';
              value.AlarmLevel = value.AlarmLevel.Name;
              if (that.searchAlarmName !== '' || that.searchAlarmLevel !== '') {
                if (that.searchAlarmName === value.AlarmName || that.searchAlarmLevel === value.AlarmLevel) {
                  table.push(value);
                }
              }
              table.push(value);
            });
            that.tableList = table;
            that.pagination.total = that.tableList.length;
            that.loading = false;
          })
        },

        exportAlarmHistory () {},

        handlePageChange (page) {
            // 页容量、数据总数不再改变
          const that = this;
          this.loading = true;
          // 每次页码的改变必须改变当前页码的属性
          this.pagination.current = page;
          this.$http.get(that.$api.getAlarm).then(res => {
            // console.log('current data:')
            // console.log(res)
          })
        }
      }
    }
</script>

<style scoped>

</style>
