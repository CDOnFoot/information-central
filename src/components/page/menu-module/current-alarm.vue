<template>
  <div class="current-alarm">
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchForAlarm">
        <a-form-item label="报警名称：">
          <a-input placeholder="报警名称" v-model="condition.alarmName"></a-input>
        </a-form-item>
        <a-form-item label="报警">
          <a-input placeholder="报警级别" v-model="condition.alarmLevel"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" html-type="submit">搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="form" @click="exportAlarm">导出</a-button>
        </a-form-item>
      </a-form>
    </div>

    <!-- 确认报警的抽屉 -->
    <div class="the-drawer-of-alarm">
      <a-drawer
        title="确认报警"
        :width="720"
        @close="onClose"
        :visible="isShowDrawer"
        :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
      >
        <div class="chosen-alarm">
          <tr>
            <th width="150" height="35">报警名称</th>
            <th width="190" height="35">{{ drawerForm.AlarmName }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警级别</th>
            <th width="190" height="35">{{ drawerForm.AlarmLevel }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警类型</th>
            <th width="190" height="35">{{ drawerForm.AlarmType }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警详情</th>
            <th width="190" height="35">{{ drawerForm.AlarmDescription }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警时间</th>
            <th width="190" height="35">{{ drawerForm.AlarmDateTime }}</th>
          </tr>
          <tr>
            <th width="150" height="35">设备标识</th>
            <th width="190" height="35">{{ drawerForm.EquipmentId }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警点标识</th>
            <th width="190" height="35">{{ drawerForm.PointId }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警状态</th>
            <th width="190" height="35">{{ drawerForm.AlarmStatus }}</th>
          </tr>
          <tr>
            <th width="150" height="35">备注</th>
            <th width="190" height="35"><a-input v-model="remarks"></a-input></th>
          </tr>
        </div>

        <!-- 时间轴需要根据服务实际条数来渲染，还需额外处理 -->
        <div class="time-line">
          <a-timeline>
            <a-timeline-item>{{ alarmTime }} {{ noticeContent }}</a-timeline-item>
            <a-timeline-item>{{ alarmTime }} {{ noticeContent }}</a-timeline-item>
            <a-timeline-item>{{ alarmTime }} {{ noticeContent }}</a-timeline-item>
            <a-timeline-item>{{ alarmTime }} {{ noticeContent }}</a-timeline-item>
            <a-timeline-item>{{ alarmTime }} {{ noticeContent }}</a-timeline-item>
            <a-timeline-item>{{ alarmTime }} {{ noticeContent }}</a-timeline-item>
            <a-timeline-item>{{ alarmTime }} {{ noticeContent }}</a-timeline-item>
          </a-timeline>
        </div>

        <div
          :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
        >
          <a-button :style="{marginRight: '8px'}" @click="onClose">
            关闭
          </a-button>
          <a-button @click="submitRemarks" type="primary">确认</a-button>
        </div>
      </a-drawer>
    </div>

    <div class="table">
      <a-table :columns="column"
               :loading="loading"
               :pagination="pagination"
               :dataSource="tableList"
               size="small">
        <template slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="sureAlarm(record)">确认报警</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    export default {
        name: "current-alarm",
      components: {AFormItem},

      data() {
          return {
            alarmTime: '9019-10-09 09:09',
            noticeContent: '注意防范',
            searchAlarm: {}, // 不使用了
            loading: false,
            isShowDrawer: false,
            pagination: {
              current: 1,
              defaultCurrent: 1,
              defaultPageSize: 18,
              total: 0,
              size: 'large',
              // 页码改变时的回调
              onChange: (current) => this.changePage(current)
            },
            // 抽屉详情
            drawerForm: {},
            remarks: '',
            // column's setting
            column: [
              {
                title: '报警名称',
                dataIndex: 'AlarmName',
                align: 'center',
                // sorter: true,
                width: '8%',
                // scopedSlots: { customRender: 'name' }
              },
              {
                title: '报警级别',
                dataIndex: 'AlarmLevel',
                align: 'center',
                width: 40
              },
              {
                title: '报警类型',
                dataIndex: 'AlarmType',
                align: 'center',
                width: 40
              },
              {
                title: '报警详情',
                dataIndex: 'AlarmDescription',
                align: 'center',
                width: '15%'
              },
              {
                title: '报警时间',
                dataIndex: 'AlarmDateTime',
                align: 'center',
                width: '15%'
              },
              {
                title: '设备标识',
                dataIndex: 'EquipmentId',
                align: 'center',
                width: 40
              },
              {
                title: '报警点标识',
                dataIndex: 'PointId',
                align: 'center',
                width: 40
              },
              {
                title: '报警状态',
                dataIndex: 'AlarmStatus',
                align: 'center',
                width: '10%'
              },
              {
                title: '操 作',
                // dataIndex: 'tel',
                align: 'center',
                width: '15%',
                scopedSlots: { customRender: 'operation' }
              }
            ],
            tableList: [],
            // 存在数据量比较大的情况，所以使用一个容器来缓存请求获取的列表，每次改变页码等其他操作均使用此容器
            // 存在有很多条相同报警名称的数据，使用该状态来缓存获取到条件查询的 list ，在翻页时调用不同的方法
            tableListContainer: [],
            condition: {
              alarmName: '',
              alarmLevel: ''
            }
          }
      },

      beforeCreate () {
        // 可不使用
        this.form = this.$form.createForm(this, { name: 'advanced_search' });
      },

      mounted () {
          this.initTable();
      },

      methods: {
        initTable () {
          const that = this;
          this.pagination.current = 1;
          this.loading = true;
          // 使用当前绑定状态进行校验
          this.form.validateFields((err, values) => {
            if (!err) {
              // 初始列表时查询所有数据，以显示全部的页码
              that.$http.get(that.$api.getAlarmForPagination).then(res => {
                if (res.status === 200) {
                  // let table = [];
                  let tableContainer = res.data.value;
                  const length = that.pagination.defaultPageSize;
                  that.pagination.total = tableContainer.length;
                  /*tableContainer.forEach((value, index) => {
                    value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                    value.AlarmStatus = value.AlarmStatus === '"Unprocessed"' ? '处理中' : '未处理';
                    // 只获取一个 Name 字段属性
                    value.AlarmLevel = value.AlarmLevel.Name;
                    that.tableList.push(value);
                  })*/
                  for (let i=0;i<length;i++) {
                    tableContainer[i].AlarmDateTime = that.$common.timestampToTime(tableContainer[i].AlarmDateTime);
                    tableContainer[i].AlarmStatus = tableContainer[i].AlarmStatus === '"Unprocessed"' ? '处理中' : '未处理';
                    tableContainer[i].AlarmLevel = tableContainer[i].AlarmLevel.Name;
                    that.tableList.push(tableContainer[i]);
                  }
                }
                this.loading = false;
              })
            }
          })
        },

        searchForAlarm (e) {
          const that = this;
          // e.preventDefault();
          this.tableList = [];
          this.tableListContainer = [];
          // 每次查询回到第一页
          this.pagination.current = 1;
          this.loading = true;
          // 使用当前绑定状态进行校验
          this.$http.get(that.$api.getAlarmForPagination).then(res => {
            if (res.status === 200) {
              console.log(res)
              // let index = {};
              let table = [];
              let tableContainer = res.data.value;
              // const length = that.pagination.defaultPageSize;
              // that.pagination.total = tableContainer.length;
              tableContainer.forEach((value, index) => {
                value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                value.AlarmStatus = value.AlarmStatus === 'Unprocessed' ? '未处理' : '处理中';
                // 只获取一个 Name 字段
                value.AlarmLevel = value.AlarmLevel.Name;
                if (that.condition.alarmName !== '' || that.condition.alarmLevel !== '') {
                  if (/*value.AlarmName === that.condition.alarmName || value.AlarmLevel.Name === that.condition.alarmLevel*/
                    value.AlarmName.includes(that.condition.alarmName) || value.AlarmLevel.Name.includes(that.condition.alarmLevel)
                  ) {
                    that.tableList.push(value);
                    // table.splice(0, 1, value);
                    table.push(value);
                    // 额外的缓存
                    that.tableListContainer = table;
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

        // 页码改变时的回调
        changePage (page) {
          const that = this;
          this.loading = true;
          if (that.condition.alarmName !== '' || that.condition.alarmLevel !== '') {
            this.handlePageForCondition(page);
          }
          this.callbackPageChange(page);
        },
        callbackPageChange (page) {
          const that = this;
          this.tableList = [];
          this.pagination.current = page;
          const pageSize = this.pagination.defaultPageSize;
          const length = this.tableList.length;
          /*if (length > 0) {
            for (let i=0;i<=length;i++) {
              this.tableList.pop();
            }
          }*/
          this.$http.get(that.$api.getAlarmForPagination + '&$top=' + that.pagination.defaultPageSize + '&$skip=' + (page - 1) * that.pagination.defaultPageSize)
            .then(res => {
              if (res.status === 200) {
                // let index;
                let table = [];
                const tableContainer = res.data.value;
                // const length = that.pagination.defaultPageSize;
                // that.pagination.total = tableContainer.length;
                that.tableList = res.data.value;
                /*for (let i=0;i<=length;i++) {
                  let index = i + ((page - 1) * pageSize);
                  tableContainer[index].AlarmDateTime = that.$common.timestampToTime(tableContainer[index].AlarmDateTime);
                  tableContainer[index].AlarmStatus = tableContainer[index].AlarmStatus === "Unprocessed" ? '未处理' : '处理中'
                  that.tableList.push(tableContainer[index]);
                }*/
                tableContainer.forEach((value, index) => {
                  value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                  value.AlarmStatus = value.AlarmStatus === "Unprocessed" ? '未处理' : '处理中';
                  value.AlarmLevel = value.AlarmLevel.Name;
                  table.push(value);
                });
                that.tableList = table;
              }
              this.loading = false;
            })
        },

        /**
         * @description 存在条件查询有超出一页数据的情况
         */
        handlePageForCondition (page) {
          // 指向当前 Vue component
          this.loading = true;
          const that = this;
          // this.tableList = [];
          let index_page = (page - 1) * that.pagination.defaultPageSize;
          this.$http.get(that.$api.getAlarmForPagination).then(res => {
            if (res.status === 200) {
              let table = [], table_0 = [];
              let tableContainer = res.data.value;
              // const length = that.pagination.defaultPageSize;
              // that.pagination.total = tableContainer.length;
              tableContainer.forEach((value, index) => {
                value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                value.AlarmStatus = value.AlarmStatus === 'Unprocessed' ? '未处理' : '处理中';
                // 只获取一个 Name 字段
                value.AlarmLevel = value.AlarmLevel.Name;
                if (/*value.AlarmName === that.condition.alarmName || value.AlarmLevel.Name === that.condition.alarmLevel*/
                  value.AlarmName.includes(that.condition.alarmName) || value.AlarmLevel.Name.includes(that.condition.alarmLevel)
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

        exportAlarm () {},

        onClose () {
          this.isShowDrawer = false;
        },

        sureAlarm (row) {
          this.drawerForm = Object.assign({}, row);
          this.isShowDrawer = true;
          // console.log('current choose alarm detail:')
          // console.log(this.drawerForm)
        },

        /**
         * @function 确认当前报警信息
         */
        submitRemarks (callback) {
          const remarks = this.remarks;
          const that = this;
          // console.log('current input remarks:' + remarks);
          // console.log('current id:' + this.drawerForm.Id)
          const paramId = this.drawerForm.Id;
          this.$http.post(that.$api.confirmAlarm + '?key=' + paramId)
            .then((res) => {
            console.log(res);
            if (res.status === 200) {
              if (res.data === paramId) {
                that.$info({
                  title: '提示',
                  content: '确认成功！',
                  onOk() {
                    // that.isShowModal = false;
                  },
                });
              }
            }
            this.isShowDrawer = false;
          })
        }
      }
    }
</script>

<style scoped>
.chosen-alarm {
  font-size: 20px;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 20px;
}

  .time-line {
    margin-top: 30px;
  }
</style>
