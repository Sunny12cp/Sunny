function updateTextOverlay() {
    const textOverlay = document.getElementById('textOverlay').value;
    const socket = new WebSocket('ws://your_server_url');

    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({ type: 'textOverlay', data: textOverlay }));
    });
}

const socket = new WebSocket('ws://your_server_url');

socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);

    if (data.type === 'textOverlayUpdate') {
        const updatedTextOverlay = data.data;
        console.log('Received text overlay update:', updatedTextOverlay);
    }
});

function startStreaming() {
    const streamUrl = document.getElementById('streamUrl').value;
    const streamKey = document.getElementById('streamKey').value;
    const fileInput = document.getElementById('fileInput');
    const screenSize = document.getElementById('screenSize').value;
    const textOverlay = document.getElementById('textOverlay').value;
    const textSize = document.getElementById('textSize').value;
    const textFont = document.getElementById('textFont').value;
    const textColor = document.getElementById('textColor').value;
    const textAlign = document.getElementById('textAlign').value;

    if (streamUrl && streamKey) {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            const formData = new FormData();
            formData.append('file', file);
            formData.append('screenSize', screenSize);
            formData.append('textOverlay', textOverlay);
            formData.append('textSize', textSize);
            formData.append('textFont', textFont);
            formData.append('textColor', textColor);
            formData.append('textAlign', textAlign);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'upload.php', true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log('File uploaded successfully:', file.name);
                    console.log('Screen Size selected:', screenSize);
                    console.log('Text Overlay:', textOverlay);
                    console.log('Text Size:', textSize);
                    console.log('Text Font:', textFont);
                    console.log('Text Color:', textColor);
                    console.log('Text Alignment:', textAlign);

                    alert("Streaming started! Redirect to your streaming page or initiate streaming process.");
                } else {
                    alert('File upload failed.');
                }
            };
            xhr.send(formData);
        } else {
            alert("No file selected. Please upload or select a file.");
        }
    } else {
        alert("Please enter both stream URL and stream key.");
    }
}
