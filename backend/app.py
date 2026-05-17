from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend_courses():

    data = request.json
    courses = data['courses']
    max_credits = data['max_credits']

    n = len(courses)

    # Dynamic Programming Table
    dp = [[0 for _ in range(max_credits + 1)] for _ in range(n + 1)]

    # Build DP table
    for i in range(1, n + 1):
        for w in range(max_credits + 1):

            credit = courses[i - 1]['credits']
            value = courses[i - 1]['value']

            if credit <= w:
                dp[i][w] = max(
                    value + dp[i - 1][w - credit],
                    dp[i - 1][w]
                )
            else:
                dp[i][w] = dp[i - 1][w]

    # Find selected courses
    selected_courses = []
    w = max_credits

    for i in range(n, 0, -1):

        if dp[i][w] != dp[i - 1][w]:
            selected_courses.append(courses[i - 1])
            w -= courses[i - 1]['credits']

    selected_courses.reverse()

    return jsonify({
        "selected_courses": selected_courses,
        "maximum_value": dp[n][max_credits]
    })


if __name__ == '__main__':
    app.run(debug=True)