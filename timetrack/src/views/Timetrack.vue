<template>
	<Header/>
	<timetracking/>
</template>

<script>

import timetracking from '@/components/timetracking.vue'
import Header from '@/components/header.vue'


export default {
  name: 'Timetrack',
  components: {
    timetracking,
    Header
  }
}
</script>
