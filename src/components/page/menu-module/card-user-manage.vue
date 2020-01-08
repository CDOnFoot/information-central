<template>
  <div class="card-user-manage">
    <div class="modal">
      <!--<a-modal width="800px" :visible="isShowModal" :okText="okButton" centered destroyOnClose :title="modalTitle"-->
               <!--:confirm-loading="confirmLoading" @ok="handleOk" @cancel="closeModal">-->
        <!--<div class="form-in-modal">-->
          <!--<a-form :form="modalForm">-->
            <!--<div class="modal-form">-->
              <!--<div class="modal-form-one" style="width:50%">-->
                <!--<a-form-item label="门禁卡号" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">-->
                  <!--<a-input v-model="modalForm.Encoded" :disabled="enableEdit"></a-input>-->
                <!--</a-form-item>-->
                <!--<a-form-item label="门禁卡类型" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">-->
                  <!--<a-input v-model="modalForm.TimeSheetType" :disabled="enableEdit"></a-input>-->
                <!--</a-form-item>-->
                <!--&lt;!&ndash; <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 10 }">-->
                  <!--<a-input v-model="modalForm.cardStatus" :disabled="enableEdit"></a-input>-->
                <!--</a-form-item>&ndash;&gt;-->
                <!--<a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">-->
                  <!--&lt;!&ndash;<a-input v-model="modalForm.Status"></a-input>&ndash;&gt;-->
                  <!--<a-select v-model="modalForm.Enable" :disabled="enableEdit">-->
                    <!--<a-select-option value="Enable">启用</a-select-option>-->
                    <!--<a-select-option value="Disable">未启用</a-select-option>-->
                  <!--</a-select>-->
                <!--</a-form-item>-->
              <!--</div>-->
              <!--<div class="modal-form-two" style="width:50%">-->
                <!--<a-form-item label="持卡人" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">-->
                  <!--<a-input v-model="modalForm.DisplayName" :disabled="enableEdit"></a-input>-->
                <!--</a-form-item>-->
                <!--<a-form-item label="有效期" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">-->
                  <!--<a-input v-model="modalForm.Expire" :disabled="enableEdit"></a-input>-->
                  <!--&lt;!&ndash; <a-date-picker showTime @change="changeTime" :disabled="enableEdit" /> &ndash;&gt;-->
                <!--</a-form-item>-->
                <!--<a-form-item label="描述" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">-->
                  <!--<a-input v-model="modalForm.Description" :disabled="enableEdit"></a-input>-->
                <!--</a-form-item>-->
              <!--</div>-->
            <!--</div>-->
          <!--</a-form>-->
        <!--</div>-->
      <!--</a-modal>-->
    </div>

    <a-tabs
      type="card"
      defaultActiveKey="1"
      tabPosition="left"
    >
      <a-tab-pane tab="部门" key="1">
        <a-table
          :columns="columns1"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          :defaultExpandAllRows="expandAllRows"
          size="small"
        >
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="岗位" key="2">Content of tab 2</a-tab-pane>
      <a-tab-pane tab="岗位权限配置" key="3">Content of tab 3</a-tab-pane>
    </a-tabs>

  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";

  const columns1 = [
    {
      title: '部门代码',
      dataIndex: 'name',
    },
    {
      title: '部门名称',
      dataIndex: 'email',
    },
  ];

  const columns2 = [
    {
      title: '岗位ID',
      dataIndex: 'name',
    },
    {
      title: '岗位代码',
      dataIndex: 'email',
    },
    {
      title: '从属部门',
      dataIndex: 'email',
    },
    {
      title: '岗位名称',
      dataIndex: 'email',
    },
  ];

  const columns3 = [
    {
      title: '部门名称',
      dataIndex: 'name',
    },
    {
      title: '岗位名称',
      dataIndex: 'email',
    },
    {
      title: '可通行门',
      dataIndex: 'email',
    },
    {
      title: '状态',
      dataIndex: 'email',
    },
  ];

  const test_data = [];

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
      };
    },

    mounted() {
      this.init();
    },

    methods: {
      init() {
        let self = this;
        // self.loading = true;
        let url;

        url = "/config/departments";

        self.$http.get(url).then(res => {
          console.log(res);
          self.data = res.data.value;
          if (self.data.length == 0) {
            self.data = test_data;
          }
          self.pagination.total = self.data.length;
          self.loading = false;
        });
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
    background: transparent;
  }

  /deep/ .ant-tabs-vertical.ant-tabs-card.ant-tabs-left .ant-tabs-card-bar.ant-tabs-left-bar .ant-tabs-tab-active {
    /*background: #dddddd;*/
  }

  /deep/ .ant-tabs-content {
    height: 100%;
  }

</style>
