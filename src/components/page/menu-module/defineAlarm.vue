<template>
  <div class="define-alarm">
    <div class="search-condition">
      <a-form layout="inline" :form="searchAlarm" @submit="searchForAlarmDefine">
        <a-form-item label="报警名称：">
          <a-input placeholder="报警名称"></a-input>
        </a-form-item>
        <a-form-item label="报警">
          <a-input placeholder="报警级别"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="searchInAlarmDefine" html-type="submit">搜索</a-button>
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
                  <a-input v-model="modalForm.alarmName"></a-input>
                </a-form-item>
                <a-form-item label="报警类型" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.alarmType"></a-input>
                </a-form-item>
                <a-form-item label="设备点" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.deviceDot"></a-input>
                </a-form-item>
                <a-form-item label="上限值" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.upLimit"></a-input>
                </a-form-item>
                <a-form-item label="反馈点" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.fadeBack"></a-input>
                </a-form-item>
              </div>
              <div class="modal-form-two">
                <a-form-item label="报警级别" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.alarmLevel"></a-input>
                </a-form-item>
                <a-form-item label="设备名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.device"></a-input>
                </a-form-item>
                <a-form-item label="描述" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.alarmDetail"></a-input>
                </a-form-item>
                <a-form-item label="下限值" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.lowerLimit"></a-input>
                </a-form-item>
                <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.alarmStatus"></a-input>
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
            confirmLoading: false,
            pagination: {
              current: 1,
              defaultCurrent: 1,
              defaultPageSize: 20
            },

            // 同理
            modalForm: {
              alarmName: '',
              alarmLevel: '',
              alarmType: '',
              device: '',
              deviceDot: '',
              alarmDetail: '',
              upLimit: '',
              lowerLimit: '',
              fadeBack: '',
              alarmStats: ''
            },
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
                width: 70
              },
              {
                title: '描述',
                dataIndex: 'alarmDetail',
                align: 'center',
                width: 70
              },
              /*{
                title: '报警时间',
                dataIndex: 'alarmTime',
                align: 'center',
                width: 40
              },*/
              {
                title: '设备名称',
                dataIndex: 'device',
                align: 'center',
                width: 60
              },
              {
                title: '设备点',
                dataIndex: 'deviceDot',
                align: 'center',
                width: 40
              },
              {
                title: '上限值',
                dataIndex: 'upLimit',
                align: 'center',
                width: 40
              },
              {
                title: '下限值',
                dataIndex: 'lowerLimit',
                align: 'center',
                width: 40
              },
              {
                title: '反馈点',
                dataIndex: 'fadeBack',
                align: 'center',
                width: 40
              },
              {
                title: '状态',
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
            tableList: [
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
            ]
          }
      },
      
      methods: {
        searchForAlarmDefine() {},
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
          const formData = this.modalForm;
          let newAlarmForm = new FormData();
          for (let i = 0;i <= Object.keys(formData).length;i++) {
            newAlarmForm.append(Object.keys(formData)[i], Object.values(formData)[i]);
          }
          // http 请求
          // this.$http.post('', {}).then()
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
