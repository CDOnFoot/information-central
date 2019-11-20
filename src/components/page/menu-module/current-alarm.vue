<template>
  <div class="current-alarm">
    <div class="search-condition">
      <a-form layout="inline" :form="searchAlarm" @submit="searchForAlarm">
        <a-form-item label="报警名称：">
          <a-input placeholder="报警名称"></a-input>
        </a-form-item>
        <a-form-item label="报警">
          <a-input placeholder="报警级别"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="searchInAlarm" html-type="submit">搜索</a-button>
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
            searchAlarm: {},
            loading: false,
            isShowDrawer: false,
            pagination: {
              current: 1,
              defaultCurrent: 1,
              defaultPageSize: 20
            },
            // 抽屉详情
            drawerForm: {},
            remarks: '',
            // column's setting
            column: [
              {
                title: '报警名称',
                dataIndex: 'alarmName',
                align: 'center',
                // sorter: true,
                width: 30,
                // scopedSlots: { customRender: 'name' }
              },
              {
                title: '报警级别',
                dataIndex: 'alarmLevel',
                align: 'center',
                width: 40
              },
              {
                title: '报警类型',
                dataIndex: 'alarmType',
                align: 'center',
                width: 40
              },
              {
                title: '报警详情',
                dataIndex: 'alarmDetail',
                align: 'center',
                width: 40
              },
              {
                title: '报警时间',
                dataIndex: 'alarmTime',
                align: 'center',
                width: 40
              },
              {
                title: '设备名称',
                dataIndex: 'device',
                align: 'center',
                width: 40
              },
              {
                title: '设备点',
                dataIndex: 'deviceDot',
                align: 'center',
                width: 40
              },
              {
                title: '报警状态',
                dataIndex: 'alarmStatus',
                align: 'center',
                width: 40
              },
              {
                title: '操 作',
                // dataIndex: 'tel',
                align: 'center',
                width: 40,
                scopedSlots: { customRender: 'operation' }
              }
            ],
            // the data of table, used by current data
            tableList: [
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
            ]
          }
      },

      methods: {
        searchForAlarm () {},

        searchInAlarm () {},

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
          let remarkForm = new FormData();
          remarkForm.append('', remarks);
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
