<template>
  <div class="verification-code-input">
    <div v-for="(digit, index) in digits" :key="index" class="digit-input">
      <input type="text" v-model="porps.digits[index]" maxlength="1" @input="handleInput(index, $event)"
        @keydown.delete="handleDelete(index, $event)" ref="inputs" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const porps = defineProps({
  digits: Array
})

// const digits = ref(Array(6).fill(""));
const inputs = ref([]);

const handleInput = (index, event) => {
  const value = event.target.value;
  if (/^\d$/.test(value)) {
    porps.digits[index] = value;
    if (index < 5) {
      inputs.value[index + 1].focus();
    }
  } else {
    porps.digits[index] = "";
  }
};

const handleDelete = (index, event) => {
  if (porps.digits[index] === "" && index > 0) {
    inputs.value[index - 1].focus();
  }
};
</script>

<style scoped>
.verification-code-input {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
}

.digit-input {
  width: 60px;
  height: 60px;
}

.digit-input input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 18px;
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;
  background: #36253d;
  color: #fff;
}

.digit-input input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
