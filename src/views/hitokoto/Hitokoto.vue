<template>
  <div class="hitokoto">
    <template v-if="[STATES.ERROR, STATES.STALE_IF_ERROR].includes(state)">
      {{ error }}
    </template>
    <template v-if="[STATES.PENDING].includes(state)">Loading...</template>
    <template v-if="[STATES.VALIDATING].includes(state)">
      <!-- serve stale content without "loading" -->
    </template>
    <template v-if="[STATES.SUCCESS, STATES.VALIDATING, STATES.STALE_IF_ERROR].includes(state)">
      {{ data.hitokoto }}
      {{ "  —— " + data.from }}
    </template>
  </div>
</template>

<script>
  import useSWRV from "swrv";
  import api from "/@/api";
  import useSwrvState from "../../compositions/useSwrvState";
  import { watch } from "vue";

  export default {
    name: `Hitokoto`,
    setup() {
      const { data, error, isValidating } = useSWRV(`hitokoto`, api.hitokoto.random);
      const { state, STATES } = useSwrvState(data, error, isValidating);
      watch([data], (newValue, oldValue) => {
        console.log(`${oldValue} => ${newValue}`);
      });
      return {
        state,
        STATES,
        data,
      };
    },
  };
</script>

<style lang="scss">
  .hitokoto {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 64px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    font-size: 36px;
  }
</style>
