<template>
    <div>
        <div class="text-right mt-4">
            <button class="btn btn-success" @click="openModal(null)">建立新產品</button>
        </div>
        <div class="modal fade cancel" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true" @click="cancel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="cancel">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image"
                            placeholder="請輸入圖片連結" v-model="aboutProduct.image">
                        </div>
                        <div class="form-group">
                        <label for="customFile">或 上傳圖片
                            <i class="fas fa-spinner fa-spin"></i>
                        </label>
                        <input type="file" id="customFile" class="form-control"
                            ref="files" @change="fileUpload">
                        </div>
                        <img 
                        :src="imgUrl"
                        class="img-fluid" alt="">
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            placeholder="請輸入標題" v-model="aboutProduct.title">
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input type="text" class="form-control" id="category"
                            placeholder="請輸入分類"  v-model="aboutProduct.category">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input type="unit" class="form-control" id="unit"
                            placeholder="請輸入單位"  v-model="aboutProduct.unit">
                        </div>
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                            <input type="number" class="form-control" id="origin_price"
                            placeholder="請輸入原價" v-model="aboutProduct.origin_price">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control" id="price"
                            placeholder="請輸入售價" v-model="aboutProduct.price">
                        </div>
                        </div>
                        <hr>

                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea type="text" class="form-control" id="description"
                            placeholder="請輸入產品描述" v-model="aboutProduct.description"></textarea>
                        </div>
                        <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea type="text" class="form-control" id="content"
                            placeholder="請輸入產品說明內容"  v-model="aboutProduct.content"></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            id="is_enabled" 
                            v-model="aboutProduct.is_enabled"
                            :true-value="1"
                            :false-value="0">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary cancel" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="editProduct(aboutProduct.id)">確認</button>
                </div>
                </div>
            </div>
        </div>
        <table class="table mt-4">
            <thead>
                <th>分類</th>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>是否啟用</th>
                <th>編輯</th>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                    <td width="120">{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td width="120">{{ item.origin_price }}</td>
                    <td width="120">{{ item.price }}</td>
                    <td width="120">
                        <span v-if="item.is_enabled == 1">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td width="120">
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(item.id)">編輯</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import db from '../../../../firebaseApp'
import $ from 'jquery'
import firebase from 'firebase'
import { uuid } from 'vue-uuid'
export default {
    data() {
        return {
            products: [],
            aboutProduct: {},
            isNew: true,
            imgUrl: "https://muaythaiauthority.com/wp-content/uploads/2014/10/default-img.gif"
        }
    },
    methods: {
        cancel(e){
            if(e.target.classList.contains('cancel')){
                this.imgUrl = "https://muaythaiauthority.com/wp-content/uploads/2014/10/default-img.gif";
                this.aboutProduct = {};                
                document.getElementById('customFile').value = ""
            }; 
        },
        getProducts(){
            this.products = [];
            db.collection('products').get()
            .then(data=>{
                data.forEach(doc=>{
                    let item = doc.data();
                    item.id = doc.id;
                    this.products.push(item);
                })
            })
        },
        openModal(id){
            if(id == null){
                this.isNew = true;
                $('#productModal').modal('show')
            }else{
                this.isNew = false;
                db.collection('products').doc(id).get()
                .then(data=>{
                    let item = data.data();
                    item.id = id;
                    this.imgUrl = item.image;
                    this.aboutProduct = item;
                    $('#productModal').modal('show')
                })
                .catch(err=>{ console.log(err) })
            }
        },
        fileUpload(e){
            let file = e.target.files[0];
            let storageRef = firebase.storage().ref(`${uuid.v1()}.jpg`).put(file);
            storageRef.on('state_changed',
                snapshot=>{ console.log(snapshot) }, 
                err=>{console.log(err)},
                done=>{
                    storageRef.snapshot.ref.getDownloadURL().then(url=>{
                        this.imgUrl = url;
                        this.aboutProduct.image = url;
                    })
                }
            )
        },
        editProduct(id){
            if(this.isNew){
                db.collection('products').add({
                    category: this.aboutProduct.category || "",
                    content: this.aboutProduct.content || "",
                    description: this.aboutProduct.description || "",
                    image: this.aboutProduct.image || "",
                    is_enabled: this.aboutProduct.is_enabled || 0,
                    num: this.aboutProduct.num || "",
                    origin_price: this.aboutProduct.origin_price || "",
                    price: this.aboutProduct.price || "",
                    title: this.aboutProduct.title || "",
                    unit: this.aboutProduct.unit || "",
                })
                .then(()=>{
                    $('#productModal').modal('hide');
                    this.aboutProduct = {};
                    this.getProducts();
                })
                .catch((err)=>{
                    console.log(err);
                })
            }else{
                db.collection('products').doc(id).get()
                .then(data=>{
                    data.ref.update({
                        category: this.aboutProduct.category || "",
                        content: this.aboutProduct.content || "",
                        description: this.aboutProduct.description || "",
                        image: this.aboutProduct.image || "",
                        is_enabled: this.aboutProduct.is_enabled || 0,
                        num: this.aboutProduct.num || "",
                        origin_price: this.aboutProduct.origin_price || "",
                        price: this.aboutProduct.price || "",
                        title: this.aboutProduct.title || "",
                        unit: this.aboutProduct.unit || "",    
                    })
                    .then(()=>{
                        $('#productModal').modal('hide');
                        this.aboutProduct = {};
                        this.getProducts();
                    })
                    .catch(err=> console.log(err));
                })
            }
        },
    },
    created() {
        this.getProducts();
    },
}
</script>

<style lang="scss">
    
</style>