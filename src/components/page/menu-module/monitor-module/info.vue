<template>
  <div class="info">
    <div class="info-bg">

    </div>
    <div class="info-pic"></div>
    <div class="info-list">
      <a-table :showHeader="false" :columns="columns" :dataSource="data" :pagination="false" :loading="loading"
               :customRow="setRow">
      </a-table>
    </div>
  </div>
</template>

<script>
  const columns = [
    {
      dataIndex: "name",
      width: "20%",
      align: "center"
    },
    {
      dataIndex: "data",
      width: "20%",
      align: "center"
    }
  ];

  const data = [{
    name: "软件版本号",
    data: "PUN-UU 091111"
  },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },
    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },

    {
      name: "软件版本号",
      data: "PUN-UU 091111"
    },
  ];

  export default {
    name: "info",
    data() {
      return {
        data: data,
        pagination: {
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 20,
          total: 0,
          showQuickJumper: true,
          onChange: current => this.changePage(current)
        },
        loading: false,
        columns,
      };
    },
    mounted() {
      // this.fetch();
      this.init();
    },

    methods: {
      init() {

      },
      changePage(page) {
        this.pagination.current = page;
      },
      setRow(record, index) {
        return {
          on: {
            props: {},
            click: () => {
              console.log(record);
              document.getElementsByClassName('ant-table-row')[index].style.backgroundColor = 'red';

            }
          }
        };
        if (index % 2 == 1) {
          console.log(index);
        } else {
          // console.log(2)
          document.getElementsByClassName('ant-table-row')[index].style.backgroundColor = 'red';

        }
      }
    }
  };

</script>

<style scoped>
  .info {
    display: flex;
    height: 100%;
    position: relative;
  }

  .info-bg {
    z-index: 0;
    position: absolute;
    display: flex;

    width: 100%;
    height: 100%;
    background-color: #2250ca;
    opacity: .2;
  }

  .info-pic {
    z-index: 10;

    flex: 0 60%;
    height: 100%;
    padding: 20px;
    background: url("../../../../assets/img/monitor/dev3.png") no-repeat center;
    background-size: 42%;
  }

  .info-list {
    z-index: 10;

    flex: 0 40%;
    height: 100%;
    padding: 0 60px 0 60px;


  }

  /*/deep/ .ant-table-pagination.ant-pagination {*/
  /*visibility: hidden;*/
  /*}*/

  /deep/ .ant-table-row {
    /*background-color: #315c85;*/
    /*margin-bottom: 10px !important;*/
  }
</style>
