<template>
  <div class="define-alarm">
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchForAlarmDefine">
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
          <a-button type="primary" icon="plus" @click="exportAlarmDefine">添加</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="define-alarm-dialog">
      <a-modal :visible="isShowModal"
               :okText="okButton"
               centered
               destroyOnClose
               :title="modalTitle"
               :confirm-loading="confirmLoading"
               @ok="handleOk"
               @cancel="closeModal">
        <div class="form-in-modal">
          <a-form :form="modalForm">
            <div class="modal-form">
              <div class="modal-form-one">
                <a-form-item label="报警名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.AlarmName"></a-input>
                </a-form-item>
                <a-form-item label="报警类型" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.AlarmType"></a-input>
                </a-form-item>
                <a-form-item label="报警级别" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.AlarmLevel"></a-input>
                </a-form-item>
                <a-form-item label="站ID" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.StationId"></a-input>
                </a-form-item>
                <a-form-item label="系统ID" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.SubsystemId"></a-input>
                </a-form-item>
              </div>
              <div class="modal-form-two">
                <!--<a-form-item label="报警级别" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.AlarmLevel"></a-input>
                </a-form-item>-->
                <a-form-item label="设备ID" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.EquipmentId"></a-input>
                </a-form-item>
                <a-form-item label="描述" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.AlarmDescription"></a-input>
                </a-form-item>
                <a-form-item label="报警根源" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.AlarmRootCause"></a-input>
                </a-form-item>
                <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.AlarmStatus"></a-input>
                </a-form-item>
              </div>
            </div>
          </a-form>
        </div>
      </a-modal>
    </div>

    <div class="table">
      <a-table :columns="column"
               :loading="loading"
               :pagination="pagination"
               :dataSource="tableList"
               size="small">
        <template slot="operation" slot-scope="text, record">
          <!--<a-button type="primary" @click="sureAlarm(record)">确认报警</a-button>-->
          <a-button type="primary" @click="editAlarm(record)">编辑</a-button>
          <a-button type="primary" @click="deleteAlarm(record)">删除</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    export default {
        name: "defineAlarm",
      components: {AFormItem},
      data () {
          return {
            modal: '', // 模拟对话框
            searchAlarm: {},

            // dialog configuration
            isShowModal: false,
            okButton: '保存',
            modalTitle: '',
            condition: {
              alarmName: '',
              alarmLevel: ''
            },
            loading: false,
            confirmLoading: false,
            pagination: {
              current: 1,
              defaultCurrent: 1,
              defaultPageSize: 18,
              total: 0
            },

            form: this.$form.createForm(this, { name: 'advanced_search' }),

            // 同理
            modalForm: {
              /*alarmName: '',
              alarmLevel: '',
              alarmType: '',
              device: '',
              deviceDot: '',
              alarmDetail: '',
              upLimit: '',
              lowerLimit: '',
              fadeBack: '',
              alarmStats: ''*/
            },
            column: [
              {
                title: '报警名称',
                dataIndex: 'AlarmName',
                align: 'center',
                // sorter: true,
                width: '9%',
                // scopedSlots: { customRender: 'name' }
              },
              {
                title: '报警级别',
                dataIndex: 'AlarmLevel',
                align: 'center',
                width: '8%'
              },
              {
                title: '报警类型',
                dataIndex: 'AlarmType',
                align: 'center',
                width: '9%'
              },
              {
                title: '描述',
                dataIndex: 'AlarmDescription',
                align: 'center',
                width: '15%'
              },
              /*{
                title: '报警时间',
                dataIndex: 'alarmTime',
                align: 'center',
                width: 40
              },*/
              {
                title: '设备ID',
                dataIndex: 'EquipmentId',
                align: 'center',
                width: '9%'
              },
              /*{
                title: '设备点',
                dataIndex: 'PointId',
                align: 'center',
                width: '9%'
              },*/
              {
                title: '警报根源',
                dataIndex: 'AlarmRootCause',
                align: 'center',
                width: '9%'
              },
              {
                title: '站ID',
                dataIndex: 'StationId',
                align: 'center',
                width: '9%'
              },
              {
                title: '系统ID',
                dataIndex: 'SubsystemId',
                align: 'center',
                width: '8%'
              },
              {
                title: '状态',
                dataIndex: 'AlarmStatus',
                align: 'center',
                width: '9%'
              },
              {
                title: '操 作',
                // dataIndex: 'tel',
                align: 'center',
                // width: 40,
                scopedSlots: { customRender: 'operation' }
              }
            ],
            tableList: [],
            /*tableList: [
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              },
              {
                alarmName: '烟雾报警',
                alarmLevel: '一级',
                alarmType: '设备报警/阈值报警',
                alarmDetail: '烟雾浓度超标',
                alarmTime: '9019-10-10 10:10',
                device: '多功能传感器',
                deviceDot: 'YW-288-01',
                alarmStatus: '处理中',
                upLimit: 109,
                lowerLimit: 11,
                fadeBack: 'ats_902'
              }
            ]*/
          }
      },
      
      methods: {
        searchForAlarmDefine() {
          const that = this;
          this.tableList = [];
          this.pagination.current = 1;
          this.loading = true;
          // 使用当前绑定状态进行校验
          this.form.validateFields((err, values) => {
            if (!err) {
              this.$http.get(that.$api.getAlarmForPagination).then(res => {
                if (res.status === 200) {
                  let index = {};
                  let table = [];
                  let tableContainer = res.data.value;
                  // const length = that.pagination.defaultPageSize;
                  that.pagination.total = tableContainer.length;
                  tableContainer.forEach((value, index) => {
                    value.AlarmDateTime = that.$common.timestampToTime(value.AlarmDateTime);
                    value.AlarmStatus = value.AlarmStatus === 'Unprocessed' ? '未处理' : '处理中';
                    // 只获取一个 Name 字段
                    value.AlarmLevel = value.AlarmLevel.Name;
                    if (that.condition.alarmName !== '' || that.condition.alarmLevel !== '') {
                      if (value.AlarmName === that.condition.alarmName || value.AlarmLevel.Name === that.condition.alarmLevel) {
                        // that.tableList.push(value);
                        // 清空上次的条件查询的就结果
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
                    content: '发生了一些问题：' + res.data,
                    onOk() {
                      // that.loading = false;
                    },
                  });
                }
                that.loading = false;
              })
            }
          })
        },

        searchInAlarmDefine() {},

        exportAlarmDefine() {
          this.isShowModal = true;
          this.modalTitle = '添加报警';
          this.modalForm = Object.assign({}, {})
        },

        editAlarm (row) {
          this.modalTitle = '编辑报警';
          this.modalForm = Object.assign({}, row);
          this.isShowModal = true;
        },
        deleteAlarm (row) {
          const that = this;
          this.modal = this.Modal.confirm({
            title: '删除报警',
            cancelText: '取消',
            centered: true,
            closable: false,
            content: '此操作将在列表删除此条数据，是否继续？',
            okType: 'warning',
            onOk: function (e) {
              // the callback of ok
              that.modal.destroy();
            },

            onCancel: function (e) {
              // the callback of cancel
              that.modal.destroy();
            }
          })
        },

        handleOk () {
          this.isShowModal = false;
          if (this.modalTitle === '添加报警') {
            // 请求增加报警的 API
            // this.$http.post('', {}).then(res => {})
          } else if (this.modalTitle === '编辑报警') {
            // this.$http.post('', {}).then(res => {})
          }
        },
        closeModal () {
          this.isShowModal = false;
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
