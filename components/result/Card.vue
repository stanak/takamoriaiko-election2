<template>
  <span class="inline">
    <div class="position-center">
      <div class="padding-x-xs">
        <el-card :body-style="{ padding: '0px' }" class="w-xs card relative">
          <img class="absolute img-size upper-left stack" :src="crownImg">
          <div class="absolute lower-right text-lg">
            {{ voteCount }}票
          </div>
          <el-image
            style="height: 12rem; width: 100%;"
            :src="epImg"
            fit="contain"
          />
          <div class="padding-x-xs">
            <div class="font-bold text-xl margin-xs text-center">
              {{ epName }}
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    crownImg: {
      type: String,
      required: true
    },
    voteCount: {
      type: Number,
      required: true
    },
    epImg: {
      type: String,
      required: true
    },
    epName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.position-center {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-center {
  text-align: center;
}
.margin-xs {
  margin: 0.5rem;
}
.padding-x-xs {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.w-xs {
  width: 24rem;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.lower-right {
  right: 0.5rem;
  bottom: 0.5rem;
}
.upper-left {
  left: 0.5rem;
  top: 0.5rem;
}
.img-size {
  height: 2.5rem;
}
.card {
  height: 16rem;
  overflow:hidden;
}
.big-text {
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.font-bold {
  font-weight: 700;
}
.stack {
  z-index:999;
}
.inline {
  display: inline-block;
}
</style>
