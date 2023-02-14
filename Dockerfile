FROM nginx:alpine
COPY /dist/dashboard /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginix", "-g", "daemon off;"]