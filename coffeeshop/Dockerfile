# გამოიყენე node-ის ოფიციალური იმიჯი
FROM node:20

# სამუშაო დირექტორია კონტეინერში
WORKDIR /app

# package.json და package-lock.json გადმოიტანე
COPY package*.json ./

# დააყენე დამოკიდებულებები
RUN npm install

# პროექტის ფაილები გადაიტანე
COPY . .

# აპლიკაცია ააგე
RUN npm run build

# გამოიყენე nginx static ფაილების გასაშვებად
FROM nginx:alpine

# nginx default კონფიგი წაშალე და ჩვენი react build ჩასვი
COPY --from=0 /app/dist /usr/share/nginx/html

# expose default nginx პორტი
EXPOSE 80

# nginx გაშვება
CMD ["nginx", "-g", "daemon off;"]
