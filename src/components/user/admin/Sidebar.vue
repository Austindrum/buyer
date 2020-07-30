<template>
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="sidebar-sticky">
                <h4 class="d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>商品管理</span>
                </h4>
                <ul class="nav flex-column mb-2 pl-3 pt-3">
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="/dashbord">
                        <span data-feather="file-text"></span>
                            所有商品
                        </a> -->
                        <router-link class="nav-link" to="/dashbord">所有商品</router-link>
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="#">
                        <span data-feather="file-text"></span>
                            訂購明細
                        </a> -->
                        <router-link class="nav-link" to="/dashbord">所有訂單</router-link>
                    </li>
                </ul>
            </div>
        </nav>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">

</style>