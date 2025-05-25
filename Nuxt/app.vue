<template>
  <div class="min-h-screen bg-red-500 text-white flex items-center justify-center">
    <h1 class="text-4xl font-bold">Tailwind žije!</h1>
    <Button v-on:click='console.log("click")' variant="default">Click</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

</script>