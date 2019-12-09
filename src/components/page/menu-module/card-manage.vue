<template>
  <div class="card-manage">
    <div class="search-condition">
      <a-form layout="inline" :form="cardForm">
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
                  <a-input v-model="modalForm.DisplayExpire" :disabled="enableEdit"></a-input>
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
      <a-table :columns="columns" :dataSource="tableList" :pagination="pagination" :loading="loading"
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

  const columns = [{
    title: "门禁卡号",
    dataIndex: "Encoded",
    align: "center",
    // sorter: true,
    width: 40
    // scopedSlots: { customRender: 'name' }
  },
    {
      title: "持卡人",
      dataIndex: "DisplayName",
      align: "center",
      width: 40
    },
    {
      title: "有效期",
      dataIndex: "DisplayExpire",
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
      // dataIndex: 'tel',
      align: "center",
      width: 40,
      scopedSlots: {
        customRender: "operation"
      }
    }
  ];

  const tableList = [{
    EntityId: 4,
    Modified: "2019-11-18T10:42:37.233+08:00",
    IsDeleted: false,
    Actived: "2019-11-18T10:42:43.417+08:00",
    Expired: "2019-11-18T10:42:43.417+08:00",
    LastName: "胡六七",
    FirstName: "",
    Code: "12131233",
    Type: "Job",
    Description: "",
    IsBlocked: true,
    Role: {
      EntityId: 85,
      Name: "角色85",
      DisplayName: "测试角色85",
      Created: "2019-10-14T13:53:30.483+08:00",
      Updated: "2019-10-14T13:53:30.483+08:00"
    },
    Department: {
      EntityId: 1,
      Name: "WMC",
      DisplayName: "弱电维护中心",
      Created: "2019-09-24T00:00:00+08:00",
      Updated: "2019-09-24T00:00:00+08:00"
    },
    Badges: [{
      EntityId: 5315,
      IsDeleted: false,
      Enable: false,
      StampedId: 0,
      Encoded: "125412541254",
      KeypadID: 11167,
      BadgeTechnologyID: 0,
      Created: "2019-11-27T17:25:36.487+08:00",
      Modified: "2019-11-27T17:25:17.03+08:00",
      Expire: "2019-11-27T17:25:36.487+08:00",
      BadgeLayoutID: 4,
      TimeSheetType: "staff"
    }]
  },
    {
      EntityId: 4,
      Modified: "2019-11-18T10:42:37.233+08:00",
      IsDeleted: false,
      Actived: "2019-11-18T10:42:43.417+08:00",
      Expired: "2019-11-18T10:42:43.417+08:00",
      LastName: "胡六七",
      FirstName: "",
      Code: "12131233",
      Type: "Job",
      Description: "",
      IsBlocked: true,
      Role: {
        EntityId: 85,
        Name: "角色85",
        DisplayName: "测试角色86",
        Created: "2019-10-14T13:53:30.483+08:00",
        Updated: "2019-10-14T13:53:30.483+08:00"
      },
      Department: {
        EntityId: 1,
        Name: "WMC",
        DisplayName: "弱电维护中心",
        Created: "2019-09-24T00:00:00+08:00",
        Updated: "2019-09-24T00:00:00+08:00"
      },
      Badges: [{
        EntityId: 5315,
        IsDeleted: false,
        Enable: true,
        StampedId: 0,
        Encoded: "125412541254",
        KeypadID: 11167,
        BadgeTechnologyID: 0,
        Created: "2019-11-27T17:25:36.487+08:00",
        Modified: "2019-11-27T17:25:17.03+08:00",
        Expire: "2019-11-27T17:25:36.487+08:00",
        BadgeLayoutID: 4,
        TimeSheetType: "staff"
      }]
    },
    {
      EntityId: 4,
      Modified: "2019-11-18T10:42:37.233+08:00",
      IsDeleted: false,
      Actived: "2019-11-18T10:42:43.417+08:00",
      Expired: "2019-11-18T10:42:43.417+08:00",
      LastName: "胡六七",
      FirstName: "",
      Code: "12131233",
      Type: "Job",
      Description: "",
      IsBlocked: true,
      Role: {
        EntityId: 85,
        Name: "角色85",
        DisplayName: "测试角色85",
        Created: "2019-10-14T13:53:30.483+08:00",
        Updated: "2019-10-14T13:53:30.483+08:00"
      },
      Department: {
        EntityId: 1,
        Name: "WMC",
        DisplayName: "弱电维护中心",
        Created: "2019-09-24T00:00:00+08:00",
        Updated: "2019-09-24T00:00:00+08:00"
      },
      Badges: [{
        EntityId: 5315,
        IsDeleted: false,
        Enable: false,
        StampedId: 0,
        Encoded: "125412541254",
        KeypadID: 11167,
        BadgeTechnologyID: 0,
        Created: "2019-11-27T17:25:36.487+08:00",
        Modified: "2019-11-27T17:25:17.03+08:00",
        Expire: "2019-11-27T17:25:36.487+08:00",
        BadgeLayoutID: 4,
        TimeSheetType: "staff"
      }]
    },
    {
      EntityId: 4,
      Modified: "2019-11-18T10:42:37.233+08:00",
      IsDeleted: false,
      Actived: "2019-11-18T10:42:43.417+08:00",
      Expired: "2019-11-18T10:42:43.417+08:00",
      LastName: "胡六七",
      FirstName: "",
      Code: "12131233",
      Type: "Job",
      Description: "",
      IsBlocked: true,
      Role: {
        EntityId: 85,
        Name: "角色85",
        DisplayName: "测试角色85",
        Created: "2019-10-14T13:53:30.483+08:00",
        Updated: "2019-10-14T13:53:30.483+08:00"
      },
      Department: {
        EntityId: 1,
        Name: "WMC",
        DisplayName: "弱电维护中心",
        Created: "2019-09-24T00:00:00+08:00",
        Updated: "2019-09-24T00:00:00+08:00"
      },
      Badges: [{
        EntityId: 5315,
        IsDeleted: false,
        Enable: true,
        StampedId: 0,
        Encoded: "125412541254",
        KeypadID: 11167,
        BadgeTechnologyID: 0,
        Created: "2019-11-27T17:25:36.487+08:00",
        Modified: "2019-11-27T17:25:17.03+08:00",
        Expire: "2019-11-27T17:25:36.487+08:00",
        BadgeLayoutID: 4,
        TimeSheetType: "staff"
      }]
    },
    {
      EntityId: 4,
      Modified: "2019-11-18T10:42:37.233+08:00",
      IsDeleted: false,
      Actived: "2019-11-18T10:42:43.417+08:00",
      Expired: "2019-11-18T10:42:43.417+08:00",
      LastName: "胡六七",
      FirstName: "",
      Code: "12131233",
      Type: "Job",
      Description: "",
      IsBlocked: true,
      Role: {
        EntityId: 85,
        Name: "角色85",
        DisplayName: "测试角色85",
        Created: "2019-10-14T13:53:30.483+08:00",
        Updated: "2019-10-14T13:53:30.483+08:00"
      },
      Department: {
        EntityId: 1,
        Name: "WMC",
        DisplayName: "弱电维护中心",
        Created: "2019-09-24T00:00:00+08:00",
        Updated: "2019-09-24T00:00:00+08:00"
      },
      Badges: [{
        EntityId: 5315,
        IsDeleted: false,
        Enable: true,
        StampedId: 0,
        Encoded: "125412541254",
        KeypadID: 11167,
        BadgeTechnologyID: 0,
        Created: "2019-11-27T17:25:36.487+08:00",
        Modified: "2019-11-27T17:25:17.03+08:00",
        Expire: "2019-11-27T17:25:36.487+08:00",
        BadgeLayoutID: 4,
        TimeSheetType: "staff"
      }]
    },
    {
      EntityId: 4,
      Modified: "2019-11-18T10:42:37.233+08:00",
      IsDeleted: false,
      Actived: "2019-11-18T10:42:43.417+08:00",
      Expired: "2019-11-18T10:42:43.417+08:00",
      LastName: "胡六七",
      FirstName: "",
      Code: "12131233",
      Type: "Job",
      Description: "",
      IsBlocked: true,
      Role: {
        EntityId: 85,
        Name: "角色85",
        DisplayName: "测试角色85",
        Created: "2019-10-14T13:53:30.483+08:00",
        Updated: "2019-10-14T13:53:30.483+08:00"
      },
      Department: {
        EntityId: 1,
        Name: "WMC",
        DisplayName: "弱电维护中心",
        Created: "2019-09-24T00:00:00+08:00",
        Updated: "2019-09-24T00:00:00+08:00"
      },
      Badges: [{
        EntityId: 5315,
        IsDeleted: false,
        Enable: true,
        StampedId: 0,
        Encoded: "125412541254",
        KeypadID: 11167,
        BadgeTechnologyID: 0,
        Created: "2019-11-27T17:25:36.487+08:00",
        Modified: "2019-11-27T17:25:17.03+08:00",
        Expire: "2019-11-27T17:25:36.487+08:00",
        BadgeLayoutID: 4,
        TimeSheetType: "staff"
      }]
    },
    {
      EntityId: 4,
      Modified: "2019-11-18T10:42:37.233+08:00",
      IsDeleted: false,
      Actived: "2019-11-18T10:42:43.417+08:00",
      Expired: "2019-11-18T10:42:43.417+08:00",
      LastName: "胡六七",
      FirstName: "",
      Code: "12131233",
      Type: "Job",
      Description: "",
      IsBlocked: true,
      Role: {
        EntityId: 85,
        Name: "角色85",
        DisplayName: "测试角色85",
        Created: "2019-10-14T13:53:30.483+08:00",
        Updated: "2019-10-14T13:53:30.483+08:00"
      },
      Department: {
        EntityId: 1,
        Name: "WMC",
        DisplayName: "弱电维护中心",
        Created: "2019-09-24T00:00:00+08:00",
        Updated: "2019-09-24T00:00:00+08:00"
      },
      Badges: [{
        EntityId: 5315,
        IsDeleted: false,
        Enable: true,
        StampedId: 0,
        Encoded: "125412541254",
        KeypadID: 11167,
        BadgeTechnologyID: 0,
        Created: "2019-11-27T17:25:36.487+08:00",
        Modified: "2019-11-27T17:25:17.03+08:00",
        Expire: "2019-11-27T17:25:36.487+08:00",
        BadgeLayoutID: 4,
        TimeSheetType: "staff"
      }]
    },
    {
      EntityId: 4,
      Modified: "2019-11-18T10:42:37.233+08:00",
      IsDeleted: false,
      Actived: "2019-11-18T10:42:43.417+08:00",
      Expired: "2019-11-18T10:42:43.417+08:00",
      LastName: "胡六七",
      FirstName: "",
      Code: "12131233",
      Type: "Job",
      Description: "",
      IsBlocked: true,
      Role: {
        EntityId: 85,
        Name: "角色85",
        DisplayName: "测试角色85",
        Created: "2019-10-14T13:53:30.483+08:00",
        Updated: "2019-10-14T13:53:30.483+08:00"
      },
      Department: {
        EntityId: 1,
        Name: "WMC",
        DisplayName: "弱电维护中心",
        Created: "2019-09-24T00:00:00+08:00",
        Updated: "2019-09-24T00:00:00+08:00"
      },
      Badges: [{
        EntityId: 5315,
        IsDeleted: false,
        Enable: true,
        StampedId: 0,
        Encoded: "125412541254",
        KeypadID: 11167,
        BadgeTechnologyID: 0,
        Created: "2019-11-27T17:25:36.487+08:00",
        Modified: "2019-11-27T17:25:17.03+08:00",
        Expire: "2019-11-27T17:25:36.487+08:00",
        BadgeLayoutID: 4,
        TimeSheetType: "staff"
      }]
    },
    {
      EntityId: 4,
      Modified: "2019-11-18T10:42:37.233+08:00",
      IsDeleted: false,
      Actived: "2019-11-18T10:42:43.417+08:00",
      Expired: "2019-11-18T10:42:43.417+08:00",
      LastName: "胡六七",
      FirstName: "",
      Code: "12131233",
      Type: "Job",
      Description: "",
      IsBlocked: true,
      Role: {
        EntityId: 85,
        Name: "角色85",
        DisplayName: "测试角色85",
        Created: "2019-10-14T13:53:30.483+08:00",
        Updated: "2019-10-14T13:53:30.483+08:00"
      },
      Department: {
        EntityId: 1,
        Name: "WMC",
        DisplayName: "弱电维护中心",
        Created: "2019-09-24T00:00:00+08:00",
        Updated: "2019-09-24T00:00:00+08:00"
      },
      Badges: [{
        EntityId: 5315,
        IsDeleted: false,
        Enable: true,
        StampedId: 0,
        Encoded: "125412541254",
        KeypadID: 11167,
        BadgeTechnologyID: 0,
        Created: "2019-11-27T17:25:36.487+08:00",
        Modified: "2019-11-27T17:25:17.03+08:00",
        Expire: "2019-11-27T17:25:36.487+08:00",
        BadgeLayoutID: 4,
        TimeSheetType: "staff"
      }]
    },
    {
      EntityId: 4,
      Modified: "2019-11-18T10:42:37.233+08:00",
      IsDeleted: false,
      Actived: "2019-11-18T10:42:43.417+08:00",
      Expired: "2019-11-18T10:42:43.417+08:00",
      LastName: "胡六七",
      FirstName: "",
      Code: "12131233",
      Type: "Job",
      Description: "",
      IsBlocked: true,
      Role: {
        EntityId: 85,
        Name: "角色85",
        DisplayName: "测试角色85",
        Created: "2019-10-14T13:53:30.483+08:00",
        Updated: "2019-10-14T13:53:30.483+08:00"
      },
      Department: {
        EntityId: 1,
        Name: "WMC",
        DisplayName: "弱电维护中心",
        Created: "2019-09-24T00:00:00+08:00",
        Updated: "2019-09-24T00:00:00+08:00"
      },
      Badges: [{
        EntityId: 5315,
        IsDeleted: false,
        Enable: true,
        StampedId: 0,
        Encoded: "125412541254",
        KeypadID: 11167,
        BadgeTechnologyID: 0,
        Created: "2019-11-27T17:25:36.487+08:00",
        Modified: "2019-11-27T17:25:17.03+08:00",
        Expire: "2019-11-27T17:25:36.487+08:00",
        BadgeLayoutID: 4,
        TimeSheetType: "staff"
      }]
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
        cardForm: {},
        isShowModal: false,
        okButton: "",
        modalTitle: "",
        confirmLoading: false,
        columns,
        expandAllRows: true,
        enableEdit: false,
        modalForm: {
          Encoded: "",
          DisplayName: "",
          DisplayExpire: "",
          TimeSheetType: "",
          Description: "",
          Enable: ""
        },
        pagination: {
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 20,
          total: 0,
          showQuickJumper: true,
          onChange: current => this.changePage(current)
        },
        loading: false,
        badgeCode: "",
        cardholder: "",
        tableData: [],
        tableList: []
      };
    },

    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: "advanced_search"
      });
    },

    created() {},

    beforeMount() {},

    mounted() {
      this.initTable();
    },

    methods: {
      initTable() {
        let self = this;
        self.loading = true;
        self.form.validateFields((err, values) => {
          if (!err) {
            self.$http.get(self.$api.getCards).then(res => {
              self.tableData = res.data.value;
              // console.log(self.tableData);
              if (self.tableData.length == 0) {
                self.tableData = tableList;
              }
              self.tableData.forEach((value, index) => {
                value.Encoded = value.Badges[0].Encoded;
                value.DisplayName = value.Role.DisplayName;
                value.Expire = value.Badges[0].Expire;
                value.DisplayExpire = self.$common.timestampToTime(
                  value.Badges[0].Expire
                );
                value.TimeSheetType = value.Badges[0].TimeSheetType;
                // value.Description = value.Description;
                value.Enable = value.Badges[0].Enable;
                self.tableList.push(value);
              });
              console.log(self.tableList);
              self.pagination.total = self.tableList.length;
              self.loading = false;
            });
          }
        });
      },

      searchFor() {
        let self = this;
        self.tableList = self.tableData;
        self.tableList = self.tableList.filter(
          item => (item.Encoded + "").indexOf(self.badgeCode) > -1
        );
        self.tableList = self.tableList.filter(
          item => (item.DisplayName + "").indexOf(self.cardholder) > -1
        );
        self.pagination.total = self.tableList.length;
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

</style>
