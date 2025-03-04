<template>
  <!-- .navbar-expand-lg：在大屏幕（≥992px）下展开导航栏，小屏幕下折叠。 -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Logo</a>
      <!-- .navbar-toggler：在小屏幕下显示折叠按钮。 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">首页</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">关于</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">服务</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <!-- 在小屏幕上显示小按钮 -->
    <button class="btn btn-primary d-block d-md-none">小按钮</button>

    <!-- 在中等和大屏幕上显示大按钮 -->
    <button class="btn btn-primary d-none d-md-block btn-lg">大按钮</button>
  </div>

  <div class="container">
    <!-- 在小屏幕（<576px）上显示 -->
    <div class="d-block d-sm-none">
      <p>这是小屏幕显示的内容（手机）</p>
    </div>

    <!-- 在中等屏幕（≥576px 且 <992px）上显示 -->
    <div class="d-none d-sm-block d-md-none">
      <p>这是中等屏幕显示的内容（平板）</p>
    </div>

    <!-- 在大屏幕（≥992px）上显示 -->
    <div class="d-none d-md-block">
      <p>这是大屏幕显示的内容（桌面）</p>
    </div>

    <div class="container">
      <div class="row">
        <!-- 在小屏幕下显示 1 列，中等屏幕显示 2 列，大屏幕显示 4 列 -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="p-3 bg-light border">内容 1</div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="p-3 bg-light border">内容 2</div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="p-3 bg-light border">内容 3</div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="p-3 bg-light border">内容 4</div>
        </div>
      </div>
    </div>

    <table class="table">
      <thead class="table-dark">
        ...
      </thead>
      <tbody>
        ...
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
