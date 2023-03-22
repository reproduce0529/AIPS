Count people in video (webcam or file) with YOLO

Download pre-trained YOLO v3 model from Darknet (https://pjreddie.com/darknet/yolo/) 
and place in yolo-coco directory. Required files:
- coco.names
- yolov3.cfg
- yolov3.weights

App can be configured with ini file.

Usage:

python detector.py -c configfile

Example inifiles are provided

학습 알고리즘 : yolo
데이터셋 : coco
웹캠 사용 : opencv
실행 코드 : "python detector.py -c .\yolo_webcam_0.ini"