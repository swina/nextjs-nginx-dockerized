# NextJS (TailwindCSS) + NGINX + PM2 

![Doker Buiild](https://github.com/swina/nextjs-nginx-dockerized/actions/workflows/docker-image.yml/badge.svg)

This is a starter template for NextJS + TailwindCSS


## Production Build
The image created by docker is a ready to go NextJS build application with NGINX webserver and PM2

### Build the image
```
docker build -t nextjs-nginx-pm2 .

```

### Run docker image

```
docker run --name nextjs-nginx -p 80:80 -p 3000:3000 nextjs-nginx-pm2

```

### NGINX Configuration

`./nginx/default.conf` to update your configuration for NGINX

`./nginx/entrypoint.sh` to run PM2 and NGINX

## Github Actions

This template is ready for Github Actions. Check the `.github/workflows/docker-image.yml` to update to your configuration.
