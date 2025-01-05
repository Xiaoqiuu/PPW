//Written by xiaoqiuu(Akitama) 2025.1
const App = {
    data() {
      return {
        timer: null,
        timeLeft: this.loadTimeLeft(),
        isRunning: false,
        // 新增：音乐相关数据
        audio: null,
        isMusicPlaying: false,
      };
    },
    computed: {
      formattedTime() {
        const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      }
    },
    methods: {
      login() {
        alert('点击了登录');
      },
      register() {
        alert('点击了注册');
      },
      startTimer() {
        if (this.isRunning) return;
        this.isRunning = true;
        $("body").fadeOut(500, () => {
          $("body").css("background", "url('../images/bg_school_1.jpg') no-repeat center center fixed").css("background-size", "100% 100vh").fadeIn(500);
        });
        this.timer = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft -= 1;
            this.saveTimeLeft();
          } else {
            this.stopTimer();
            alert('时间到！');
          }
        }, 1000);
        // 开始计时时播放音乐
        this.playMusic();
      },
      stopTimer() {
        clearInterval(this.timer);
        this.isRunning = false;
        $("body").fadeOut(500, () => {
          $("body").css("background", "url('../images/bg1.jpg') no-repeat center center fixed").css("background-size", "100% 100vh").fadeIn(500);
        });
        // 停止计时时停止音乐
        this.pauseMusic();
      },
      resetTimer() {
        this.stopTimer();
        this.timeLeft = 25 * 60;
        this.saveTimeLeft();
        // 重置计时时停止音乐
        this.pauseMusic();
      },
      saveTimeLeft() {
        localStorage.setItem('timeLeft', this.timeLeft);
      },
      loadTimeLeft() {
        const savedTime = localStorage.getItem('timeLeft');
        return savedTime ? parseInt(savedTime, 10) : 25 * 60;
      },
      // 新增：播放音乐
      playMusic() {
        if (this.audio && !this.isMusicPlaying) {
          this.audio.play();
          this.isMusicPlaying = true;
        }
      },
      // 新增：暂停音乐
      pauseMusic() {
        if (this.audio && this.isMusicPlaying) {
          this.audio.pause();
          this.isMusicPlaying = false;
        }
      },
      // 新增：切换音乐播放状态
      toggleMusic() {
        if (this.isMusicPlaying) {
          this.pauseMusic();
        } else {
          this.playMusic();
        }
      }
    },
    mounted() {
      if (this.timeLeft === 0) {
        this.timeLeft = 25 * 60;
        this.saveTimeLeft();
      }
      // 新增：初始化音频
      this.audio = new Audio('../music/01.mp3');
      this.audio.loop = true;
    }
  }; 

  const app = Vue.createApp(App);
  app.use(ElementPlus);
  app.mount('body');

  // 底部导航栏交互逻辑
  $(document).ready(function () {
      // 初始化 slide1 的位置和宽度
      updateSlidePosition($("#nav a.active"));

      $("#nav a.nav-link").on("click", function (e) {
          var href = $(this).attr("href");
          if (href === "#") {
              e.preventDefault(); // 仅阻止 href 为 '#' 的链接跳转
              $("#nav a.nav-link").removeClass("active");
              $(this).addClass("active");
              updateSlidePosition($(this));
          }
          // 否则，让链接正常跳转
      });

      // 鼠标悬停事件
      $("#nav a").on("mouseover", function () {
          updateSlideHover($(this));
      });

      // 鼠标移出事件
      $("#nav a").on("mouseout", function () {
          resetSlideHover();
      });
  });

  // 函数：更新 slide1 的位置和宽度
  function updateSlidePosition($element) {
      var position = $element.parent().position();
      var width = $element.parent().outerWidth(); // 使用 outerWidth 以包含 padding
      $("#nav .slide1").css({ opacity: 1, left: position.left, width: width });
  }

  // 函数：更新 slide2 的位置和宽度（悬停效果）
  function updateSlideHover($element) {
      var position = $element.parent().position();
      var width = $element.parent().outerWidth();
      $("#nav .slide2").css({ opacity: 1, left: position.left, width: width }).addClass("squeeze");
  }

  // 函数：重置 slide2（移出悬停）
  function resetSlideHover() {
      $("#nav .slide2").css({ opacity: 0 }).removeClass("squeeze");
  }