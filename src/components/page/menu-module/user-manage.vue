<template>
  <div>
    <div class="search-condition">
      <a-form layout="inline" :form="searchName" @submit="searchFor">
        <a-form-item label="姓名：">
          <a-input placeholder="姓名"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" @click="searchInUser" html-type="submit">搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="plus" @click="addUser">添加</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="modal">
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
                <a-form-item label="姓名" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.name"></a-input>
                </a-form-item>
                <a-form-item label="工号" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.number"></a-input>
                </a-form-item>
                <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.status"></a-input>
                </a-form-item>
                <a-form-item label="创建时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.createTime"></a-input>
                </a-form-item>
              </div>
              <div class="modal-form-two">
                <a-form-item label="固话" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.tel"></a-input>
                </a-form-item>
                <a-form-item label="手机号" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.phone"></a-input>
                </a-form-item>
                <a-form-item label="过期时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.overTime"></a-input>
                </a-form-item>
                <a-form-item label="更新时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.updateTime"></a-input>
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
               :defaultExpandAllRows="expandAllRows"
               size="small">
        <template slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="checkUser(record)">查看</a-button>
          <a-button type="primary" @click="editUser(record)">编辑</a-button>
          <a-button type="primary" @click="deleteUser(record)">删除</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  // 预留 column 表头信息
  import AFormItem from "ant-design-vue/es/form/FormItem";
  const column = [
    {
      title: '姓 名',
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      width: 30,
      // scopedSlots: { customRender: 'name' }
    },
    {
      title: '工 号',
      dataIndex: 'number',
      align: 'center',
      width: 40
    },
    {
      title: '固 话',
      dataIndex: 'tel',
      align: 'center',
      width: 40
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
      width: 40
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 40
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
      width: 40
    },
    {
      title: '过期时间',
      dataIndex: 'overTime',
      align: 'center',
      width: 40
    },
    {
      title: '状 态',
      dataIndex: 'status',
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
  ];

    export default {
        name: "user-manage",
      components: {AFormItem},
      data () {
          return{
            modal: '', // 使用 a-modal target 不能动态地改变标题，模拟一个状态使用 API 来 update 对话框，已解决，因此用来做删除的对话框
            searchName: this.$form.createForm(this, { name: 'advanced_search' }), // 搜索条件 - 姓名
            okButton: '保存',
            isShowModal: false,
            confirmLoading: false,
            column,
            expandAllRows: true,
            // 分页信息
            pagination: {
              current: 1,
              defaultCurrent: 1,
              defaultPageSize: 20
            },
            modalTitle: '',
            loading: false,

            modalForm: {},
            tableList: [
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 2,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 2,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              },
              {
                // key: 1,
                name: 'Apple',
                number: 190022,
                tel: '010-2312313',
                phone: 182929483,
                createTime: '9019-10-10 10:10',
                updateTime: '9019-10-10 10:10',
                overTime: '9019-10-10 10:10',
                status: '启用'
              }
            ]
          }
      },

      // 状态创建前窗口会出现一次闪烁
      created () {
        // this.modal = this.Modal.confirm();
      },

      beforeMount () {
        // this.modal.destroy();
      },

      mounted () {},

      methods: {
        searchFor () {
          // 附带 searchName 为参数发起 HTTP 请求
        },

        checkUser (row) {
          // console.log("current user's data is:");
          // console.log(row);
          const formContainer = Object.assign({}, row)
          this.modalForm = Object.assign({}, formContainer)
          this.okButton = '确定';
          // 简介对话框
          // this.isShowModal = true;

          // use API test
          // this.modal = this.Modal.confirm({
          //   title: '查看用户信息',
          //   content: '',
          //   onOk: function (e) {
          //     console.log('onOk:')
          //     console.log(e)
          //   },
          //
          //   onCancel: function (e) {
          //     console.log('onCancel:')
          //     console.log(e)
          //   }
          // });

          this.isShowModal = true;
          this.modalTitle = '查看用户信息'
          // use function method
          /*this.modal.update({
            title: 'test',
            content: (h) => {
              console.log('use function method:')
              console.log(h)
            }
          })*/
        },

        editUser(row) {
          this.modalForm = Object.assign({}, row);
          this.isShowModal = true;
          this.okButton = '保存';
          this.modalTitle = '编辑用户信息';
        },

        deleteUser (row) {
          const that = this;
          let currentUser;
          this.modal = this.Modal.confirm({
            title: '删除用户信息',
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

        handleOk (e) {
          // console.log('choose the ok button, current param is :' + e);
          this.confirmLoading = true;
          this.modalTitle = '查看用户信息';
          setTimeout(() => {
            this.isShowModal = false;
            this.confirmLoading = false;
          }, 2000)
        },

        closeModal (e) {
          // console.log('param:' + e);
          this.isShowModal = false;
        },

        /**
         * @function add users
         */
        addUser () {
          this.modalForm = Object.assign({}, {})
          this.modalTitle = '添加用户信息'
          this.isShowModal = true;
        },

        searchInUser (e) {
          // console.log('the param "e":')
          // console.log(e);
          e.preventDefault();
          // 使用当前绑定状态进行校验
          this.searchName.validateFields((err, values) => {
            if (!err) {
              console.log('the input form:')
              console.log(values)
            }
          })
        }
      }
    }
</script>

<style scoped>
@import '../../../assets/css/default.css';
  .table {
    margin: 20px 10px 0 10px;
  }

  .modal-form {
    display: flex;
    flex-direction: row;
  }
</style>
