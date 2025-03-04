import { ref, onMounted, onUnmounted } from "vue";

const useWindow = () => {
  const windowWidth = ref(window.innerWidth);
  const isLargeWindow = ref(window.innerWidth >= 1024);

  // 更新窗口宽度和状态的函数
  const updateWindowSize = () => {
    windowWidth.value = window.innerWidth;
    isLargeWindow.value = window.innerWidth >= 1024; // 更新大窗口状态
  };

  onMounted(() => {
    window.addEventListener("resize", updateWindowSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateWindowSize);
  });

  return {
    isLargeWindow,
    windowWidth,
  };
};

export default useWindow;
