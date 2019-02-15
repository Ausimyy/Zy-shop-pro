<template>
  <div>
    <el-container>
      <el-header>
        <div id="logo-box">
          <img src="../assets/img/heima.png" alt>
          <span id="logo-text">电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="menushow?'65px':'200px'">
          <div
            style="height: 25px;
                   background-color: #4a5064;
                   color:white;
                   line-height: 25px;
                   text-align: center;
                   cursor: pointer;
                   font-size: 12px;
                   letter-spacing: 0.1em;
                   user-select: none;"
            @click="menushow=!menushow"
          >|||</div>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
            :style="menushow?'width:65px':'width:200px'"
            :collapse="menushow"
            :collapse-transition="false"
            :unique-opened="true"
          >
            <el-submenu :index="item.id+''" v-for="(item,i) in menuList" :key="item.id">
              <template slot="title">
                <i :class="'iconfont icon-'+menuicon[i]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item v-for="item2 in item.children" :key="item2.id">
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
           <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getMenuList()
  },
  data() {
    return {
      menushow: false,
      menuList: [],
      menuicon: ['users', 'tijikongjian', 'shangpin','danju','baobiao']
    }
  },
  methods: {
    // 获得左侧功能按钮数据
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status != 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
    },
    logout() {
      this.$confirm('确定要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    padding: 0;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #logo-box {
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
        width: 50px;
        height: 50px;
      }
      #logo-text {
        color: white;
        font-size: 22px;
      }
    }
  }
}
</style>
