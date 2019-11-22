<template>
  <div>
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchFor">
        <a-form-item label="姓名：">
          <a-input placeholder="姓名" v-model="searchName"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" html-type="submit">搜索</a-button>
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
                  <a-input v-model="modalForm.Name"></a-input>
                </a-form-item>
                <a-form-item label="工号" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.EntityId"></a-input>
                </a-form-item>
                <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.Status"></a-input>
                </a-form-item>
                <a-form-item label="创建时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.Created"></a-input>
                </a-form-item>
              </div>
              <div class="modal-form-two">
                <a-form-item label="固话" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.Tel"></a-input>
                </a-form-item>
                <a-form-item label="手机号" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.PhoneNumber"></a-input>
                </a-form-item>
                <a-form-item label="过期时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.Expired"></a-input>
                </a-form-item>
                <a-form-item label="更新时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
                  <a-input v-model="modalForm.Updated"></a-input>
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
               :dataSource="tableList"
               :pagination="pagination"
               :defaultExpandAllRows="expandAllRows"
               size="small">
        <template slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="checkUser(record)">查看</a-button>
          <a-button type="primary" @click="editUser(record)">编辑</a-button>
          <a-button type="primary" @click="deleteUser(record)">删除</a-button>
        </template>
      </a-table>

      <!--<a-pagination :current="pagination.current"-->
                    <!--:defaultPageSize="pagination.defaultPageSize"-->
                    <!--:showQuickJumper="pagination.showQuickJumper"-->
                    <!--@change="pageChange(page, pageSize)" />-->
    </div>
  </div>
</template>

