<template>
  <div>
    <div class="position-center">
      <div>
        <el-image
          style="height: 16rem; width: 100%;"
          :src="`/tihiro.png`"
          fit="contain"
        />
      </div>
      <div>
        <el-card>
          本日のログインボーナスです!<br>
          投票券が10枚もらえますよ！<br>
          毎日ログインして沢山投票しましょう！
        </el-card>
      </div>
    </div>
    <div class="position-center">
      <el-button type="primary" @click="$router.push(-1)">
        OK
      </el-button>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.position-center {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
