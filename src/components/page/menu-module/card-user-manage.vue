<template>
  <div class="card-user-manage">
    <a-tabs
      type="card"
      defaultActiveKey="1"
      tabPosition="left"
      @change="initTable"
    >
      <a-tab-pane tab="部门" key="1">
        <a-form layout="inline">
          <a-form-item>
            <a-button type="primary" icon="plus" @click="addDepartment">新增</a-button>
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
            <a-button type="primary" @click="editDepartment(record)">编辑</a-button>
            <a-button type="primary" @click="deleteDepartment(record)">删除</a-button>
          </template>
        </a-table>
        <a-modal
          :visible="departmentModal"
          :title="modalTitle"
          @ok="handleOk()"
          @cancel="closeModal()"
          centered
          destroyOnClose
        >
          <div class="form-in-modal">
            <a-form layout="inline" :form="modalForm">
              <div class="modal-form" style="text-align: center">
                <a-form-item label="部门代码">
                  <a-input v-model="modalForm.Code"></a-input>
                </a-form-item>
                <a-form-item label="部门名称">
                  <a-input v-model="modalForm.Name"></a-input>
                </a-form-item>
              </div>
            </a-form>
          </div>
        </a-modal>
      </a-tab-pane>
      <a-tab-pane tab="岗位" key="2">
        <a-form layout="inline">
          <a-form-item>
            <a-button type="primary" icon="plus" @click="AddPost">新增</a-button>
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
            <a-button type="primary" @click="editPost(record)">编辑</a-button>
            <a-button type="primary" @click="deletePost(record)">删除</a-button>
          </template>
        </a-table>
        <a-modal
          :visible="postModal"
          :title="modalTitle"
          @ok="handleOk()"
          @cancel="closeModal()"
          centered
          destroyOnClose
        >
          <div class="form-in-modal">
            <a-form layout="inline" :form="modalForm">
              <div class="modal-form" style="text-align: center">
                <a-form-item label="从属部门">
                  <a-select v-model="modalForm.Department">
                    <a-select-option value="Enable">启用</a-select-option>
                    <a-select-option value="Disable">未启用</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="岗位代码">
                  <a-input v-model="modalForm.Code"></a-input>
                </a-form-item>
                <a-form-item label="岗位名称">
                  <a-input v-model="modalForm.Name"></a-input>
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
            <a-button type="primary" @click="editAuthority(record)">编辑</a-button>
          </template>
        </a-table>
        <a-modal
          :visible="authorityModal"
          :title="modalTitle"
          @ok="handleOk()"
          @cancel="closeModal()"
          centered
          destroyOnClose
        >
          <div class="form-in-modal">
            <a-form layout="inline" :form="modalForm">
              <div class="modal-form" style="text-align: center">
                <a-form-item label="从属部门">
                  <a-select v-model="modalForm.Department">
                    <a-select-option value="Enable">启用</a-select-option>
                    <a-select-option value="Disable">未启用</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="岗位代码">
                  <a-input v-model="modalForm.Code"></a-input>
                </a-form-item>
                <a-form-item label="岗位名称">
                  <a-input v-model="modalForm.Name"></a-input>
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
      title: "部门代码",
      dataIndex: "url",
    },
    {
      title: "部门名称",
      dataIndex: "name",
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
      title: "岗位ID",
      dataIndex: "EntityId",
    },
    {
      title: "岗位代码",
      dataIndex: "RoleLevel",
    },
    {
      title: "从属部门",
      dataIndex: "Description",
    },
    {
      title: "岗位名称",
      dataIndex: "Name",
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
      title: "部门名称",
      dataIndex: "EntityId",
    },
    {
      title: "岗位名称",
      dataIndex: "RoleLevel",
    },
    {
      title: "可通行门",
      dataIndex: "Description",
    },
    {
      title: "状态",
      dataIndex: "Name",
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

  export default {
    name: "card-user-manage",
    components: {
      AFormItem
    },
    data() {
      return {
        key: "",
        data: [],
        columns1,
        columns2,
        columns3,
        expandAllRows: true,
        loading: false,
        pagination: {
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 15,
          total: 0,
          size: "large",
          // showQuickJumper: true,
          onChange: current => this.changePage(current)
        },
        departmentModal: false,
        postModal: false,
        authorityModal: false,
        modalTitle: "",
        modalForm: {},
      };
    },

    mounted() {
      this.initTable(1);
    },

    methods: {
      initTable(key) {
        let self = this;
        self.loading = true;
        self.key = key;
        if (self.key == 1) {
          let url = "/config";
          self.$http.get(url).then(res => {
            console.log(res);
            self.data = res.data.value;
            self.pagination.total = self.data.length;
            self.loading = false;
          });
        } else if (self.key == 2) {
          let url = "/config/Roles";
          self.$http.get(url).then(res => {
            console.log(res);
            self.data = res.data.value;
            self.pagination.total = self.data.length;
            self.loading = false;
          });
        } else {
          let url = "/config/Roles";
          self.$http.get(url).then(res => {
            console.log(res);
            self.data = res.data.value;
            self.pagination.total = self.data.length;
            self.loading = false;
          });
        }
      },

      changePage(page) {
        let self = this;
        self.pagination.current = page;
      },

      addDepartment() {
        let self = this;
        self.modalTitle = "新增部门信息";
        self.modalForm = Object.assign({}, {});
        self.departmentModal = true;
      },

      editDepartment(row) {
        let self = this;
        self.modalTitle = "编辑部门信息";
        self.modalForm = Object.assign({}, row);
        self.departmentModal = true;
      },

      deleteDepartment(row) {
        let self = this;
        self.modal = self.Modal.confirm({
          title: "删除部门信息",
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

      AddPost() {
        let self = this;
        self.modalForm = Object.assign({}, {});
        self.modalTitle = "新增岗位信息";
        self.postModal = true;
      },

      editPost(row) {
        let self = this;
        self.modalForm = Object.assign({}, row);
        self.modalTitle = "编辑岗位信息";
        self.postModal = true;
      },

      deletePost(row) {
        let self = this;
        self.modal = self.Modal.confirm({
          title: "删除岗位信息",
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

      editAuthority(row) {
        let self = this;
        self.modalForm = Object.assign({}, row);
        self.modalTitle = "编辑权限信息";
        self.authorityModal = true;
      },

      handleOk(e) {
        let self = this;
        let param = null;

        if (self.key == 1) {
          if (self.modalTitle === "新增部门信息") {
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
          } else if (self.modalTitle === "编辑部门信息") {
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
        } else if (self.key == 2) {

        } else {

        }


      },

      closeModal() {
        let self = this;
        self.departmentModal = false;
        self.postModal = false;
        self.authorityModal = false;
      },

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
