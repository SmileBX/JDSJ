<template>
<div>
  <div
    class="page borderTop charRoom"
    id="charRoom"
    :class="showModule==='emotion'?'showEmotion':showModule==='message'?'showMessage':showModule==='imgage'?'showBtn':showModule==='manySelect'?'showManySelect':''"
    @click="hidePopWin"
    v-if="ShopMessageList.IsShopServie==0"
  >
    <!--聊天列表-->
    <div class="padwid" @click="isShowMask=false">
      <div v-for="(msg,msgIndex) in chatList" :key="msgIndex" :id="msg.class">
        <div class="time">{{msg.AddTime}}</div>
        <!-- a -->
        <label class="flex flexAlignCenter boxSize p2 justifyContentEnd plr20" v-if="msg.MsgId=='a'&&(msg.Info||msg.Pic)"
         @click="onSelectStatus(msg)">
          <div class="flex flexAlignEnd justifyContentEnd mrr2">
            <div class="tagmsg" v-if="msg.Info" @longpress="gotouchstart(msg)">
              <text class="boxSize" v-html="msg.Info"></text>
              <div class="popWin popWin_r" v-if="msg.popWinStatus">
                <p @click="copy(msg)">复制</p>
                <!-- <p @click="deleteMsg(msg,msgIndex)">删除</p>
                <p @click="withdrawMsg(msg,msgIndex)">撤回</p>
                <p @click="showModule = 'manySelect'">多选</p> -->
              </div>
              <span class="sj rsj"></span>
            </div>
            <img class="sendImg" mode="widthFix" v-if="msg.Pic" :src="msg.Pic" @click="previewImg(msg.Pic)" />
          </div>
          <div class="avatarbox mr0">
            <img :src="msg.Headimgurl" alt class="avatar"/>
          </div>
          <input type="checkbox" class="checkbox" v-if="showModule==='manySelect'"  :checked="msg.selectStatus"/>
        </label>
        <!-- b -->
        <label class="flex flexAlignCenter boxSize plr20 justifyContentStart" v-if="msg.MsgId=='b'&&(msg.Info||msg.Pic)"  
          @click="onSelectStatus(msg)">
              <input type="checkbox" class="checkbox" v-if="showModule==='manySelect'"  
              :checked="msg.selectStatus"/>
              <div class="avatarbox mr0">
                <img :src="msg.Headimgurl" class="avatar"/>
              </div>
              <div class="flex flexAlignEnd mrl2">
                <div class="tagmsg bg_fff black" v-if="msg.Info" @longpress.stop="gotouchstart(msg)">
                  <div class="popWin popWin_l" v-if="msg.popWinStatus">
                    <p @click="copy(msg)">复制</p>
                    <!-- <p @click="deleteMsg(msg,msgIndex)">删除</p>
                    <p @click="withdrawMsg(msg,msgIndex)">撤回</p>
                    <p @click="showModule = 'manySelect'">多选</p> -->
                  </div>
                  <span class="sj lsj"></span>
                  <text class="boxSize" v-html="msg.Info" ></text>
                </div>
                <img class="sendImg" mode="widthFix" v-if="msg.Pic" :src="msg.Pic" @click="previewImg(msg.Pic)"/>
              </div>
        </label>
      </div>
    </div>
    <!--底部按钮 输入框 下拉按钮-->
    <div class="bottomicon" v-if="showModule!=='manySelect'">
      <div class="inputbtn flex flexAlignCenter bg_fff">
        <div
          class="blur flex1"
          v-if="showModule!=='input'"
          @click="onShowModule('input')"
          :class="sendInfoDiv?'directionR':'color888'"
        >{{sendInfoDiv||'想对他说点什么呢？'}}&#x200E;</div>
        <input
          type="text"
          placeholder="想对他说点什么呢？"
          class="flex1 input_text"
          v-model="sendInfo"
          confirm-type="send"
          confirm-hold
          v-else
          @blur="inputFocusStatus=false;showModule=''"
          :focus="inputFocusStatus"
          @confirm="sendMessage"
          :cursor-spacing="10"
        />
        <div class="flex flexAlignCenter">
          <img src="http://jd.wtvxin.com/images/images/service/smile.jpg" class="logimg" @click="onShowModule('emotion')" />
          <img src="http://jd.wtvxin.com/images/images/service/add.jpg" class="logimg" @click="onShowModule('imgage')" v-if="!sendInfo" />
          <img src="http://jd.wtvxin.com/images/images/service/send.png" alt class="logimg" @click="sendMessage()" v-else />
        </div>
      </div>
      <!--按钮组-->
      <div v-if="showModule==='imgage'">
        <div class="icon_box flex">
          <div class="flex flexAlignCenter flexColumn" @click="chosseImg('camera')">
            <img src="http://jd.wtvxin.com/images/images/service/photo.jpg" alt class="icon_put" />
            <p class="fontColor">拍照</p>
          </div>
          <div class="flex flexAlignCenter flexColumn" @click="chosseImg('album')">
            <img src="http://jd.wtvxin.com/images/images/service/albrem.jpg" alt class="icon_put" />
            <p class="fontColor">相册</p>
          </div>
        </div>
      </div>
      <!-- 表情 -->
      <div class="emotion" v-if="showModule==='emotion'"> 
        <scroll-view scroll-y class="emotion-pack-item">
          <div class="emotion-box">
            <div class="emotion-box-line" v-for="(line, i) in emotionArr" :key="i" @click="handEmotion(line)" >
              <div v-html="line.url"></div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <!-- 多选 -->
    <div class="manySelect" v-else>
      <label>
        <input type="checkbox" :checked="selectAll" @click="onSelectAll"/>全选
      </label>
      <div class="flex-center">
        <div class="closeSelect" @click="showModule=''">取消</div>
        <div class="removeMsgArr" @click="removeMsgArr">删除</div>
      </div>
    </div>
    <!--弹层-->
    <div class="mask" v-if="isShowMask" catchtouchmove="true" @click="isShowMask=false"></div>
  </div>
  <div v-else>
    <div class="itembox" v-for="(item,index) in ShopMessageList.DataTable" :key="index" @click="goUrl(item.FriendId)">
      <div class="leftbox">
        <img :src="item.Headimgurl" alt="">
        <span v-if="item.Count>0">{{item.Count}}</span>
      </div>
      <div class="rightbox">
        <div class="nickname">
          <p>{{item.NickName}}</p>
          <p>{{item.AddTime}}</p>
        </div>
        <p class="info text_space">{{item.Info}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { post,host,wssPath,emotionPath,filePath } from "@/utils";
import emotionList from "@/utils/emotionList";
export default {
  data() {
    return {
      userId: "",
      token: "",
      FriendId: "", //好友ID
      TempId: "", //临时联系id
      isShowMask: false, //是否展示遮罩层
      showModule: "", //展示图片组；emotion：表情。message:常用语。imgage:照片.manySelect:多选
      chatStatu: {}, //聊天信息
      chatList: [], //聊天列表
      sendInfo: "", //发送消息的内容
      sendInfoDiv: "", //div展示的内容
      // 图片
      imgPathArr: [], //临时路径
      // isTakePhoto: false, //是否开启拍照,
      emotionList: emotionList.emotionList,
      emotionArr: [],
      socketStatus: false, //socket状态
      inputFocusStatus: false, //input对焦状态
      hasPopWinShow:false,//是否有操作框显示，减少hidePopWin遍历，增加性能
      page: 1,
      pageSize: 20,
      selectAll:false,//全选状态
      ShopMessageList:{}
    };
  },
  onLoad() {
    
  },
  onShow() {
    this.initEmotion();
    this.initData();
    this.sendInfo = "";
    this.page = 1;
    this.chatList=[];
    this.chatStatu = {};
    this.TempId = this.$root.$mp.query.TempId;
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid=wx.getStorageSync("shopid");
    this.getShopMessageList()
  },
  onUnload() {
    wx.closeSocket({
      success() {
        console.log("关闭socket成功");
      }
    });
  },
  components: {},
  watch: {
    // 输入消息内容改变时
    sendInfo() {
      if (this.sendInfo.length < 15) {
        this.sendInfoDiv = this.sendInfo;
        return false;
      }
      let maxLength = 33;
      for (let i = 1; i < this.sendInfo.length; i += 1) {
        const str = this.sendInfo.slice(-i);
        let strLength = this.strlength(str);
        if (strLength > maxLength) {
          this.sendInfoDiv = str;
          return false;
          console.log(strLength, str);
        } else if (strLength < maxLength) {
          this.sendInfoDiv = this.sendInfo;
          console.log(strLength, str);
        }
      }
    }
  },
  methods: {
    initData() {
      this.isShowMask = false;
      // this.isTakePhoto = false;
      this.selectAll = false;
      this.inputFocusStatus = false;
      this.showModule = "";
    },
    async getShopMessageList(){
      let res=await post(
        "WebSocket/GetShopMessageList",
        {
          UserId: this.userId,
          Token: this.token,
          ShopId: this.shopid
        }
      );
      if(res.code==0){
        var list=res.data.DataTable;
        list.map(item=>{
          item.AddTime=item.AddTime.replace(/T/,' ').substring(0,19)
        })
        if(res.data.IsShopServie==0){//不是客服，直接显示聊天室
          this.FriendId=res.data.DataTable[0].FriendId
          this.getFriendMessage("scrollBottom").then(() => {
            this.connectSocket();
          });
        }
        this.ShopMessageList=res.data;
        console.log(this.ShopMessageList)
      }
    },
    // 返回字符串长度，中文2，英文1
    strlength(str) {
      let len = 0;
      for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
        } else {
          len += 2;
        }
      }

      return len;
    },
    // 打开webSocket链接
    async connectSocket() {
      const that = this;
      const ress = await post(
        "WebSocket/GetWebSocketId",
        {
          UserId: this.userId,
          Token: this.token,
          FriendId: this.FriendId * 1,
          TempId: this.TempId * 1
        }
      );
      wx.connectSocket({
        url: `${wssPath}/WebSocketServer.ashx?Signature=${
          ress.data.Signature
        }`
      });
      //code=99,是错误，也包过正常错误。
      // code=1 发起登录、登录成功、
      // code=2 发起退出、需要登录
      // code=3 聊天
      // code=0 服务反馈处理了。
      wx.onSocketMessage(message => {
        let msg = JSON.parse(message.data);
        console.log("msg", msg);
        if (msg.code !== 1 && msg.code !== 2) {
          this.page = 1;
          this.getFriendMessage();
        } else {
          this.socketStatus = false;
          this.renewConnectSocket();
        }
      });
      wx.onSocketOpen(res => {
        console.log("open", res);
        this.socketStatus = true;
        this.send({
          MsgType: 1,
          TimeStamp: ress.data.TimeStamp,
          SecretKey: ress.data.SecretKey
        });
      });
      wx.onSocketError(error => {
        console.log("socket error:", error);
        this.socketStatus = false;
        this.pageBack("连接已断开，请重试!");
      });
      wx.onSocketClose(close => {
        this.socketStatus = false;
        // this.pageBack('连接已断开，请重试!');
      });
    },
    // 断开返回上一页
    pageBack(msg) {
      wx.showToast({ title: msg, icon: "none" });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    },
    // socket断线重连
    renewConnectSocket() {
      // if (!this.socketStatus) {
      //   setTimeout(() => {
      //     this.connectSocket();
      //   }, 3000);
      // }
    },
    // 发送socket
    send(data) {
      wx.sendSocketMessage({ data: JSON.stringify(data) });
    },
    //获取好友消息
    getFriendMessage(scrollBottom, scrollPosition) {
      return new Promise((resolve, reject) => {
        const that = this;
        wx.request({
          url: host+"WebSocket/Readfriend_new",
          data: {
            UserId: this.userId,
            Token: this.token,
            FriendId: this.FriendId * 1,
            TempId: this.TempId * 1,
            Page: this.page,
            PageSize: this.pageSize
          },
          method: "POST",
          success(_res) {
            let res = _res.data;
            if (res.code === 0) {
              let info = [];
              // 处理发送时间
              let times = res.data[0] &&new Date(res.data[0].AddTime);
              res.data.reverse(); //数组翻转
              res.data.map((item, i) => {
                if(item.Pic!=""){
                  item.Pic=filePath+item.Pic
                }
                let date = new Date(item.AddTime);
                item.time = date.getTime();
                item.class = "class" + date.getTime(); //时间戳类，用户下拉聊天记录滑动对应位置
                if (i !== 0) {
                  const year = date.getFullYear() === times.getFullYear();
                  const Month = date.getMonth() === times.getMonth();
                  const dates = date.getDate() === times.getDate();
                  const Hours = date.getHours() === times.getHours();
                  const Minutes = date.getMinutes() - times.getMinutes() < 10;
                  if (year && Month && dates && Hours && Minutes) {
                    item.AddTime = "";
                  } else {
                    item.AddTime=item.AddTime.replace(/T/,' ')
                    times = date;
                  }
                }else{
                  item.AddTime=item.AddTime.replace(/T/,' ').substring(0,19)
                }
                item.text = item.Info;
                // 将匹配结果替换表情图片
                item.Info = item.Info.replace(
                  /\[[\u4E00-\u9FA5]{1,3}\]/gi,
                  words => {
                    let word = words.replace(/\[|\]/gi, "");
                    let index = that.emotionList.indexOf(word);
                    if (index !== -1) {
                      return `<img style="width:25px;height:25px;" src="${emotionPath}/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`;
                    } else {
                      return words;
                    }
                  }
                );
                item.popWinStatus = false;//显示复制删除等小弹窗状态
                item.selectStatus = false;//多选的选择状态
                // info.unshift(item);
                info.push(item);
              });
              // res.data = info;
              if (that.page === 1) {
                that.chatList = info;
              } else {
                that.chatList = info.concat(that.chatList);
              }
              that.chatStatu = res.data;
              if (
                scrollBottom === "scrollBottom" ||
                (res.data.length < that.pageSize && that.page === 1)
              ) {
                that.scrollBottom();
              }
              if (scrollPosition) {
                setTimeout(() => {
                  wx
                    .createSelectorQuery()
                    .select("#" + scrollPosition)
                    .boundingClientRect(function(rect) {
                      // 使页面滚动到底部
                      wx.pageScrollTo({
                        scrollTop: rect.top,
                        duration: 0
                      });
                    })
                    .exec();
                }, 100);
              }
              resolve();
            }else {
              wx.showToast({ title: res.msg, icon: "none" });
              setTimeout(() => {
                wx.navigateBack();
              }, 1500);
              reject();
            }
          }
        });
      });
    },
    // 发送消息
    async sendMessage(data) {
      let sendInfo = "";
      let imgBase = "";
      let lat = 0;
      let lng = 0;
      if (data) {
        // 发送图片
        if (data.type === "img") {
          imgBase = data.data;
        }
        // 发送位置
        else if (data.type === "map") {
          lat = data.data.latitude;
          lng = data.data.longitude;
        } else {
          if (!this.sendInfo) {
            return false;
          }
          sendInfo = this.sendInfo;
        }
      }
      // 普通消息
      else {
        if (!this.sendInfo) {
          return false;
        }
        sendInfo = this.sendInfo;
      }
      const that = this;
      wx.request({
        url: host+"WebSocket/Sendfriend_new",
        data: {
          UserId: this.userId,
          Token: this.token,
          FriendId: this.FriendId * 1,
          TempId: this.TempId * 1,
          Info: sendInfo,
          Pic: imgBase,
          Lat: lat,
          Lng: lng,
          ShopId:this.shopid
        },
        method: "POST",
        success(res_) {
          that.sendInfo = "";
          const res = res_.data;
          const _res = res.data;
          // 发送成功收回输入框
          // that.showModule==='input'&&(that.showModule = "")
          // that.inputFocusStatus = false;
          that.send({
            MsgType: 3,
            Id: _res.Id,
            Info: sendInfo,
            Pic: _res.Pic,
            AddTime: _res.AddTime,
            Lat: lat,
            Lng: lng
          });
        }
      });
    },
    // 展示模块
    onShowModule(val) {
      // if(this.chatStatu.info.length>this.pageSize){
      this.scrollBottom();
      // }
      this.showModule === val
        ? (this.showModule = "")
        : (this.showModule = val);
      setTimeout(() => {
        if (val === "input") {
          this.inputFocusStatus = true;
        } else {
          this.inputFocusStatus = false;
        }
      }, 150);
    },
    //**************************拍照，图片************************** */
    // 选择图片
    chosseImg(sourceType) {
      const that = this;
      let num = 8; //上传的图片最大数量
      wx.chooseImage({
        count: num, //最大图片数量=最大数量-临时路径的数量
        sizeType: ["compressed"], //图片尺寸 original--原图；compressed--压缩图
        sourceType: [sourceType], //选择图片的位置 album--相册选择, 'camera--使用相机
        success: res => {
          this.imgPathArr = res.tempFilePaths;
          that.updateImg();
        }
      });
    },
    //根据临时路径，获取图片base64码。
    async updateImg() {
      const that = this;
      // 根据临时路径数组imgPathArr获取base64图片
      for (let i = 0; i < this.imgPathArr.length; i += 1) {
        const item = this.imgPathArr[i];
        //异步方法
        const res = wx.getFileSystemManager().readFileSync(item, "base64");
        //成功的回调
        const imgBase = "data:image/png;base64," + res.toString();
        await this.sendMessage({ type: "img", data: imgBase });
      }
    },
    // 预览图片
    previewImg(img) {
      wx.previewImage({
        urls: [img]
      });
    },
    //**************************拍照，图片End************************** */
    // 初始化表情
    initEmotion() {
      const list = this.emotionList;
      let emotionArr = [];
      list.map((item, index) => {
        emotionArr.push({
          name: `[${item}]`,
          url: `<img style="width:25px;height:25px;" src="${emotionPath}/mpres/htmledition/images/icon/emotion/${index}.gif">`
        });
      });
      this.emotionArr = emotionArr;
    },
    handEmotion(item) {
      this.sendInfo += item.name;
    },
    // 回复add表情
    handleEmotionComment(i) {
      console.log(i, "iiii");
      return false;
      console.log(this.showComment, this.comment[this.showComment], "i");
      this.comment[this.showComment].commentContent += i;
    },
    // 滚动到底部
    scrollBottom() {
      setTimeout(() => {
        wx
          .createSelectorQuery()
          .select("#charRoom")
          .boundingClientRect(function(rect) {
            // 使页面滚动到底部
            wx.pageScrollTo({
              scrollTop: rect.height,
              duration: 0
            });
          })
          .exec();
      }, 100);
    },
    // 客服聊天页
    goUrl(id) {
      wx.navigateTo({ url: "/pages/service/chatRoomSon/main?id="+id });
    },
    // ******************长按复制***************
    // 长按内容，显示操作框
    gotouchstart(data) {
      if(this.showModule!=='manySelect'){
        data.popWinStatus = true;
        this.hasPopWinShow = true;
          this.chatList.map(item=>{
              if(data.Id!==item.Id){
                  item.popWinStatus = false;
              }
          })
      }
    },
    // 隐藏操作框
    hidePopWin(){
      if(this.hasPopWinShow){
        this.chatList.map(item=>{
            if(item.popWinStatus){
                item.popWinStatus = false;
            }
        })
      }
    },
    // 复制
    copy(msg){
      console.log(msg,'msg')
        wx.setClipboardData({data:msg.text})
        msg.popWinStatus = false;
    },
    // 删除消息
    deleteMsg(data,index){
        post('User/DelAssignMsg',{
          UserId: this.userId,
          Token: this.token,
          IdArr:data.Id
        }).then(res=>{
          this.chatList.splice(index,1);
        })
    },
    // 选择
    onSelectStatus(data){
      if(this.showModule==='manySelect'){
        data.selectStatus = !data.selectStatus;
        let status = true;
        this.chatList.map(item=>{
          if(!item.selectStatus){
            status = false;
            return;
          }
        })
        this.selectAll =status;
      }
    },
    // 全选
    onSelectAll(){
        this.selectAll = !this.selectAll;
        this.chatList.map(item=>{
          item.selectStatus = this.selectAll;
        })
    },
    // 删除多条消息
    removeMsgArr(){
      const that = this;
      wx.showModal({
        title:'是否删除多条消息！',
        success(res){
          if(res.confirm){
              let arr = [];
                that.chatList.map(item=>{
                    if(item.selectStatus){
                      arr.push(item.Id);
                    }
                })
              let deleteId = arr.join(',')
              post('User/DelAssignMsg',{
                UserId: that.userId,
                Token: that.token,
                IdArr:deleteId
              }).then(res=>{
                // if(!this.selectAll){
                  that.chatList.map((item,i)=>{
                      if(item.selectStatus){
                        that.chatList.splice(i,1)
                      }
                  })
                // }else{
                //   that.set(that,'chatList',[])
                // }
              })
          }
        }
      })
    },
    // 撤回消息
    withdrawMsg(data,index){
      if(data.MsgId==='a'){
        let nowTime = new Date().getTime();
        if((nowTime-data.time)<120000){
            post('User/Delfriend_new',{
              UserId: this.userId,
              Token: this.token,
              Id:data.Id
            }).then(res=>{
                wx.showToast({
                  title:res.msg,
                  icon:'none'
                })
              if(res.code==0){
                this.chatList.splice(index,1);
              }
            })
        }else{
            wx.showToast({
              title:'不能撤回超过2分钟的消息',
              icon:'none'
            })
        }
      }else{
            wx.showToast({
              title:'只能撤回自己的消息哦~',
              icon:'none'
            })
      }
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    this.initData();
    this.page += 1;

    if(this.chatList.length>0&&this.chatList[0].class){
      this.getFriendMessage("", this.chatList[0].class);
    }
    wx.stopPullDownRefresh();
  },
  created() {
    // let app = getApp()
  }
};
</script>
<style scoped lang="scss">
.padwid {
  // height:86vh;
  // width:100%;
  // box-sizing:border-box;
  // padding-bottom:180rpx;
  .time {
    color: #888;
    font-size: 20rpx;
    text-align: center;
    margin: 10rpx 0;
  }
}
.showMessage {
  padding-bottom: 530rpx !important;
}
.showBtn {
  padding-bottom: 400rpx !important;
}
.showEmotion {
  padding-bottom: 480rpx !important;
}
.showManySelect{
  padding-bottom: 120rpx !important;
}
.plr20 {
  padding: 20rpx !important;
}
.mrr2 {
  margin-right: 6rpx !important;
  width: 80%;
}
.mrl2 {
  margin-left: 6rpx !important;
  width: 80%;
}
.charRoom {
  padding-bottom: 180rpx;
}
.bottomicon {
  background: #f4f4f4;
}
.usedMes {
  padding: 20rpx 30rpx !important;
  span {
    border-radius: 20rpx;
    padding: 10rpx 22rpx;
    font-size: 26rpx;
    margin-left: 10rpx;
  }
}
.messagelist {
  height: 350rpx;
  .scroll_height {
    height: 250rpx;
  }
  li {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #1a1a1a;
    border-top: 1rpx solid #ececec;
  }
}
.centerMask {
  width: 650rpx;
  height: 400rpx;
  top: 50%;
  left: 50rpx;
  margin-top: -200rpx;
  position: fixed;
  z-index: 9999;
  background: #fff;
  border-radius: 10rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  textarea {
    margin-top: 20rpx;
    height: 200rpx;
  }
  .mestitle {
    margin-top: 30rpx;
  }
}
.mesbtn {
  p {
    width: 50%;
    padding: 30rpx;
    box-sizing: border-box;
    text-align: center;
  }
  p:last-child {
    border-left: 1rpx solid #ececec;
  }
}
.van-swipe-cell__left,
.van-swipe-cell__right {
  display: inline-block;
  width: 130rpx;
  height: 80rpx;
  font-size: 28rpx;
  line-height: 80rpx;
  color: #fff;
  text-align: center;
  background-color: #f44;
}
.van-swipe-cell__left{
  background-color: #07c160;
}
.index-group-item {
  padding: 0 20rpx;
  width:100%;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.noData {
  color: #999;
}
.sendImg {
  width: 200rpx;
  height: auto;
}
// 拍照
.takePhoto {
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  .photo {
    width: 100%;
    height: 90vh;
  }
  .take {
    color: #fff;
    font-size: 40rpx;
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      border-radius: 50%;
      width: 80rpx;
      height: 80rpx;
    }
  }
}
.tagmsg {
  padding: 15rpx;
  font-size: 30rpx;
  word-break: break-all;
  background: #fff;
  color: #000;
  position:relative;
  p {
    word-break: break-all;
  }
  .popWin{
    position:absolute;
    top:-50rpx;
    // width:270rpx;
    width:360rpx;
    background:#000;
    display:flex;
    align-items:center;
    border-radius:10rpx;
    z-index:11;
    p{
      color:#fff;
      border-right:1rpx solid #999;
      font-size:24rpx;
      padding: 0 20rpx;
      height:60rpx;
      line-height:60rpx;
      &:last-child{
        border-right:none;
      }
    }
  }
  .popWin_l:after{
    display:block;
    content:'';
    width:20rpx;
    height:20rpx;
    position:absolute;
    bottom:-10rpx;
    left:60rpx;
    background:#000;
    transform: rotate(45deg);
    z-index:10;
  }
  .popWin_l{
    left:-50rpx;
  }
  .popWin_r{
    right:-50rpx;
  }
  .popWin_r:after{
    display:block;
    content:'';
    width:20rpx;
    height:20rpx;
    position:absolute;
    bottom:-10rpx;
    right:60rpx;
    background:#000;
    transform: rotate(45deg);
    z-index:10;
  }
}
.rsj {
  background: #fff;
  border: 6rpx solid #fff;
}
// 表情
.emotion {
  height: 300rpx;
  position: relative;
}
.emotion-pack-item {
  height: 300rpx;
}
.emotion-box {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
}
.emotion-box-line {
  margin: 10rpx;
  img {
    width: 40rpx;
    height: 40rpx;
  }
}
.cfff {
  color: #fff;
}
.black {
  color: #333;
}
.input_text{
  position: relative;
  height: 58rpx;
  line-height: 58rpx;
  white-space: wrap;
  width: 480rpx;
}
.blur {
  border: 1rpx solid #f2f2f2;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
  background: #f4f4f4;
  height: 80rpx;
  line-height: 60rpx;
  text-align: left;
  width: 520rpx;
  overflow: hidden;
  white-space: nowrap;
}
.color888 {
  color: #888;
}
// 多选
.manySelect{
  position:fixed;
  bottom:0;
  left:0;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#fff;
  padding:0 30rpx;
  width:100%;
  height:100rpx;
  box-sizing:border-box;
  // input{
  //   width:40rpx;
  //   height:40rpx;
  // }
  .removeMsgArr{
    color:#ff3333;
  }
  .closeSelect{
    color:#999;
    padding:0 20rpx;
  }
}
.itembox{
  width: 100%;
  padding: 20rpx 30rpx;
  background: #fff;
  border-bottom: 1px #ececec solid;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .leftbox{
    margin-right: 20rpx;
    position: relative;
    img{
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%
    }
    span{
      display: block;
      background: #ff3333;
      color: #fff;
      font-size: 18rpx;
      padding:0 4rpx;
      height: 32rpx;
      line-height: 32rpx;
      border-radius: 16rpx;
      position: absolute;
      top: -16rpx;
      right: -16rpx;
      box-sizing: border-box;
      min-width: 32rpx;
      text-align: center;
    }
  }
  .rightbox{
    // flex: 1;
    width: 590rpx;
    .nickname{
      font-size: 32rpx;
      display: flex;
      justify-content: space-between;
      p:nth-child(2){
        font-size: 24rpx;
        color: #999
      }
    }
    .info{
      font-size: 26rpx;
      color: #666;
    }
  }
}
</style>
