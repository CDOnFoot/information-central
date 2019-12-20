<template>
  <div class="define-alarm">
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchForAlarmDefine">
        <a-form-item label="报警名称：">
          <a-input placeholder="报警名称" v-model="defineName"></a-input>
        </a-form-item>
        <!--<a-form-item label="报警">
          <a-input placeholder="报警级别" v-model="condition.alarmLevel"></a-input>
        </a-form-item>-->
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
                  <!--<a-input v-model="modalForm.AlarmType"></a-input>-->
                  <a-select v-model="modalForm.AlarmType">
                    <a-select-option value="OutOfRange">OutOfRange</a-select-option>
                    <a-select-option value="StatusAlarm">StatusAlarm</a-select-option>
                    <a-select-option value="Control">Control</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="报警描述" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.AlarmDescription"></a-input>
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
                <a-form-item label="设备点" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.PointId"></a-input>
                </a-form-item>
                <a-form-item label="上限点" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.HighLimit"></a-input>
                </a-form-item>
                <a-form-item label="下限点" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.LowLimit"></a-input>
                </a-form-item>
                <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <!--<a-input v-model="modalForm.SyncStatus"></a-input>-->
                  <a-select v-model="modalForm.SyncStatus">
                    <a-select-option value="AlarmRuleAckSuccess">AlarmRuleAckSuccess</a-select-option>
                    <a-select-option value="AlarmRuleEditAcking">AlarmRuleEditAcking</a-select-option>
                    <!--<a-select-option value="Control"></a-select-option>-->
                  </a-select>
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
            defineName: '',
            condition: {
              alarmName: '',
              // alarmLevel: ''
            },
            loading: false,
            confirmLoading: false,
            pagination: {
              current: 1,
              defaultCurrent: 1,
              defaultPageSize: 18,
              total: 0,
              size: 'large',
              onChange: (current) => this.changePage(current)
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
                width: '10%',
                // scopedSlots: { customRender: 'name' }
              },
              {
                title: '报警类型',
                dataIndex: 'AlarmType',
                align: 'center',
                width: '8%'
              },
              {
                title: '报警描述',
                dataIndex: 'AlarmDescription',
                align: 'center',
                width: '18%'
              },
              {
                title: '上限点',
                dataIndex: 'HighLimit',
                align: 'center',
                width: '5%'
              },
              {
                title: '下限点',
                dataIndex: 'LowLimit',
                align: 'center',
                width: '5%'
              },
              {
                title: '设备ID',
                dataIndex: 'EquipmentId',
                align: 'center',
                width: '6%'
              },
              {
                title: '设备点',
                dataIndex: 'PointId',
                align: 'center',
                width: '6%'
              },
              {
                title: '站ID',
                dataIndex: 'StationId',
                align: 'center',
                width: '5%'
              },
              {
                title: '系统ID',
                dataIndex: 'SubsystemId',
                align: 'center',
                width: '5%'
              },
              {
                title: '状态',
                dataIndex: 'SyncStatus',
                align: 'center',
                width: '9%'
              },
              {
                title: '创建时间',
                dataIndex: 'CreateDateTime',
                align: 'center',
                width: '13%'
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
            tableListContainer: [],
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

      mounted () {
          this.initTable();
      },
      
      methods: {
        /**
         * @function 初始化表格
         */
        initTable () {
          const that = this;
          this.pagination.current = 1;
          this.loading = true;
          // 使用当前绑定状态进行校验
          this.form.validateFields((err, values) => {
            if (!err) {
              // 初始列表时查询所有数据，以显示全部的页码
              that.$http.get(that.$api.alarmRules).then(res => {
                if (res.status === 200) {
                  // let table = [];
                  let tableContainer = res.data.value;
                  // const length = that.pagination.defaultPageSize;
                  that.pagination.total = tableContainer.length;
                  tableContainer.forEach((value, index) => {
                    value.CreateDateTime = that.$common.timestampToTime(value.CreateDateTime);
                  });
                  that.tableList = tableContainer;
                }
                this.loading = false;
              })
            }
          })
        },

        searchForAlarmDefine() {
          const that = this;
          this.tableList = [];
          this.tableListContainer = [];
          // 每次查询回到第一页
          this.pagination.current = 1;
          this.loading = true;
          // 使用当前绑定状态进行校验
          this.$http.get(that.$api.alarmRules).then(res => {
            if (res.status === 200) {
              // let index = {};
              let table = [];
              let tableContainer = res.data.value;
              // const length = that.pagination.defaultPageSize;
              // that.pagination.total = tableContainer.length;
              tableContainer.forEach((value, index) => {
                value.CreateDateTime = that.$common.timestampToTime(value.CreateDateTime);
                if (that.defineName !== '') {
                  if (value.AlarmName.includes(that.defineName)) {
                    that.tableList.push(value);
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
          this.pagination.current = page;
          this.loading = true;
          // 只保留一个查询条件
          if (that.condition.alarmName !== '') {
            this.handlePageForCondition(page);
          } else {
            this.callbackPageChange(page);
          }
        },

        handlePageForCondition (page) {
          // 指向当前 Vue component
          this.loading = true;
          const that = this;
          // this.tableList = [];
          this.tableList.splice(0);
          let index_page = (page - 1) * that.pagination.defaultPageSize;
          this.$http.get(that.$api.alarmRules).then(res => {
            if (res.status === 200) {
              let table = [], table_0 = [];
              let tableContainer = res.data.value;
              // const length = that.pagination.defaultPageSize;
              // that.pagination.total = tableContainer.length;
              tableContainer.forEach((value, index) => {
                value.CreateDateTime = that.$common.timestampToTime(value.CreateDateTime);
                if (value.AlarmName.includes(that.defineName)) {
                  // that.tableList.push(value);
                  table.push(value);
                }
              });
              that.tableList = table;
            }
          });
          this.loading = false;
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
          this.$http.get(that.$api.alarmRules + '?$top=' + that.pagination.defaultPageSize + '&$skip=' + (page - 1) * that.pagination.defaultPageSize)
            .then(res => {
              if (res.status === 200) {
                // let index;
                let table = [];
                const tableContainer = res.data.value;
                // const length = that.pagination.defaultPageSize;
                // that.pagination.total = tableContainer.length;
                that.tableList = res.data.value;
                tableContainer.forEach((value, index) => {
                  value.CreateDateTime = that.$common.timestampToTime(value.CreateDateTime);
                  table.push(value);
                });
                that.tableList = table;
              }
              this.loading = false;
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
