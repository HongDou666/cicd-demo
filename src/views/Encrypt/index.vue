<template>
  <div class="encrypt">
    <p>未加密：{{ test1 }} ~ {{ test2.value }}</p>
    <p>加密：{{ passWord1.test1 }} ~ {{ passWord1.test2 }}</p>
    <p>解密：{{ passWord2.test1 }} ~ {{ passWord2.test2.value }}</p>

    <hr />

    <p>AES未加密：{{ test3 }} ~ {{ test4.value }}</p>
    <p>AES加密：{{ passWord3.test3 }} ~ {{ passWord3.test4 }}</p>
    <p>AES解密：{{ passWord4.test3 }} ~ {{ passWord4.test4.value }}</p>
  </div>
</template>

<script setup lang="ts" name="Encrypt">
import { encryptionData, decryptionData, generatekey, encrypt, decrypt } from '@/utils/index'

/* window.btoa-加密 | window.atob-解密 */
const test1 = ref<string>('五一小长假')
const test2 = reactive({
  value: '硬座抗火车'
})
const passWord1 = computed(() => {
  return {
    test1: encryptionData(test1.value),
    test2: encryptionData(test2)
  }
})
const passWord2 = computed(() => {
  return {
    test1: decryptionData(passWord1.value.test1),
    test2: decryptionData(passWord1.value.test2)
  }
})
/* window.btoa-加密 | window.atob-解密 */

/* AES加密-AES解密  */
const key = generatekey(16)
const test3 = ref<string>('一句春不晚')
const test4 = reactive({
  value: '就到真江南'
})

// 如果是对象/数组的话，需要先JSON.stringify转换成字符串
// 不传key值，就默认使用定义好的key值
const passWord3 = computed(() => {
  return {
    test3: encrypt(test3.value, key),
    test4: encrypt(JSON.stringify(test4), key)
  }
})
const passWord4 = computed(() => {
  return {
    test3: decrypt(passWord3.value.test3, key),
    test4: JSON.parse(decrypt(passWord3.value.test4, key))
  }
})
/* AES加密-AES解密  */
</script>

<style scoped lang="less">
.encrypt {
  p {
    margin: 0;
    font-size: 26px;
    text-align: left;
    color: #088;
  }
}
</style>