<script>
  // 预留 column 表头信息
  import AFormItem from "ant-design-vue/es/form/FormItem";
  const column = [
    {
      title: '姓 名',
      dataIndex: 'Name',
      align: 'center',
      sorter: true,
      width: '10%',
      // scopedSlots: { customRender: 'name' }
    },
    {
      title: '工 号',
      dataIndex: 'EntityId',
      align: 'center',
      width: 30
    },
    {
      title: '固 话',
      dataIndex: 'Tel',
      align: 'center',
      width: '10%'
    },
    {
      title: '手机号',
      dataIndex: 'PhoneNumber',
      align: 'center',
      width: '12%'
    },
    {
      title: '创建时间',
      dataIndex: 'Created',
      align: 'center',
      width: '12%'
    },
    {
      title: '更新时间',
      dataIndex: 'Updated',
      align: 'center',
      width: '12%'
    },
    {
      title: '过期时间',
      dataIndex: 'Expired',
      align: 'center',
      width: '12%'
    },
    {
      title: '状 态',
      dataIndex: 'Status',
      align: 'center',
      width: 40
    },
    {
      title: '操 作',
      // dataIndex: 'tel',
      align: 'center',
      width: '15%',
      scopedSlots: { customRender: 'operation' }
    }
  ];

    export default {
        name: "user-manage",
      components: {AFormItem},
      data () {
          return{
            modal: '', // 使用 a-modal target 不能动态地改变标题，模拟一个状态使用 API 来 update 对话框，已解决，因此用来做删除的对话框
            // searchName: this.$form.createForm(this, { name: 'advanced_search' }), // 搜索条件 - 姓名
            searchName: '', // 查询条件 - 姓名
            okButton: '保存',
            isShowModal: false,
            confirmLoading: false,
            column,
            expandAllRows: true,
            // 分页信息
            pagination: {
              // current: 0,
              // defaultCurrent: 1,
              defaultPageSize: 17,
              // total: 0,
              // showQuickJumper: true
            },
            modalTitle: '',
            loading: false,

            modalForm: {},
            tableList: []
            /*tableList: [
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
            ]*/
          }
      },

      beforeCreate () {
        this.form = this.$form.createForm(this, { name: 'advanced_search' });
      },

      // 状态创建前窗口会出现一次闪烁
      created () {
        // this.modal = this.Modal.confirm();
        // this.form = this.$form.createForm(this, { name: 'advanced_search' });
      },

      beforeMount () {
        // this.modal.destroy();
      },

      mounted () {},

      methods: {
        searchFor (e) {
          const that = this;
          // 附带 searchName 为参数发起 HTTP 请求
          // e.preventDefault();
          // console.log('start to searching.');
          this.loading = true;
          // 使用当前绑定状态进行校验
          this.form.validateFields((err, values) => {
            if (!err) {
              // console.log(' --- the input form:');
              // console.log(values);
              /*const param = {
                token: that.$common.getCookie('dvptToken'),
                station: 1
              }*/
              this.$http.get(that.$api.getUsers, {}).then(res => {
                // console.log('response data:')
                // console.log(res)
                // 直接填充
                // this.tableList = res.data.value;
                // this.pagination.total = this.tableList.length;

                let tableContainer = [];
                that.pagination.total = res.data.value.length;
                const table = res.data.value;
                table.forEach((value, index) => {
                  value.Created = this.$common.timestampToTime(value.Created);
                  value.Updated = this.$common.timestampToTime(value.Updated);
                  value.Expired = this.$common.timestampToTime(value.Expired);
                  value.Status = value.Status === 'Enable' ? '启用' : '停用';
                  // that.tableList = table;
                  // this.handleTableList(table)
                  that.tableList.push(value);
                });

                /*for (let i=0;i<=table.length;) {
                  tableContainer.push(table[i]);
                  // console.log(tableContainer);
                  // console.log('the type of Created:' + typeof tableContainer[0].Created);
                  for (let j=0;j<=table.length;) {
                    // tableContainer[i].Created = tableContainer[i].Created.toLocaleDateString();
                    // tableContainer[i].Updated = tableContainer[i].Updated.toLocaleDateString();
                    // tableContainer[i].Expired = tableContainer[i].Expired.toLocaleDateString();
                    j++;
                  }
                  i++;
                }*/
                // console.log('after dealing,the table is:');
                // console.log(tableContainer);
                that.loading = false;
              })
            }
          })
        },

        handleTableList (table) {
          const that = this;
          let _searchName = this.searchName;
          table.some((value) => {
            if (_searchName !== '' || _searchName !== undefined || _searchName !== null) {
              if (value.Name === _searchName) {
                that.tableList.push(value)
              }
              that.tableList = value;
            }
          })
          /*return function (table) {
            table.some((value) => {
              if (_searchName === value.name) {
                return value
              }
              this.tableList.push(value);
              this.searchName = ''
            })
          }*/
        },

        /**
         * @function 当前页码改变的回调
         */
        pageChange (page, pageSize) {
          // this.pagination.current = page;
          console.log('current page:' + page);
          // 每当页码改变时需要重新渲染列表数据
          this.handleTableChange(page);
        },

        handleTableChange (page) {
          const that = this;
          this.loading = true;
          this.pagination.current = page;
          this.$http.get(that.$api.getUsers)
            .then((response) => {
              // console.log('getting table list:')
              // console.log(table)
              // console.log('pick the data of table:');
              // console.log(table[57]);
              try {
                let index;
                let tableContainer = [];
                const table = response.data.value;
                for (let i=0;i<17;i++) {
                  // 以当前页码设置渲染列表数据的索引
                  index = (page - 1) * 17 + i;
                  table[index].Created = that.$common.timestampToTime(table[index].Created);
                  table[index].Updated = that.$common.timestampToTime(table[index].Updated);
                  table[index].Expired = that.$common.timestampToTime(table[index].Expired);
                  table[index].Status = table[index].Status === 'Enable' ? '启用' : '未启用';
                  tableContainer.push(table[index]);
                }
                that.tableList = tableContainer;
              }catch (e) {
                console.log('there are some data have "null":' + e);
              }

              /*that.pagination.defaultCurrent = parseInt(page);
              const length = table.length;
              for (let i=0;i<17;i++) {
                let index = i + (page - 1) * parseInt(that.pagination.defaultPageSize);
                that.tableList.push(table[index]);
                that.tableList[index].Created = that.$common.timestampToTime(that.tableList[index].Created);
                that.tableList[index].Updated = that.$common.timestampToTime(that.tableList[index].Updated);
                that.tableList[index].Expired = that.$common.timestampToTime(that.tableList[index].Expired);
                that.tableList[index].Status = that.tableList[index].Status === 'Enable' ? '启用' : '未启用';
              }*/
              that.loading = false;
            })
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

        /**
         * @function 必须使用 @submit 绑定的方法，该方法不再使用
         * @param e
         */
        searchInUser (e) {
          // console.log('the param "e":')
          // console.log(e);
          e.preventDefault();
          // 使用当前绑定状态进行校验
          this.searchName.validateFields((err, values) => {
            if (!err) {
              console.log('the input form:');
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
