// main.js

const App = {
    data() {
      return {
        // 控制用户是否已登录
        isLoggedIn: false,
        // 控制添加笔记弹出框
        addDialogVisible: false,
        // 新笔记数据
        newNote: {
          title: '',
          content: ''
        },
        // 所有笔记
        notes: []
      };
    },
    methods: {
      // 登录
      goToLogin() {
        setTimeout(() => {
          window.location.href = "login.html";  // 延迟0.5秒后跳转到登录页面
        }, 500);
      },
      // 注册
      goToRegister() {
        setTimeout(() => {
          window.location.href = "register.html";  // 延迟0.5秒后跳转到注册页面
        }, 500);
      },
      // 管理后台
      goToAdmin() {
        setTimeout(() => {
          window.location.href = "admin.html";  // 延迟0.5秒后跳转到管理后台
        }, 500);
      },
      // 退出登录
      logout() {
        setTimeout(() => {
          this.isLoggedIn = false;  // 更新登录状态
          localStorage.setItem('isLoggedIn', 'false'); // 更新 localStorage
          alert('您已退出登录');
        }, 500);
      },
      // 打开添加笔记弹出框
      openAddDialog() {
        if (!this.isLoggedIn) {
          alert('请先登录以添加笔记');
          return;
        }
        this.addDialogVisible = true;
      },
      // 添加笔记
      addNote() {
        if (!this.newNote.title.trim() || !this.newNote.content.trim()) {
          alert('请填写笔记的名称和内容');
          return;
        }
        const currentTime = new Date().toLocaleString();
        this.notes.unshift({
          title: this.newNote.title.trim(),
          content: this.newNote.content.trim(),
          time: currentTime,
          expanded: false
        });
        this.addDialogVisible = false;
        this.resetAddForm();
      },
      // 重置添加笔记表单
      resetAddForm() {
        this.newNote.title = '';
        this.newNote.content = '';
      },
      // 切换笔记展开/折叠状态
      toggleNote(index) {
        this.notes[index].expanded = !this.notes[index].expanded;
      },
      // 截取内容前50个字符
      truncatedContent(content) {
        if (content.length <= 50) {
          return content;
        }
        return content.substring(0, 50) + '...';
      }
    },
    mounted() {
      // 从 localStorage 中读取登录状态
      const loggedIn = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = loggedIn === 'true';
  
      // 从 localStorage 中读取笔记
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        this.notes = JSON.parse(savedNotes);
      }
  
      // 监听笔记变化并保存到 localStorage
      this.$watch('notes', function(newNotes) {
        localStorage.setItem('notes', JSON.stringify(newNotes));
      }, { deep: true });
  
      // 更新底部导航栏的 slide1 和 slide2 位置
      updateSlidePosition($("#nav a.active"));
    }
  }
  
  const app = Vue.createApp(App);
  app.use(ElementPlus);
  app.mount('#app');
  
  // 底部导航栏交互逻辑
  $(document).ready(function () {
    // 初始化 slide1 的位置和宽度
    updateSlidePosition($("#nav a.active"));
  
    $("#nav a").on("click", function (e) {
      e.preventDefault(); // 阻止默认跳转
      var href = $(this).attr("href");
  
      // 移除所有链接的 active 类
      $("#nav a").removeClass("active");
      // 添加 active 类到当前点击的链接
      $(this).addClass("active");
      // 更新 slide1 和 slide2 的位置和宽度
      updateSlidePosition($(this));
  
      if (href !== "#") { // 如果不是当前页面
        setTimeout(() => {
          window.location.href = href;
        }, 800); // 延迟0.8秒后跳转
      }
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
  