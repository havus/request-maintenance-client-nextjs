# declare some variables
image_name=ghcr.io/havus/req-main-fe
image_version=latest
image_name_with_version="$image_name:$image_version"

# build image from current working dir
docker build -t $image_name_with_version .

# print all images
docker images

# create env var CR_PAT to store github package password
# export CR_PAT=ghp_sometoken

# Login to github container registry (ghcr)
echo $CR_PAT | docker login ghcr.io --username havus --password-stdin

# push image to container registry
docker push $image_name_with_version
