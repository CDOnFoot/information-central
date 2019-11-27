<template>
  <div class="current-alarm">
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchForAlarm()">
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
            <th width="190" height="35">{{ drawerForm.alarmName }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警级别</th>
            <th width="190" height="35">{{ drawerForm.alarmLevel }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警类型</th>
            <th width="190" height="35">{{ drawerForm.alarmType }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警详情</th>
            <th width="190" height="35">{{ drawerForm.alarmDetail }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警时间</th>
            <th width="190" height="35">{{ drawerForm.alarmTime }}</th>
          </tr>
          <tr>
            <th width="150" height="35">设备名称</th>
            <th width="190" height="35">{{ drawerForm.device }}</th>
          </tr>
          <tr>
            <th width="150" height="35">设备点</th>
            <th width="190" height="35">{{ drawerForm.deviceDot }}</th>
          </tr>
          <tr>
            <th width="150" height="35">报警状态</th>
            <th width="190" height="35">{{ drawerForm.alarmStatus }}</th>
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
                dataIndex: 'AlarmAckStatus',
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
            tableListContainer: [],
            condition: {
              alarmName: '',
              alarmLevel: ''
            },
            // the data of table, used by current data
            /*tableList: [
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中'
              }
            ]*/
          }
      },

      beforeCreate () {
        // 可不使用
        this.form = this.$form.createForm(this, { name: 'advanced_search' });
      },

      methods: {
        searchForAlarm () {
          const that = this;
          this.tableList = [];
          this.pagination.current = 1;
          this.loading = true;
          // 使用当前绑定状态进行校验
          this.$http.get(that.$api.getAlarm).then(res => {
            // console.log('response data:')
            // console.log(res)
            if (res.status === 200) {
              let index = {};
              let table = [];
              let tableContainer = res.data.value;
              const length = that.pagination.defaultPageSize;
              that.pagination.total = tableContainer.length;
              /*for (let i=0;i<=length;i++) {
                tableContainer[i].AlarmDateTime = that.$common.timestampToTime(tableContainer[i].AlarmDateTime);
                that.tableList.push(tableContainer[i]);
              }*/
              tableContainer.forEach((value, index) => {
                value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                if (that.condition.alarmName !== '' || that.condition.alarmLevel !== '') {
                  if (value.AlarmName === that.condition.alarmName || value.AlarmDescription === that.condition.alarmLevel) {
                    // that.tableList.push(value);
                    table.splice(0, 1, value);
                    that.tableList = table;
                  }
                } else {
                  that.tableList.push(value);
                }
              })
            } else {
              that.$info({
                title: '错误',
                content: '发生了一些问题：' + res,
                onOk() {
                  that.loading = false;
                },
              });
            }
            this.loading = false;
          })
        },


        // 页码改变时的回调
        changePage (page) {
          this.loading = true;
          this.callbackPageChange();
        },
        callbackPageChange (page) {
          const that = this;
          const pageSize = this.pagination.defaultPageSize;
          const length = this.tableList.length;
          if (length > 0) {
            for (let i=0;i<=length;i++) {
              this.tableList.pop();
            }
          }
          this.pagination.current = page;
          this.$http.get(that.$api.getAlarm)
            .then(res => {
              if (res.status === 200) {
                let index;
                const tableContainer = res.data.value;
                // const length = that.pagination.defaultPageSize;
                that.pagination.total = tableContainer.length;
                for (let i=0;i<=length;i++) {
                  let index = i + ((page - 1) * pageSize);
                  tableContainer[index].AlarmDateTime = that.$common.timestampToTime(tableContainer[index].AlarmDateTime);
                  that.tableList.push(tableContainer[index]);
                }
              } else {
                that.$info({
                  title: '错误',
                  content: '发生了一些问题：' + res.status,
                  onOk() {
                    that.loading = false;
                  },
                });
              }
              this.loading = false;
            })
        },

        exportAlarm () {},

        onClose () {
          this.isShowDrawer = false;
        },

        sureAlarm (row) {
          // deep copy the current data.
          this.drawerForm = Object.assign({}, row);
          this.isShowDrawer = true;
        },

        /**
         * @function 确认当前报警信息
         */
        submitRemarks (callback) {
          const remarks = this.remarks;
          console.log('current input remarks:' + remarks);

          /*this.$http.post('', {}).then(() => {
            this.isShowDrawer = false;
          })*/
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
