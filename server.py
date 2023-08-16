from flask import Flask, request,jsonify
from flask_socketio import SocketIO,emit
from flask_cors import CORS
import time
import eventlet
import socket
import cv2
import base64

import depthai as dai

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")

current_connections = set()

def send_image(image):
    _, buffer = cv2.imencode('.jpg', image)
    image_data = base64.b64encode(buffer).decode('utf-8')
    socketio.emit('image', {'image': image_data}, broadcast=True)

def camera_loop():
    pipeline =dai.Pipeline()
    # Define source and output
    camRgb =pipeline.create(dai.node.ColorCamera)
    xoutRgb =pipeline.create(dai.node.XLinkOut)
    xoutRgb.setStreamName("rgb")
    # Properties
    camRgb.setPreviewSize(300, 300)
    camRgb.setInterleaved(False)
    camRgb.setColorOrder(dai.ColorCameraProperties.ColorOrder.RGB)
    # Linking
    camRgb.preview.link(xoutRgb.input)
    # Connect to device and start pipeline
    with dai.Device(pipeline) as device:
        print('Connected cameras:', device.getConnectedCameraFeatures())
        # Print out usb speed
        print('Usb speed:', device.getUsbSpeed().name)
        # Bootloader version
        if device.getBootloaderVersion() is not None:
            print('Bootloader version:', device.getBootloaderVersion())
        # Device name
        print('Device name:', device.getDeviceName())
        # Output queue will be used to get the rgb frames from the output defined above
        qRgb =device.getOutputQueue(name="rgb", maxSize=4, blocking=False)
        while True:
            inRgb =qRgb.get() # blocking call, will wait until a new data has arrived
            # save a picture using OpenCV
            # cv2.imwrite('image2.jpg', inRgb.getCvFrame())
            _, buffer = cv2.imencode('.jpg',  inRgb.getCvFrame())
            image_data = base64.b64encode(buffer).decode('utf-8')
            socketio.emit("image", {'data':image_data},broadcast=True)
            eventlet.sleep(0.05)

def gettime():
    while True:
        current_time = time.strftime("%Y-%m-%d %H:%M:%S")
        # print("Current Time:", current_time)
        socketio.emit("time",{'data':current_time},broadcast=True)
        eventlet.sleep(1)  # Wait for 1 second before printing the next time

@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data':'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    if(len(current_connections) == 0):
        eventlet.spawn(gettime)  # Start sending time in a separate thread when first client connects
        eventlet.spawn(camera_loop)  # Start sending time in a separate thread when first client connects
    current_connections.add(request.sid)
    print("client has connected")
    emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    print("data from the front end: ",str(data))
    
    emit("data",{'data':data,'id':request.sid},broadcast=True)

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

def get_ip_address():
    try:
        # Get the local hostname
        hostname = socket.gethostname()
        # Get the IP address associated with the hostname
        ip_address = socket.gethostbyname(hostname)
        return ip_address
    except Exception as e:
        print("Error:", e)
        return None
    
if __name__ == '__main__':
    socketio.run(app, debug=True,port=5001, host='0.0.0.0')
    # print(get_ip_address())
