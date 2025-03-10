from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import traceback

app = Flask(__name__)
CORS(app)

# 配置OpenAI客户端
API_KEY = "sk-66761906d386487b919c0b24babd22a8"
client = OpenAI(
    api_key=API_KEY,
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        messages = request.json.get('messages', [])
        print("Received messages:", messages)
        
        # 添加更多调试信息
        print("Using API Key:", API_KEY)
        print("Using base URL:", client.base_url)
        
        completion = client.chat.completions.create(
            model="qwen-plus",
            messages=messages
        )
        
        print("API Response:", completion)
        
        response = {
            'success': True,
            'message': completion.choices[0].message.content
        }
        return jsonify(response)
        
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error occurred: {str(e)}")
        print(f"Traceback: {error_trace}")
        return jsonify({
            'success': False,
            'error': str(e),
            'traceback': error_trace
        }), 500

if __name__ == '__main__':
    print("Server starting on http://localhost:3000")
    app.run(port=3000, debug=True) 