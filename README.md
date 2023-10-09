# quizzy
Get feedback from your audience. Based on vue, and mqtt ([assets2036js](https://github.com/boschresearch/assets2036js)). Try it out at https://main--go-quizzy.netlify.app/

## Getting started
- Clone this repo, add a .env file with a configuration for the mqtt broker and the submodel to use, e.g.
    ```toml
    VITE_APP_BROKER_URL=test.mosquitto.org
    VITE_APP_BROKER_PORT=8081
    VITE_APP_QUIZ_SM_URL=https://raw.githubusercontent.com/boschresearch/assets2036-submodels/master/quiz.json
    ```
- run `npm run dev` and play around :-)

## Features
- Receive live updates from clients on the fly
- Supports questions for free text, number, and multiple choice
- no server or client installation required
