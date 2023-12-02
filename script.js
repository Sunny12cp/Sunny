// script.js
let localStream;
let peer;

function startPreview() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            localStream = stream;
            document.getElementById('localVideo').srcObject = stream;

            // Create a PeerJS connection
            const peer = new Peer();

            // Listen for incoming connections
            peer.on('open', id => {
                console.log('My peer ID is: ' + id);
            });

            peer.on('connection', conn => {
                console.log('Peer connected:', conn.peer);

                // Handle incoming data, signaling, etc.
                handleConnection(conn);
            });

            // Send our stream to the remote peer
            const conn = peer.connect('some_other_peer_id', { reliable: true });
            conn.on('open', () => {
                console.log('Connection open to peer:', conn.peer);
                conn.send({ type: 'stream', stream: localStream });
            });
        })
        .catch(error => {
            console.error('Error accessing camera and/or microphone:', error);
        });
}

function startStreaming() {
    // Implement logic to start the actual live streaming
    // This might involve signaling to another peer or server
    // and establishing a connection for live video streaming
    console.log('Implement logic to start live streaming');
}

function handleConnection(conn) {
    conn.on('data', data => {
        // Handle incoming data from the remote peer
        console.log('Received data from peer:', data);

        if (data.type === 'stream') {
            // Display remote stream on the 'remoteVideo' element
            document.getElementById('remoteVideo').srcObject = data.stream;
        }
    });

    conn.on('close', () => {
        console.log('Connection closed:', conn.peer);
    });
}
