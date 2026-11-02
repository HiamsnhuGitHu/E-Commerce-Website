# Stage 1: Build the JAR using Gradle
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew && ./gradlew bootJar -x test

# Stage 2: Run the JAR
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

# Render assigns a dynamic port via $PORT
ENV PORT=10000
EXPOSE 10000

CMD ["sh", "-c", "java -Xmx350m -Xms256m -Dserver.port=${PORT} -jar app.jar"]