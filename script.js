const secretWord = "carro"; 
        let attempts = 0;

        const grid = document.getElementById("grid");
        for (let i = 0; i < 6; i++) { 
            for (let j = 0; j < 5; j++) { 
                const cell = document.createElement("div");
                cell.classList.add("cell");
                grid.appendChild(cell);
            }
        }

        function checkWord() {
            const inputWord = document.getElementById("input-word").value.toLowerCase();

            if (inputWord.length !== 5) {
                alert("A palavra deve ter 5 letras.");
                return;
            }

            if (inputWord === secretWord) {
                showMessage("Parabéns! Você acertou a palavra!", true);
                highlightWord(inputWord, ["correct", "correct", "correct", "correct", "correct"]);
                return;
            }

            if (attempts < 5) {
                const feedback = getFeedback(inputWord);
                highlightWord(inputWord, feedback);
                attempts++;
            } else {
                showMessage("Fim de jogo! A palavra era " + secretWord, false);
            }

            document.getElementById("input-word").value = "";
        }

        function getFeedback(word) {
            let feedback = [];
            for (let i = 0; i < 5; i++) {
                if (word[i] === secretWord[i]) {
                    feedback.push("correct");
                } else if (secretWord.includes(word[i])) {
                    feedback.push("wrong-position");
                } else {
                    feedback.push("incorrect");
                }
            }
            return feedback;
        }

        function highlightWord(word, feedback) {
            const cells = document.getElementsByClassName("cell");
            let index = attempts * 5;
            for (let i = 0; i < 5; i++) {
                const cell = cells[index + i];
                cell.textContent = word[i].toUpperCase();
                cell.classList.add(feedback[i]);
            }
        }

        function showMessage(message, success) {
            const messageElement = document.getElementById("message");
            messageElement.textContent = message;
            messageElement.style.color = success ? "green" : "red";
        }