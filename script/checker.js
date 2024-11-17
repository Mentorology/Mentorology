const uploadContainer = document.getElementById('uploadContainer');
    const fileInput = document.getElementById('homeworkImage');
    const progressBar = document.getElementById('progressBar');
    const progressBarFill = progressBar.querySelector('div');
    const resultsDiv = document.getElementById('resultsContainer');
    const accuracyRing = document.getElementById('accuracyRing');
    const incorrectQuestionsDiv = document.getElementById('incorrectQuestions');
    const progressContainer = document.getElementById('progressContainer');

    uploadContainer.addEventListener('click', () => fileInput.click());

    uploadContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadContainer.classList.add('dragover');
    });

    uploadContainer.addEventListener('dragleave', () => {
      uploadContainer.classList.remove('dragover');
    });

    uploadContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadContainer.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        handleFileUpload(files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        handleFileUpload(fileInput.files[0]);
      }
    });

    function handleFileUpload(file) {
      const formData = new FormData();
      formData.append('image', file);

      uploadContainer.style.display = 'none';
      progressContainer.style.display = 'block';
      progressBarFill.style.width = '0%';

      const progressInterval = setInterval(() => {
        let width = parseInt(progressBarFill.style.width);
        if (width >= 90) {
          clearInterval(progressInterval);
        } else {
          width += 10;
          progressBarFill.style.width = width + '%';
        }
      }, 500);

      fetch('https://ai1.api.mentorology.ai/api/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.error || 'An unknown error occurred');
          });
        }
        return response.json();
      })
      .then(data => {
        clearInterval(progressInterval);
        progressBarFill.style.width = '100%';
        displayResults(data);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing your request: ' + error.message);
      })
      .finally(() => {
        progressContainer.style.display = 'none';
        resultsDiv.style.display = 'block';
      });
    }

    function displayResults(data) {
      resultsDiv.style.display = 'block';

      const correctCount = data.results.filter(r => r.isCorrect).length;
      const accuracy = (correctCount / data.results.length) * 100;
      
      accuracyRing.innerHTML = `
        <svg viewBox="0 0 36 36">
          <path style="fill: none; stroke: #eee; stroke-width: 3.8;"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path style="fill: none; stroke: #4caf50; stroke-width: 2.8; stroke-dasharray: ${accuracy}, 100;"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831" />
          <text x="18" y="20.35" style="fill: #000; font-size: 7px; text-anchor: middle;">${accuracy.toFixed(2)}%</text>
        </svg>
      `;

      if (data.results.length > 0) {
        incorrectQuestionsDiv.innerHTML = `
          <h3>Questions:</h3>
          ${data.results.map(q => `
            <div class="${q.isCorrect ? 'correct' : 'incorrect'}">
              <p><strong>Question:</strong> ${q.item}</p>
              <p><strong>Explanation:</strong> ${q.explanation}</p>
            </div>
          `).join('')}
        `;
      } else {
        incorrectQuestionsDiv.innerHTML = '<p>All your answers are correct! Great job!</p>';
      }
    }