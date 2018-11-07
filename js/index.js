/*字符串原型中增加一个方法*/
~function(pro){
    function queryURLParameter(){
            var reg = /([^?=&#]+)=([^?=&#]+)/g,
                obj ={};
            this.replace(reg,function(){
                obj[arguments[1]]=arguments[2];
            });
            return obj;
    }
    pro.queryURLParameter = queryURLParameter;
}(String.prototype);
/*loading*/
var loadingRender = (function(){
    var ary =["icon.png","zf_concatAddress.png","zf_concatInfo.png","zf_concatPhone.png","zf_course.png","zf_course1.png","zf_course2.png","zf_course3.png","zf_course4.png","zf_course5.png","zf_course6.png","zf_cube1.png","zf_cube2.png","zf_cube3.png","zf_cube4.png","zf_cube5.png","zf_cube6.png","zf_cubeBg.jpg","zf_cubeTip.png","zf_emploment.png","zf_messageArrow1.png","zf_messageArrow2.png","zf_messageChat.png","zf_messageKeyboard.png","zf_messageLogo.png","zf_messageStudent.png","zf_outline.png","zf_phoneBg.jpg","zf_phoneDetail.png","zf_phoneListen.png","zf_phoneLogo.png","zf_return.png","zf_style1.jpg","zf_style2.jpg","zf_style3.jpg","zf_styleTip1.png","zf_styleTip2.png","zf_teacher1.png","zf_teacher2.png","zf_teacher3.jpg","zf_teacher4.png","zf_teacher5.png","zf_teacher6.png","zf_teacherTip.png"];
    var progressbox = document.getElementById('progressbox');
    var loading = document.getElementById('loading');
    var step= 0;
    var total = ary.length;
   /*加载所有图片*/
    return{
        init(){
            loading.style.display = 'block';
                  ary.forEach(item=>{
                  var oImg = new Image;
                  oImg.src ='img/'+item;
                  oImg.onload = function(){
                      step++;
                      progressbox.style.width=step/total*100 +'%';
                      oImg = null;
                      if(step===total){
                            if (page===0)return;
                            window.setTimeout(()=>{
                                loading.style.display = 'none';
                                phoneRender.init();
                            },2000)
                      }
                  }
              })

        }
    }
})();
/*phone*/
var phoneRender = (function(){
   var phone = document.getElementById('phone');
   var listen =document.getElementById('listen');
   var listenTouch = document.getElementById('listenTouch');
   var detail = document.getElementById('detail');
   var time = document.getElementById('time');
   var detailTouch = document.getElementById('detailTouch');
   var $phone = $('.phone');
    var listenMusic = document.getElementById('listenMusic');
    var detailMusic = document.getElementById('detailMusic');
    var n_sec = 0; //秒
    var n_min = 0; //分
    function detailMusics(){
        detailMusic.play();
        var timer= window.setInterval(function () {

            var str_sec = n_sec;
            var str_min = n_min;
            if ( n_sec < 10) {
                str_sec = "0" + n_sec;
            }
            if ( n_min < 10 ) {
                str_min = "0" + n_min;
            }

            time.innerHTML = str_min + ":" + str_sec;
            n_sec++;
            if (n_sec > 59){
                n_sec = 0;
                n_min++;
            }
            //音频播放完成
            if(detailMusic.currentTime ===detailMusic.duration) {
                window.clearInterval(timer);
                close();
            }
        }, 1000);

    }

    function close() {
        $('.phone').css('transform','translateY('+document.documentElement.clientHeight+'px)').on('webkitTransitionEnd',function () {
            $('.phone').css('display','none');
        });
        messageRender.init();
        detailMusic.pause();
    }
    return {
       init(){
           phone.style.display = 'block';
           listenMusic.play();
           //移动端使用click会存在一个300ms的延迟,此时需要使用touchstart/touchmove/touchend/zepto中singelTap
           $("#listenTouch").on('click',function () {
               listenMusic.pause();
               // listen.style.display='none';
               // detail.style.transform = 'translateY(0)';
               $('.listen').css('display','none');
               $('.detail').css('transform','translateY(0)');
               $('.time').css('display','block');

               detailMusics();
           });
           $("#detailTouch").on('click',function () {
               close();
           })

       }
   }

})();
/*message*/
var messageRender = (function () {
    var $message = $('#message');
    var $messageList = $message.children('.messageList');
    var $list = $messageList.children('li');
    var $keyBorder = $message.children('.keyBorder');
    var $keyTip = $keyBorder.children('.textTip');
    var $submit = $keyBorder.children('.submit');
    var autoTimer = null;
    var step = -1;
    var total = $list.length;
    var bounceTop=0;
    var $messageMusic = $('#messageMusic')[0];
  function messageMove(){
     var autoTimer = window.setInterval(function () {
         step++;
         var $cur = $list.eq(step);
         $cur.css({
             opacity:1,
             transform:'translateY(0)'
         });
         if (step===2){
             window.clearInterval(autoTimer);
             $keyBorder.css('transform','translateY(0)');
             $keyTip.css('display','block');
             textMove();
         }
         if (step>3){
             bounceTop-=$cur[0].offsetHeight+20;
             $messageList.css('transform','translateY('+bounceTop+'px)')

         }
         if (step===total-1){
             window.clearInterval(autoTimer);
             setTimeout(()=>{
                 $message.css('display','none');
                 $messageMusic.pause();
                 cubeRender.init();
             },1500)

         }
     },1500);

  }
  function textMove() {
      var text='可以啊,你很帅啊';
      var n=-1;
      var result='';
      var textTimer=window.setInterval(function () {
          n++;
          result+=text[n];
          $keyTip.html(result);
          if (n===text.length-1){
              window.clearInterval(textTimer);
              $submit.css('display','block').on('click',function () {
                  result='';
                  $keyTip.html(result);
                  $keyBorder.css('transform','translateY(3.7rem)');
                  messageMove();
              });
          }
      },200)

  }


  return{
      init(){
        $('.message').css('display','block');
          $messageMusic.play();
        messageMove();
      }
  }
})();
/*rube*/
var cubeRender = (function () {
    var $cube = $('.cube');
    var $cubeBox = $cube.children('.cubebox');
    var $cubeBoxlist = $cubeBox.children('li');
    function isSwiper(changeX,changeY){
        return Math.abs(changeX)>30 || Math.abs(changeY)>30;
    }
    //滑动处理
    function start(e){
        var point = e.touches[0];
        $(this).attr({
            strX:point.clientX,
            strY:point.clientY,
            changeX:0,
            changeY:0
        });

    }
    function move(e){
        var point = e.touches[0];
        var changeX=point.clientX-$(this).attr('strX');
        var changeY=point.clientY-$(this).attr('strY');
        $(this).attr({
            changeX:changeX,
            changeY:changeY
        })

    }
    function end(e){
        var changeX=parseFloat($(this).attr('changeX'));
        var changeY=parseFloat($(this).attr('changeY'));
        var rotateX=parseFloat($(this).attr('rotateX'));
        var rotateY=parseFloat($(this).attr('rotateY'));
        if (isSwiper(changeX,changeY)===false) return;
        rotateX=rotateX - changeY/2;
        rotateY=rotateY+changeX/3;
        $(this).attr({
            rotateX:rotateX,
            rotateY:rotateY
        }).css('transform','scale(0.6) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)')

    }
    return{
        init(){
            $('.cube').css('display','block');
            $cubeBox.attr({
                rotateX:-35,
                rotateY:45
            }).on('touchstart',start).on('touchmove',move).on('touchend',end);
            $cubeBoxlist.on('click',function () {
                var index = $(this).index();
                $cube.css('display','none');
                swiperRender.init(index);
            });

        }
    }
})();

var swiperRender = (function () {
    var $swiper = $('#swiper'),
        $makisu = $('#makisu'),
        $return = $swiper.children('.return');

    //->change:实现每一屏幕滑动切换后控制页面的动画
    function change(example) {
        var slidesAry = example.slides,
            activeIndex = example.activeIndex;
        console.log(slidesAry);
        if (activeIndex === 0) {
            $makisu.makisu({
                selector: 'dd',
                overlap: 0.2,
                speed: 0.5
            });
            $makisu.makisu('open');
        } else {
            $makisu.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0
            });
            $makisu.makisu('close');
        }
        $.each(slidesAry, function (index, item) {
            if (index === activeIndex) {
                item.id = 'page' + (activeIndex + 1);
                return;
            }
            item.id = null;
        });
    }

    return {
        init: function (index) {
            $swiper.css('display', 'block');

            //->初始化SWIPER实现六个页面之间的切换
            var mySwiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                on: {
                    transitionEnd: function () {
                        var slidesAry = this.slides,
                            activeIndex = this.activeIndex;

                            const ap = new APlayer({
                                container: document.getElementById('player3'),
                                listFolded: false,
                                listMaxHeight: 90,
                                lrcType: 3,
                                audio: [{
                                    name: 'The Spectre',
                                    artist: 'Alan Walker',
                                    url: './css/Alan.mp3',
                                    cover: 'http://imge.kugou.com/stdmusic/20170914/20170914225307625638.jpg',
                                    lrc: './css/Alan.lrc'
                                },
                                    {
                                        name: '无赖',
                                        artist: '郑中基',
                                        url: './css/wulai.mp3',
                                        cover: 'http://imge.kugou.com/stdmusic/20121126/20121126111607332421.jpg',
                                        lrc: './css/wulai.lrc',
                                        theme: '#46718b'
                                    },
                                    {
                                        name: '英雄',
                                        artist: 'Doa',
                                        url: './css/Doa.mp3',
                                        cover: 'http://imge.kugou.com/stdmusic/20150718/20150718110058454646.jpg',
                                        lrc: './css/doa.lrc',
                                        theme: '#46718b'
                                    }
                            ],
                            });
                            if(activeIndex!==2){

                            }

                        $.each(slidesAry, function (index, item) {
                            if (index === activeIndex) {
                                item.id = 'page' + (activeIndex + 1);
                                return;
                            }
                            item.id = null;
                        });
                        swiperAnimate(this);



                        // alert('过渡结束');
                    },
                    init:function () {
                        // alert('当前的slide序号是'+this.activeIndex);
                        this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
                        swiperAnimateCache(this); //隐藏动画元素
                        swiperAnimate(this); //初始化完成开始动画
                    }
                },
            });
            index = index || 0;
            mySwiper.slideTo(index, 0);

            //->给返回按钮绑定单击事件
            $return.on('click',function () {
                $swiper.css('display', 'none');
                $('#cube').css('display', 'block');
            });
        }
    }
})();

var urlObj = window.location.href.queryURLParameter();
var page = parseFloat(urlObj['page']);
if (page===0||isNaN(page)){
    loadingRender.init();
}
if (page===1){
    phoneRender.init();
}
if(page===2){
    messageRender.init();
}
if (page===3){
    cubeRender.init();
}
if(page===4){
    swiperRender.init();
}