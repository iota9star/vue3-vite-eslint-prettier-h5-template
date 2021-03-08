import { ref, watchEffect } from "vue";

const STATES = {
  VALIDATING: `VALIDATING`,
  PENDING: `PENDING`,
  SUCCESS: `SUCCESS`,
  ERROR: `ERROR`,
  STALE_IF_ERROR: `STALE_IF_ERROR`,
};

export default function (data, error, isValidating) {
  const state = ref(`idle`);
  watchEffect(() => {
    if (data.value && isValidating.value) {
      state.value = STATES.VALIDATING;
      return;
    }
    if (data.value && error.value) {
      state.value = STATES.STALE_IF_ERROR;
      return;
    }
    if (data.value === undefined && !error.value) {
      state.value = STATES.PENDING;
      return;
    }
    if (data.value && !error.value) {
      state.value = STATES.SUCCESS;
      return;
    }
    if (data.value === undefined && error) {
      state.value = STATES.ERROR;
      return;
    }
  });

  return {
    state,
    STATES,
  };
}
