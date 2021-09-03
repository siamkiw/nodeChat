IMAGE_NAME="node_chat_image"
CONTAINER_NAME="node_chat_container"
TAG="lastets"
PUB_PORT=5555
PRI_PORT=5555

docker build -t $IMAGE_NAME:$TAG .

docker stop $CONTAINER_NAME

docker rm $CONTAINER_NAME

docker run --name $CONTAINER_NAME \
    --restart=always \
    -p $PRI_PORT:$PUB_PORT \
    -d $IMAGE_NAME

