
<template>
    <div class="mb-main">
        <component :is="MC13"></component>
    </div>
</template>

<script>
import MC13 from '../../../components/common/MC/MC13';
export default {
    name:'MB03',
     components:{
          MC13,
     }
}
</script>

<style scoped>

</style>