from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

def binary(n):
    """Функція для переводу числа в двійкову систему числення."""
    return bin(n)[2:]  # Вбудована функція bin()

def text_to_binary(text):
    """Перетворює текст у двійковий код."""
    return ' '.join(format(ord(char), '08b') for char in text)

def binary_to_text(binary_string):
    """Перетворює двійковий код у текст."""
    try:
        characters = binary_string.split()
        text = ''.join(chr(int(char, 2)) for char in characters)
        return text
    except ValueError:
        raise ValueError("Invalid binary text format.")

def binary_to_decimal(binary_string):
    """Перетворює двійковий код у десяткове число."""
    try:
        return int(binary_string, 2)
    except ValueError:
        raise ValueError("Invalid binary number format.")

@app.route('/process-data', methods=['POST'])
def process_data():
    data = request.get_json()
    if not data or 'data' not in data:
        return jsonify({'error': 'Input cannot be empty.'}), 400

    input_data = data['data'].strip()

    if input_data.isdigit():  # Якщо це число
        number = int(input_data)
        binary_number = binary(number)
        return jsonify({'message': f"{number} in binary is {binary_number}"}), 200
    elif input_data.isalpha():  # Якщо це слово
        binary_text = text_to_binary(input_data)
        return jsonify({'message': f"'{input_data}' in binary is {binary_text}"}), 200
    else:
        return jsonify({'error': 'Invalid input. Please provide a valid number or word.'}), 400



@app.route('/convert-binary', methods=['POST'])
def convert_binary():
    data = request.get_json()
    if not data or 'binary' not in data:
        return jsonify({'error': 'Input cannot be empty.'}), 400

    binary_input = data['binary'].strip()
    if all(c in '01 ' for c in binary_input):
        try:
            if ' ' in binary_input:
                converted_text = binary_to_text(binary_input)
                return jsonify({'message': f"Binary '{binary_input}' is text: {converted_text}"}), 200
            else:
                converted_number = binary_to_decimal(binary_input)
                return jsonify({'message': f"Binary '{binary_input}' is decimal: {converted_number}"}), 200
        except ValueError:
            return jsonify({'error': 'Invalid binary code.'}), 400
    else:
        return jsonify({'error': 'Input must contain only 0s, 1s, and spaces.'}), 400

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/binary-decimal', endpoint='binary-decimal')
def binary_decimal():
    return render_template('binary-decimal.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/donate', endpoint='donate')
def about():
    return render_template('donate.html')

if __name__ == '__main__':
    app.run(debug=True)
