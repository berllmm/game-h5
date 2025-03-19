<template>
  <Teleport to="body">
    <!-- width>1280px -->
    <div class="d-none d-sm-block">
      <div v-if="modelValue" class="modal-overlay">
        <div class="modal-content" :style="{ width }">
          <img src="../assets/simpleClose.svg" class="close-button" @click="closeModal" alt="" />
          <slot></slot>
        </div>
      </div>
    </div>

    <!-- wdith<768px -->
    <div class="d-block d-md-none">
      <div v-if="modelValue" class="modal-overlay">
        <div v-if="modelValue" class="drawer d-block d-sm-none" :class="{ open: modelValue }">
          <div class="drawer-content small-box">
            <div class="drawer-header">
              <div class="modal-header flex-end">
                <img @click="handleClose" src="../assets/simpleClose.svg" alt="" />
              </div>
            </div>
            <div class="drawer-body">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted } from 'vue';

// 定义 props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  width: {
    default: "90%",
  }
});

// 定义 emits
const emit = defineEmits(["update:modelValue"]);

// 关闭弹窗
const closeModal = () => {
  emit("update:modelValue", false);
};

const handleClose = () => {
  closeModal();
};
</script>

<style lang="scss" scoped>
/* 蒙层样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}

/* 弹窗内容样式 */
.modal-content {
  background-color: #1f0c27;
  border: 1px solid #3f3f3f;
  padding: 40px;
  border-radius: 32px;
  position: relative;
  max-width: 1220px;
  width: 90%;

  color: #fff;
  margin: 20vh auto;
}

/* 关闭按钮样式 */
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

@media (max-width: 738px) {
  .modal-content {
    width: 100%;
  }
}
</style>

<style lang="scss">
.small-box {
  background: #1f0c27;
  border: 1px solid #3f3f3f;
  border-radius: 32px 32px 0 0;
  padding: 24px !important;

  min-height: 628px;

  .flex-end {
    display: flex;
    justify-content: flex-end;
  }

  .modal-header {
    border: none;
  }
}
</style>
