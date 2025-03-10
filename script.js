// 滚动动画
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 联系表单处理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // 这里添加表单提交逻辑
        alert('消息已发送！');
        this.reset();
    });
}

// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.hobby-slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelector('.slides').children;
        let currentSlide = 0;
        
        // 初始化第一张图片
        slides[0].classList.add('active');
        
        function showSlide(index) {
            // 隐藏当前图片
            slides[currentSlide].classList.remove('active');
            
            // 显示新图片
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // 按钮点击事件
        slider.querySelectorAll('.slider-btn').forEach(button => {
            button.addEventListener('click', function() {
                const direction = this.classList.contains('prev') ? -1 : 1;
                showSlide(currentSlide + direction);
            });
        });
    });
});

// 时间轴节点动画
document.addEventListener('DOMContentLoaded', function() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.5
    });

    timelineNodes.forEach(node => {
        observer.observe(node);
    });

    // 详情按钮点击事件
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isShowing = content.classList.contains('show');
            
            // 先关闭所有打开的详情
            document.querySelectorAll('.details-content.show').forEach(el => {
                el.classList.remove('show');
            });

            // 如果当前不是显示状态，则显示它
            if (!isShowing) {
                content.classList.add('show');
            }
            
            // 更新按钮文本
            this.textContent = isShowing ? '查看详情' : '收起详情';
        });
    });
});

// 打字机效果
function typeWriter(element, text, speed = 200) {
    let i = 0;
    
    function type() {
        if (i === 0) {
            element.innerHTML = '';
        }
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // 当打字完成后，等待1秒再重新开始
            setTimeout(() => {
                i = 0;
                type();
            }, 1000);
        }
    }
    
    type();
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.querySelector('.hello-title');
    titleElement.classList.add('cursor');
    typeWriter(titleElement, 'Hello World', 500);
});

// AI助手对话功能
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const closeButton = document.querySelector('.close-button');
    
    // 存储对话历史
    let messageHistory = [{
        role: "system",
        content: "你是一个个人网站的AI助手。你叫小琳，是一个活泼可爱的助手。你可以回答关于网站主人刘洁琳的问题。"
    }, {
        role: "assistant",
        content: "你好！我是小琳，很高兴见到你！我可以回答你关于刘洁琳的任何问题哦~"
    }];
    
    // 切换对话窗口显示状态
    function toggleChatWindow() {
        const isVisible = chatWindow.style.display === 'flex';
        chatWindow.style.display = isVisible ? 'none' : 'flex';
    }
    
    // 添加消息到对话区域
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.innerHTML = `<i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // 滚动到最新消息
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 更新消息历史
        messageHistory.push({
            role: isUser ? "user" : "assistant",
            content: content
        });
    }
    
    // 发送消息
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            messageInput.value = '';
            
            try {
                const response = await sendMessageToAPI(messageHistory);
                addMessage(response);
            } catch (error) {
                console.error('Failed to get AI response:', error);
                addMessage('抱歉，我遇到了一些问题。请稍后再试。');
            }
        }
    }
    
    // 事件监听
    chatButton.addEventListener('click', toggleChatWindow);
    closeButton.addEventListener('click', toggleChatWindow);
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 推荐问题点击事件
    document.querySelectorAll('.question-button').forEach(button => {
        button.addEventListener('click', function() {
            messageInput.value = this.textContent;
            sendMessage();
        });
    });
}); 