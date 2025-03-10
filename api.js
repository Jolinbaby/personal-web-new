// API配置
const API_CONFIG = {
    BASE_URL: 'http://localhost:3000/api/chat'
};

// 发送消息到API
async function sendMessageToAPI(messages) {
    try {
        console.log('Sending messages to API:', messages);  // 打印发送的消息
        
        const response = await fetch(API_CONFIG.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages })
        });

        console.log('API Response status:', response.status);  // 打印响应状态
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response data:', data);  // 打印响应数据
        
        if (!data.success) {
            throw new Error(data.error || 'Unknown error');
        }
        
        return data.message;
    } catch (error) {
        console.error('API request failed:', error);
        return '抱歉，我现在无法回答。请稍后再试。';
    }
} 