<template>
  <div class="card-manage">
    <div class="search-condition">
      <a-form layout="inline" :form="form">
        <a-form-item label="门禁卡号">
          <a-input placeholder="门禁卡号" v-model="badgeCode"></a-input>
        </a-form-item>
        <a-form-item label="持卡人">
          <a-input placeholder="持卡人" v-model="cardholder"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="searchFor">搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="plus" @click="addCard">添加</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="modal">
      <a-modal width="800px" :visible="isShowModal" :okText="okButton" centered destroyOnClose :title="modalTitle"
               :confirm-loading="confirmLoading" @ok="handleOk" @cancel="closeModal">
        <div class="form-in-modal">
          <a-form :form="modalForm">
            <div class="modal-form">
              <div class="modal-form-one" style="width:50%">
                <a-form-item label="门禁卡号" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
                  <a-input v-model="modalForm.Encoded" :disabled="enableEdit"></a-input>
                </a-form-item>
                <a-form-item label="门禁卡类型" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
                  <a-input v-model="modalForm.TimeSheetType" :disabled="enableEdit"></a-input>
                </a-form-item>
                <!-- <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 10 }">
                  <a-input v-model="modalForm.cardStatus" :disabled="enableEdit"></a-input>
                </a-form-item>-->
                <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
                  <!--<a-input v-model="modalForm.Status"></a-input>-->
                  <a-select v-model="modalForm.Enable" :disabled="enableEdit">
                    <a-select-option value="Enable">启用</a-select-option>
                    <a-select-option value="Disable">未启用</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <div class="modal-form-two" style="width:50%">
                <a-form-item label="持卡人" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
                  <a-input v-model="modalForm.DisplayName" :disabled="enableEdit"></a-input>
                </a-form-item>
                <a-form-item label="有效期" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
                  <a-input v-model="modalForm.Expire" :disabled="enableEdit"></a-input>
                  <!-- <a-date-picker showTime @change="changeTime" :disabled="enableEdit" /> -->
                </a-form-item>
                <a-form-item label="描述" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
                  <a-input v-model="modalForm.Description" :disabled="enableEdit"></a-input>
                </a-form-item>
              </div>
            </div>
          </a-form>
        </div>
      </a-modal>
    </div>

    <div class="table">
      <a-table :columns="columns" :dataSource="filterList" :pagination="pagination" :loading="loading"
               :defaultExpandAllRows="expandAllRows" size="small">
        <template slot="enable" slot-scope="text">
          {{text}}
          <!-- <a-icon type="check" /> -->
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="checkCard(record)">查看</a-button>
          <a-button type="primary" @click="editCard(record)">编辑</a-button>
          <a-button type="primary" @click="deleteCard(record)">删除</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";

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

  const columns = [
    {
      title: "门禁卡号",
      dataIndex: "Encoded",
      align: "center",
      width: 40
    },
    {
      title: "持卡人",
      dataIndex: "DisplayName",
      align: "center",
      width: 40
    },
    {
      title: "有效期",
      dataIndex: "Expire",
      align: "center",
      width: 80
    },
    {
      title: "门禁卡类型",
      dataIndex: "TimeSheetType",
      align: "center",
      width: 40
    },
    {
      title: "描述",
      dataIndex: "Description",
      align: "center",
      width: 40
    },
    {
      title: "状态",
      dataIndex: "Enable",
      align: "center",
      width: 40,
      scopedSlots: {
        customRender: "enable"
      }
    },
    {
      title: "操 作",
      align: "center",
      width: 40,
      scopedSlots: {
        customRender: "operation"
      }
    }
  ];

  export default {
    name: "card-manage",
    components: {
      AFormItem
    },
    data() {
      return {
        modal: "",
        isShowModal: false,
        okButton: "",
        modalTitle: "",
        confirmLoading: false,
        enableEdit: false,
        modalForm: {
          Encoded: "",
          DisplayName: "",
          DisplayExpire: "",
          TimeSheetType: "",
          Description: "",
          Enable: ""
        },
        columns,
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
        tableData: [],
        tableList: [],
        filterList: [],
        badgeCode: "",
        cardholder: "",
      };
    },

    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: "advanced_search"
      });
    },

    created() {
    },

    beforeMount() {
    },

    mounted() {
      this.initTable();
    },

    methods: {
      initTable() {
        let self = this;
        self.loading = true;
        self.form.validateFields((err, values) => {
          if (!err) {
            let url = "/ACS/Cardholders?$expand=role,department,badges($filter=Enable eq true) ";
            self.$http.get(url).then(res => {
              self.tableData = res.data.value;
              console.log(self.tableData);
              if (self.tableData.length == 0) {
                self.tableData = testData;
              }
              console.log(self.tableData);
              for (let i = 0; i < self.tableData.length; i++) {
                let item = self.tableData[i];

                let encoded = "";
                let displayName = "";
                let expire = "";
                let timeSheetType = "";
                let description = item.Description;
                let enable = "";

                if (item.Badges.length > 0) {
                  encoded = item.Badges[0].Encoded;
                  expire = self.$common.timestampToTime(item.Badges[0].Expire);
                  timeSheetType = item.Badges[0].TimeSheetType;
                  enable = item.Badges[0].Enable;
                }

                if (item.Role) {
                  displayName = item.Role.DisplayName;
                }

                let bean = {
                  Encoded: encoded,
                  DisplayName: displayName,
                  Expire: expire,
                  TimeSheetType: timeSheetType,
                  Description: description,
                  Enable: enable,
                };

                self.tableList.push(bean);
              }

              self.filterList = self.tableList;

              self.pagination.total = self.filterList.length;
              self.loading = false;
            });
          }
        });
      },

      searchFor() {
        let self = this;
        self.filterList = self.tableList;
        self.filterList = self.filterList.filter(
          item => (item.Encoded + "").indexOf(self.badgeCode) > -1
        );
        self.filterList = self.filterList.filter(
          item => (item.DisplayName + "").indexOf(self.cardholder) > -1
        );
        self.pagination.total = self.filterList.length;
        self.pagination.current = 1;
      },

      changePage(page) {
        this.pagination.current = page;
      },

      addCard() {
        let self = this;
        self.modalForm = Object.assign({}, {});
        self.modalTitle = "添加门禁卡";
        self.okButton = "保存";
        self.enableEdit = false;
        self.isShowModal = true;
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
            "IsDeleted": false,
            "Enable": true,
            "Cardholder": '',
            "Encoded": $("#cardCode").val().trim(),
            "KeypadID": $("#cardPWD").val().trim(),
            "BadgeTechnologyID": 0,
            "Created": new Date(),
            "BadgeLayoutID": 4,
            "StampedId": 0,
            "Modified": new Date(),
            "Expire": new Date(),
            "TimeSheetType": "staff",
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

        // this.isShowModal = false;
        // // 手动封装表单数据
        // const modalForm = this.modalForm;
        // let form = new FormData();
        // for (let i = 0; i <= Object.keys(modalForm); i++) {
        //   form.append(
        //     Object.keys(modalForm)[i].toString(),
        //     Object.values(modalForm)[i]
        //   );
        // }
        // this.$http.post('', {}).then()
      },

      closeModal(e) {
        this.confirmLoading = false;
        this.isShowModal = false;
      },

      changeTime(date, dateString) {
        console.log(date, dateString);
      }
    }
  };

</script>

<style scoped>
  .modal-form {
    display: flex;
    flex-direction: row;
  }

  /*/deep/ .ant-table-body {*/
  /*font-size: .2em;*/
  /*}*/

  /deep/ .ant-form-item-label label {
    color: #ffffff;
  }

  /*/deep/ .ant-pagination {*/
  /*color: #ffffff;*/
  /*}*/

  /*/deep/ .ant-pagination-item a {*/
  /*color: #ffffff;*/
  /*}*/

  /*/deep/ .ant-pagination-item-active a {*/
  /*color: #000000;*/
  /*}*/

  /*/deep/ .ant-pagination-jump-prev, .ant-pagination-jump-next {*/
  /*color: #ffffff;*/
  /*}*/

  /*/deep/ .ant-pagination-prev a, /deep/ .ant-pagination-next a {*/
  /*color: #ffffff;*/
  /*}*/

  /deep/ .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, /deep/ .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: #ffffff;
  }

</style>
