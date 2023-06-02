<script setup lang="ts">
import { ipv4, ipv6 } from '../api/ipify'
import { baidu } from '../api/actuator'
import { ref } from 'vue'

const ipv4Var = ref()
const ipv6Var = ref()

ipv4().then((response: any) => {
  ipv4Var.value = response
  console.log(response)
})

ipv6().then((response: any) => {
  ipv6Var.value = response
  console.log(response)
})

baidu().then((response: any) => {})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-text class="ip">当前IPv4地址：{{ ipv4Var }}</el-text>
    <br>
    <el-text class="ip">当前IPv6地址（无IPv6时，展示 IPv4）：{{ ipv6Var }}</el-text>
  </div>
</template>

<style scoped>

</style>
