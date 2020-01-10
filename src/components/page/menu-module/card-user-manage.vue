<template>
  <div class="card-user-manage">
    <a-tabs
      type="card"
      defaultActiveKey="1"
      tabPosition="left"
      @change="init"
    >
      <a-tab-pane tab="部门" key="1">
        <a-form layout="inline">
          <a-form-item>
            <a-button type="primary" icon="plus" @click="addCard(1)">新增</a-button>
          </a-form-item>
        </a-form>
        <a-table
          :columns="columns1"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          :defaultExpandAllRows="expandAllRows"
          size="small"
        >
          <template slot="operation" slot-scope="text, record">
            <a-button type="primary" @click="editCard(record)">编辑</a-button>
            <a-button type="primary" @click="deleteCard(record)">删除</a-button>
          </template>
        </a-table>
        <a-modal
          :visible="isShowModal1"
          :title="modalTitle"
          @ok="handleOk(1)"
          @cancel="closeModal(1)"
          centered
          destroyOnClose
        >
          <div class="form-in-modal">
            <a-form layout="inline" :form="modalForm">
              <div class="modal-form" style="text-align: center">
                <a-form-item label="部门代码">
                  <a-input v-model="modalForm.Code" :disabled="enableEdit"></a-input>
                </a-form-item>
                <a-form-item label="部门名称">
                  <a-input v-model="modalForm.Name" :disabled="enableEdit"></a-input>
                </a-form-item>
              </div>
            </a-form>
          </div>
        </a-modal>
      </a-tab-pane>
      <a-tab-pane tab="岗位" key="2">
        <a-form layout="inline">
          <a-form-item>
            <a-button type="primary" icon="plus" @click="addCard(2)">新增</a-button>
          </a-form-item>
        </a-form>
        <a-table
          :columns="columns2"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          :defaultExpandAllRows="expandAllRows"
          size="small"
        >
          <template slot="operation" slot-scope="text, record">
            <a-button type="primary" @click="editCard(record)">编辑</a-button>
            <a-button type="primary" @click="deleteCard(record)">删除</a-button>
          </template>
        </a-table>
        <a-modal
          :visible="isShowModal2"
          :title="modalTitle"
          @ok="handleOk(2)"
          @cancel="closeModal(2)"
          centered
          destroyOnClose
        >
          <div class="form-in-modal">
            <a-form layout="inline" :form="modalForm">
              <div class="modal-form" style="text-align: center">
                <a-form-item label="从属部门">
                  <a-select v-model="modalForm.Department" :disabled="enableEdit">
                    <a-select-option value="Enable">启用</a-select-option>
                    <a-select-option value="Disable">未启用</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="岗位代码">
                  <a-input v-model="modalForm.Code" :disabled="enableEdit"></a-input>
                </a-form-item>
                <a-form-item label="岗位名称">
                  <a-input v-model="modalForm.Name" :disabled="enableEdit"></a-input>
                </a-form-item>
              </div>
            </a-form>
          </div>
        </a-modal>
      </a-tab-pane>
      <a-tab-pane tab="岗位权限配置" key="3">
        <a-table
          :columns="columns3"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          :defaultExpandAllRows="expandAllRows"
          size="small"
        >
          <template slot="operation" slot-scope="text, record">
            <a-button type="primary" @click="editCard(record)">编辑</a-button>
          </template>
        </a-table>
        <a-modal
          :visible="isShowModal3"
          :title="modalTitle"
          @ok="handleOk(3)"
          @cancel="closeModal(3)"
          centered
          destroyOnClose
        >
          <div class="form-in-modal">
            <a-form layout="inline" :form="modalForm">
              <div class="modal-form" style="text-align: center">
                <a-form-item label="从属部门">
                  <a-select v-model="modalForm.Department" :disabled="enableEdit">
                    <a-select-option value="Enable">启用</a-select-option>
                    <a-select-option value="Disable">未启用</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="岗位代码">
                  <a-input v-model="modalForm.Code" :disabled="enableEdit"></a-input>
                </a-form-item>
                <a-form-item label="岗位名称">
                  <a-input v-model="modalForm.Name" :disabled="enableEdit"></a-input>
                </a-form-item>
              </div>
            </a-form>
          </div>
        </a-modal>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";

  const columns1 = [
    {
      title: '部门代码',
      dataIndex: 'Code',
    },
    {
      title: '部门名称',
      dataIndex: 'LastName',
    },
    {
      title: "操 作",
      align: "center",
      scopedSlots: {
        customRender: "operation"
      },
      width: 300,
    }
  ];

  const columns2 = [
    {
      title: '岗位ID',
      dataIndex: 'EntityId',
    },
    {
      title: '岗位代码',
      dataIndex: 'Modified',
    },
    {
      title: '从属部门',
      dataIndex: 'Actived',
    },
    {
      title: '岗位名称',
      dataIndex: 'Expired',
    },
    {
      title: "操 作",
      align: "center",
      scopedSlots: {
        customRender: "operation"
      },
      width: 300,
    }
  ];

  const columns3 = [
    {
      title: '部门名称',
      dataIndex: 'EntityId',
    },
    {
      title: '岗位名称',
      dataIndex: 'Modified',
    },
    {
      title: '可通行门',
      dataIndex: 'Actived',
    },
    {
      title: '状态',
      dataIndex: 'Expired',
    },
    {
      title: "操 作",
      align: "center",
      scopedSlots: {
        customRender: "operation"
      },
      width: 300,
    }
  ];

  const testData = [
    {
      "EntityId": 4,
      "Modified": "2019-11-18T10:42:37.233+08:00",
      "IsDeleted": false,
      "Actived": "2019-11-18T10:42:43.417+08:00",
      "Expired": "2019-11-18T10:42:43.417+08:00",
      "LastName": "\u80e1\u516d\u4e03",
      "FirstName": "",
      "Code": "12131233",
      "Type": "Job",
      "Description": "",
      "IsBlocked": true,
      "Role": {
        "EntityId": 85,
        "Name": "\u89d2\u827285",
        "DisplayName": "\u6d4b\u8bd5\u89d2\u827285",
        "Created": "2019-10-14T13:53:30.483+08:00",
        "Updated": "2019-10-14T13:53:30.483+08:00"
      },
      "Department": {
        "EntityId": 1,
        "Name": "WMC",
        "DisplayName": "\u5f31\u7535\u7ef4\u62a4\u4e2d\u5fc3",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-09-24T00:00:00+08:00"
      },
      "Badges": [{
        "EntityId": 5315,
        "IsDeleted": false,
        "Enable": true,
        "StampedId": 0,
        "Encoded": "125412541254",
        "KeypadID": 11167,
        "BadgeTechnologyID": 0,
        "Created": "2019-11-27T17:25:36.487+08:00",
        "Modified": "2019-11-27T17:25:17.03+08:00",
        "Expire": "2019-11-27T17:25:36.487+08:00",
        "BadgeLayoutID": 4,
        "TimeSheetType": "staff"
      }]
    },
    {
      "EntityId": 8,
      "Modified": "2019-10-09T10:53:55.193+08:00",
      "IsDeleted": false,
      "Actived": "2019-10-09T10:57:15.11+08:00",
      "Expired": "2020-10-09T10:57:13.893+08:00",
      "LastName": "\u5f20\u56db",
      "FirstName": "",
      "Code": "123",
      "Type": "Job",
      "Description": "123",
      "IsBlocked": false,
      "Role": {
        "EntityId": 1,
        "Name": "\u89d2\u82721",
        "DisplayName": "\u6d4b\u8bd5\u89d2\u82721",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-10-13T17:40:59.533+08:00"
      },
      "Department": {
        "EntityId": 1,
        "Name": "WMC",
        "DisplayName": "\u5f31\u7535\u7ef4\u62a4\u4e2d\u5fc3",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-09-24T00:00:00+08:00"
      },
      "Badges": [{
        "EntityId": 1406,
        "IsDeleted": false,
        "Enable": true,
        "StampedId": 0,
        "Encoded": "00123",
        "KeypadID": 111111,
        "BadgeTechnologyID": 0,
        "Created": "2019-10-16T11:14:17.513+08:00",
        "Modified": "2019-10-16T11:14:34.9+08:00",
        "Expire": "2019-10-16T11:14:17.513+08:00",
        "BadgeLayoutID": 4,
        "TimeSheetType": "staff"
      }]
    }, {
      "EntityId": 34,
      "Modified": "2019-09-27T18:37:25.6+08:00",
      "IsDeleted": false,
      "Actived": "2019-09-27T18:37:25.6+08:00",
      "Expired": "2020-09-27T18:37:24.797+08:00",
      "LastName": "\u5f20\u738b",
      "FirstName": "",
      "Code": "10990",
      "Type": "Job",
      "Description": "1455",
      "IsBlocked": false,
      "Role": {
        "EntityId": 4,
        "Name": "\u89d2\u82724",
        "DisplayName": "\u6d4b\u8bd5\u89d2\u82724",
        "Created": "2018-10-25T10:12:58+08:00",
        "Updated": "2018-10-25T10:12:58+08:00"
      },
      "Department": {
        "EntityId": 2,
        "Name": "BASC",
        "DisplayName": "\u673a\u7535\u4e2d\u5fc3",
        "Created": "2018-10-25T10:12:58+08:00",
        "Updated": "2018-10-25T10:12:58+08:00"
      },
      "Badges": [{
        "EntityId": 42,
        "IsDeleted": false,
        "Enable": true,
        "StampedId": 0,
        "Encoded": "1111",
        "KeypadID": 222222,
        "BadgeTechnologyID": 0,
        "Created": "2019-09-29T10:22:22.467+08:00",
        "Modified": "2019-09-29T10:19:26.053+08:00",
        "Expire": "2019-09-30T08:00:00+08:00",
        "BadgeLayoutID": 4,
        "TimeSheetType": "staff"
      }]
    }, {
      "EntityId": 42,
      "Modified": "2019-10-09T10:56:37.277+08:00",
      "IsDeleted": false,
      "Actived": "2019-10-09T10:56:37.277+08:00",
      "Expired": "2020-10-09T10:56:35.94+08:00",
      "LastName": "\u5f20\u4e09",
      "FirstName": "",
      "Code": "001",
      "Type": "Job",
      "Description": "",
      "IsBlocked": false,
      "Role": {
        "EntityId": 4,
        "Name": "\u89d2\u82724",
        "DisplayName": "\u6d4b\u8bd5\u89d2\u82724",
        "Created": "2018-10-25T10:12:58+08:00",
        "Updated": "2018-10-25T10:12:58+08:00"
      },
      "Department": {
        "EntityId": 2,
        "Name": "BASC",
        "DisplayName": "\u673a\u7535\u4e2d\u5fc3",
        "Created": "2018-10-25T10:12:58+08:00",
        "Updated": "2018-10-25T10:12:58+08:00"
      },
      "Badges": [{
        "EntityId": 91,
        "IsDeleted": false,
        "Enable": true,
        "StampedId": 0,
        "Encoded": "1111111111",
        "KeypadID": 111111,
        "BadgeTechnologyID": 0,
        "Created": "2019-10-09T10:59:13.133+08:00",
        "Modified": "2019-10-09T10:59:13.133+08:00",
        "Expire": "2020-10-31T08:00:00+08:00",
        "BadgeLayoutID": 4,
        "TimeSheetType": "staff"
      }]
    }, {
      "EntityId": 46,
      "Modified": "2019-11-21T14:59:41.093+08:00",
      "IsDeleted": false,
      "Actived": "2019-11-21T14:59:51.11+08:00",
      "Expired": "2019-11-21T14:59:51.11+08:00",
      "LastName": "\u80e1\u56db",
      "FirstName": "",
      "Code": "101025",
      "Type": "Job",
      "Description": "",
      "IsBlocked": true,
      "Role": {
        "EntityId": 1,
        "Name": "\u89d2\u82721",
        "DisplayName": "\u6d4b\u8bd5\u89d2\u82721",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-10-13T17:40:59.533+08:00"
      },
      "Department": {
        "EntityId": 1,
        "Name": "WMC",
        "DisplayName": "\u5f31\u7535\u7ef4\u62a4\u4e2d\u5fc3",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-09-24T00:00:00+08:00"
      },
      "Badges": [{
        "EntityId": 4311,
        "IsDeleted": false,
        "Enable": true,
        "StampedId": 0,
        "Encoded": "138549",
        "KeypadID": 111111,
        "BadgeTechnologyID": 0,
        "Created": "2019-11-28T09:47:41.06+08:00",
        "Modified": "2019-11-28T09:47:24.727+08:00",
        "Expire": "2019-11-28T09:47:41.06+08:00",
        "BadgeLayoutID": 4,
        "TimeSheetType": "staff"
      }]
    }, {
      "EntityId": 647,
      "Modified": "2019-11-26T14:36:01.787+08:00",
      "IsDeleted": false,
      "Actived": "2019-11-26T14:36:20.277+08:00",
      "Expired": "2019-11-26T14:36:20.277+08:00",
      "LastName": "\u674e\u60f3",
      "FirstName": "",
      "Code": "12131248",
      "Type": "Job",
      "Description": "",
      "IsBlocked": false,
      "Role": {
        "EntityId": 85,
        "Name": "\u89d2\u827285",
        "DisplayName": "\u6d4b\u8bd5\u89d2\u827285",
        "Created": "2019-10-14T13:53:30.483+08:00",
        "Updated": "2019-10-14T13:53:30.483+08:00"
      },
      "Department": {
        "EntityId": 1,
        "Name": "WMC",
        "DisplayName": "\u5f31\u7535\u7ef4\u62a4\u4e2d\u5fc3",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-09-24T00:00:00+08:00"
      },
      "Badges": [{
        "EntityId": 5316,
        "IsDeleted": false,
        "Enable": true,
        "StampedId": 0,
        "Encoded": "222222222222",
        "KeypadID": 121212,
        "BadgeTechnologyID": 0,
        "Created": "2019-11-26T14:36:30.987+08:00",
        "Modified": "2019-11-26T14:36:30.987+08:00",
        "Expire": "2019-11-26T14:36:30.987+08:00",
        "BadgeLayoutID": 4,
        "TimeSheetType": "staff"
      }]
    }, {
      "EntityId": 648,
      "Modified": "2019-11-27T10:20:21.403+08:00",
      "IsDeleted": false,
      "Actived": "2019-11-27T10:20:41.103+08:00",
      "Expired": "2019-11-27T10:20:41.103+08:00",
      "LastName": "\u5f20\u4e09",
      "FirstName": "",
      "Code": "12131249",
      "Type": "Job",
      "Description": "",
      "IsBlocked": false,
      "Role": {
        "EntityId": 1,
        "Name": "\u89d2\u82721",
        "DisplayName": "\u6d4b\u8bd5\u89d2\u82721",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-10-13T17:40:59.533+08:00"
      },
      "Department": {
        "EntityId": 1,
        "Name": "WMC",
        "DisplayName": "\u5f31\u7535\u7ef4\u62a4\u4e2d\u5fc3",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-09-24T00:00:00+08:00"
      },
      "Badges": [{
        "EntityId": 5317,
        "IsDeleted": false,
        "Enable": true,
        "StampedId": 0,
        "Encoded": "203233010111",
        "KeypadID": 0,
        "BadgeTechnologyID": 0,
        "Created": "2019-12-02T17:00:13.837+08:00",
        "Modified": "2019-12-02T16:59:54.56+08:00",
        "Expire": "2019-12-02T17:00:13.837+08:00",
        "BadgeLayoutID": 4,
        "TimeSheetType": "staff"
      }]
    }, {
      "EntityId": 649,
      "Modified": "2019-11-28T09:46:25.933+08:00",
      "IsDeleted": false,
      "Actived": "2019-11-28T09:46:40.85+08:00",
      "Expired": "2019-11-28T09:46:40.85+08:00",
      "LastName": "\u80e1\u4e8c",
      "FirstName": "",
      "Code": "12131259",
      "Type": "Job",
      "Description": "",
      "IsBlocked": false,
      "Role": {
        "EntityId": 85,
        "Name": "\u89d2\u827285",
        "DisplayName": "\u6d4b\u8bd5\u89d2\u827285",
        "Created": "2019-10-14T13:53:30.483+08:00",
        "Updated": "2019-10-14T13:53:30.483+08:00"
      },
      "Department": {
        "EntityId": 1,
        "Name": "WMC",
        "DisplayName": "\u5f31\u7535\u7ef4\u62a4\u4e2d\u5fc3",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-09-24T00:00:00+08:00"
      },
      "Badges": [{
        "EntityId": 5318,
        "IsDeleted": false,
        "Enable": true,
        "StampedId": 0,
        "Encoded": "111111111111",
        "KeypadID": 111111,
        "BadgeTechnologyID": 0,
        "Created": "2019-11-28T10:01:10.003+08:00",
        "Modified": "2019-11-28T10:01:10.003+08:00",
        "Expire": "2019-11-28T10:01:10.003+08:00",
        "BadgeLayoutID": 4,
        "TimeSheetType": "staff"
      }]
    }, {
      "EntityId": 650,
      "Modified": "2019-11-12T09:42:48.49+08:00",
      "IsDeleted": false,
      "Actived": "2019-10-13T19:24:54.173+08:00",
      "Expired": "2019-10-13T19:24:54.173+08:00",
      "LastName": "\u80e1\u4e09",
      "FirstName": "",
      "Code": "12131251",
      "Type": "Job",
      "Description": null,
      "IsBlocked": false,
      "Role": {
        "EntityId": 85,
        "Name": "\u89d2\u827285",
        "DisplayName": "\u6d4b\u8bd5\u89d2\u827285",
        "Created": "2019-10-14T13:53:30.483+08:00",
        "Updated": "2019-10-14T13:53:30.483+08:00"
      },
      "Department": {
        "EntityId": 1,
        "Name": "WMC",
        "DisplayName": "\u5f31\u7535\u7ef4\u62a4\u4e2d\u5fc3",
        "Created": "2019-09-24T00:00:00+08:00",
        "Updated": "2019-09-24T00:00:00+08:00"
      },
      "Badges": []
    },
  ];

  export default {
    name: "card-user-manage",
    components: {
      AFormItem
    },
    data() {
      return {
        columns1,
        columns2,
        columns3,
        expandAllRows: true,
        pagination: {
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 20,
          total: 0,
          size: "large",
          // showQuickJumper: true,
          onChange: current => this.changePage(current)
        },
        loading: false,
        data: [],

        loading: false,
        enableEdit: false,
        isShowModal1: false,
        isShowModal2: false,
        isShowModal3: false,
        modalTitle: "",
        modalForm: {},

      };
    },

    mounted() {
      this.init(1);
    },

    methods: {
      init(key) {
        let self = this;
        if (key == 1) {
          // self.loading = true;
          // let url = "/config/departments";
          // self.$http.get(url).then(res => {
          //   console.log(res);
          //   self.data = res.data.value;
          //   if (self.data.length == 0) {
          //     self.data = testData;
          //   }
          //   self.pagination.total = self.data.length;
          //   self.loading = false;
          // });
        } else if (key == 2) {

        } else {

        }
        self.data = testData;
      },

      changePage(page) {
        this.pagination.current = page;
      },

      addCard(key) {
        let self = this;
        self.modalForm = Object.assign({}, {});
        self.enableEdit = false;
        if (key == 1) {
          self.modalTitle = "新增部门信息";
          self.isShowModal1 = true;
        } else if (key == 2) {
          self.modalTitle = "新增岗位信息";
          self.isShowModal2 = true;
        } else {
          self.modalTitle = "新增权限信息";
          self.isShowModal3 = true;
        }
      },

      checkCard(row) {
        let self = this;
        self.modalForm = Object.assign({}, row);
        self.modalTitle = "查看门禁卡";
        self.modalForm.Enable =
          self.modalForm.Enable === true ? "Enable" : "Disable";
        self.okButton = "确定";
        self.enableEdit = true;
        self.isShowModal = true;
      },

      editCard(row) {
        let self = this;
        self.modalForm = Object.assign({}, row);
        self.modalTitle = "编辑门禁卡";
        self.modalForm.Enable =
          self.modalForm.Enable === true ? "Enable" : "Disable";
        self.okButton = "保存";
        self.enableEdit = false;
        self.isShowModal = true;
      },

      deleteCard(row) {
        let self = this;
        self.modal = self.Modal.confirm({
          title: "删除门禁卡",
          cancelText: "取消",
          centered: true,
          closable: false,
          content: "此操作将在列表删除此条数据，是否继续？",
          okType: "warning",
          onOk: function (e) {
            let param = {
              EntityId: self.modalForm.EntityId
            };

            self.$http.post(self.$api.deleteUser, param).then(res => {
              // console.log(res)
              if (res.status === 200) {
                if (res.data === "success") {
                  self.$info({
                    title: "完成",
                    content: "已删除此条数据！",
                    onOk() {
                      self.modal.destroy();
                    }
                  });
                }
              } else {
                return false;
              }
              self.modal.destroy();
            });
            // self.modal.destroy();
          },
          onCancel: function (e) {
            self.modal.destroy();
          }
        });
      },

      handleOk(e) {
        let self = this;
        let param = null;
        self.confirmLoading = true;

        if (self.modalTitle === "添加门禁卡") {
          // ?
          let encoded = self.modalForm.Encoded;
          let displayName = self.modalForm.DisplayName;
          let expire = self.modalForm.Expire;
          let timeSheetType = self.modalForm.TimeSheetType;
          let description = self.modalForm.Description;
          let enable = self.modalForm.Enable;

          param = {
            Modified: new Date(),
            IsDeleted: false,
            Actived: new Date(),
            Expired: new Date(),
            Type: timeSheetType,
            FirstName: "",
            LastName: displayName,
            Description: description,
            IsBlocked: false,
            Code: encoded,
            Role: "",
            Department: ""
          };

          console.log(param);

          self.$http.post(self.$api.getCards, param).then(res => {
            console.log(res);
            if (res.data === "success") {
              self.$info({
                title: "提示",
                content: "添加成功！",
                onOk() {
                  self.isShowModal = false;
                }
              });
            } else {
              self.$info({
                title: "错误",
                content: "发生了一些错误：" + res.data.Message,
                onOk() {
                  self.isShowModal = false;
                }
              });
            }
            self.confirmLoading = false;
          });
        } else if (self.modalTitle === "查看门禁卡") {
          self.isShowModal = false;
          self.confirmLoading = false;
        } else if (self.modalTitle === "编辑门禁卡") {
          // ?
          console.log(self.modalForm);
          // param = {
          //   EntityId: that.modalForm.EntityId,
          //   Name: that.modalForm.Name, // 不能更改
          //   DisplayName: that.modalForm.DisplayName, // 登录名可以更改
          //   Tel: that.modalForm.Tel,
          //   GroupId: [],
          //   RoleIds: [2028, 2019]
          // };

          self.$http.post(self.$api.updateUsers, param).then(res => {
            // console.log(res);
            if (res.data === "success") {
              self.$info({
                title: "提示",
                content: "修改成功！",
                onOk() {
                  self.isShowModal = false;
                }
              });
            } else {
              self.$info({
                title: "错误",
                content: "发生了一些错误：" + res.data.Message,
                onOk() {
                  self.isShowModal = false;
                }
              });
            }
            self.confirmLoading = false;
          });
        }
      },

      closeModal(key) {
        let self = this;
        if (key == 1) {
          self.isShowModal1 = false;
        } else if (key == 2) {
          self.isShowModal2 = false;
        } else {
          self.isShowModal3 = false;
        }
      },

      changeTime(date, dateString) {
        console.log(date, dateString);
      }
    }
  };

</script>

<style scoped>
  .card-user-manage {
    width: 100%;
    height: 90%;
  }

  .ant-tabs {
    color: white;
    width: 100%;
    height: 100%;
  }

  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    width: 120px;
    background: transparent;
  }

  /deep/ .ant-tabs-vertical.ant-tabs-card.ant-tabs-left .ant-tabs-card-bar.ant-tabs-left-bar .ant-tabs-tab-active {
    /*padding-top: 4px;*/
  }


  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    text-align: center;
    background-color: #001529;
    color: #ffffff;
    border-color: #0259ad;
  }

  /deep/ .ant-tabs .ant-tabs-left-bar {
    border-right: 1px solid #0259ad;
  }

  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    background-image: linear-gradient(to right, blue, black);
  }


  /deep/ .ant-tabs-content {
    height: 100%;
  }


</style>
