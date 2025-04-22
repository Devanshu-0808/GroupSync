FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app
COPY . .

# Fix permissions and run Maven build
RUN chmod +x mvnw && \
    ./mvnw clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8001
ENTRYPOINT ["java", "-jar", "app.jar"]
