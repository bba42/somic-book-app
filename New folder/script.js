// Function to generate story ideas using Text.Cortex API
function generateStoryIdeas() {
    const story = document.getElementById('story').value;
    const apiKey = 'gAAAAABkSQILbUo6lMW1hYuAKjyhT7dyXIN8XfGZZlOglWpp-l7CowEfn2i44Vy89M3GFTWpJkfvjqXqaX4u5PUaE9GlYygrLPp5WePdw_b3J80YoM8F5Sd3iXhGu_4ughqpfNKJll12';
    const apiUrl = 'https://api.textcortex.com/v1';
    
    // Make an API request to generate story ideas using the story text
    // and display the generated story ideas in the story-ideas div
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        prompt: story,
        max_tokens: 60,
        n: 1,
        stop: ['\n']
      })
    })
    .then(response => response.json())
    .then(data => {
      const storyIdeas = data.choices[0].text.trim();
      document.getElementById('story-ideas').innerHTML = '<p>' + storyIdeas + '</p>';
    })
    .catch(error => {
      console.error('Error generating story ideas:', error);
      document.getElementById('story-ideas').innerHTML = '<p>Error generating story ideas.</p>';
    });
  }
  
  // Function to generate an image using the image generation API
  function generateImage() {
    const imagePrompt = document.getElementById('image-prompt').value;
    const apiKey = '67fd118dd908d6ae22f5f92d4b8ab349bab269d86895773b'; // Add your API key for Dynamic Pictures here
    const apiUrl = 'https://dynamicpictures.io/api/v2/generators/text-to-image';
  
    // Make an API request to generate an image using the image prompt
    // and display the generated image in the generated-image div
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        model: 'biggan256',
        format: 'png',
        response_format: 'url'
      })
    })
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.result;
      document.getElementById('generated-image').innerHTML = '<img src="' + imageUrl + '">';
    })
    .catch(error => {
      console.error('Error generating image:', error);
      document.getElementById('generated-image').innerHTML = '<p>Error generating image.</p>';
    });
  }
  
  // Function to add a panel
  function addPanel() {
    // Create a new panel element with an image and a text input
    const panelElement = document.createElement('div');
    panelElement.classList.add('panel');
    panelElement.innerHTML = '<img src="https://via.placeholder.com/600x400.png?text=Panel+Image"> <input type="text" placeholder="Enter panel text">';
    document.getElementById('panels').appendChild(panelElement);
  }
  
  // Function to save the comic book as a PDF using PDFShift API
  function saveComicBook() {
    const story = document.getElementById('story').value;
    const panels = document.querySelectorAll('.panel');
    const panelTexts = [];
    panels.forEach(panel => {
      const panelText = panel.querySelector('input').value;
      panelTexts.push(panelText);
    });
    const apiKey = '65a73b9c50d04ab789e1ddcdafcbde4f';
    const apiUrl = 'https://api.pdfshift.io/v3/convert/pdf/';
    
    // Generate a PDF using the story, images, and panels
    // and prompt the user to download the PDF
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('api:' + apiKey)
      },
      body: JSON.stringify({
        source: '<html><body><h1>Story</h1><p>' + story + '</p><h1>Panels</h1><ul><li>' + panelTexts.join('</li><li>') + '</li></ul></body></html>',
        landscape: false,
        use_print: false
      })
    })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'comic-book.pdf';
      a.click();
    })
    .catch(error => {
      console.error('Error saving comic book:', error);
      alert('Error saving comic book.');
    });
  }
  
  // Add event listeners for the buttons
  document.getElementById('generate-story-btn').addEventListener('click', generateStoryIdeas);
  document.getElementById('generate-image-btn').addEventListener('click', generateImage);
  document.getElementById('add-panel-btn').addEventListener('click', addPanel);
  document.getElementById('save-comic-btn').addEventListener('click', saveComicBook);