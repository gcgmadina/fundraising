<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="32.566" height="32.566" viewBox="0 0 32.566 32.566">
    <g>
      <path
        d="M27.8,11.514V4.769H21.052L16.283,0,11.514,4.769H4.769v6.745L0,16.283l4.769,4.769V27.8h6.745l4.769,4.769L21.052,27.8H27.8V21.052l4.769-4.769Zm-1.909,8.748v5.627H20.261l-3.979,3.979L12.3,25.888H6.678V20.261L2.7,16.283,6.678,12.3V6.678H12.3L16.283,2.7l3.979,3.979h5.627V12.3l3.979,3.979Z"
        fill="#223f8d" />
    </g>
    <!-- Nomor di tengah bintang -->
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="currentColor" font-weight="bold"
      style="z-index: 10">
      {{ number }}
    </text>

  </svg>
</template>

<script>
export default {
  props: {
    number: {
      type: [String, Number],
      required: true
    }
  }
};
</script>

<style scoped>
svg {
  color: #223F8D;
}
</style>