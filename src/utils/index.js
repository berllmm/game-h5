export const customHeaderCell = (column) => {
  return {
    style: {
      backgroundColor: "transparent", // 设置 header 背景色
      color: "#fff", // 设置 header 文字颜色
      align: "center"
    },
  };
};

export const customHeaderCell2 = (column) => {
  return {
    style: {
      backgroundColor: "#1E1E1E", // 设置 header 背景色
      color: "#fff", // 设置 header 文字颜色
    },
  };
};

export const customCell = (record, rowIndex) => {
  return {
    style: {
      backgroundColor: "#1F0C27", // 设置 body 背景色
      color: "#fff", // 设置 body 文字颜色
      align: "center"
    },
  };
};
